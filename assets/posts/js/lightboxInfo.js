var app = angular.module('lightboxInfoApp', []);

/**************** Directives ****************/
app.directive('lightboxManagement', function($rootScope, $sce, $timeout, lightboxInfoSvc, ngProgressFactory) {
  return {
    templateUrl: '/zf2/assets/posts/html/lightboxManagementTmpl.html',
    restrict: 'E',
    scope: {
      currentMedia: '=',
      selectedCategory: '='
    },
    link: function(scope, elem, attrs) {

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

      FileReaderJS.setupDrop(document.getElementById('lightbox-management-variant-file-dropbox'), variantFileOprand, scope);

      setTimeout(function() {
        $('.addRegionLanguageTooltip').tooltip({
          title: 'Add region and language variations.',
          placement: 'left'
        });
        $('.lightboxImageTooltip').tooltip({
          title: 'Drag and drop an image into this box (or click in this box if you have already selected a media item from your media library) to add it to your post.',
          placement: 'top'
        });
        $('#lightboxManagementMediaPreviewModal').on('hidden.bs.modal', function() {
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

      scope.languageDisplays = [];
      scope.lightbox = {};
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
      scope.postRegions = [];
      scope.previewMedia = {
        overwriteTranslations: false,
        showVariant: false
      };
      scope.progressBar = ngProgressFactory.createInstance();
      scope.progressBar.setHeight(6);
      scope.progressBar.setColor('#5bc0de');
      scope.variantUploadedImages = [];
      scope.videoPlayer;
      scope.windowScroll = {
        value: undefined,
        set: false
      };

      videojs('lightboxManagementVideoPlayer', {fluid: true}).ready(function() {
        scope.videoPlayer = this;
      });
      lightboxInfoSvc.post('/media/Admin/getRegionsAndLanguages').then(function(response) {
        // console.log(response);
        for (var prop in response.data.languages) {
          scope.postLanguages.push(response.data.languages[prop][0])
          for (var languageProp in response.data.languages[prop][0]) {
            if (!scope.languageDisplays.includes(languageProp)) {
              scope.languageDisplays.push(languageProp);
            }
          }
        }
        scope.postLanguageDisplay = scope.languageDisplays[0];
        for (var prop in response.data.regions) {
          scope.postRegions.push({title: response.data.regions[prop], value: prop});
        }
      });

      scope.checkForLanguages = function(languages) {
        var truthy = false;
        var arrayHolder = [];
        languages.map(function(language) {
          if (language.selected) {
            truthy = true;
            arrayHolder.push(language.iso);
          }
        })
        if (!truthy) {
          toastr.warning('You must have at least one language selected.');
          languages.map(function(language, index) {
            if (language.iso === 'all_l') {
              language.selected = true;
            }
          })
        }
        return arrayHolder;
      }

      scope.checkForRegions = function(regions) {
        var truthy = false;
        var arrayHolder = [];
        regions.map(function(region, index) {
          if (region.selected) {
            truthy = true;
            arrayHolder.push(region.value);
          }
        })
        if (!truthy) {
          toastr.warning('You must have at least one region selected.');
          regions.map(function(region, index) {
            if (region.value === 'all_r') {
              region.selected = true;
            }
          })
        }
        return arrayHolder;
      }

      scope.confirmOverride = function() {
        if (scope.previewMedia.overwriteTranslations) {
          toastr.warning('You have opted to overwrite the matching translations for the regions and languages you have selected when you add media. Please make sure this is an acurate selection as this cannot be undone after you add the media.');
        } else {
          toastr.warning('You have opted NOT to overwrite the matching translations for the regions and languages you have selected when you add media.');
        }
      }

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

      scope.getDefaultPlayerPopModal = function () {
        lightboxInfoSvc.post('/media/Admin/getMediaTranslationUrls', {mediaLibraryId: scope.previewMedia.mediaLibraryId}).then(function(translationResponse) {
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

      scope.onPostLightboxImageDrop = function($event, $data, $index) {
        scope.lightbox.image = $data;
        scope.currentMedia = angular.copy($data);
        if (scope.currentMedia.thumbnail) {
          scope.currentMedia.currentMediaImg = scope.currentMedia.thumbnail;
        } else {
          scope.currentMedia.currentMediaImg = scope.currentMedia.fileLocation;
        }
      };

      /**
       * Get file or url extension
       * @param url
       * @returns {string|*}
       */
      scope.parseFileExtension = function(url) {
        return url.substr( (url.lastIndexOf('.') +1) );
      };

      scope.previewLightboxImage = function(progressBar, content, index) {
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
            $('#lightboxManagementLanguageMedia' + index).css({clear: 'none'});
            if (index % 2 === 0) {
              $('#lightboxManagementLanguageMedia' + index).css({clear: 'both'});
            }
          }, 100);
          if (language.iso === 'all_l') {
            language.selected = true;
          }
        });
        scope.previewMedia.regions.map(function(region, index) {
          $timeout(function() {
            $('#lightboxManagementRegionMedia' + index).css({clear: 'none'});
            if (index % 2 === 0) {
              $('#lightboxManagementRegionMedia' + index).css({clear: 'both'});
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
            $('#lightboxManagementMediaPreviewModal').modal('show');
          }
        };
        moveProgressBar();
      };

      scope.previewLightboxImageEndHover = function(content) {
        if (!content || content.url === '/zf2/assets/event/images/greyPicHolder.png') {
          return;
        }
        content.active = false;
        scope.progressBar.reset();
        content.loadingPercent = 0;
      };

      scope.setCurrentMediaAsPostLightboxImage = function() {
        scope.lightbox.image = angular.copy(scope.currentMedia);
      };

      var prevLightboxIndex = -1;
      scope.setLightboxScrolltop = function(index, event) {
        if (index === prevLightboxIndex) {
          if (index === -1 ) {
            $('html, body').animate({scrollTop: 85}, 200);
          } else {
            $('html, body').animate({scrollTop: ($('body').scrollTop() + Math.floor(event.target.getBoundingClientRect().top - 55))}, 200);
          }
          return;
        }
        $('#lightboxManagementCollapse' + prevLightboxIndex).collapse('hide');
        setTimeout(function() {
          $('#lightboxManagementCollapse' + index).collapse('show');
        }, 100)
        prevLightboxIndex = index;
        setTimeout(function() {
          if (index > -1) {
            $('html, body').animate({scrollTop: ($('body').scrollTop() + Math.floor(event.target.getBoundingClientRect().top - 55))}, 200);
          } else {
            $('html, body').animate({scrollTop: 85}, 200);
          }
        }, 400);
      };

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

      scope.showVariantEditOptions = function() {
        scope.previewMedia.showVariant = !scope.previewMedia.showVariant;
        if (scope.previewMedia.showVariant) {
          $timeout(function() {
            $('#lightboxManagementMediaPreviewModal').animate({
              scrollTop: $('#lightboxManagementMediaPreviewModalLine').offset().top - 5
            }, 200)
          }, 100)
        }
      }

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
        lightboxInfoSvc.post('/media/Admin/addExternal', uploadData).then(function(response) {
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
})

app.directive('vimeoLightboxManagement', function ($timeout, lightboxManagementVideoSvc) {
  return {
    restrict: 'EA',
    scope: {
        videoId: '=',
        vimeoPlayer: '='
    },
    template: '<div id="lightboxManagementVimeoVideo"></div>',
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
          scope.vimeoPlayer = new Vimeo.Player('lightboxManagementVimeoVideo', options);
          scope.vimeoPlayer.ready().then(function() {
            lightboxManagementVideoSvc.vimeoVideoReady = true;
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
          if (lightboxManagementVideoSvc.vimeoVideoReady) {
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

app.directive('youtubeLightboxManagement', function($window, $timeout, lightboxManagementVideoSvc) {
  return {
    restrict: "E",
    scope: {
      videoId: '=',
      youtubePlayer: '='
    },
    template: '<div><iframe id="lightboxManagementYoutubePlayer"></iframe></div>',
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
              lightboxManagementVideoSvc.youtubeVideoReady = true;
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
          if (lightboxManagementVideoSvc.youtubeVideoReady) {
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
app.service('lightboxInfoSvc', function($http) {
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

app.service("lightboxManagementVideoSvc", function($http) {
  
  var endpoint = 'https://www.vimeo.com/api/player.js';

  this.youtubeVideoReady = false;
  this.vimeoVideoReady = false;

});