var app = angular.module('eventPlanner');

/* Virtual Event Directives */
app.directive('dropZoneProducts', function() {
	return {
		restrict:'E',
		templateUrl: '/zf2/assets/event/html/virtualEvent/dropZoneProductsTmpl.html',
		scope: {
			addProductToCart: '&',
			addProductToSession: '&',
			cartCount: '=',
			checkout: '&',
			currentProduct: '=',
			isAdmin: '=',
			possibleProducts: '=',
			productQuantity: '=',
			session: '=',
			setCurrentProduct: '&',
			showBag: '&'
		},
		link: function(scope, element, attrs) {

		}
	};
});

app.directive('defaultProducts', function() {
	return {
		restrict:'E',
		templateUrl: '/zf2/assets/event/html/virtualEvent/defaultProductsTmpl.html',
		scope: {
			addProductToCart: '&',
			addProductToSession: '&',
			cartCount: '=',
			checkout: '&',
			currentProduct: '=',
			isAdmin: '=',
			possibleProducts: '=',
			productQuantity: '=',
			session: '=',
			setCurrentProduct: '&',
			showBag: '&'
		},
		link: function(scope, element, attrs) {

		}
	};
})

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