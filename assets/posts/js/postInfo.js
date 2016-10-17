var app = angular.module('postInfoApp', []);



/**************** Directives ****************/
app.directive('postManagement', function($rootScope, $sce, $timeout, postInfoSvc, ngProgressFactory) {
  return {
    templateUrl: '/zf2/assets/posts/html/postManagementTmpl.html',
    restrict: 'E',
    scope: {
      currentMedia: '=',
      selectedCategory: '='
    },
    link: function(scope, elem, attr) {



      var iconClasses = {};
      iconClasses["image/bmp"]='fa fa-file-image-o text-info';
      iconClasses["image/gif"]='fa fa-file-image-o text-info';
      iconClasses["image/jpeg"]='fa fa-file-image-o text-info';
      iconClasses["image/png"]='fa fa-file-image-o text-info';
      iconClasses["text/plain"]='fa fa-file-o text-info';
      iconClasses["application/pdf"]='fa fa-file-pdf-o text-info';
      iconClasses["video/mpeg"]='fa fa-file-video-o text-info';
      iconClasses["video/x-mpeg"]='fa fa-file-audio-o text-info';
      iconClasses["video/quicktime"]='fa fa-file-video-o text-info';
      iconClasses["video/mp4"]='fa fa-file-video-o text-info';
      iconClasses["video/youtube"]='fa fa-youtube-square text-info';
      iconClasses["video/vimeo"]='fa fa-vimeo-square text-info';

      var extensionMimeTypes = {};
      extensionMimeTypes["bmp"]="image/bmp";
      extensionMimeTypes["gif"]="image/gif";
      extensionMimeTypes["jpg"]="image/jpeg";
      extensionMimeTypes["jpeg"]="image/jpeg";
      extensionMimeTypes["png"]="image/png";
      extensionMimeTypes["txt"]="text/plain";
      extensionMimeTypes["pdf"]="application/pdf";
      extensionMimeTypes["mpeg"]="video/mpeg";
      extensionMimeTypes["mpg"]="video/mpeg";
      extensionMimeTypes["m3u"]="video/x-mpeg";
      extensionMimeTypes["mov"]="video/quicktime";
      extensionMimeTypes["mp4"]="video/mp4";

      var variantFileOprand = {
        dragClass : "active",
        on: {
          load: function(e, file) {
            var imageTypes = ["image/bmp", "image/gif", "image/jpeg", "image/png", "text/plain", "application/pdf", "video/mpeg", "video/x-mpeg", "video/quicktime", "video/mpeg-4","video/mp4"];
            var arrayLength = imageTypes.length;
            var match = false;
            for (var i = 0; i < arrayLength; i++) {
              if(file.type == imageTypes[i]) match = imageTypes[i];
            }

            // check file type
            if (!match) {
              alert("File \""+file.name+"\" is not a valid mime type for this upload [" + file.type + "]");
              return false;
            }

            // check file size
            if (parseInt(file.size / 1024) > 200050) {
              alert("File \""+file.name+"\" is too big.Max allowed size is 200 MB.");
              return false;
            }
            scope.create_variant_box(e,file,match,scope.selectedCategory.id);
          }
        }
      };

      FileReaderJS.setupDrop(document.getElementById('post-management-variant-file-dropbox'), variantFileOprand, scope);

      function debounce(func, wait, immediate) {
        var timeout;
        return function() {
          var context = this, args = arguments;
          var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      };

      setTimeout(function() {
        $('.addRegionLanguageTooltip').tooltip({
          title: 'Add region and language variations.',
          placement: 'left'
        });
        $('.addVariantImageTooltip').tooltip({
          title: 'Drag and drop an image or multiple images into this box to add it as a region/language variation image for this media item.',
          placement: 'top'
        });
        $('.connectProductTooltip').tooltip({
          title: 'Select a product from the product list to connect the post to a product.',
          placement: 'top'
        });
        $('.frequencyTooltip').tooltip({
          title: 'Select the frequency of how often this post can be posted.',
          placement: 'top'
        });
        $('.regLangTooltip').tooltip({
          title: 'Please select at least one region and language to continue. A panel will show below after you make your selection.',
          placement: 'top'
        });
        $('.postImageTooltip').tooltip({
          title: 'Drag and drop a media library image into this box (or click in this box if you have already selected a media library image from your media library) to add it to your post. The media type must be an image.',
          placement: 'top'
        });
        $('#postManagementCopyTranslationModal').on('hidden.bs.modal', function () {
          scope.selectedPlatform = {};
          scope.selectedRegion = {};
          scope.selectedLanguage = {};
        });
        $('#postManagementMediaPreviewModal').on('hidden.bs.modal', function() {
          $rootScope.$broadcast('$previewModalClosed');
          $(window).scrollTop(scope.windowScroll.value);
          scope.windowScroll.set = false;
          scope.previewMedia.showVariant = false;
          scope.variantUploadedImages = [];
          scope.previewMedia.overwriteTranslations = false;
          scope.youtubePlayer.pauseVideo();
          scope.vimeoPlayer.pause();
          scope.videoPlayer.pause();
        });
      }, 500);

      $('#postManagementDatepicker1').datepicker().on('hide', function(event) {
        // console.log(event, scope.post.start.date);
        if (scope.post.start.date === '') {
          $('#postManagementTimepicker1').timepicker('clear');
          scope.post.start.time = '';
          scope.$apply();
        }
        if (new Date(scope.post.start.date + ' ' + scope.post.start.time).getTime() > new Date(scope.post.end.date + ' ' + scope.post.end.time).getTime()) {
          scope.post.end.date = scope.post.start.date;
          scope.post.end.time = scope.post.start.time;
          $('#postManagementTimepicker2').timepicker('setTime', scope.post.start.time);
          scope.$apply();
          toastr.error('End date and time must be later than start date and time. End time automatically adjusted.');
        }
      });
      $('#postManagementDatepicker2').datepicker().on('hide', function(event) {
        if (event.target.value === '') {
          $('#postManagementTimepicker2').timepicker('clear');
          scope.post.end.time = '';
          scope.$apply();
        }
        if (new Date(scope.post.start.date + ' ' + scope.post.start.time).getTime() > new Date(scope.post.end.date + ' ' + scope.post.end.time).getTime()) {
          // console.log('greater');
          scope.post.end.date = scope.post.start.date;
          scope.post.end.time = scope.post.start.time;
          $('#postManagementTimepicker2').timepicker('setTime', scope.post.start.time);
          scope.$apply();
          toastr.error('End date and time must be later than start date and time. End time automatically adjusted.');
          return;
        }
      });

      $('#postManagementTimepicker1').timepicker()
        .on('show.timepicker', function(event) {
          if (scope.post.start.date === '') {
            $('#postManagementDatepicker1').focus();
            swal({
              title: "Please select a start date before you enter a start time.",
              type: "warning",
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Ok",
              closeOnConfirm: true
            });
            return;
          }
          scope.post.start.time = event.time.value;
        })
        .on('hide.timepicker', function(event) {
          if (scope.post.start.date === '') {
            $('#postManagementTimepicker1').timepicker('clear');
            return;
          }
          if (new Date(scope.post.start.date + ' ' + scope.post.start.time).getTime() > new Date(scope.post.end.date + ' ' + scope.post.end.time).getTime()) {
            // console.log('greater');
            scope.post.end.date = scope.post.start.date;
            scope.post.end.time = scope.post.start.time;
            scope.$apply();
            $('#postManagementTimepicker2').timepicker('setTime', scope.post.start.time);
            toastr.error('End date and time must be later than start date and time. End time automatically adjusted.');
            return;
          }
          scope.post.start.time = event.time.value;
          scope.$apply();
        });
      $('#postManagementTimepicker1')
        .on('blur', function() {
          // console.log('blurred')
          if (scope.post.start.date === '') {
            setTimeout(function() {
              $('#postManagementTimepicker1').timepicker('hideWidget');
              $('#postManagementTimepicker1').timepicker('clear');  
            }, 100)
          }
          
        });

      $('#postManagementTimepicker2').timepicker()
        .on('show.timepicker', function(event) {
          if (scope.post.end.date === '') {
            $('#postManagementDatepicker2').focus();
            swal({
              title: "Please select an end date before you enter an end time.",
              type: "warning",
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Ok",
              closeOnConfirm: true
            });
            return;
          }
          scope.post.end.time = event.time.value;
        })
        .on('hide.timepicker', function(event) {
          if (scope.post.end.date === '') {
            $('#postManagementTimepicker2').timepicker('clear');
            return;
          }
          if (new Date(scope.post.start.date + ' ' + scope.post.start.time).getTime() > new Date(scope.post.end.date + ' ' + scope.post.end.time).getTime()) {
            // console.log('greater');
            scope.post.end.date = scope.post.start.date;
            scope.post.end.time = scope.post.start.time;
            scope.$apply();
            $('#postManagementTimepicker2').timepicker('setTime', scope.post.start.time);
            toastr.error('End date and time must be later than start date and time. End time automatically adjusted.');
            return;
          }
          scope.post.end.time = event.time.value;
          scope.$apply();
        });
      $('#postManagementTimepicker2')
        .on('blur', function() {
          // console.log('blurred')
          if (scope.post.end.date === '') {
            setTimeout(function() {
              $('#postManagementTimepicker2').timepicker('hideWidget');
              $('#postManagementTimepicker2').timepicker('clear');  
            }, 100)
          }
        });

      var today = new Date();

      scope.browser = (function(){
        var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M[0];
      })();

      scope.currentPostInfo = {};
      scope.defaultPostImage = {
        title: '',
        url: '/zf2/assets/event/images/greyPicHolder.png'
      }
      scope.languageDisplays = [];
      scope.newMediaImage = '/zf2/assets/event/images/greyPicHolder.png';
      scope.post = {
        category: {},
        type: {},
        end: {
          date: '',
          time: ''
        },
        platforms: {},
        start: {
          date: '',
          time: ''
        }
      };
      scope.postCategories = [];
      scope.postEndpointEndpoints =[
        /*{
          title: 'Oils',
          value: 'Oils'
        },
        {
          title: 'Skin Care',
          value: 'Skin Care'
        }*/
      ];
      scope.postEndpointEndpoints.push({
        id: micThemes.defaultTemplate.id,
        title: micThemes.defaultTemplate.name,
        mics: function() {
          var micOrderArray = micThemes.defaultTemplateMicOrder.menuOrder.split(',');
          var micArray = [];
          micOrderArray.map(function (mic) {
            micArray.push({
              id: micThemes.defaultTemplateMics[mic].id,
              templateId: micThemes.defaultTemplateMics[mic].templateId,
              templateName: micThemes.defaultTemplateMics[mic].templateName,
              title: micThemes.defaultTemplateMics[mic].menuText
            });
          })
          return micArray;
        }()
      });
      micThemes.allTemplatesButDefault.map(function (theme) {
        scope.postEndpointEndpoints.push({
          id: theme.id,
          title: theme.name,
          mics: function () {
            var micArray = [];
            /*micThemes.allTemplatesButDefaultMicOrder.map(function (template) {
              if (template.id === theme.id) {
                var micOrderArray = template.menuOrder.split(',');
                micThemes.allTemplatesButDefaultMics.map(function (themeMics) {
                  if (themeMics.templateId === theme.id) {
                    micOrderArray.map(function (mic) {
                      micArray.push({
                        id: themeMics[mic].id,
                        templateId: themeMics[mic].templateId,
                        templateName: themeMics[mic].themeName,
                        title: themeMics[mic].menuText
                      });
                    });
                  }
                });
              }
            });*/
            return micArray;
          }()
        });
      });
      console.log(scope.postEndpointEndpoints);
      scope.postEndpointLandingPages = [
        {
          title: 'Products',
          value: 'Products'
        },
        {
          title: 'Cars',
          value: 'Cars'
        },
        {
          title: 'Trucks',
          value: 'Trucks'
        }
      ];

      scope.postLanguageDisplay = {};
      scope.postLanguages = [];
      scope.postMediaTypes = [
        {
          title: 'YouTube',
          value: 'video/youtube'
        },
        {
          title: 'Vimeo',
          value: 'video/vimeo'
        },
        {
          title: 'External',
          value: 'url/external'
        }
      ];
      scope.postPlatforms = [];
      scope.postProducts = [
        
        {
          'name' : 'Product 2'
        },
        {
          'name' : 'This is the product title to see how it stretches across the available space.',
          'subs' : [
            {
              'name' : 'Product 1-1',
              'subs' : [
                {
                  'name' : 'Product 1-1-1',
                  'subs' : [
                    {
                      'name' : 'Product 1-1-1-1',
                      'subs' : [
                        {
                          'name' : 'Product 1-1-1-1-1',
                          'subs' : [
                            {
                              'name' : 'Product 1-1-1-1-1-1',
                              'subs' : [
                                {
                                  'name' : 'This is the last product to see how it stretches across the available space.'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  'name' : 'Product 1-1-2'
                },
              ]
            },
            {
              'name' : 'Product 1-2'
            },
            {
              'name' : 'Product 1-3'
            },
            {
              'name' : 'Product 1-4'
            }
          ]
        },
        {
          'name' : 'Product 3',
          'subs' : [
            {
              'name' : 'Product 3-1',
              'subs' : [
                {
                  'name' : 'Product 3-1-1'
                }
              ]
            },
            {
              'name' : 'Product 3-2'
            },
          ]
        },
        {
          'name' : 'Product 4'
        },
        {
          'name' : 'Product 5'
        }
      ];
      scope.postRegions = [];
      scope.postTypes = [];
      scope.previewMedia = {
        overwriteTranslations: false,
        showVariant: false
      };
      scope.translationBreadCrumbs = [];
      scope.translationPlatformSelect = [];
      scope.translationRegionSelect = [];
      scope.translationLanguageSelect = [];
      scope.variantUploadedImages = [];
      scope.videoPlayer;
      scope.windowScroll = {
        value: undefined,
        set: false
      };

      var subcount = 0;
      var highestCount = -2;
      function countIfSubs(thingToCheck) {
        thingToCheck.map(function(thing) {
          if (thing.hasOwnProperty('subs')) {
            subcount++;
            countIfSubs(thing.subs);
          } else {
            if (subcount > highestCount) {
              highestCount = subcount;
            }
            subcount = -2;
          }
        })
      }
      countIfSubs(scope.postProducts);

      scope.$on('$repeatFinished', function(event, data) {
        lastIndex = data;
        if (lastIndex === highestCount) {
          setTimeout(function() {
            $('#postManagementNestable').nestable();
            $('#postManagementNestable').nestable('collapseAll');
          })
        }
      });

      platformApplications.map(function (platform) {
        scope.postPlatforms.push({
          endpoints: angular.copy(scope.postEndpointEndpoints),
          id: platform.id,
          landingPages: angular.copy(scope.postEndpointLandingPages),
          lightboxImage: {
            title: '',
            url: ''
          },
          postImage: {
            title: '',
            url: ''
          },
          title: platform.platformApplicationType
        })
      });
      scope.progressBar = ngProgressFactory.createInstance();
      scope.progressBar.setHeight(6);
      scope.progressBar.setColor('#5bc0de');
      videojs('postManagementVideoPlayer', {fluid: true}).ready(function() {
        scope.videoPlayer = this;
      });



      postInfoSvc.post('/posts/Manage/getPostschedulerCategories').then(function (response) {
        if (response.status && response.status === 500) {
          console.log(response);
          return;
        }
        scope.postCategories = response;
        scope.post.category = scope.postCategories[0];
      });
      postInfoSvc.post('/posts/Manage/getPostTypes').then(function (response) {
        if (response.status && response.status === 500) {
          console.log(response);
          return;
        }
        scope.postTypes = response;
        scope.post.type = scope.postTypes[0];
      });
      postInfoSvc.post('/media/Admin/getRegionsAndLanguages').then(function(response) {
        // console.log(response);
        for (var prop in response.data.languages) {
          scope.postLanguages.push(response.data.languages[prop][0]);
          scope.translationLanguageSelect.push(response.data.languages[prop][0]);
          for (var languageProp in response.data.languages[prop][0]) {
            if (!scope.languageDisplays.includes(languageProp)) {
              scope.languageDisplays.push(languageProp);
            }
          }
        }
        scope.postLanguageDisplay = scope.languageDisplays[0];
        for (var prop in response.data.regions) {
          scope.postRegions.push({title: response.data.regions[prop], value: prop});
          scope.translationRegionSelect.push({title: response.data.regions[prop], value: prop});
        }

        scope.postPlatforms.map(function(platform) {
          platform.regions = angular.copy(scope.postRegions);
          platform.languages = angular.copy(scope.postLanguages);
          platform.languages.map(function(language, index) {
            $timeout(function() {
              $('#languageInfo' + platform.title + index).css({clear: 'none'});
              if (index % 2 === 0) {
                $('#languageInfo' + platform.title + index).css({clear: 'both'});
              }
            }, 100);
          });
          platform.regions.map(function(region, index) {
            $timeout(function() {
              $('#regionInfo' + platform.title + index).css({clear: 'none'});
              if (index % 2 === 0) {
                $('#regionInfo' + platform.title + index).css({clear: 'both'});
              }
            }, 100);
          })
          scope.translationPlatformSelect.push({title: platform.title});
        })
      });

      scope.autoPopulatePlatforms = function (platformToCopy) {
        scope.postPlatforms.map(function (platform) {
          if (platform.title !== platformToCopy.title) {
            if (!scope.post.platforms[platform.title]) {
              scope.post.platforms[platform.title] = {
                id: platform.id
              };
            }
            if (!scope.post.platforms[platform.title].regions) {
              scope.post.platforms[platform.title].regions = [];
            }
            if (!scope.post.platforms[platform.title].regions.length) {
              platform.regions = angular.copy(platformToCopy.regions);
              scope.post.platforms[platform.title].regions = angular.copy(scope.post.platforms[platformToCopy.title].regions);
            }
            if (!scope.post.platforms[platform.title].languages) {
              scope.post.platforms[platform.title].languages = [];
            }
            if (!scope.post.platforms[platform.title].languages.length) {
              platform.languages = angular.copy(platformToCopy.languages);
              scope.post.platforms[platform.title].languages = angular.copy(scope.post.platforms[platformToCopy.title].languages);
            }
            if (!scope.post.platforms[platform.title].image) {
              scope.post.platforms[platform.title].image = angular.copy(scope.post.platforms[platformToCopy.title].image);
            }
            if (!scope.post.platforms[platform.title].frequency) {
              scope.post.platforms[platform.title].frequency = angular.copy(scope.post.platforms[platformToCopy.title].frequency);
            }
            if (!scope.post.platforms[platform.title].frequencyDays) {
              scope.post.platforms[platform.title].frequencyDays = angular.copy(scope.post.platforms[platformToCopy.title].frequencyDays);
            }
            if (!scope.post.platforms[platform.title].postTitle) {
              scope.post.platforms[platform.title].postTitle = angular.copy(scope.post.platforms[platformToCopy.title].postTitle);
            }
            if (!scope.post.platforms[platform.title].postDescription) {
              scope.post.platforms[platform.title].postDescription = angular.copy(scope.post.platforms[platformToCopy.title].postDescription);
            }
            if (!scope.post.platforms[platform.title].postSuggestedText) {
              scope.post.platforms[platform.title].postSuggestedText = angular.copy(scope.post.platforms[platformToCopy.title].postSuggestedText);
            }
            if (!scope.post.platforms[platform.title].endpoint) {
              scope.post.platforms[platform.title].endpoint = angular.copy(scope.post.platforms[platformToCopy.title].endpoint);
            }
            if (!scope.post.platforms[platform.title].landingPage) {
              scope.post.platforms[platform.title].landingPage = angular.copy(scope.post.platforms[platformToCopy.title].landingPage);
            }
            if (!scope.post.platforms[platform.title].externalUrl) {
              scope.post.platforms[platform.title].externalUrl = angular.copy(scope.post.platforms[platformToCopy.title].externalUrl);
            }
            if (!scope.post.platforms[platform.title].lightboxId) {
              scope.post.platforms[platform.title].lightboxId = angular.copy(scope.post.platforms[platformToCopy.title].lightboxId);
            }
          }
        });
      };

      scope.checkForLanguages = function(languages) {
        var truthy = false;
        var arrayHolder = [];
        languages.map(function(language) {
          if (language.selected) {
            truthy = true;
            arrayHolder.push(language.iso);
          }
        });
        if (!truthy) {
          toastr.warning('You must have at least one language selected.');
          languages.map(function(language, index) {
            if (language.iso === 'all_l') {
              language.selected = true;
            }
          })
        }
        return arrayHolder;
      };

      scope.checkForRegions = function(regions) {
        var truthy = false;
        var arrayHolder = [];
        regions.map(function(region, index) {
          if (region.selected) {
            truthy = true;
            arrayHolder.push(region.value);
          }
        });
        if (!truthy) {
          toastr.warning('You must have at least one region selected.');
          regions.map(function(region, index) {
            if (region.value === 'all_r') {
              region.selected = true;
            }
          })
        }
        return arrayHolder;
      };

      var currentProduct = undefined;
      scope.connectPostToProduct = function(product, event) {
        // console.log(product);
        if (scope.post.product && product.name === scope.post.product.name) {
          $(currentProduct).removeClass('dd-selected');
          toastr.warning('Disconnected ' + product.name + ' from post.');
          delete scope.post.product;
          currentProduct = undefined;
          return;
        } else {
          if (currentProduct) {
            $(currentProduct).removeClass('dd-selected');
            toastr.warning('Disconnected ' + scope.post.product.name + ' from post.');
          }
          $(event.target).addClass('dd-selected');
          setTimeout(function() {
            toastr.success(product.name + ' successfully connected to post.');
          }, 100)
        }
        currentProduct = event.target;
        scope.post.product = product;
      };

      scope.copyTranslation = function () {
        console.log('do something here', scope.selectedPlatform, scope.selectedRegion, scope.selectedLanguage);
        $('#postManagementCopyTranslationModal').modal('hide');
      };

      scope.create_variant_box = function(e,file,mimeType,categoryId){
        var rand = Math.floor((Math.random()*100000)+3);
        var src   = e.target.result;
        if (mimeType=='text/plain' || mimeType=='application/pdf' || mimeType=='video/mpeg' || mimeType=='video/x-mpeg' ||
          mimeType=='video/mpeg-4' || mimeType=='video/mp4' || mimeType=='video/quicktime')
        {
          src = '/images/' + 'missing-mcsanl.gov_.png'
        }

        scope.variantUploadedImages.push({name: file.name, src: src, type: file.type});
        scope.$apply();

        // this happens in the popup, media library id should be available there.
        var mediaLibraryId = scope.previewMedia.mediaLibraryId;
        // upload file
        scope.upload(scope.previewMedia.regions,scope.previewMedia.languages,file,rand,mimeType,mediaLibraryId,categoryId);
      };

      scope.confirmOverride = function() {
        if (scope.previewMedia.overwriteTranslations) {
          toastr.warning('You have opted to overwrite the matching translations for the regions and languages you have selected when you add media. Please make sure this is an acurate selection as this cannot be undone after you add the media.');
        } else {
          toastr.warning('You have opted NOT to overwrite the matching translations for the regions and languages you have selected when you add media.');
        }
      };

      scope.dropSuccessHandler = function($event, $index, array) {
        // console.log('dropped');
      };

      scope.expandProductList = function(event) {
        nestable = $('.dd').data("nestable");
        if ($(event.target.parentElement).hasClass('dd-collapsed')) {
          nestable.expandItem($(event.target.parentElement));
        } else {
          nestable.collapseItem($(event.target.parentElement));
        }
        
      };

      scope.getDefaultPlayerPopModal = function () {
        postInfoSvc.post('/media/Admin/getMediaTranslationUrls', {mediaLibraryId: scope.previewMedia.mediaLibraryId}).then(function(translationResponse) {
          // console.log(translationResponse);
          scope.previewMedia.translations = [];
          for (var prop in translationResponse.translations) {
            if (translationResponse.translations[prop].mimeType === 'url/external') {
              translationResponse.translations[prop].fileExtension = scope.parseFileExtension(translationResponse.translations[prop].fileLocation);
            } else {
              if (translationResponse.translations[prop].mimeType === 'image/bmp' || translationResponse.translations[prop].mimeType === 'image/gif' || translationResponse.translations[prop].mimeType === 'image/jpeg' || translationResponse.translations[prop].mimeType === 'image/png') {
                translationResponse.translations[prop].fileLocation = translationResponse.translations[prop].fileLocation + '?' + new Date().getTime();
              }
              translationResponse.translations[prop].fileExtension = translationResponse.translations[prop].mimeType;
            }
            scope.previewMedia.translations.push(translationResponse.translations[prop]);
            scope.previewMedia.regions.map(function(region) {
              if (region.value === translationResponse.translations[prop].region) {
                region.selected = true;
                translationResponse.translations[prop].readableRegion = region;
              }
            });
            scope.previewMedia.languages.map(function(language) {
              if (language.iso === translationResponse.translations[prop].language) {
                language.selected = true;
                translationResponse.translations[prop].readableLanguage = language;
              }
            });
          }
          // console.log(scope.previewMedia.translations[0].mimeType);
          if (scope.previewMedia.translations[0].mimeType === 'url/external') {
            var fileExtension = scope.parseFileExtension(scope.previewMedia.translations[0].fileLocation).toLowerCase();
            if ((fileExtension === 'mov' || fileExtension === 'm4v'  || fileExtension === 'mpg' || fileExtension === 'mpeg') && (scope.browser === 'Chrome' || scope.browser === 'Firefox')) {
              toastr.error('This all region/all language media is not supported in this browser.');
            }
            scope.previewMedia.currentMimeType = extensionMimeTypes[fileExtension];
          } else {
            scope.previewMedia.currentMimeType = scope.previewMedia.translations[0].mimeType;
          }
          // console.log(scope.previewMedia.currentMimeType, scope.browser);
          if (scope.previewMedia.currentMimeType === 'application/pdf') {
            scope.previewMedia.currentMedia = $sce.trustAsResourceUrl('https://docs.google.com/gview?url=' + scope.previewMedia.translations[0].fileLocation + '&embedded=true');
          } else if (scope.previewMedia.currentMimeType === 'video/quicktime') {
            scope.videoPlayer.src({type: scope.previewMedia.currentMimeType, src: scope.previewMedia.translations[0].fileLocation});
          } else if (scope.previewMedia.currentMimeType === 'video/mp4' || scope.previewMedia.currentMimeType === 'video/mpeg' || scope.previewMedia.currentMimeType === 'video/mpg') {
            // scope.previewMedia.currentMedia = translation.fileLocation;
            scope.videoPlayer.src({type: scope.previewMedia.currentMimeType, src: scope.previewMedia.translations[0].fileLocation});
          } else if (scope.previewMedia.currentMimeType === 'text/plain') {
            $.ajax({
                async:false,
                url: scope.previewMedia.translations[0].fileLocation,
                dataType: 'text',
                success: function(data) 
                {
                  // console.log(data);
                  scope.previewMedia.currentMedia = data;
                }
            });
          } else if (scope.previewMedia.currentMimeType === 'video/mpeg-4') {
            scope.videoPlayer.src({type: scope.previewMedia.currentMimeType, src: scope.previewMedia.translations[0].fileLocation});
          } else if (scope.previewMedia.currentMimeType === 'video/youtube' || scope.previewMedia.currentMimeType === 'video/vimeo') {
            scope.previewMedia.currentMedia = scope.previewMedia.translations[0].fileLocation;
          } else {
            scope.previewMedia.currentMedia = $sce.trustAsResourceUrl(scope.previewMedia.translations[0].fileLocation);
          }
        })
      };

      scope.onDefaultPostImageDrop = function($event, $data) {
        if ($data.mimeType === 'image/bmp' || $data.mimeType === 'image/gif' || $data.mimeType === 'image/jpeg' || $data.mimeType === 'image/png') {
          scope.post.defaultPostImage = $data;
          scope.currentMedia = angular.copy($data);
          if (scope.currentMedia.thumbnail) {
            scope.currentMedia.currentMediaImg = scope.currentMedia.thumbnail;
          } else {
            scope.currentMedia.currentMediaImg = scope.currentMedia.fileLocation;
          }
        } else {
          toastr.error('The media type for this must be an image.');
        }
      };

      scope.onPostImageDrop = function($event, $data, $index) {
        if ($data.mimeType === 'image/bmp' || $data.mimeType === 'image/gif' || $data.mimeType === 'image/jpeg' || $data.mimeType === 'image/png') {
          if (!scope.post.platforms[scope.currentPostInfo.title]) {
            scope.post.platforms[scope.currentPostInfo.title] = {};
          }
          scope.post.platforms[scope.currentPostInfo.title].image = $data;
          scope.currentMedia = angular.copy($data);
          if (scope.currentMedia.thumbnail) {
            scope.currentMedia.currentMediaImg = scope.currentMedia.thumbnail;
          } else {
            scope.currentMedia.currentMediaImg = scope.currentMedia.fileLocation;
          }
        } else {
          toastr.error('The media type for this must be an image.');
        }
        scope.autoPopulatePlatforms(scope.currentPostInfo);
      };

      /**
       * Get file or url extension
       * @param url
       * @returns {string|*}
       */
      scope.parseFileExtension = function(url) {
        return url.substr( (url.lastIndexOf('.') +1) );
      };

      scope.previewPostImage = function(progressBar, content, index) {
        if (!content || content.url === '/zf2/assets/event/images/greyPicHolder.png') {
          return;
        }
        scope.previewMedia.$hashKey = content.$$hashKey;
        scope.previewMedia.accountId = content.accountId;
        scope.previewMedia.active = content.active;
        scope.previewMedia.administrativeDefault = content.administrativeDefault;
        scope.previewMedia.administratorId = content.administratorId;
        scope.previewMedia.companyId = content.companyId;
        scope.previewMedia.created = content.created;
        scope.previewMedia.fileLocation = content.fileLocation;
        scope.previewMedia.iconClass = content.iconClass;
        scope.previewMedia.id = content.id;
        scope.previewMedia.language = content.language;
        scope.previewMedia.languages = angular.copy(scope.postLanguages);
        scope.previewMedia.loadingPercent = content.loadingPercent;
        scope.previewMedia.managementName = content.managementName;
        scope.previewMedia.mediaLibraryCreated = content.mediaLibraryCreated;
        scope.previewMedia.mediaLibraryId = content.mediaLibraryId;
        scope.previewMedia.mimeType = content.mimeType;
        scope.previewMedia.postLanguageDisplay = scope.postLanguageDisplay;
        scope.previewMedia.postMediaTypes = angular.copy(scope.postMediaTypes);
        scope.previewMedia.region = content.region;
        scope.previewMedia.regions = angular.copy(scope.postRegions);
        scope.previewMedia.thumbnail = content.thumbnail;
        scope.previewMedia.translationKeys = content.translationKeys;
        scope.previewMedia.translationValues = content.translationValues;
        scope.previewMedia.updated = content.updated;
        scope.previewMedia.mediaType = scope.previewMedia.postMediaTypes[0];
        scope.previewMedia.languages.map(function(language, index) {
          $timeout(function() {
            $('#previewLanguageMedia' + index).css({clear: 'none'});
            if (index % 2 === 0) {
              $('#previewLanguageMedia' + index).css({clear: 'both'});
            }
          }, 100);
          if (language.iso === 'all_l') {
            language.selected = true;
          }
        });
        scope.previewMedia.regions.map(function(region, index) {
          $timeout(function() {
            $('#previewRegionMedia' + index).css({clear: 'none'});
            if (index % 2 === 0) {
              $('#previewRegionMedia' + index).css({clear: 'both'});
            }
          }, 100);
          if (region.value === 'all_r') {
            region.selected = true;
          }
        });
        content.active = true;
        scope.progressBar.setParent(document.getElementById(progressBar + index));
        content.loadingPercent = 0;
        if (scope.windowScroll.value !== 0 && !scope.windowScroll.set) {
          scope.windowScroll.value = $(window).scrollTop();
          scope.windowScroll.set = true;
        }
        function moveProgressBar() {
          content.loadingPercent++;
          scope.progressBar.set(content.loadingPercent);
          if (content.loadingPercent < 100 && content.active) {
            setTimeout(moveProgressBar, 20);
          } else if (content.loadingPercent >= 100 && content.active) {
            scope.getDefaultPlayerPopModal();
            $('#postManagementMediaPreviewModal').modal('show');
          }
        };
        moveProgressBar();
      };

      scope.previewPostImageEndHover = function(content) {
        if (!content || content.url === '/zf2/assets/event/images/greyPicHolder.png') {
          return;
        }
        content.active = false;
        scope.progressBar.reset();
        content.loadingPercent = 0;
      };

      /* Used in the upload function*/
      readBody = function(xhr) {
        var data;
        if (!xhr.responseType || xhr.responseType === "text") {
          data = xhr.responseText;
        } else if (xhr.responseType === "document") {
          data = xhr.responseXML;
        } else {
          data = xhr.response;
        }
        return data;
      };

      scope.savePost = function() {

        var warning = [];
        if (!scope.post.start.date || !scope.post.start.time) {
          warning.push('Please choose a starting date and time to save the post.');
        }
        if (!scope.post.end.date || !scope.post.end.time) {
          warning.push('Please choose an ending date and time to save the post.');
        }
        if (!scope.post.defaultPostImage) {
          warning.push('Please select a default post media item to save the post.');
        }

        function checkForCompletePlatform() {
          var checkForPlatform = false;
          for (var prop in scope.post.platforms) {
            if (prop) {
              checkForPlatform = true;
            }
          }
          if (!checkForPlatform) {
            warning.push('Please select a platform application and fill out the required information to save the post.');
            return;
          }
          for (var prop in scope.post.platforms) {
            var errorMessage = 'Some information for the ' + prop + ' platform is not complete: ';
            var errorMessageArray = [];
            var checker = false;
            if (!scope.post.platforms[prop].regions || !scope.post.platforms[prop].regions.length) {
              errorMessageArray.push('select at least one region');
              checker = true;
            }
            if (!scope.post.platforms[prop].languages || !scope.post.platforms[prop].languages.length) {
              errorMessageArray.push('select at least one language');
              checker = true;
            }
            if (!scope.post.platforms[prop].image) {
              errorMessageArray.push('select a platform image');
              checker = true;
            }
            if (!scope.post.platforms[prop].endpoint || !scope.post.platforms[prop].landingPage) {
              errorMessageArray.push('select an endpoint and landing page under the "Endpoint" tab');
              checker = true;
            }
            errorMessage += errorMessageArray.join(', ');
            if (checker) {
              warning.push(errorMessage + '.');
            }
          }
        };
        checkForCompletePlatform();
        if (warning.length > 0) {
          warning.map(function (error, index) {
            setTimeout(function (error) {
              toastr.error(error);
            }, (index * 100), error);
          });
          return false;
        }
        function parseDateTime(dateTime) {
          var newDateObj = new Date(dateTime.date + ' ' + dateTime.time);
          var utcDateObj = newDateObj.getUTCFullYear() + '-' + ((newDateObj.getUTCMonth() + 1) < 10 ? '0' + (newDateObj.getUTCMonth() + 1) : (newDateObj.getUTCMonth() + 1)) + '-' + (newDateObj.getUTCDate() < 10 ? '0' + newDateObj.getUTCDate() : newDateObj.getUTCDate()) + ' ' + (newDateObj.getUTCHours() < 10 ? '0' + newDateObj.getUTCHours() : newDateObj.getUTCHours()) + ':' + (newDateObj.getUTCMinutes() < 10 ? '0' + newDateObj.getUTCMinutes() : newDateObj.getUTCMinutes()) + ':00';
          return utcDateObj;
        }
        function parsePostPlatformTranslations(curr) {
          var translations = [];
          curr.regions.map(function (region) {
            curr.languages.map(function (language) {
              translations.push({
                micId: curr.landingPage.id,  //REQUIRED
                suggestedText: curr.postSuggestedText, //NOT REQUIRED
                endpointUrl: curr.externalUrl, //NOT REQUIRED
                lightboxId: null,  //NOT REQUIRED Need this information still. Need to set up light box interaction
                postPlatformTranslation: {
                  region: region.value, //REQUIRED
                  language: language.iso, //REQUIRED
                  title: curr.postTitle, //NOT REQUIRED
                  info: curr.postDescription //NOT REQUIRED
                },
                postschedulerPostPlatformTranslationValues: false
                /* This is a samle of what things might look like:
                postschedulerPostPlatformTranslationValues: [
                  {
                    id: 2, //This should not be hard coded. Where do we get this information?
                    ppptdkey: 'black', //This should not be hard coded. Where do we get this information?
                    ppptdvalue: 'bk' //This should not be hard coded. Where do we get this information?
                  },
                  {
                    id: 1,
                    ppptdkey: 'white',
                    ppptdvalue: 'wt'
                  }
                ]*/
              })
            })
          });
          return translations;
        }
        function parsePostPlatforms() {
          var platformArray = [];
          for (var prop in scope.post.platforms) {
            var curr = scope.post.platforms[prop];
            platformArray.push({
              frequency: (!curr.frequency ? -1 : curr.frequencyDays), //NOT REQUIRED
              postPlatform: {
                platformApplicationId: curr.id, //REQUIRED
                mediaId: curr.image.mediaLibraryId //REQUIRED
              },
              postschedulerPostPlatformTranslationData: {
                data: parsePostPlatformTranslations(curr)
              }
            })
          }
          return platformArray;
        }
        var postData = JSON.stringify({
          categoryId: scope.post.category.id, //REQUIRED
          defaultImageId: scope.post.defaultPostImage.mediaLibraryId, //REQUIRED
          priority: scope.post.priority, //NOT REQUIRED
          postId: (scope.post.id ? scope.post.id : 0), //REQUIRED but provided
          postTypeId: scope.post.type.id, //REQUIRED
          productId: (scope.post.product ? scope.post.product.id : null), //NOT REQUIRED
          posts: {
            id: (scope.post.id ? scope.post.id : 0), //REQUIRED but provided
            startDate: parseDateTime(scope.post.start), //REQUIRED
            expirationDate: parseDateTime(scope.post.end), //REQUIRED
            active: 1 //REQUIRED We are just setting to active for now.
          },
          postschedulerPostPlatformData: {
            data: parsePostPlatforms()
          }
        });
        console.log(postData);
        /*$.ajax({
          url: '/posts/Manage/setPost',
          type: 'POST',
          data: postData,
          success: function(data) {
            //called when successful
            console.log(data)
          },
          error: function(e) {
            console.log(e);
          }
        });*/
        postInfoSvc.post('/posts/Manage/setPost', {postData:{postschedulerPostData: {postschedulerPostData:  postData}}}).then(function (response) {
          console.log(response);
        })
      };

      scope.selectBreadCrumb = function (crumb) {
        if (crumb === 'Platform') {
          scope.selectedPlatform = {};
          scope.selectedRegion = {};
          scope.selectedLanguage = {};
        } else if (crumb === 'Region') {
          scope.selectedRegion = {};
          scope.selectedLanguage = {};
        } else if (crumb === 'Language') {
          scope.selectedLanguage = {};
        }
      };


      scope.selectRegionsLanguages = function(platform, index) {
        var regArray = [];
        var langArray = [];

        platform.regions.map(function(region) {
          if (region.selected) {
            regArray.push(region);
          }
        });

        platform.languages.map(function(language) {
          if (language.selected) {
            langArray.push(language);
          }
        });
        scope.post.platforms[scope.currentPostInfo.title].regions = regArray;
        scope.post.platforms[scope.currentPostInfo.title].languages = langArray;
        if (regArray.length > 0 && langArray.length > 0) {
          $('#collapsePlatformPanel' + index).addClass('in');
        } else {
          $('#collapsePlatformPanel' + index).removeClass('in');
        }
        scope.autoPopulatePlatforms(scope.currentPostInfo);
      };

      scope.setCurrentMediaFromPreview = function() {
        scope.currentMedia = angular.copy(scope.previewMedia);
        if (scope.currentMedia.thumbnail) {
          scope.currentMedia.currentMediaImg = scope.currentMedia.thumbnail;
        } else {
          scope.currentMedia.currentMediaImg = scope.currentMedia.fileLocation;
        }
      };

      scope.setCurrentMediaAsPostDefaultImage = function() {
        if (!scope.currentMedia.hasOwnProperty('managementName')) {
          return;
        }
        if (scope.currentMedia.mimeType === 'image/bmp' || scope.currentMedia.mimeType === 'image/gif' || scope.currentMedia.mimeType === 'image/jpeg' || scope.currentMedia.mimeType === 'image/png') {
          scope.post.defaultPostImage = angular.copy(scope.currentMedia);
        } else {
          toastr.error('The media type for this must be an image.');
        }
      };

      scope.setCurrentMediaAsPostImage = function() {
        if (!scope.currentMedia.hasOwnProperty('managementName')) {
          return;
        }
        if (scope.currentMedia.mimeType === 'image/bmp' || scope.currentMedia.mimeType === 'image/gif' || scope.currentMedia.mimeType === 'image/jpeg' || scope.currentMedia.mimeType === 'image/png') {
          if (!scope.post.platforms[scope.currentPostInfo.title]) {
            scope.post.platforms[scope.currentPostInfo.title] = {};
          }
          scope.post.platforms[scope.currentPostInfo.title].image = angular.copy(scope.currentMedia);
        } else {
          toastr.error('The media type for this must be an image.');
        }
        scope.autoPopulatePlatforms(scope.currentPostInfo);
      }

      scope.setNewMedia = function(translation) {
        scope.youtubePlayer.pauseVideo();
        scope.vimeoPlayer.pause();
        scope.videoPlayer.pause();
        // console.log(translation);
        if (translation.mimeType === 'url/external') {
          var fileExtension = scope.parseFileExtension(translation.fileLocation).toLowerCase();
          // console.log(fileExtension);
          if ((fileExtension === 'mov' || fileExtension === 'm4v'  || fileExtension === 'mpg' || fileExtension === 'mpeg') && (scope.browser === 'Chrome' || scope.browser === 'Firefox')) {
            toastr.error('This media is not supported in this browser.');
            return;
          }
          scope.previewMedia.currentMimeType = extensionMimeTypes[fileExtension];
        } else {
          scope.previewMedia.currentMimeType = translation.mimeType;
        }
        // console.log(scope.previewMedia.currentMimeType, scope.browser);
        if (scope.previewMedia.currentMimeType === 'application/pdf') {
          scope.previewMedia.currentMedia = $sce.trustAsResourceUrl('https://docs.google.com/gview?url=' + translation.fileLocation + '&embedded=true');
        } else if (scope.previewMedia.currentMimeType === 'video/quicktime') {
          scope.videoPlayer.src({type: scope.previewMedia.currentMimeType, src: translation.fileLocation});
        } else if (scope.previewMedia.currentMimeType === 'video/mp4' || scope.previewMedia.currentMimeType === 'video/mpeg' || scope.previewMedia.currentMimeType === 'video/mpg') {
          // scope.previewMedia.currentMedia = translation.fileLocation;
          scope.videoPlayer.src({type: scope.previewMedia.currentMimeType, src: translation.fileLocation});
        } else if (scope.previewMedia.currentMimeType === 'video/mpeg-4') {
          scope.videoPlayer.src({type: scope.previewMedia.currentMimeType, src: translation.fileLocation});
        } else if (scope.previewMedia.currentMimeType === 'image/bmp' || scope.previewMedia.currentMimeType === 'image/gif' || scope.previewMedia.currentMimeType === 'image/jpeg' || scope.previewMedia.currentMimeType === 'image/png') {
          // console.log(translation.fileLocation)
          scope.previewMedia.currentMedia = $sce.trustAsResourceUrl(translation.fileLocation);
        } else if (scope.previewMedia.currentMimeType === 'video/youtube' || scope.previewMedia.currentMimeType === 'video/vimeo') {
          console.log('here with youtube');
          scope.previewMedia.currentMedia = translation.fileLocation;
        } else {
          scope.previewMedia.currentMedia = $sce.trustAsResourceUrl(translation.fileLocation);
        }
        // console.log(scope.previewMedia.currentMedia);
      };

      var prevPostDefaultsIndex = -1;
      scope.setPostDefaultsScrolltop = function(index, event, platform) {
        if (platform) {
          scope.currentPostInfo = platform;
        }
        if (!scope.post.platforms[scope.currentPostInfo.title]) {
          scope.post.platforms[scope.currentPostInfo.title] = {
            id: platform.id,
            endpoint: scope.postEndpointEndpoints[0],
            landingPage: scope.postEndpointEndpoints[0].mics[0]
          };
        }
        if (scope.post.platforms[scope.currentPostInfo.title].regions && scope.post.platforms[scope.currentPostInfo.title].regions.length && scope.post.platforms[scope.currentPostInfo.title].languages && scope.post.platforms[scope.currentPostInfo.title].languages.length) {
          if (scope.post.platforms[scope.currentPostInfo.title].regions.length > 0 && scope.post.platforms[scope.currentPostInfo.title].languages.length > 0) {
            $('#collapsePlatformPanel' + index).addClass('in');
          } else {
            $('#collapsePlatformPanel' + index).removeClass('in');
          }
        }
        if (index === prevPostDefaultsIndex) {
          if (index === -1 ) {
            $('html, body').animate({scrollTop: 85}, 200);
          } else {
            $('html, body').animate({scrollTop: ($('body').scrollTop() + Math.floor(event.target.getBoundingClientRect().top - 55))}, 200);
          }
          return;
        }
        $('#postDefaultsCollapse' + prevPostDefaultsIndex).collapse('hide');
        setTimeout(function() {
          $('#postDefaultsCollapse' + index).collapse('show');
        }, 100)
        prevPostDefaultsIndex = index;
        setTimeout(function() {
          if (index > -1) {
            $('html, body').animate({scrollTop: ($('body').scrollTop() + Math.floor(event.target.getBoundingClientRect().top - 55))}, 200);
          } else {
            $('html, body').animate({scrollTop: 85}, 200);
          }
        }, 400);
      };

      scope.showCopyTranslationModal = function() {
        $('#postManagementCopyTranslationModal').modal('show');
      };

      scope.showDatepicker1 = function() {
        $('#postManagementDatepicker1').datepicker('show');
      };

      scope.showDatepicker2 = function() {
        $('#postManagementDatepicker2').datepicker('show');
      };

      scope.showTimepicker1 = function() {
        $('#postManagementTimepicker1').timepicker('showWidget');
      };

      scope.showTimepicker2 = function() {
        $('#postManagementTimepicker2').timepicker('showWidget');
      };

      scope.showVariantEditOptions = function() {
        scope.previewMedia.showVariant = !scope.previewMedia.showVariant;
        if (scope.previewMedia.showVariant) {
          $timeout(function() {
            $('#postManagementMediaPreviewModal').animate({
              scrollTop: $('#postManagementMediaPreviewModalLine').offset().top - 5
            }, 200);
          }, 100)
        }
      };

      /**
       * This performs the actual file upload
       * @param file - file object
       * @param rand - array element key
       * @param mimeType - mimeType of the file
       * @param mediaLibraryId - the media library id to store the object to, this will be used to add variants
       * @param categoryId - category Id to dump the file to
       */
       
      scope.upload = function(regions, languages, file,rand,mimeType,mediaLibraryId,categoryId){
        if (mimeType === 'text/plain') {
          toastr.error("Error: Unsupported file type: " + mimeType + ". Please try a different file type.");
          return;
        }
        var mediaRegionsArray = scope.checkForRegions(regions);
        var mediaLanguagesArray = scope.checkForLanguages(languages);
        // now upload the file
        var xhr = new Array();
        var uploadAction = '';
        xhr[rand] = new XMLHttpRequest();
        var overwrite = 0;
        if (scope.previewMedia.overwriteTranslations) {
          overwrite = 1;
        }
        // console.log(encodeURIComponent(mimeType), mediaLibraryId, categoryId,encodeURIComponent(file.name), mediaRegionsArray, mediaLanguagesArray, scope.previewMedia.overwriteTranslations);
        xhr[rand].open("post", "/media/Admin/upload?mimeType=" + encodeURIComponent(mimeType)+
          "&mediaLibraryId=" + mediaLibraryId +
          "&categoryId=" + categoryId +
          "&originalFilename="+encodeURIComponent(file.name) +
          "&regions="+mediaRegionsArray +
          "&languages="+mediaLanguagesArray +
          '&overwriteExisting='+overwrite
          , true);

        xhr[rand].upload.addEventListener("progress", function (event) {
          if (event.lengthComputable) {
            // console.log('can compute');
          } else {
            toastr.error("Failed to compute file upload length.");
          }
        }, false);

        xhr[rand].onreadystatechange = function (oEvent) {
          if (xhr[rand].readyState === 4) {
            if (xhr[rand].status === 200) {
              var response = readBody(xhr[rand]);
              // console.log(response);
              if (response.indexOf('!!!!!') > -1) {
                var arr = response.split('!!!!!')[1];
                if (arr.indexOf('Array') > -1) {
                  arr = arr.split('Array')[0];
                }
                var json = jQuery.parseJSON(arr);
                if (json.success) {
                  toastr.success("Your media was successfully uploaded. It may take some time for the media to be updated.");
                } else {
                  toastr.error("Error: Unsupported file type: " + json.mimeType + ". Please try a different file type.");
                }
                
                if (mediaLibraryId) {
                  scope.getDefaultPlayerPopModal();
                }
              } else {
                toastr.error("Error: Unexpected error while uploading file. Please try again later.");
              }
            } else {
              toastr.error("Error: Unexpected error while uploading file. Please try again later.");
            }
          }
        };

        // Set headers
        xhr[rand].setRequestHeader("Content-Type", "multipart/form-data");
        xhr[rand].setRequestHeader("X-File-Name", file.fileName);
        xhr[rand].setRequestHeader("X-File-Size", file.fileSize);
        xhr[rand].setRequestHeader("X-File-Type", file.type);

        // Send the file
        xhr[rand].send(file);
      };

      /**
       * Allows translation uploads from the media player
       * @param mediaLibraryId
       */
      scope.uploadExternalTranslation =  function() {
        var mediaRegionsArray = scope.checkForRegions(scope.previewMedia.regions);
        var mediaLanguagesArray = scope.checkForLanguages(scope.previewMedia.languages);
        // console.log(scope.previewMedia.mediaLibraryId,scope.previewMedia.mediaType,scope.selectedCategory.id,scope.previewMedia.mediaCodeOrUrl,mediaRegionsArray,mediaLanguagesArray,scope.previewMedia.overwriteTranslations ? 1 : 0);

        if (!scope.previewMedia.mediaCodeOrUrl) {
          toastr.error('Please enter a code or url to proceed.');
          return;
        }

        var uploadData = {
          mediaLibraryId: scope.previewMedia.mediaLibraryId,
          mimeType: scope.previewMedia.mediaType.value,
          categoryId: scope.selectedCategory.id,
          codeOrUrl: scope.previewMedia.mediaCodeOrUrl,
          regions: mediaRegionsArray,
          languages: mediaLanguagesArray,
          overwriteExisting: scope.previewMedia.overwriteTranslations ? 1 : 0
        };
        postInfoSvc.post('/media/Admin/addExternal', uploadData).then(function(response) {
          // console.log(response);
          if (typeof response.success === 'undefined') {
            toastr.error('Something went wrong adding an external translation: ' + response);
          } else {
            if (response.success) {
              // console.log('success!');
              toastr.success('Your media was successfully uploaded.');
              scope.getDefaultPlayerPopModal();
              scope.previewMedia.mediaCodeOrUrl = '';
            } else {
              if (response.existingTranslations && response.existingTranslations.length > 0) {
                // console.log('preexisitng matches');    
              } else {
                toastr.error('An Error Occurred while uploading external media: ' + response.message);
              }
            }
          }
        })
      };



    }
  }
});

app.directive('loopWatcher', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attr) {
      scope.$watch('$last', function(newVal, oldVal) {
        // console.log(newVal, scope.$index);
        newVal && scope.$emit('$repeatFinished', scope.$index);
      })
    }
  }
});


app.directive('vimeoPostManagement', function ($timeout, postManagementVideoSvc) {
  return {
    restrict: 'EA',
    scope: {
        videoId: '=',
        vimeoPlayer: '='
    },
    template: '<div id="postManagementVimeoVideo"></div>',
    link: function (scope, element, attrs, ctrl) {
      var tag = document.createElement('script');
      tag.src = "https://player.vimeo.com/api/player.js";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      Vimeo = undefined;
      scope.vimeoPlayer;
      function checkForVimeo() {
        if (Vimeo === undefined) {
          $timeout(function() {
            checkForVimeo();
          }, 1000)
        } else {
          var options = {
              id: '12259794'
          };
          scope.vimeoPlayer = new Vimeo.Player('postManagementVimeoVideo', options);
          scope.vimeoPlayer.ready().then(function() {
            postManagementVideoSvc.vimeoVideoReady = true;
          });
        }
      }
      checkForVimeo();
      
      scope.$watch('videoId', function(newValue, oldValue) {
        // console.log(newValue);
        if (newValue === oldValue) {
          return;
        }
        function testForRediness() {
          if (postManagementVideoSvc.vimeoVideoReady) {
            scope.vimeoPlayer.loadVideo(Number(newValue))
              .then(function(id) {
                // console.log('video successfully loaded: ', id);
              })
              .catch(function(error) {
                // console.log(error);
                switch (error.name) {
                  case 'TypeError':
                    // the id was not a number
                    console.log('the id was not a number', error);
                    break;
                  case 'PasswordError':
                    // the video is password-protected and the viewer needs to enter the
                    // password first
                    console.log('the video is password-protected and the viewer needs to enter the password first', error);
                    break;
                  case 'PrivacyError':
                    // the video is password-protected or private
                    console.log('the video is password-protected or private', error);
                    break;
                  default:
                    // some other error occurred
                    console.log('some other error occurred', error);
                    break;
                }
              });
          } else {
            $timeout(function() {
              testForRediness();
            }, 1000)
          }
        }
        testForRediness();
      })

    }
  };
});

app.directive('youtubePostManagement', function($window, $timeout, postManagementVideoSvc) {
  return {
    restrict: "E",
    scope: {
      videoId: '=',
      youtubePlayer: '='
    },
    template: '<div><iframe id="postManagementYoutubePlayer"></iframe></div>',
    link: function(scope, element, attrs) {
      
      scope.youtubePlayer;

      scope.$on('$youtubeApiReady', function(event, data) {
        scope.youtubePlayer = new YT.Player(element.children()[0], {
          playerVars: {
            autoplay: 0,
            color: "white",
            controls: 0,
            html5: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            theme: "light"
          },
          events: {
            onReady: function() {
              postManagementVideoSvc.youtubeVideoReady = true;
            }
          }
        });
      });

      scope.$watch('videoId', function(newValue, oldValue) {
        // console.log(newValue);
        if (newValue === oldValue) {
          return;
        }
        if (typeof newValue === 'object' || (typeof newValue === 'string' && newValue.indexOf('http') > -1)) {
          return;
        }
        function testForRediness() {
          if (postManagementVideoSvc.youtubeVideoReady) {
            scope.youtubePlayer.cueVideoById(newValue);
          } else {
            $timeout(function() {
              testForRediness();
            }, 1000)
          }
        }
        testForRediness();
      });
    }  
  };
});



/**************** Services ****************/
app.service('postInfoSvc', function($http, $q) {
  var self = this;

  this.postSave = {};

  this.savePost = function(post) {
    var dfd = $q.defer();
    self.postSave = post;
    setTimeout(function() {
      return dfd.resolve(self.postSave);
    }, 1500)
    return dfd.promise;
  }

  this.post = function(endpoint, object) {
    return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        'url': endpoint,
        method: "POST",
        transformRequest: function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        transformResponse: function(data, headers) {
          console.log(data);
          var headerInfo = headers();
          if (headerInfo['content-type'].indexOf('text/html') > -1)
          {
            return data;
          } else if (headerInfo['content-type'].indexOf('application/json') > -1) {
            return JSON.parse(data);
          }
        },
        data: object
    }).then(function (data, status, headers, config) {
        if (typeof data.data === 'string') {
            console.log('error in then', data);
            return data;
        }
        // console.log('success: ', data);
        return data.data;
    }).catch(function (data, status, headers, config) {
        console.log('error', data, status, headers, config);
        return data;
    });
  }
});

app.service("postManagementVideoSvc", function($http) {
  
  var endpoint = 'https://www.vimeo.com/api/player.js';

  this.youtubeVideoReady = false;
  this.vimeoVideoReady = false;

});