var app = angular.module('eventPlanner');
/* Template Directives */
app.directive('createEventInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/createFBEventInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '='
		},
		link: function(scope, element, attrs) {
			
		}
	}
})

app.directive('createEventInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/createFBEventInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {
			
		}
	}
})

app.directive('createGroupInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/createFBGroupInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('createGroupInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/createFBGroupInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventDescriptionInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventDescriptionInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventDescriptionInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventDescriptionInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventHostInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventHostInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventHostInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventHostInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventInviteInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventInviteInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventInviteInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventInviteInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventLinkSharingInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventLinkSharingInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventLinkSharingInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventLinkSharingInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventLocationInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventLocationInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventLocationInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventLocationInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventPhotoInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventPhotoInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventPhotoInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventPhotoInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventPostingInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventPostingInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventPostingInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventPostingInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventPrivatePublicInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventPrivatePublicInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventPrivatePublicInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventPrivatePublicInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventSendInviteInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventSendInviteInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('eventSendInviteInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/eventSendInviteInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupDescriptionInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupDescriptionInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupDescriptionInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupDescriptionInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupLinkSharingInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupLinkSharingInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupLinkSharingInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupLinkSharingInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupMembershipInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupMembershipInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupMembershipInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupMembershipInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupModeratorsInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupModeratorsInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupModeratorsInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupModeratorsInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPhotoInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupPhotoInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPhotoInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupPhotoInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPostingInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupPostingInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPostingInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupPostingInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPostPermissionsInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupPostPermissionsInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPostPermissionsInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupPostPermissionsInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPrivatePublicInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupPrivatePublicInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupPrivatePublicInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupPrivatePublicInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupTagsInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupTagsInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupTagsInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupTagsInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupTypeInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupTypeInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupTypeInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupTypeInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupWebEmailInstructionsEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupWebEmailInstructionsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupWebEmailInstructionsExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/groupWebEmailInstructionsExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('groupEventListEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/listFBGroupsEventsEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {
			
		}	
	}
})

app.directive('groupEventListExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/listFBGroupsEventsExampleTmpl.html',
		restrict: 'E',
		scope: {
			
		},
		link: function(scope, element, attrs) {
			
		}	
	}
})

app.directive('manageAvailablePosts', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/manageAvailablePostsTmpl.html',
		restrict: 'E',
		scope: {
			'availablePosts': '=',
			'content': '=',
			'templatePosts': '='
		},
		link: function(scope, element, attrs) {
			scope.addPost = function(index) {
				if (!scope.content) {
					return;
				}
				scope.availablePosts[index].inTemplate = !scope.availablePosts[index].inTemplate;
			}
		}	
	}
})

app.directive('manageAvailableProducts', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/manageAvailableProductsTmpl.html',
		restrict: 'E',
		scope: {
			'availableProducts': '=',
			'content': '=',
			'templateProducts': '='
		},
		link: function(scope, element, attrs) {

			scope.addProduct = function(index) {
				if (!scope.content) {
					return;
				}
				scope.availableProducts[index].inTemplate = !scope.availableProducts[index].inTemplate;
			}
		}
	}
})

app.directive('manageContentModal', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/manageContentModalTmpl.html',
		restrict: 'E',
		scope: {
			'availablePosts': '=',
			'availableProducts': '=',
			'content': '=',
			'modalShow': '=',
			'modalToDisplay': '=',
			'templatePosts': '=',
			'templateProducts': '='
		},
		link: function(scope, element, attrs) {

			$('#myModal7').on('hidden.bs.modal', function () {
		    scope.modalShow = false;
		    scope.$apply();
			})

			scope.submitContent = function() {
				var arrayHolder = [];
				
				if (scope.modalToDisplay === 'posts') {
					scope.availablePosts.map(function(contentPiece) {
						if (contentPiece.inTemplate === true) {
							arrayHolder.push(contentPiece);
						}
					})
					scope.templatePosts = arrayHolder;
				} else if (scope.modalToDisplay === 'products') {
					scope.availableProducts.map(function(contentPiece) {
						if (contentPiece.inTemplate === true) {
							arrayHolder.push(contentPiece);
						}
					})
					scope.templateProducts = arrayHolder;
				}
			}
		}
	}
})

app.directive('wizardModalEdit', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/wizardModalEditTmpl.html',
		restrict: 'E',
		scope: {
			templateToEdit: '=',
			saveCustomizations: '&'
		},
		link: function(scope, element, attrs) {

		}
	}
})

app.directive('wizardModalExample', function() {
	return {
		templateUrl: '/zf2/assets/event/html/template/wizardModalExampleTmpl.html',
		restrict: 'E',
		scope: {
			templateToDisplay: '='
		},
		link: function(scope, element, attrs) {
			
		}	
	}
})
/***********************/