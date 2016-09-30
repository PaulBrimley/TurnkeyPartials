angular.module('eventPlanner').controller('myEventSelectCtrl', function($scope, $sce, $timeout, eventSvc) {

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
	var eventLinkClipboardBtn = new Clipboard('.clipboardBtn');
	eventLinkClipboardBtn.on('success', function(event) {
		console.log('success: ', event);
		$('.copyTextButtonToolTip').tooltip('hide');
		$('.copyTextSuccess').tooltip('show');
		setTimeout(function() {
			$('.copyTextSuccess').tooltip('hide');
		}, 2000);
		event.clearSelection();
	})


	function resizeAndPosition() {

			setTimeout(function() {
				$('.blankHostImage').height($('.blankHostImage').width());
				$('.copyTextToolTip').tooltip({
         	title: 'Press the copy button to the right of the text or select the text and type "ctrl + c" for pc or "command + c" for osx.',
         	placement: 'top'
       	});
       	$('.copyTextButtonToolTip').tooltip({
       		title: 'Copy',
       		placement: 'top'
       	})
       	$('.copyTextSuccess').tooltip({
       		title: 'Copied!',
       		placement: 'bottom',
       		trigger: 'manual'
       	})
			})

	    waitForFinalEvent(function(){
	        if( isBreakpoint('xs') ) {
	            setTimeout(function() {
	                $('.rightAlignHolder').removeClass('textAlignRight');
	                $('.rightAlignHolder').addClass('marginBottomFive');
	                for (var i = 0; i < $scope.events.length; i++) {
                    $('#event' + i).css({clear: 'none'});
                    $('#blank').css({clear: 'none'});
                    if (i % 2 === 0) {
                        $('#event' + i).css({clear: 'both'});
                    } else {
                        $('#blank').css({clear: 'both'});
                    }
	                }
	            }, 100)
	        }

	        if( isBreakpoint('sm') ) {
	            setTimeout(function() {
	                $('.rightAlignHolder').addClass('textAlignRight');
	                $('.rightAlignHolder').removeClass('marginBottomFive');
	                $('.eventSelectButton').addClass('btn-block');
	                for (var i = 0; i < $scope.events.length; i++) {
                    $('#event' + i).css({clear: 'none'});
                    $('#blank').css({clear: 'none'});
                    if (i % 2 === 0) {
                        $('#event' + i).css({clear: 'both'});
                    } else {
                        $('#blank').css({clear: 'both'});
                    }
	                }
	            }, 100)
	        }

	        if( isBreakpoint('md') ) {
	            setTimeout(function() {
	                $('.rightAlignHolder').addClass('textAlignRight');
	                $('.rightAlignHolder').removeClass('marginBottomFive');
	                $('.eventSelectButton').removeClass('btn-block');
	                for (var i = 0; i < $scope.events.length; i++) {
	                  $('#event' + i).css({clear: 'none'});
                    $('#blank').css({clear: 'none'});
                    if (i % 2 === 0) {
                        $('#event' + i).css({clear: 'both'});
                    } else {
                        $('#blank').css({clear: 'both'});
                    }
	                }
	            }, 100)
	        }

	        if( isBreakpoint('lg') ) {
	            setTimeout(function() {
	                $('.rightAlignHolder').addClass('textAlignRight');
	                $('.rightAlignHolder').removeClass('marginBottomFive');
	                $('.eventSelectButton').removeClass('btn-block');
	                for (var i = 0; i < $scope.events.length; i++) {
	                  $('#event' + i).css({clear: 'none'});
                    $('#blank').css({clear: 'none'});
                    if (i % 2 === 0) {
                        $('#event' + i).css({clear: 'both'});
                    } else {
                        $('#blank').css({clear: 'both'});
                    }
	                }
	            }, 100)
	        }
	    }, 0, fullDateString.getTime());
	}

	$scope.events;
	$scope.emptySlots = [];
	$scope.eventToShowInModal = {};
	$scope.instructionVideo = $sce.trustAsResourceUrl('https://www.youtube.com/embed/O7zewtuUM_0');

	eventSvc.get('/event/Event/getEvents').then(function(response) {
		console.log(response);
		$scope.events = angular.copy(response);
		if ($scope.events) {
			$scope.events.map(function(event) {
				event.name = event.liveEvent.name;
				event.description = event.liveEvent.description;
				event.topic = event.description;
				event.host = event.liveEvent.host;
				event.start = new Date(event.liveEvent.eventDate);
			})
			var eventHolder = _.sortBy($scope.events, '-start');
			$scope.events = eventHolder;
			setTimeout(function() {
			    $('.eventHostsHolder').slick({
			        dots: true,
			        arrows: false
			    });
			})
			resizeAndPosition();
		} else {
			setTimeout(function() {
			    $('.eventHostsHolder').slick({
			        dots: true,
			        arrows: false
			    });
			})
			resizeAndPosition();
		}
	})

	$scope.createEvent = function() {
		window.location.href = '/event/LiveEvent/select';
	}

	$scope.editEvent = function(event, index) {
		window.location.href = '/event/Event/create/?eventId=' + event.event.id;
	}

	$scope.selectText = function(event) {
		event.target.select();
	}

	$scope.sendInvites = function(event, index) {
		$scope.eventToShowInModal = event;
		$('#myModal1').modal('show');
	}

	$(window).resize(function () {
	    resizeAndPosition();    
	});
	
})