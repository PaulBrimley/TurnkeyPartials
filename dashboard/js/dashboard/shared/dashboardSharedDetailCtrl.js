angular.module('homer').controller('dashboardSharedDetailCtrl', function($scope, $state, dashboardSharedSvc) {

	$scope.platformStrategies = dashboardSharedSvc.platformStrategies;
	$scope.state = $state;
	$('#sharedMainViewTab').addClass('active');
	$('#sharedMainViewTab').siblings().removeClass('active');
	$scope.platform = {};
	$scope.platformClasses = {
		PlatformPosts: '',
		PlatformPostContainer: '',
		PlatformPost: '',
		PlatformPostHeader: '',
		PlatformPostInside: '',
		PlatformPostUserImg: '',
		PlatformPostUserNameContainer: '',
		PlatformPostUserName: '',
		PlatformPostText: '',
		PlatformPostLink: '',
		PlatformPostLinkImg: '',
		PlatformPostLinkText: '',
		PlatformPostAnalytics: '',
		PlatformThermostatGauge: '',
		PlatformPostHolder: '',
		PlatformPostInside: ''
	}
	function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
	}

	setTimeout(function() {
		$scope.platformStrategies.map(function(platformStrategy, index) {
			if (platformStrategy.strategy === $scope.state.current.name) {
				$scope.platform = $scope.platformStrategies[index];
				$scope.platform.posts = dashboardSharedSvc[$scope.state.current.name + 'Posts'];
				for (var prop in $scope.platformClasses) {
					$scope.platformClasses[prop] = platformStrategy.strategy + prop;
				}
			}
		})
		$scope.$apply();
		if ($scope.platform.posts) {
			$scope.platform.posts.map(function(post, index) {
				$scope.platform.stats.map(function(stat, statIndex) {
					$('#postAnalytics' + stat.split('-').join('') + index).css({position: 'absolute', bottom: '100%'});
					post['newGauge' + statIndex] = new JustGage({
					  id: 'postGauge' + stat + index,
					  value: getRandom(-100, 100),
					  min: -100,
					  max: 100,
					  title: stat,
					  symbol: '%',
					  pointer: true,
					  pointerOptions: {
					    toplength: 5,
					    bottomlength: 10,
					    bottomwidth: 2,
					    color: '#000'
					  },
					  gaugeWidthScale: 0.6,
					  customSectors: [{
					    color: '#00ff00',
					    lo: 33,
					    hi: 100
					  }, {
					    color: '#ffff00',
					    lo: -33,
					    hi: 33
					  }, {
					    color: '#ff0000',
					    lo: -100,
					    hi: -33
					  }],
			      relativeGaugeSize: true,
			      startAnimationTime: 2000,
		        startAnimationType: ">",
		        refreshAnimationTime: 1000,
		        refreshAnimationType: "bounce"
					});
				})
			})
		}
	}, 100);
	$scope.timeOptions = 'week';
	
	$scope.prevStatToView = '';
	$scope.prevPostToView = '';
	$scope.showAnalyticDetails = function(event, postIndex, statIndex, stat) {
		setTimeout(function() {
			$($scope.prevStatToView).animate({bottom: '100%'}, 1000);
			$('#postAnalytics' + stat.split('-').join('') + postIndex).animate({bottom: '0'}, 1000);
			
			if ($scope.prevPostToView !== '#postAnalyticsContainer' + postIndex) {
				$($scope.prevPostToView).animate({height: '0'}, 1000);
				$('#postAnalyticsContainer' + postIndex).animate({height: $('#postAnalytics' + stat.split('-').join('') + postIndex).outerHeight() + 'px'}, 1000);
			}

			$scope.prevStatToView = '#postAnalytics' + stat.split('-').join('') + postIndex;
			$scope.prevPostToView = '#postAnalyticsContainer' + postIndex;
		},10)
		
	}
	

})