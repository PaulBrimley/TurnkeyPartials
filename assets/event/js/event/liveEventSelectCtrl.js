angular.module('eventPlanner').controller('liveEventSelectCtrl', function($scope, $timeout, eventSvc) {

	/* Detect Bootstrap breakpoints */
	function isBreakpoint( alias ) {
	    return $('.device-' + alias).is(':visible');
	}

	var waitForFinalEvent = function() {
	    var b={};
	    return function(c,d,a) {
	        a || (a="I am a banana!");
	        b[a] && clearTimeout(b[a]);
	        b[a] = setTimeout(c,d);
	        }
	    }();
	var fullDateString = new Date();
	/***  ***/

	function resizeAndPosition() {
	    waitForFinalEvent(function(){
	        if( isBreakpoint('xs') ) {
	        		console.log('xs');
	            setTimeout(function() {
	                $('.rightAlignHolder').removeClass('textAlignRight');
	                $('.rightAlignHolder').addClass('marginBottomFive');
	                for (var i = 0; i < $scope.events.length; i++) {
	                    $('#event' + i).css({clear: 'none'});
	                    if (i % 2 === 0) {
	                        $('#event' + i).css({clear: 'both'});
	                    }
	                }
	            }, 100)
	        }

	        if( isBreakpoint('sm') ) {
	        	console.log('sm');
	            setTimeout(function() {
	                $('.rightAlignHolder').addClass('textAlignRight');
	                $('.rightAlignHolder').removeClass('marginBottomFive');
	                for (var i = 0; i < $scope.events.length; i++) {
	                    $('#event' + i).css({clear: 'none'});
	                    if (i % 2 === 0) {
	                        $('#event' + i).css({clear: 'both'});
	                    }
	                }
	            }, 100)
	        }

	        if( isBreakpoint('md') ) {
	        	console.log('md');
	            setTimeout(function() {
	                $('.rightAlignHolder').addClass('textAlignRight');
	                $('.rightAlignHolder').removeClass('marginBottomFive');
	                for (var i = 0; i < $scope.events.length; i++) {
	                    $('#event' + i).css({clear: 'none'});
	                    if (i % 2 === 0) {
	                        $('#event' + i).css({clear: 'both'});
	                    }
	                }
	            }, 100)
	        }

	        if( isBreakpoint('lg') ) {
	        	console.log('lg');
	            setTimeout(function() {
	                $('.rightAlignHolder').addClass('textAlignRight');
	                $('.rightAlignHolder').removeClass('marginBottomFive');
	                for (var i = 0; i < $scope.events.length; i++) {
	                    $('#event' + i).css({clear: 'none'});
	                    if (i % 2 === 0) {
	                        $('#event' + i).css({clear: 'both'});
	                    }
	                }
	            }, 100)
	        }
	    }, 0, fullDateString.getTime());
	}	

	$scope.events;

	eventSvc.get('/event/LiveEvent/getLiveEvents').then(function(response) {
		$scope.events = response.liveEvents;
		console.log($scope.events);
		if ($scope.events) {

			$scope.events.map(function(event, parentIndex) {
				event.start = new Date(event.eventDate);
			})
			var eventHolder = _.sortBy($scope.events, '-start');
			$scope.events = eventHolder;
			resizeAndPosition();
			setTimeout(function() {
				$('.eventHostsHolder').slick({
					dots: true,
					arrows: false
				});
			})
		}
	})

	$scope.createEvent = function(event, index) {
		eventSvc.post('/event/Event/save?eventId=' + event.id).then(function(response) {
			console.log(response);
			window.location.href = '/event/Event/create/?eventId=' + response.eventId;
		})
	};

	$(window).resize(function () {
    resizeAndPosition();    
  });
	
})