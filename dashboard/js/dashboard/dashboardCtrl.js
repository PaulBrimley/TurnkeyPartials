

angular.module('homer').controller('dashboardCtrl', function($scope, $compile, $state) {

	$scope.state = $state;
	setTimeout(function() {
		var split = $scope.state.current.name.split('.');
		for (var i = 0; i < split.length; i++) {
			if (!split[i]) {
				split.splice(i, 1);
			}
		}
		$scope.state.current.name = split[0];
		$('#' + $scope.state.current.name + 'Tab').addClass('active');
	}, 200);

  $scope.setAsActive = function(event) {
  	$(event.currentTarget).addClass('active');
  	$(event.currentTarget).siblings().removeClass('active');
  }

  setTimeout(function() {
  	if ($('.navigationTabs').width() > 100) {
  		$('.hpanelTabInner').css({'font-size': '15.6px'});
  	} else if ($('.navigationTabs').width() <= 100 && $('.navigationTabs').width() > 90) {
  		$('.hpanelTabInner').css({'font-size': '13px'});
  	} else if ($('.navigationTabs').width() <= 90 && $('.navigationTabs').width() > 80) {
  		$('.hpanelTabInner').css({'font-size': '12px'});
  	} else if ($('.navigationTabs').width() <= 80 && $('.navigationTabs').width() > 70) {
  		$('.hpanelTabInner').css({'font-size': '11px'});
  	} else if ($('.navigationTabs').width() <= 70 && $('.navigationTabs').width() > 60) {
  		$('.hpanelTabInner').css({'font-size': '10px'});
  	} else {
  		$('.hpanelTabInner').css({'font-size': '9px'});
  	}
  })

  $(window).resize(function() {
  	if ($('.navigationTabs').width() > 100) {
  		$('.hpanelTabInner').css({'font-size': '15.6px'});
  	} else if ($('.navigationTabs').width() <= 100 && $('.navigationTabs').width() > 90) {
  		$('.hpanelTabInner').css({'font-size': '13px'});
  	} else if ($('.navigationTabs').width() <= 90 && $('.navigationTabs').width() > 80) {
  		$('.hpanelTabInner').css({'font-size': '12px'});
  	} else if ($('.navigationTabs').width() <= 80 && $('.navigationTabs').width() > 70) {
  		$('.hpanelTabInner').css({'font-size': '11px'});
  	} else if ($('.navigationTabs').width() <= 70 && $('.navigationTabs').width() > 60) {
  		$('.hpanelTabInner').css({'font-size': '10px'});
  	} else {
  		$('.hpanelTabInner').css({'font-size': '9px'});
  	}
  })

})