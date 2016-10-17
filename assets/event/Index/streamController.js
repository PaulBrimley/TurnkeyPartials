angular.module('hangouts', ['ngAnimate', 'ngDragDrop'])
    .controller('streamController', streamController)
    .service('indexSvc', indexServices)
/**
 * Controller
 * @param $scope
 * @param $timeout
 * @param indexSvc
 */
function streamController($scope,$sce, $timeout, indexSvc) {
    $scope.stream = '';

    indexSvc.post('/event/LiveEvent/getLiveEvent/'+indexSvc.find('id')).then(function(response){
        $scope.stream = $sce.trustAsHtml(response.liveEvent.hangout.videoEmbed);
        console.log($scope.stream);
    });

    console.log($scope);
}