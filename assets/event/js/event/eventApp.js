var app = angular.module('eventPlanner', ['angularMoment', 'ngAnimate', 'ngDragDrop', 'summernote', 'ui.sortable', 'ngSanitize']);

app.constant('amTimeAgoConfig', {
  withoutSuffix: true
});

app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
