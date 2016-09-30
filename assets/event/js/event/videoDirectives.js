var app = angular.module('eventPlanner');

app.directive('youtubeEvent', function($window, $timeout, videoService) {
  return {
    restrict: "E",

    scope: {
    	companyView: '=',
      videoId: "@",
      player: "="
    },

    template: '<div><iframe id="player"></iframe></div>',

    link: function(scope, element, attrs) {
    	
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      scope.player;

      $window.onYouTubeIframeAPIReady = function() {
      	function checkForCompanyView() {
      		$timeout(function() {
      			if (!scope.companyView) {
      				checkForCompanyView();
      			} else {
      				if (scope.companyView === 'default') {
      					scope.player = new YT.Player(element.children()[0], {
      					  playerVars: {
      					    autoplay: 0,
      					    color: "white",
      					    controls: 1,
      					    html5: 1,
      					    iv_load_policy: 3,
      					    modestbranding: 1,
                    rel: 0,
      					    showinfo: 0,
      					    theme: "light"
      					  },
      					  events: {
      					  	onReady: function() {
      					  		videoService.videoReady = true;
      					  	}
      					  },
      					  videoId: scope.videoId,
      					});
      				} else if (scope.companyView === 'dropZone') {
      					scope.player = new YT.Player(element.children()[0], {
      					  playerVars: {
      					    autoplay: 1,
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
      					  		videoService.videoReady = true;
      					  	}
      					  },
      					  videoId: scope.videoId, 
      					});
      				}
      			}
      		}, 200)
      		
      	}
      	checkForCompanyView();
      }

      scope.$watch('companyView', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }
        if (newValue === 'dropZone') {
          element.css('pointer-events', 'none');
        }
      });
    }  
  };
});


