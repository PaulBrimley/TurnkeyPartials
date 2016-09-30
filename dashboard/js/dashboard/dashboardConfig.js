angular.module('homer').run(['$state', '$stateParams', function($state, $stateParams){

}]);

angular.module('homer').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('calendarPanel', {
      url: '/calendarPanel',
      templateUrl: '/StaticContent/BackOffice/views/dashboard/calendarTmpl.html',
      controller: 'dashboardCalendarCtrl'
    })
    .state('sharedMainView', {
      url: '/shared/mainView',
      templateUrl: '/StaticContent/BackOffice/views/dashboard/sharedTmpl.mainView.html',
      controller: 'dashboardSharedMainCtrl'
    })
    .state('Pinterest', {
      url: '/shared/Pinterest',
      templateUrl: '/StaticContent/BackOffice/views/dashboard/sharedTmpl.detailView.PinterestTmpl.html',
      controller: 'dashboardSharedDetailCtrl'
    })
    .state('LinkedIn', {
      url: '/shared/LinkedIn',
      templateUrl: '/StaticContent/BackOffice/views/dashboard/sharedTmpl.detailView.LinkedInTmpl.html',
      controller: 'dashboardSharedDetailCtrl'
    })
    .state('Twitter', {
      url: '/shared/Twitter',
      templateUrl: '/StaticContent/BackOffice/views/dashboard/sharedTmpl.detailView.TwitterTmpl.html',
      controller: 'dashboardSharedDetailCtrl'
    })
    .state('Facebook', {
      url: '/shared/Facebook',
      templateUrl: '/StaticContent/BackOffice/views/dashboard/sharedTmpl.detailView.FacebookTmpl.html',
      controller: 'dashboardSharedDetailCtrl'
    })
    .state('scheduled', {
      url: '/scheduled',
      template: '<div class="dashboard-panel-header-image schedule-background"></div>'
    })
    .state('leads', {
      url: '/leads',
      template: '<div class="dashboard-panel-header-image leads-background"></div>'
    })
    .state('favorites', {
      url: '/favorites',
      template: '<div class="dashboard-panel-header-image favorites-background"></div>'
    })
    .state('profile', {
      url: '/profile',
      template: '<div class="dashboard-panel-header-image profile-background"></div>'
    })

    $urlRouterProvider.otherwise('calendarPanel');
})