var gapi;
angular.module('hangouts', ['ngAnimate', 'ngDragDrop'])
    .controller('indexController', indexController)
    .service('indexSvc', indexServices);
/**
 * Controller
 * @param $scope
 * @param $timeout
 * @param indexSvc
 */
function indexController($scope, $timeout, indexSvc) {

    $scope.hangout = {};
    /**
     * Populate
     */
    $scope.hangout.id = indexSvc.find('id');
    if($scope.hangout.id==-1)
        window.location.href = '/event/Template/select';

    indexSvc.post('/event/LiveEvent/getLiveEvent/'+$scope.hangout.id).then(function(response){
        if(!response.liveEvent)
            return -1;

        if(response.liveEvent){
            $scope.eventDisplay = {};
            $scope.eventDisplay.name = response.liveEvent.name;
            $scope.eventDisplay.description = response.liveEvent.description;
            $scope.eventDisplay.date = response.liveEvent.eventDate;
        }
    });

    /**
     * Popup Message
     * @type {{closeButton: boolean, debug: boolean, newestOnTop: boolean, progressBar: boolean, positionClass: string, preventDuplicates: boolean, onclick: null, showDuration: string, hideDuration: string, timeOut: string, extendedTimeOut: string, showEasing: string, hideEasing: string, showMethod: string, hideMethod: string}}
     */
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
    };

    /*
     * Actions
     */
    /**
     * Init Google API
     */
    function init() {
        /**
         * https://developers.google.com/+/hangouts/button#hangout_button_parameters
         */
        gapi.hangout.render('placeholder-div',
            {
                'render': 'createhangout'
                , 'topic': 'testing'
                , 'invites': ['public']
                , 'initial_apps': []
                , 'hangout_type': 'onair'
                , 'widget_size': 72

            }
        );
    }

    /**
     * Submit Informaiton
     * @returns {boolean}
     */
    function submit() {
        var warning = [];
        if ($scope.hangout.length === 0)
            warning.push('Must fill out "Turnkey Hangout Registration" fields.');

        if ($scope.hangout.event == '' || $scope.hangout.event == undefined)
            warning.push('Event Page is a required field');

        if ($scope.hangout.youtube == '' || $scope.hangout.youtube == undefined)
            warning.push('Youtube Page is a required field');

        if ($scope.hangout.videoEmbed == '' || $scope.hangout.videoEmbed == undefined)
            warning.push('Video Embed is a required field');
        
        if (warning.length > 0) {
            warning.map(function (error, index) {
                setTimeout(function (error) {
                    toastr.error(error);
                }, (index * 100), error);
            });
            return false;
        }

        indexSvc.post('/event/LiveEvent/saveHangouts',$scope.hangout).then(function(response){
            if(response.result){
                window.location.href = '/event/LiveEvent/myLiveEvents';
            }
        })
    }

    /**
     * Events
     */
    $timeout(init);
    $scope.submit = submit;
    $(window).off('resize');
}

