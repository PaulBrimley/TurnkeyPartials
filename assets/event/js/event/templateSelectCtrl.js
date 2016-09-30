angular.module('eventPlanner')
    /**
     * Controller
     * Pass In Services
     */
    .controller('templateSelectCtrl', function ($scope, $timeout, $location, eventSvc) {

        $scope.admin = true;
        $scope.content = false;
        $scope.modalShow = false;
        $scope.modalToDisplay = '';
        $scope.templatePosts = [];
        $scope.templateProducts = [];
        $scope.templates = [];
        /**
         * Modal Event Holder
         */
        
        eventSvc.get('/event/Template/getTemplates').then(function(response) {
          $scope.templates = response.templates;
          console.log($scope.templates);
        })

        $scope.chooseTemplate = function(template) {
            window.location.href = '/event/LiveEvent/create/?templateId=' + template.id;
        }
        

        $scope.showModal = function (type, index) {
            $scope.templatePosts = $scope.templates[index].posts;
            $scope.templateProducts = $scope.templates[index].products;
            $scope.modalToDisplay = type;
            $scope.modalShow = true;
            $scope.content = false;
        }      

        /**
         * Modal Show
         */
        $scope.$watch('modalShow', function (newValue, oldValue) {
            if (newValue !== false) {
                $(document.body).parent().css({overflow: 'hidden'});
            } else {
                $(document.body).parent().css({overflow: 'visible'});
            }
        })
        
        $(window).off('resize');
        
    })

