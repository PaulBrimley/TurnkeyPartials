angular.module('eventPlanner')
    /**
     * Controller
     * Pass In Services
     */
    .controller('myTemplateSelectCtrl', function ($scope, $timeout, $location, eventSvc) {

        $scope.content = false;
        $scope.modalShow = false;
        $scope.modalToDisplay = '';
        $scope.templatePosts = [];
        $scope.templateProducts = [];
        $scope.templates = {};
        eventSvc.templates = $scope.templates;
        /**
         * Modal Event Holder
         */
        
        
                

        eventSvc.get('/event/Template/getMyTemplates').then(function(response) {
          $scope.templates = response.templates;
        });

        $scope.chooseTemplate = function(template) {
            window.location.href = '/event/LiveEvent/create/?templateId=' + template.id;
        };

        $scope.createNewTemplate = function() {
            window.location.href = '/event/Template/create';
        }
        
        $scope.deleteTemplate = function(template) {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this template!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: true },
            function (isConfirm) {
                if (isConfirm) {
                    eventSvc.get('/event/Template/delete/' + template.id).then(function(response) {

                        if (response.result) {
                            swal("Deleted!", "Your template has been deleted.", "success");
                            window.location.href = '/event/Template/myTemplates';
                        }else{
                            swal("Unable to Delete", "Unable to delete template, please remove live events using this template first.", "error");
                        }
                    })
                }
            });
        };

        $scope.editTemplate = function(template) {
            window.location.href = '/event/Template/editTemplate/?templateId=' + template.id;
        };

        $scope.showModal = function (type, index) {
            $scope.templatePosts = $scope.templates[index].posts;
            $scope.templateProducts = $scope.templates[index].products;
            $scope.modalToDisplay = type;
            $scope.modalShow = true;
            $scope.content = false;
        };

        /**
         * Modal Show
         */
        /*$scope.$watch('modalShow', function (newValue, oldValue) {
            if (newValue !== false) {
                $(document.body).parent().css({overflow: 'hidden'});
            } else {
                $(document.body).parent().css({overflow: 'visible'});
            }
        });*/
        
        $(window).off('resize');
        
    });

