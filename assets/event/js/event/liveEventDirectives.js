var app = angular.module('eventPlanner');

/* Live Event Directives */
app.directive('configureGh1', function($compile) {
	return {
		templateUrl: '/zf2/assets/event/html/live_event/configureGH1Tmpl.html',
		restrict: 'E',
		scope: {
			cancel: '&',
			next: '&',
			modalContent: '='
		},
		link: function(scope, element) {
			
		}
	}
})

app.directive('configureGh2', function($compile, $timeout) {
	return {
		templateUrl: '/zf2/assets/event/html/live_event/configureGH2Tmpl.html',
		restrict: 'E',
		scope: {
			cancel: '&',
			next: '&',
			previous: '&',
			hangout: '=',
			modalContent: '=',
			submit: '&'
		},
		link: function(scope, element) {

		}
	}
})
/***********************/