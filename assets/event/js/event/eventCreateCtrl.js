angular.module('eventPlanner').controller('eventCreateCtrl', function($scope, $timeout, $interval, $sce, $window, eventSvc) {
	toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "7000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

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

	var QueryString = function () {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	        // If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = decodeURIComponent(pair[1]);
	        // If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
	      query_string[pair[0]] = arr;
	        // If third or later entry with this name
	    } else {
	      query_string[pair[0]].push(decodeURIComponent(pair[1]));
	    }
	  } 
	  return query_string;
	}();
	var today = new Date();
	
	$scope.availableFbEvents = [];
	$scope.availableFbGroups = [];
	$scope.availableTimeZones = [];
	
	$scope.event = {};
	$scope.event.attendees = [];
	$scope.event.attendingStatus = {
		attending: 'Attending',
		notAttending: 'Not Attending'
	}
	$scope.event.loadingGroupsEvents = true;
	$scope.event.loadingEventAttendees = 'Loading event attendees';
	$scope.eventId = QueryString.eventId;
	$scope.eventToSave = {};
	$scope.eventToSave.eventId = $scope.eventId;
	$scope.indexHolder = 0;
	$scope.loading = true;
	$scope.modalContent = {
		instructionText: '',
		actionLink: '',
		actionLinkText: '',
		nextAction: '',
		nextButtonText: '',
		prevAction: '',
		prevButtonText: '',
		tempEventId: undefined,
		tempGroupId: undefined,
		validate: '',
		yt: {
			videoId: ''
		}
	};
	
	$scope.modalShow = false;
	$scope.platformArray = [];
	$scope.postTime = 'now';
	$scope.postToEdit = {};
	$scope.previousPosts = [];
	$scope.scheduledPostedPosts = [];
	$scope.selectedFbEvents = [];
	$scope.selectedFbGroups = [];
	$scope.templateToDisplay = 'loading';
	$scope.testView = true;
	$scope.fbUserId = fbUserId;

	// $scope.testData = $sce.trustAsHtml('Hello There World!');
  // $scope.testData = $sce.trustAsHtml('<div>Hello There World!</div>');

	if ($scope.eventId) {
		eventSvc.get('/event/Event/getEvent?eventId=' + $scope.eventId).then(function(response) {
			console.log(response);
			if ($scope.event) {
				$scope.event.name = response.liveEvent.name;
				$scope.event.host = response.liveEvent.host;
				$scope.event.posts = response.liveEvent.availablePosts;
				$scope.event.short_url = response.liveEvent.short_url;
				$scope.event.start = new Date(response.liveEvent.eventDate);
				$scope.event.groupEventData = response.liveEvent.groupData;
				response.liveEvent.scheduledPosts.map(function(post) {			
					$scope.scheduledPostedPosts.push({
						comment: post.message,
						date: post.scheduledTime.date,
						displayDate: post.scheduledTime.display,
						id: post.eventPostId,
						message: post.description,
						suggestedText: post.suggestedText,
						time: post.scheduledTime.time,
						title: post.title,
						url: post.media
					})
				})
				response.liveEvent.previousPosts.map(function(post) {					
					$scope.previousPosts.push({
						comment: post.message,
						date: post.scheduledTime.date,
						displayDate: post.scheduledTime.display,
						id: post.eventPostId,
						message: post.description,
						suggestedText: post.suggestedText,
						time: post.scheduledTime.time,
						timeZone: '(GMT-05:00) Eastern Time (US & Canada)',
						title: post.title,
						url: post.media
					})
				})
				for (var prop in $scope.event.groupEventData) {
					$scope.event.eventGroupId = prop;
					break;
				}
				$scope.resizeAndPosition();
				var hostHolder = $scope.event.host.map(function(host) {
					return host.name;
				})
				$scope.event.hosts = hostHolder.join(', ');
				$scope.event.facebookGroups = [];
				$scope.event.facebookEvents = [];
				eventSvc.get('/event/Event/platformCredentials').then(function(response) {
					$scope.platformArray = response;
					FB.init({appId: $scope.platformArray.Facebook.appId, status: true, cookie: true, version: 'v2.2'});
					$scope.getFbPermissionInitial('', false);
				})
				eventSvc.get('/common/Index/getTimezones').then(function(response) {
			    for (var prop in response) {
			      $scope.availableTimeZones.push({zone: prop, value: response[prop]})
			    }
			    var indexHolder = null;
			    $scope.availableTimeZones.map(function(zone, index) {
			    	if (zone.zone === 'America/New_York') {
							indexHolder = index;
			    	}
			    })
			    $scope.scheduledPostedPosts.map(function(post) {
			    	post.timeZone = $scope.availableTimeZones[indexHolder];
			    })
			    $scope.previousPosts.map(function(post) {
			    	post.timeZone = $scope.availableTimeZones[indexHolder];
			    })
			  })
			}
		})
	} else {
		window.location.href = '/event/LiveEvent/select';
	}

	$('#myModal9').on('hidden.bs.modal', function () {
    $scope.modalShow = false;
    $scope.$apply();
	})

	$('#myModal10').on('hidden.bs.modal', function () {
    $scope.modalShow = false;
    $scope.$apply();
	})

	$('#myModal11').on('hidden.bs.modal', function () {
    $scope.modalShow = false;
    $scope.$apply();
	})
  
	setTimeout(function() {
		$('#datepicker1').datepicker({container: '#datepickerHolder1'}).on('hide', function(event) {
	    if (event.target.value === "") {
				if (today.getMonth() + 1 < 10) {
					$scope.postToEdit.date += '0' + (today.getMonth() + 1) + '/';
				} else  {
					$scope.postToEdit.date += (today.getMonth() + 1) + '/';
				}
				if (today.getDate() < 10) {
					$scope.postToEdit.date += '0' + today.getDate() + '/' + today.getFullYear();
				} else {
					$scope.postToEdit.date += today.getDate() + '/' + today.getFullYear();
				}
				$scope.$apply();
			}
	  });
		$('#timepicker1').timepicker()
		  .on('hide.timepicker', function(event) {
		    $scope.postToEdit.time = event.time.value;
		    $scope.$apply();
		  });

	  $('#datepicker2').datepicker({container: '#datepickerHolder2'}).on('hide', function(event) {
	    if (event.target.value === "") {
				if (today.getMonth() + 1 < 10) {
					$scope.postToEdit.date += '0' + (today.getMonth() + 1) + '/';
				} else  {
					$scope.postToEdit.date += (today.getMonth() + 1) + '/';
				}
				if (today.getDate() < 10) {
					$scope.postToEdit.date += '0' + today.getDate() + '/' + today.getFullYear();
				} else {
					$scope.postToEdit.date += today.getDate() + '/' + today.getFullYear();
				}
				$scope.$apply();
			}
	  });
		$('#timepicker2').timepicker()
		  .on('hide.timepicker', function(event) {
		    $scope.postToEdit.time = event.time.value;
		    $scope.$apply();
		  });
	})

	$scope.cancel = function() {
		$('#myModal9').modal('hide');
		$scope.templateToDisplay = 'loading';
	}

	$scope.changePostTime = function(time) {
		if (time === 'now') {
			$scope.postTime = 'now';
		} else if (time === 'later') {
			$scope.postTime = 'later';
		} else if (time === 'optimize') {
			$scope.postTime = 'optimize';
		}
	}

	$scope.createFacebookEvent = function() {
		var returnData = {action : 'groupEventList', viewName: 'groupEventList'};
		returnData.data = JSON.stringify({eventId: $scope.eventId, buttonClicked: 'createFacebookEvent'});
		eventSvc.post('/event/Event/progress', returnData).then(function(response) {	
			if (!response) {
				$scope.cancel();
				return;
			}
			$scope.setModalContent(response);
		});
	}

	$scope.createFacebookGroup = function() {
		var returnData = {action : 'groupEventList', viewName: 'groupEventList'};
		returnData.data = JSON.stringify({eventId: $scope.eventId, buttonClicked: 'createFacebookGroup'});
		eventSvc.post('/event/Event/progress', returnData).then(function(response) {
			if (!response) {
				$scope.cancel();
				return;
			}
			$scope.setModalContent(response);
		});
	}

  $scope.editPost = function(post) {
  	console.log(post);
  	$scope.postToEdit = post;
		$scope.modalShow = true;
		$scope.postTime = 'later';
		$('#myModal11').modal('show');
  }

  $scope.getFbEventAttendees = function() {
  	$scope.event.attendees = [];
  	$scope.event.loadingEventAttendees = 'Loading event attendees';
  	if ($scope.event.facebookEvents.length > 0) {
	  	$scope.event.facebookEvents.map(function(event) {
				eventSvc.get('/event/Event/getFacebookEventAttendees?eventId=' + event.id).then(function(response) {
					response.data.map(function(attendee) {
						"https://graph.facebook.com/" + attendee.id + "/picture?type=large";
						$scope.event.attendees.push({
							id: attendee.id,
							url: "https://graph.facebook.com/" + attendee.id + "/picture?type=large",
							name: attendee.name,
							rsvp_status: attendee.rsvp_status,
						});
						$scope.event.attendees.push(attendee);
					})
					$scope.event.attendees = _.uniqBy($scope.event.attendees, 'id');
					$scope.event.attendees.map(function(attendee) {
						for (var prop in $scope.event.attendingStatus) {
							if (prop === attendee.rsvp_status) {
								attendee.rsvp_status = $scope.event.attendingStatus[prop];
							}
						}
					})
					$scope.event.loadingEventAttendees = 'No event attendees';
				})
	  	})
  	} else {
  		$scope.event.loadingEventAttendees = 'No event attendees';
  	}
  }

  $scope.getFbGroupsEvents = function() {
		$scope.modalShow = true;
		$('#myModal9').modal('show');

		var action = 'groupEventList';
		var returnData = {action : action, viewName: 'groupEventList'};
		returnData.data = JSON.stringify({
			eventId: $scope.eventId,
		});

		eventSvc.post('/event/Event/progress', returnData).then(function(response) {
			if (response.next === 'close') {
				$scope.cancel();
			}	
			$scope.availableFbEvents = response.facebookEventList.data;
			$scope.availableFbGroups = response.facebookGroupList.data;
			$scope.templateToDisplay = response.viewName;
		})
	}

	$scope.getFbGroupsEventsCompletion = function() {
		eventSvc.get('/event/Event/completion?eventGroupId=' + $scope.event.eventGroupId).then(function(response) {
			$scope.event.facebookGroups.map(function(group, index) {
				response.facebookGroups.map(function(responseGroup) {
					if (responseGroup.facebookGroupId === group.id) {
						group.progress = (Number(responseGroup.completed) / Number(responseGroup.completion)).toFixed(2) * 100;
						setTimeout(function() {
							if (group.progress === 0) {
								$('#groupProgressBar' + index).css({'display': 'none'});
							} else {
								$('#groupProgressBar' + index).css({'width': group.progress + '%'});
							}
						})
					}
				})
			})
			$scope.event.facebookEvents.map(function(event, index) {
				response.facebookEvents.map(function(responseEvent) {
					if (responseEvent.facebookGroupId === event.id) {
						event.progress = (Number(responseEvent.completed) / Number(responseEvent.completion)).toFixed(2) * 100;
						setTimeout(function() {
							if (event.progress === 0) {
								$('#eventProgressBar' + index).css({'display': 'none'});
							} else {
								$('#eventProgressBar' + index).css({'width': event.progress + '%'});
							}
						})						
					}
				})
			})
			$scope.event.loadingGroupsEvents = false;
		})
	}

	$scope.getFbPermission = function(postMethod, loadOptions) {
    var pa = new PlatformAuthentication($scope.platformArray.Facebook.platformApplicationId);
    pa.setFailureCallback(function() {
      alert('We need you to authorize the application to get information about your groups and events');
    });
    var requiredPermissions = $scope.platformArray.Facebook.requiredPermissions.split(',');
    pa.setScope(requiredPermissions);
    pa.setDeniedPermissionCallback(function(deniedPerms) {
      alert( 'We need your permission to post to Facebook');
    });
    pa.setSuccessCallback($scope.getFbGroupsEvents);
    pa.getPermission();
    return false;
  }

  $scope.getFbPermissionInitial = function(postMethod, loadOptions) {
    var pa = new PlatformAuthentication($scope.platformArray.Facebook.platformApplicationId);
    pa.setFailureCallback(function() {
      alert('We need you to authorize the application to get information about your groups and events');
    });
    var requiredPermissions = $scope.platformArray.Facebook.requiredPermissions.split(',');
    pa.setScope(requiredPermissions);
    pa.setDeniedPermissionCallback(function(deniedPerms) {
      alert( 'We need your permission to post to Facebook');
    });
    pa.setSuccessCallback($scope.populateFbGroupsEvents);
    pa.getPermission();
    return false;
  }

  $scope.getPreviousPosts = function() {
		console.log('getting previous');
		$scope.previousPosts = [];
		eventSvc.post('/event/Event/getPreviousPosts', {eventId: $scope.eventId}).then(function(response) {
			if (!response) {
				swal({
		      title: "Error.",
		      text: "There was a server error. Please try again later.",
		      type: "error",
		      confirmButtonColor: "#DD6B55",
		      confirmButtonText: "Ok",
		      closeOnConfirm: true,
		    });
				return;
    	}
			console.log(response);
			response.map(function(post) {					
				$scope.previousPosts.push({
					comment: post.message,
					date: post.scheduledTime.date,
					displayDate: post.scheduledTime.display,
					id: post.eventPostId,
					message: post.description,
					suggestedText: post.suggestedText,
					time: post.scheduledTime.time,
					timeZone: '(GMT-05:00) Eastern Time (US & Canada)',
					title: post.title,
					url: post.media
				})
			})
	    var indexHolder = null;
	    $scope.availableTimeZones.map(function(zone, index) {
	    	if (zone.zone === 'America/New_York') {
					indexHolder = index;
	    	}
	    })
	    $scope.previousPosts.map(function(post) {
	    	post.timeZone = $scope.availableTimeZones[indexHolder];
	    })
		})
  }

  $scope.getScheduledPosts = function() {
		console.log('getting scheduled');
		$scope.scheduledPostedPosts = [];
		eventSvc.post('/event/Event/getScheduledPosts', {eventId: $scope.eventId}).then(function(response) {
			if (!response) {
				swal({
		      title: "Error.",
		      text: "There was a server error. Please try again later.",
		      type: "error",
		      confirmButtonColor: "#DD6B55",
		      confirmButtonText: "Ok",
		      closeOnConfirm: true,
		    });
				return;
    	}
			console.log(response);
			response.map(function(post) {
				$scope.scheduledPostedPosts.push({
					comment: post.message,
					date: post.scheduledTime.date,
					displayDate: post.scheduledTime.display,
					id: post.eventPostId,
					message: post.description,
					suggestedText: post.suggestedText,
					time: post.scheduledTime.time,
					timeZone: '(GMT-05:00) Eastern Time (US & Canada)',
					title: post.title,
					url: post.media
				})
			})
	    var indexHolder = null;
	    $scope.availableTimeZones.map(function(zone, index) {
	    	if (zone.zone === 'America/New_York') {
					indexHolder = index;
	    	}
	    })
	    $scope.scheduledPostedPosts.map(function(post) {
	    	post.timeZone = $scope.availableTimeZones[indexHolder];
	    })
		})
  }

	$scope.next = function(action, viewName, facebookGroupId, facebookEventId) {
		var returnData = {action : action, viewName: viewName};
		returnData.data = JSON.stringify({
			eventId: $scope.eventId,
			buttonClicked: 'next'
		});
		eventSvc.post('/event/Event/progress', returnData).then(function(response) {
			if (!response) {
				$scope.cancel();
				return;
			}
			if (response.viewName === 'groupEventList') {
				$scope.getFbGroupsEvents();
			} else {
				$scope.setModalContent(response);
			}
		})
	}

  $scope.populateFbGroupsEvents = function() {
  	$scope.event.loadingGroupsEvents = true;
		eventSvc.post('/event/Event/getFacebookEvents').then(function(response) {
			$scope.event.facebookEvents = [];
			response.data.map(function(event) {
				for (var prop in $scope.event.groupEventData) {
					$scope.event.groupEventData[prop].map(function(data) {
						if (event.id === data.value) {
							$scope.event.facebookEvents.push(event);
						}
					})
				}
			})
			$scope.getFbEventAttendees();
		})
		eventSvc.post('/event/Event/getFacebookGroups').then(function(response) {
			$scope.event.facebookGroups = [];
			response.data.map(function(group) {
				for (var prop in $scope.event.groupEventData) {
					$scope.event.groupEventData[prop].map(function(data) {
						if (group.id === data.value) {
							$scope.event.facebookGroups.push(group);
						}
					})
				}
			})
			$scope.getFbGroupsEventsCompletion();
		})
  }

  $scope.previous = function(action, viewName) {
		var returnData = {action : action, viewName: viewName};
		returnData.data = JSON.stringify({
			eventId: $scope.eventId,
			buttonClicked: 'previous'
		});
		eventSvc.post('/event/Event/progress', returnData).then(function(response) {
			if (!response) {
				$scope.cancel();
				return;
			}
			if (response.viewName === 'groupEventList') {
				$scope.getFbGroupsEvents();
			} else {
				$scope.setModalContent(response);
			}
		})
  }

	$scope.removeScheduledPost = function(scheduledPost) {
		swal({
      title: "Are you sure?",
      text: "This post will be removed from your scheduled posts!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      closeOnConfirm: false,
      closeOnCancel: true
    },
    function (isConfirm) {
    	if (isConfirm) {
    		console.log(scheduledPost.id);
		    eventSvc.post('/event/Event/deletePost', {eventPostId: scheduledPost.id}).then(function(response) {
		    	if (!response) {
						swal({
				      title: "Error.",
				      text: "There was a server error. Please try again later.",
				      type: "error",
				      confirmButtonColor: "#DD6B55",
				      confirmButtonText: "Ok",
				      closeOnConfirm: true,
				    });
						return;
		    	}
		    	console.log(response);
		    	$scope.getScheduledPosts();
		    	swal("Deleted!", "The post has been successfully removed from your scheduled posts.", "success");
		    })
    	}
    });
	}

	$scope.resizeAndPosition = function() {
		if ($('body').width() <= 480) {
			return;
		}
    waitForFinalEvent(function(){
      if( isBreakpoint('xs') ) {
        setTimeout(function() {
           $('.contentFooter-fixed').css({right: '30px'})
        }, 100)
      }

      if( isBreakpoint('sm') ) {
        setTimeout(function() {
          $('.contentFooter-fixed').css({right: '55px'})
        }, 100)
      }

      if( isBreakpoint('md') ) {
        setTimeout(function() {
          $('.contentFooter-fixed').css({right: '55px'})
        }, 100)
      }

      if( isBreakpoint('lg') ) {
        setTimeout(function() {
          $('.contentFooter-fixed').css({right: '55px'})
        }, 100)
      }
    }, 0, fullDateString.getTime());
	}

	$scope.saveEvent = function() {
		/** This does nothing other than move user back to myEvents **/
		window.location.href = '/event/Event/myEvents';
	}

	$scope.saveFbGroupsEvents = function(action, buttonClicked, viewName) {
		var facebookGroupHolder = [];
		var facebookEventHolder = [];
		facebookGroupHolder = $scope.availableFbGroups.reduce(function(prev, curr, index, array) {
			if (curr.selected) {
				prev.push(curr);
				return prev;
			} else {
				return prev;
			}
		}, [])
		facebookEventHolder = $scope.availableFbEvents.reduce(function(prev, curr, index, array) {
			if (curr.selected) {
				prev.push(curr);
				return prev;
			} else {
				return prev;
			}
		}, []);
		var facebookGroupHolder = [];
		var facebookEventHolder = [];
		facebookGroupHolder = $scope.availableFbGroups.reduce(function(prev, curr, index, array) {
			if (curr.selected) {
				prev.push(curr.id);
				return prev;
			} else {
				return prev;
			}
		}, [])
		facebookEventHolder = $scope.availableFbEvents.reduce(function(prev, curr, index, array) {
			if (curr.selected) {
				prev.push(curr.id);
				return prev;
			} else {
				return prev;
			}
		}, []);
		var returnData = {action: action, viewName: viewName};
		returnData.data = {
			eventId: $scope.eventId,
			buttonClicked: buttonClicked,
			facebookEvents: facebookEventHolder,
			facebookGroups: facebookGroupHolder
		};
		returnData.data = JSON.stringify(returnData.data);

		eventSvc.post('/event/Event/progress', returnData).then(function(response) {
			$scope.event.groupEventData = {};
			$scope.event.groupEventData.data = [];
			if (response.facebookGroups) {
				response.facebookGroups.map(function(group) {
					$scope.event.groupEventData.data.push({value: group});
				}) 
			}
			if (response.facebookEvents) {
				response.facebookEvents.map(function(event) {
					$scope.event.groupEventData.data.push({value: event});
				})
			}
			$scope.populateFbGroupsEvents();
			if (response.next === 'close') {
				$scope.modalShow = false;
				$('#myModal9').modal('hide');
				$scope.templateToDisplay = 'loading';
			}	
			if (!response.success) {
				console.log('something went wrong with getting progress');
				return;
			}
		})
	}

	$scope.schedulePost = function(post) {
		$scope.postToEdit.date = '';
		if (today.getMonth() + 1 < 10) {
			$scope.postToEdit.date += '0' + (today.getMonth() + 1) + '/';
		} else  {
			$scope.postToEdit.date += (today.getMonth() + 1) + '/';
		}
		if (today.getDate() < 10) {
			$scope.postToEdit.date += '0' + today.getDate() + '/' + today.getFullYear();
		} else {
			$scope.postToEdit.date += today.getDate() + '/' + today.getFullYear();
		}
		$scope.postToEdit.comment = '';
		$scope.postToEdit.id = post.id;
		$scope.postToEdit.message = post.message;
		$scope.postToEdit.suggestedText = post.suggestedText;
		$scope.postToEdit.timeZone = 'Select Time Zone';
		var figureTime = new Date();
		if (figureTime.getHours() === 0) {
			$scope.postToEdit.time = '12:' + ((Math.round(figureTime.getMinutes()/15) * 15) % 60 === 0 ? '00' : (Math.round(figureTime.getMinutes()/15) * 15) % 60) + ' AM';
		} else if (figureTime.getHours() > 0 && figureTime.getHours() < 12) {
			$scope.postToEdit.time = (figureTime.getHours() < 10 ? ('0' + figureTime.getHours()) : figureTime.getHours()) + ':' + ((Math.round(figureTime.getMinutes()/15) * 15) % 60 === 0 ? '00' : (Math.round(figureTime.getMinutes()/15) * 15) % 60) + ' AM';
		} else {
			$scope.postToEdit.time = ((figureTime.getHours() - 12) < 10 ? ('0' + (figureTime.getHours() - 12)) : figureTime.getHours() - 12) + ':' + ((Math.round(figureTime.getMinutes()/15) * 15) % 60 === 0 ? '00' : (Math.round(figureTime.getMinutes()/15) * 15) % 60) + ' PM';
		}
		$scope.postToEdit.title = post.title;
		$scope.postToEdit.url = post.url;
		$scope.modalShow = true;
		$('#myModal10').modal('show');
  }

  $scope.setModalContent = function(response) {  	
  	if (response.actionLink && response.actionLink.indexOf('fbGroupId') > -1) {
  		$scope.modalContent.actionLink = response.actionLink.split('fbGroupId').join($scope.modalContent.tempGroupId);
  	} else if (response.actionLink && response.actionLink.indexOf('fbEventId') > -1) {
  		$scope.modalContent.actionLink = response.actionLink.split('fbEventId').join($scope.modalContent.tempEventId);
  	} else if (response.actionLink && response.actionLink.indexOf('fbUserId') > -1) {
  		$scope.modalContent.actionLink = response.actionLink.split('fbUserId').join($scope.fbUserId);
  	} else {
  		$scope.modalContent.actionLink = response.actionLink;
  	}
  	$scope.modalContent.actionLinkText = response.actionLinkText;
  	$scope.modalContent.eventAddEndTimeSuggestion = response.eventAddEndTimeSuggestion;
  	$scope.modalContent.eventAdminGuidelines = response.eventAdminGuidelines;
  	$scope.modalContent.eventAdminNumber = response.eventAdminNumber;
  	$scope.modalContent.eventDescriptionSuggestion = response.eventDescriptionSuggestion;
  	$scope.modalContent.eventInviteGuidelines = response.eventInviteGuidelines;
  	$scope.modalContent.eventLocationSuggestion = response.eventLocationSuggestion;
  	$scope.modalContent.eventNameSuggestion = response.eventNameSuggestion;
  	$scope.modalContent.eventPrivatePublicSuggestion = response.eventPrivatePublicSuggestion;
  	$scope.modalContent.facebookGroupId = response.facebookGroupId;
  	$scope.modalContent.groupDescriptionSuggestion = response.groupDescriptionSuggestion;
  	$scope.modalContent.groupInviteGuidelines = response.groupInviteGuidelines;
  	$scope.modalContent.groupNameSuggestion = response.groupNameSuggestion;
  	$scope.modalContent.groupPostPermissionSuggestion = response.groupPostPermissionSuggestion;
  	$scope.modalContent.groupPrivatePublicSuggestion = response.groupPrivatePublicSuggestion;
  	$scope.modalContent.groupTagsSuggestion = response.groupTagsSuggestion;
  	$scope.modalContent.groupTypeSuggestion = response.groupTypeSuggestion;
  	$scope.modalContent.groupWebEmailSuggestion = response.groupWebEmailSuggestion;
  	$scope.modalContent.instructionText = $sce.trustAsHtml(response.instructionText);
  	$scope.modalContent.instructionText2 = $sce.trustAsHtml(response.instructionText2);
  	$scope.modalContent.next = response.next;
  	$scope.modalContent.nextAction = response.nextAction;
  	$scope.modalContent.nextButtonText = response.nextButtonText;
  	$scope.modalContent.prevAction = response.prevAction;
  	$scope.modalContent.prevButtonText = response.prevButtonText;
  	$scope.modalContent.validate = response.validate;
  	$scope.modalContent.video = response.video;
  	$scope.modalContent.viewName = response.viewName;
  	$scope.templateToDisplay = $scope.modalContent.viewName;
  	if (response.video) {
  		eventSvc.post('/event/Event/getMediaRequest?mediaLibraryId=' + response.video).then(function(videoQueryResponse) {
  			$scope.modalContent.yt.videoId = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoQueryResponse.media.code);
  			setTimeout(function() {
  				$scope.modalContent.yt.height = $('.instructionVideo').height();
  				$scope.modalContent.yt.width = $('.instructionVideo').width() - 20;
  				$scope.$apply();
  			})
  		})
  	}
  	if (response.viewName === 'showGroupList') {
  		$scope.modalContent.instructionText = $sce.trustAsHtml(response.showGroupListInstructionText);
  	}
  	if (response.viewName === 'showEventList') {
  		$scope.modalContent.instructionText = $sce.trustAsHtml(response.showEventListInstructionText);
  	}
  }

  $scope.showDatepicker1 = function() {
    $('#datepicker1').datepicker('show');
  }

  $scope.showTimepicker1 = function() {
    $('#timepicker1').timepicker('showWidget');
  }

  $scope.showDatepicker2 = function() {
    $('#datepicker2').datepicker('show');
  }

  $scope.showTimepicker2 = function() {
    $('#timepicker2').timepicker('showWidget');
  }

  $scope.submitEditedPost = function() {
		var warning = [];
		$scope.postToEdit.dateString = '';
		if ($scope.postTime === 'now') {
      if (!$scope.postToEdit.comment) {
          warning.push('Please enter a comment.');
      }
			$scope.postToEdit.postType = 'now';
		}	else if ($scope.postTime === 'later') {
      if (!$scope.postToEdit.comment) {
          warning.push('Please enter a comment.');
      }
      if (!$scope.postToEdit.date) {
          warning.push('Please select a date.');
      }
      if (!$scope.postToEdit.time) {
          warning.push('Please select a time.');
      }
      if (!$scope.postToEdit.timeZone || $scope.postToEdit.timeZone === 'Select Time Zone') {
          warning.push('Please select a time zone.');
      }
      $scope.postToEdit.postType = 'later';
      var dateArrayHolder = $scope.postToEdit.date.split('/');
      var timeArrayHolder = $scope.postToEdit.time.split(/(?::| )+/);
      var timeToAdd = (timeArrayHolder[2] === 'PM') ? (timeArrayHolder[0] === '12' ? ('12:' + timeArrayHolder[1] + ':00') : (Number(timeArrayHolder[0]) + 12 + ':' + timeArrayHolder[1] + ':00')) : (timeArrayHolder[0] === '12' ? ('00:' + timeArrayHolder[1] + ':00') : (timeArrayHolder[0] + ':' + timeArrayHolder[1] + ':00')) ;
      $scope.postToEdit.dateString += dateArrayHolder[2] + '-' + dateArrayHolder[0] + '-' + dateArrayHolder[1] + ' ' + timeToAdd;
		} else if ($scope.postTime === 'optimize') {
      if (!$scope.postToEdit.comment) {
          warning.push('Please enter a comment.');
      }
			$scope.postToEdit.postType = 'optimize'
		}
		if (warning.length > 0) {
      warning.map(function (error, index) {
        setTimeout(function (error) {
          toastr.error(error);
        }, (index * 100), error);
      });
      return false;
    }

    var postHolder = {};
    postHolder.eventId = $scope.eventId;
    postHolder.eventPostId = $scope.postToEdit.id;
    postHolder.message = $scope.postToEdit.comment;
    postHolder.postTime = $scope.postToEdit.postType;
    if ($scope.postToEdit.postType === 'later') {
			postHolder.postTime = $scope.postToEdit.dateString;
			postHolder.timeZone = $scope.postToEdit.timeZone.value;
    }
		eventSvc.post('/event/Event/savePost', postHolder).then(function(response) {
			console.log('response from post edit', response);
    	if (!response) {
				swal({
		      title: "Error.",
		      text: "There was a server error. Please try again later.",
		      type: "error",
		      confirmButtonColor: "#DD6B55",
		      confirmButtonText: "Ok",
		      closeOnConfirm: true,
		    });
				return;
    	}
			$scope.scheduledPostedPosts = [];
			eventSvc.post('/event/Event/getScheduledPosts', {eventId: $scope.eventId}).then(function(response) {
				console.log(response);
				$('#myModal11').modal('hide');
				if (!response) {
					swal({
			      title: "Error.",
			      text: "There was a server error. Please try again later.",
			      type: "error",
			      confirmButtonColor: "#DD6B55",
			      confirmButtonText: "Ok",
			      closeOnConfirm: true,
			    });
					return;
	    	}
				response.map(function(post) {
					$scope.scheduledPostedPosts.push({
						comment: post.message,
						date: post.scheduledTime.date,
						displayDate: post.scheduledTime.display,
						id: post.eventPostId,
						message: post.description,
						suggestedText: post.suggestedText,
						time: post.scheduledTime.time,
						timeZone: '(GMT-05:00) Eastern Time (US & Canada)',
						title: post.title,
						url: post.media
					})
				})
		    var indexHolder = null;
		    $scope.availableTimeZones.map(function(zone, index) {
		    	if (zone.zone === 'America/New_York') {
						indexHolder = index;
		    	}
		    })
		    $scope.scheduledPostedPosts.map(function(post) {
		    	post.timeZone = $scope.availableTimeZones[indexHolder];
		    })
		    $scope.postTime = 'now';
				swal({
	        title: "Success!",
	        text: "Your post has been successfully edited!",
	        type: "success"
	      });
			})
		})
	}

	$scope.submitPost = function() {
		var warning = [];
		$scope.postToEdit.dateString = '';
		if ($scope.postTime === 'now') {
      if (!$scope.postToEdit.comment) {
          warning.push('Please enter a comment.');
      }
			console.log('send the post out now');
			$scope.postToEdit.postType = 'now';
		}	else if ($scope.postTime === 'later') {
      if (!$scope.postToEdit.comment) {
          warning.push('Please enter a comment.');
      }
      if (!$scope.postToEdit.date) {
          warning.push('Please select a date.');
      }
      if (!$scope.postToEdit.time) {
          warning.push('Please select a time.');
      }
      if (!$scope.postToEdit.timeZone || $scope.postToEdit.timeZone === 'Select Time Zone') {
          warning.push('Please select a time zone.');
      }
      console.log($scope.postToEdit.date, $scope.postToEdit.time);
      $scope.postToEdit.postType = 'later';
      var dateArrayHolder = $scope.postToEdit.date.split('/');
      var timeArrayHolder = $scope.postToEdit.time.split(/(?::| )+/);
      var timeToAdd = (timeArrayHolder[2] === 'PM') ? (timeArrayHolder[0] === '12' ? ('12:' + timeArrayHolder[1] + ':00') : (Number(timeArrayHolder[0]) + 12 + ':' + timeArrayHolder[1] + ':00')) : (timeArrayHolder[0] === '12' ? ('00:' + timeArrayHolder[1] + ':00') : (timeArrayHolder[0] + ':' + timeArrayHolder[1] + ':00')) ;
      $scope.postToEdit.dateString += dateArrayHolder[2] + '-' + dateArrayHolder[0] + '-' + dateArrayHolder[1] + ' ' + timeToAdd;
			console.log('later', $scope.postToEdit.dateString);
		} else if ($scope.postTime === 'optimize') {
      if (!$scope.postToEdit.comment) {
          warning.push('Please enter a comment.');
      }
			console.log('do something to optimize');
			$scope.postToEdit.postType = 'optimize'
		}
		if (warning.length > 0) {
      warning.map(function (error, index) {
        setTimeout(function (error) {
          toastr.error(error);
        }, (index * 100), error);
      });
      return false;
    }

    var postHolder = {};
    postHolder.eventId = $scope.eventId;
    postHolder.message = $scope.postToEdit.comment;
    postHolder.postId = $scope.postToEdit.id;
    postHolder.postTime = $scope.postToEdit.postType;
    if ($scope.postToEdit.postType === 'later') {
			postHolder.postTime = $scope.postToEdit.dateString;
			postHolder.timeZone = $scope.postToEdit.timeZone.value;
    }

		eventSvc.post('/event/Event/savePost', postHolder).then(function(response) {
			$('#myModal10').modal('hide');
			$scope.postTime = 'now';
			if (!response) {
				swal({
		      title: "Error.",
		      text: "There was a server error. Please try again later.",
		      type: "error",
		      confirmButtonColor: "#DD6B55",
		      confirmButtonText: "Ok",
		      closeOnConfirm: true,
		    });
				return;
    	}
			swal({
        title: "Success!",
        text: "Your post has been successfully scheduled!",
        type: "success"
      });
		})
	}	

	$scope.validateEvent = function(action, viewName, facebookEventId) {
		$scope.modalContent.tempEventId = facebookEventId;
		var returnData = {action : action, viewName: viewName};
		returnData.data = JSON.stringify({
			eventId: $scope.eventId,
			buttonClicked: 'next',
			facebookEventId: facebookEventId
		});
		eventSvc.post('/event/Event/progress', returnData).then(function(response) {
			if (!response) {
				$scope.cancel();
				return;
			}
			if (response.hasOwnProperty('forward')) {
				$scope.cancel();
				swal({
          title: "Success!",
          text: "Your event has been successfully set up!",
          type: "success"
        });
        return;
			}
			if (response.viewName === 'groupEventList') {
				$scope.getFbGroupsEvents();
			} else if (response.viewName === 'complianceInfraction') {
				$scope.templateToDisplay = response.viewName;
				$scope.modalContent.viewName = response.viewName;
				$scope.modalContent.complianceKeywordsThatMatched = response.complianceKeywordsThatMatched;
			} else {
				$('#myModal9').modal('show');
				$scope.modalShow = true;
				$scope.setModalContent(response);
			}
		})
	}

	$scope.validateGroup = function(action, viewName, facebookGroupId) {
		$scope.modalContent.tempGroupId = facebookGroupId;
		var returnData = {action : action, viewName: viewName};
		returnData.data = JSON.stringify({
			eventId: $scope.eventId,
			buttonClicked: 'next',
			facebookGroupId: facebookGroupId
		});
		eventSvc.post('/event/Event/progress', returnData).then(function(response) {
			if (!response) {
				console.log('error', response.data);
				$scope.cancel();
				return;
			}
			if (response.hasOwnProperty('forward')) {
				$scope.cancel();
				swal({
          title: "Success!",
          text: "Your group has been successfully set up!",
          type: "success"
        });
        return;
			}
			if (response.viewName === 'groupEventList') {
				$scope.getFbGroupsEvents();
			} else if (response.viewName === 'complianceInfraction') {
				$scope.templateToDisplay = response.viewName;
				$scope.modalContent.viewName = response.viewName;
				$scope.modalContent.complianceKeywordsThatMatched = response.complianceKeywordsThatMatched;
			} else {
				$('#myModal9').modal('show');
				$scope.modalShow = true;
				$scope.setModalContent(response);
			}	
		})
	}

	$scope.$watch('modalShow', function (newValue, oldValue) {
      if (newValue !== false) {
          $(document.body).parent().css({overflow: 'hidden'});
      } else {
          $(document.body).parent().css({overflow: 'visible'});
      }
  })

  $(window).resize(function() {
  	$scope.modalContent.yt.width = $('.instructionVideo').width();
  	$scope.resizeAndPosition();
  	$scope.$apply();
  })
})