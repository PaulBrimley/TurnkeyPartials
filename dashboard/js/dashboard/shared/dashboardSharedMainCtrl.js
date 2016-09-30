angular.module('homer').controller('dashboardSharedMainCtrl', function($scope, $state, dashboardSharedSvc) {

	$scope.platformStrategies = dashboardSharedSvc.platformStrategies;
	$scope.timeOptions = 'week';
	var facebookGauge, twitterGauge, linkedInGauge, pinterestGauge;
	$('#sharedMainViewTab').addClass('active');
	$('#sharedMainViewTab').siblings().removeClass('active');
	function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
	}

	setTimeout(function() {
		$scope.platformStrategies.map(function(strategy) {
			strategy.stats.map(function(stat) {
				var newGauge = new JustGage({
				  id: strategy.strategy + stat,
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
	}, 300)

	$scope.transitionTo = function(platform) {
		$state.go(platform);
	}
})