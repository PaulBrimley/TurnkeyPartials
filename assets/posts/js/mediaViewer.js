var app = angular.module('mediaViewerApp', []);

app.directive('mediaLibraryMediaViewer', function($sce, mediaViewerSvc) {
  return {
    restrict: 'E',
    scope: {
      browser: '=',
      currentMedia: '=',
      mediaLibraryContent: '=',
      previewMedia: '=',
      selectedCategory: '='
    },
    templateUrl: '/zf2/assets/posts/html/mediaViewerTmpl.html',
    link: function(scope, element, attrs) {

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
      scope.previewMedia = {
        overwriteTranslations: false,
        showVariant: false
      };
      scope.variantUploadedImages = [];
      scope.videoPlayer;
      scope.windowScroll = {
        value: undefined,
        set: false
      };

      videojs('newVideoPlayer', {fluid: true}).ready(function() {
        scope.videoPlayer = this;
      });

      setTimeout(function() {
        $('.addRegionLanguageTooltip').tooltip({
          title: 'Add region and language variations.',
          placement: 'left'
        });
        $('.addVariantImageTooltip').tooltip({
          title: 'Drag and drop an image or multiple images into this box to add it as a region/language variation image for this media item.',
          placement: 'top'
        });
        $('#mediaLibraryImagePreviewModal').on('hidden.bs.modal', function() {
          $(window).scrollTop(scope.windowScroll.value);
          scope.windowScroll.set = false;
          scope.previewMedia.showVariant = false;
          scope.variantUploadedImages = [];
          scope.previewMedia.overwriteTranslations = false;
          scope.youtubePlayer.pauseVideo();
          scope.vimeoPlayer.pause();
        })
      });

      FileReaderJS.setupDrop(document.getElementById('media-library-variant-file-dropbox'), variantFileOprand, scope);
      FileReaderJS.setupDrop(document.getElementById('post-management-variant-file-dropbox'), variantFileOprand, scope);

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
      }

      scope.getDefaultPlayerPopModal = function () {
        mediaViewerSvc.post('/media/Admin/getMediaTranslationUrls', {mediaLibraryId: scope.previewMedia.mediaLibraryId}).then(function(translationResponse) {
          console.log(translationResponse);
          scope.previewMedia.translations = [];
          for (var prop in translationResponse.translations) {
            if (translationResponse.translations[prop].mimeType === 'url/external') {
              translationResponse.translations[prop].fileExtension = scope.parseFileExtension(translationResponse.translations[prop].fileLocation);
            } else {
              translationResponse.translations[prop].parsedMimeType = translationResponse.translations[prop].mimeType;
            }
            scope.previewMedia.translations.push(translationResponse.translations[prop]);
            scope.previewMedia.regions.map(function(region) {
              if (region.value === translationResponse.translations[prop].region) {
                region.selected = true;
              }
            });
            scope.previewMedia.languages.map(function(language) {
              if (language.iso === translationResponse.translations[prop].language) {
                language.selected = true;
              }
            });
          }
          
          if (scope.previewMedia.translations[0].mimeType === 'url/external') {
            var fileExtension = scope.parseFileExtension(scope.previewMedia.translations[0].fileLocation).toLowerCase();
            console.log(fileExtension);
            if ((fileExtension === 'mov' || fileExtension === 'm4v'  || fileExtension === 'mpg' || fileExtension === 'mpeg') && (scope.browser === 'Chrome' || scope.browser === 'Firefox')) {
              toastr.error('This media is not supported in this browser.');
              return;
            }
            scope.previewMedia.currentMimeType = extensionMimeTypes[fileExtension];
          } else {
            scope.previewMedia.currentMimeType = scope.previewMedia.translations[0].mimeType;
          }
          console.log(scope.previewMedia.currentMimeType, scope.browser);
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
                  console.log(data);
                  scope.previewMedia.currentMedia = data;
                }
            });
          } else if (scope.previewMedia.currentMimeType === 'video/mpeg-4') {
            scope.videoPlayer.src({type: scope.previewMedia.currentMimeType, src: scope.previewMedia.translations[0].fileLocation});
          } else {
            scope.previewMedia.currentMedia = $sce.trustAsResourceUrl(scope.previewMedia.translations[0].fileLocation);
          }
        })
      };

      /**
       * Get file or url extension
       * @param url
       * @returns {string|*}
       */
      scope.parseFileExtension = function(url) {
        return url.substr( (url.lastIndexOf('.') +1) );
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

      scope.setCurrentMedia = function() {
        scope.currentMedia = angular.copy(scope.previewMedia);
        if (scope.currentMedia.thumbnail) {
          scope.currentMedia.currentMediaImg = scope.currentMedia.thumbnail;
        } else {
          scope.currentMedia.currentMediaImg = scope.currentMedia.fileLocation;
        }
      }

      scope.setNewMedia = function(translation) {
        // console.log(translation);
        if (translation.mimeType === 'url/external') {
          var fileExtension = scope.parseFileExtension(translation.fileLocation).toLowerCase();
          console.log(fileExtension);
          if ((fileExtension === 'mov' || fileExtension === 'm4v'  || fileExtension === 'mpg' || fileExtension === 'mpeg') && (scope.browser === 'Chrome' || scope.browser === 'Firefox')) {
            toastr.error('This media is not supported in this browser.');
            return;
          }
          scope.previewMedia.currentMimeType = extensionMimeTypes[fileExtension];
        } else {
          scope.previewMedia.currentMimeType = translation.mimeType;
        }
        console.log(scope.previewMedia.currentMimeType, scope.browser);
        if (scope.previewMedia.currentMimeType === 'application/pdf') {
          scope.previewMedia.currentMedia = $sce.trustAsResourceUrl('https://docs.google.com/gview?url=' + translation.fileLocation + '&embedded=true');
        } else if (scope.previewMedia.currentMimeType === 'video/quicktime') {
          scope.videoPlayer.src({type: scope.previewMedia.currentMimeType, src: translation.fileLocation});
        } else if (scope.previewMedia.currentMimeType === 'video/mp4' || scope.previewMedia.currentMimeType === 'video/mpeg' || scope.previewMedia.currentMimeType === 'video/mpg') {
          // scope.previewMedia.currentMedia = translation.fileLocation;
          scope.videoPlayer.src({type: scope.previewMedia.currentMimeType, src: translation.fileLocation});
        } else if (scope.previewMedia.currentMimeType === 'text/plain') {
          $.ajax({
              async:false,
              url: translation.fileLocation,
              dataType: 'text',
              success: function(data) 
              {
                console.log(data);
                scope.previewMedia.currentMedia = data;
              }
          });
        } else if (scope.previewMedia.currentMimeType === 'video/mpeg-4') {
          console.log('here with mpeg-4');
          scope.videoPlayer.src({type: scope.previewMedia.currentMimeType, src: translation.fileLocation});
        } else {
          scope.previewMedia.currentMedia = $sce.trustAsResourceUrl(translation.fileLocation);
        }
        console.log(scope.previewMedia.currentMedia);
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
        var mediaRegionsArray = scope.checkForRegions(regions);
        var mediaLanguagesArray = scope.checkForLanguages(languages);
        // now upload the file
        var xhr = new Array();
        var uploadAction = '';
        xhr[rand] = new XMLHttpRequest();

        console.log(encodeURIComponent(mimeType), mediaLibraryId, categoryId,encodeURIComponent(file.name), mediaRegionsArray, mediaLanguagesArray, scope.previewMedia.overwriteTranslations);

        xhr[rand].open("post", "/media/Admin/upload?mimeType=" + encodeURIComponent(mimeType)+
          "&mediaLibraryId=" + mediaLibraryId +
          "&categoryId=" + categoryId +
          "&originalFilename="+encodeURIComponent(file.name) +
          "&regions="+mediaRegionsArray +
          "&languages="+mediaLanguagesArray +
          '&overwriteExisting='+scope.previewMedia.overwriteTranslations
          , true);

        xhr[rand].upload.addEventListener("progress", function (event) {
          if (event.lengthComputable) {
            console.log('can compute');
          } else {
            toastr.error("Failed to compute file upload length.");
          }
        }, false);

        xhr[rand].onreadystatechange = function (oEvent) {
          if (xhr[rand].readyState === 4) {
            if (xhr[rand].status === 200) {
              var response = readBody(xhr[rand]);
              console.log(response);
              if (response.indexOf('!!!!!') > -1) {
                var arr = response.split('!!!!!')[1];
                if (arr.indexOf('Array') > -1) {
                  arr = arr.split('Array')[0];
                }
                var json = jQuery.parseJSON(arr);
                toastr.success("Your media was successfully uploaded.");
                scope.getDefaultPlayerPopModal();
              } else {
                toastr.error("Error: Unexpected error while uploading file. Please try again later.");
              }
            } else {
              toastr.error("Error : Unexpected error while uploading file. Please try again later.");
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
        mediaViewerSvc.post('/media/Admin/addExternal', uploadData).then(function(response) {
          console.log(response);
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
                console.log('preexisitng matches');    
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

app.directive('vimeoMediaLibrary', function ($timeout, mediaLibraryVideoSvc) {
  return {
    restrict: 'EA',
    scope: {
        videoId: '=',
        vimeoPlayer: '='
    },
    template: '<div id="vimeoVideo"></div>',
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
          scope.vimeoPlayer = new Vimeo.Player('vimeoVideo', options);
          scope.vimeoPlayer.ready().then(function() {
            mediaLibraryVideoSvc.vimeoVideoReady = true;
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
          if (mediaLibraryVideoSvc.vimeoVideoReady) {
            scope.vimeoPlayer.loadVideo(Number(newValue))
              .then(function(id) {
                // console.log('video successfully loaded: ', id);
              })
              .catch(function(error) {
                console.log(error);
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

app.directive('youtubeMediaLibrary', function($window, $timeout, mediaLibraryVideoSvc) {
  return {
    restrict: "E",
    scope: {
      videoId: '=',
      youtubePlayer: '='
    },
    template: '<div><iframe id="player"></iframe></div>',
    link: function(scope, element, attrs) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      scope.youtubePlayer;

      $window.onYouTubeIframeAPIReady = function() {
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
              mediaLibraryVideoSvc.youtubeVideoReady = true;
            }
          }
        });
        
      }

      scope.$watch('videoId', function(newValue, oldValue) {
        // console.log(newValue);
        if (newValue === oldValue) {
          return;
        }
        if (typeof newValue === 'object' || (typeof newValue === 'string' && newValue.indexOf('http') > -1)) {
          return;
        }
        function testForRediness() {
          if (mediaLibraryVideoSvc.youtubeVideoReady) {
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

app.service('mediaViewerSvc', function($http, $q) {
  var self = this;

  this.post = {};

  this.savePost = function(post) {
    var dfd = $q.defer();
    self.post = post;
    setTimeout(function() {
      return dfd.resolve(self.post);
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
})

app.service("mediaLibraryVideoSvc", function($http) {
  
  var endpoint = 'https://www.vimeo.com/api/player.js';

  this.youtubeVideoReady = false;
  this.vimeoVideoReady = false;

});