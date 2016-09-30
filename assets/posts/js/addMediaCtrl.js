angular.module('postsApp').controller("addMediaCtrl", function($rootScope, $scope, $timeout, $window) {

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
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };


    /********** Set up youtube api ************/
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    $window.onYouTubeIframeAPIReady = function() {
        $rootScope.$broadcast('$youtubeApiReady');
    }
    /*****************************************/


    /********** Set current media ************/
    $scope.currentMedia = {};
    $timeout(function() {
        $('.currentMediaHolder').css({width: $('.postArea').width(), left: $('.postArea').offset().left});
    })
    $(window).resize(function() {
        $timeout(function() {
            $('.currentMediaHolder').width($('.postArea').width());
        })
    })
    $scope.$watch('currentMedia.managementName', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            toastr.success('New media selected as current media');
        }
    })
    /*****************************************/
});