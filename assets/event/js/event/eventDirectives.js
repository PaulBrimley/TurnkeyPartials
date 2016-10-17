var app = angular.module('eventPlanner');

/* Event Directives */
app.directive('complianceInfraction', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/complianceInfractionTmpl.html',
		restrict: 'E',
		scope: {
			cancel: '&',
			modalContent: '=',
			next: '&',
			previous: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('createEventInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/createFBEventInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			saveFbGroupsEvents: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('createGroupInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/createFBGroupInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			saveFbGroupsEvents: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventDescriptionInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/eventDescriptionInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateEvent: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventHostInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/eventHostInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateEvent: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventInviteInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/eventInviteInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateEvent: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventLinkSharingInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/eventLinkSharingInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateEvent: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventLocationInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/eventLocationInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateEvent: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventPhotoInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/eventPhotoInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateEvent: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventPostingInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/eventPostingInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateEvent: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventPrivatePublicInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/eventPrivatePublicInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateEvent: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventSendInviteInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/eventSendInviteInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateEvent: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupDescriptionInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/groupDescriptionInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupEventList', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/listFBGroupsEventsTmpl.html',
		restrict: 'E',
		scope: {
			availableFbGroups: '=',
			availableFbEvents: '=',
			cancel:'&',
			createFacebookEvent: '&',
			createFacebookGroup: '&',
			event: '=',
			saveFbGroupsEvents: '&'
		},
		link: function(scope, element, attrs) {
	
			scope.$watch('availableFbGroups', function(newValue, oldValue) {
				if (newValue && newValue.length > 0 && scope.event.facebookGroups && scope.event.facebookGroups.length > 0) {
					scope.event.facebookGroups.map(function(eventFacebookGroup) {
						scope.availableFbGroups.map(function(availableFbGroup) {
							if (eventFacebookGroup.name === availableFbGroup.name) {
								availableFbGroup.selected = true;
							}
						})
					})
				}
			});
			scope.$watch('availableFbEvents', function(newValue, oldValue) {
				if (newValue && newValue.length > 0 && scope.event.facebookEvents && scope.event.facebookEvents.length > 0) {
					scope.event.facebookEvents.map(function(eventFacebookEvent) {
						scope.availableFbEvents.map(function(availableFbEvent) {
							if (eventFacebookEvent.name === availableFbEvent.name) {
								availableFbEvent.selected = true;
							}
						})
					})
				}
			});
		}
	}
})

app.directive('groupLinkSharingInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/groupLinkSharingInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupMembershipInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/groupMembershipInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupModorators', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/groupModoratorsInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPhotoInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/groupPhotoInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPostingInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/groupPostingInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPostPermissionsInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/groupPostPermissionsInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPrivatePublicInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/groupPrivatePublicInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupTagsInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/groupTagsInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupTypeInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/groupTypeInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupWebEmailInstructions', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/groupWebEmailInstructionsTmpl.html',
		restrict: 'E',
		scope: {
			cancel:'&',
			modalContent: '=',
			next: '&',
			previous: '&',
			templateToDisplay: '=',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('loading', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/loadingTmpl.html',
		restrict: 'E',
		scope: {
			
		},
		link: function(scope, element, attrs) {
			
		}
	}
})

app.directive('showFbEventList', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/showFBEventListTmpl.html',
		restrict: 'E',
		scope: {
			availableFbEvents: '=',
			cancel:'&',
			modalContent: '=',
			previous: '&',
			validateEvent: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('showFbGroupList', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/showFBGroupListTmpl.html',
		restrict: 'E',
		scope: {
			availableFbGroups: '=',
			cancel:'&',
			modalContent: '=',
			previous: '&',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('wizardModal', function() {
	return {
		templateUrl: '/zf2/assets/event/html/event/wizardModalTmpl.html',
		restrict: 'E',
		scope: {
			availableFbEvents: '=',
			availableFbGroups: '=',
			cancel:'&',
			createFacebookEvent: '&',
			createFacebookGroup: '&',
			event: '=',
			modalContent: '=',
			next: '&',
			previous: '&',
			saveFbGroupsEvents: '&',
			templateToDisplay: '=',
			validateEvent: '&',
			validateGroup: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})
/***********************/

/* Virtual Event Directives */
app.directive('message', function() {
  return {
    restrict: "E",

    scope: {
      message: '='
    },

    templateUrl: '/zf2/assets/event/html/virtualEvent/messageDirectiveTmpl.html',

    link: function(scope, element, attrs) {
      
    }
  };
});
/***********************/

