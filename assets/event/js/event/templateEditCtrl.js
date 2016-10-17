angular.module('eventPlanner').controller('templateEditCtrl', templateEditCtrl);

function templateEditCtrl($scope, $sce, $timeout, eventSvc) {

    /* Detect Bootstrap breakpoints */
    function isBreakpoint( alias ) {
        return $('.device-' + alias).is(':visible');
    }

    var waitForFinalEvent = function() {
        var b={};
        return function(c,d,a) {
            a || (a="I am a banana!");
            b[a] && clearTimeout(b[a]);
            b[a] = setTimeout(c,d);
            }
        }();
    var fullDateString = new Date();
    /***  ***/

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

    setTimeout(function() {
        $('#myModal7').on('hidden.bs.modal', function () {
            $scope.modalShow = false;
            $(window).scrollTop(windowScrollTop);
            $scope.$apply();
        })

        $('#myModal12').on('hidden.bs.modal', function () {
            $scope.modalShow = false;
            $(window).scrollTop(windowScrollTop);
            $scope.$apply();
        })

        $('#myModal14').on('hidden.bs.modal', function () {
            $scope.modalShow = false;
            $(window).scrollTop(windowScrollTop);
            $scope.$apply();
        })

        $('.summerNote').summernote({
            height: 150,
            codemirror: {
                theme: 'monokai'
            }
        })
    }, 100)

    var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }();

    $scope.content = false;
    $scope.eventSortableOptions = {
        items: '.sortable',
        update: function(e, ui) {
            
        },
        start: function(e, ui) {
            
        },
        stop: function(e, ui) {
            /* set nextAction */
            $scope.eventModelArray[$scope.eventModelArray.length - 1].modelDataObject.nextAction = 'groupEventList';
            for (var i = 1; i < $scope.eventModelArray.length - 1; i++) {
                $scope.eventModelArray[i].modelDataObject.nextAction = $scope.eventModelArray[i + 1].modelDataObject.next;
            }
            /* set prevAction */
            $scope.eventModelArray[2].modelDataObject.prevAction = 'createGroupInstructions';
            for (var i = 3; i < $scope.eventModelArray.length; i++) {
                $scope.eventModelArray[i].modelDataObject.prevAction = $scope.eventModelArray[i - 1].modelDataObject.next;
            }
        }
    };
    $scope.groupSortableOptions = {
        items: '.sortable',
        update: function(e, ui) {
            
        },
        start: function(e, ui) {

        },
        stop: function(e, ui) {
            /* set nextAction */
            $scope.groupModelArray[$scope.groupModelArray.length - 1].modelDataObject.nextAction = 'groupEventList';
            for (var i = 1; i < $scope.groupModelArray.length - 1; i++) {
                $scope.groupModelArray[i].modelDataObject.nextAction = $scope.groupModelArray[i + 1].modelDataObject.next;
            }
            /* set prevAction */
            $scope.groupModelArray[2].modelDataObject.prevAction = 'createGroupInstructions';
            for (var i = 3; i < $scope.groupModelArray.length; i++) {
                $scope.groupModelArray[i].modelDataObject.prevAction = $scope.groupModelArray[i - 1].modelDataObject.next;
            }
        }
    };
    $scope.indexHolder = {
        array: '',
        index: 0
    };
    $scope.list = [];
    $scope.modalShow = false;
    $scope.modalToDisplay = '';
    $scope.postsProducts = {};
    $scope.template = {};
    $scope.templateId = QueryString.templateId;
    $scope.templatePosts = [];
    $scope.templateProducts = [];
    $scope.templateToDisplay = {};
    $scope.templateToEdit = {};
    var windowScrollTop = 0;

    function findTheKey(object, key) {
        for (var prop in object) {
            if (key === prop) {
                return prop;
            }
        }
    };

    function resizeAndPosition() {
        waitForFinalEvent(function(){
            if( isBreakpoint('xs') ) {
                setTimeout(function() {
                    $('.contentFooter-fixed').css({right: '30px'});
                    $('.rightAlignHolder').removeClass('textAlignRight');
                    $('.rightAlignHolder').addClass('marginBottomFive');
                    for (var i = 0; i < $scope.templatePosts.length; i++) {
                        $('#postHolder' + i).css({clear: 'none'});
                    }
                    for (var i = 0; i < $scope.templateProducts.length; i++) {
                        $('#productHolder' + i).css({clear: 'none'});
                    }
                }, 200)
            }

            if( isBreakpoint('sm') ) {
                setTimeout(function() {
                    $('.contentFooter-fixed').css({right: '55px'});
                    $('.rightAlignHolder').addClass('textAlignRight');
                    $('.rightAlignHolder').removeClass('marginBottomFive');
                    for (var i = 0; i < $scope.templatePosts.length; i++) {
                        $('#postHolder' + i).css({clear: 'none'});
                    }
                    for (var i = 0; i < $scope.templateProducts.length; i++) {
                        $('#productHolder' + i).css({clear: 'none'});
                    }
                }, 200)
            }

            if( isBreakpoint('md') ) {
                setTimeout(function() {
                    $('.contentFooter-fixed').css({right: '55px'});
                    $('.rightAlignHolder').addClass('textAlignRight');
                    $('.rightAlignHolder').removeClass('marginBottomFive');
                    for (var i = 0; i < $scope.templatePosts.length; i++) {
                        $('#postHolder' + i).css({clear: 'none'});
                        if (i % 2 === 0) {
                            $('#postHolder' + i).css({clear: 'both'});
                        }
                    }
                    for (var i = 0; i < $scope.templateProducts.length; i++) {
                        $('#productHolder' + i).css({clear: 'none'});
                        if (i % 2 === 0) {
                            $('#productHolder' + i).css({clear: 'both'});
                        }
                    }
                }, 200)
            }

            if( isBreakpoint('lg') ) {
                setTimeout(function() {
                    $('.contentFooter-fixed').css({right: '55px'});
                    $('.rightAlignHolder').addClass('textAlignRight');
                    $('.rightAlignHolder').removeClass('marginBottomFive');
                    for (var i = 0; i < $scope.templatePosts.length; i++) {
                        $('#postHolder' + i).css({clear: 'none'});
                        if (i % 3 === 0) {
                            $('#postHolder' + i).css({clear: 'both'});
                        }
                    }
                    for (var i = 0; i < $scope.templateProducts.length; i++) {
                        $('#productHolder' + i).css({clear: 'none'});
                        if (i % 3 === 0) {
                            $('#productHolder' + i).css({clear: 'both'});
                        }
                    }
                }, 200)
            }
        }, 0, fullDateString.getTime());
    }

    function sortEvents(object, key) {
        var nextAction = findTheKey(object, object[key].modelDataObject.nextAction);
        if (object[key].modelDataObject.nextAction ===  'close' || object[key].modelDataObject.nextAction ===  'groupEventList') {
            return;
        } else if (object[key].modelDataObject.nextAction ===  nextAction) {
            $scope.eventModelArray.push(object[nextAction]);
            if (nextAction) {
                sortEvents(object, nextAction);
            }
        }
    }
    
    function sortGroups(object, key) {
        var nextAction = findTheKey(object, object[key].modelDataObject.nextAction);
        if (object[key].modelDataObject.nextAction ===  'close' || object[key].modelDataObject.nextAction ===  'groupEventList') {
            return;
        } else if (object[key].modelDataObject.nextAction ===  nextAction) {
            $scope.groupModelArray.push(object[nextAction]);
            if (nextAction) {
                sortGroups(object, nextAction);
            }
        }
    }

    if ($scope.templateId) {
        eventSvc.get('/event/Template/getProductPost').then(function (postProdResponse) {
            $scope.postsProducts = postProdResponse;
            eventSvc.get('/event/Template/getTemplate/' + $scope.templateId).then(function (response) {
                $scope.template.name = response.translations[0].name;
                $scope.template.description = response.translations[0].description;
                $scope.templatePosts = response.posts;
                $scope.templateProducts = response.products;
                $scope.postsProducts.posts.map(function (post) {
                    $scope.templatePosts.map(function (templatePost) {
                        if (post.id === templatePost.id) {
                            post.inTemplate = true;
                        }
                    })
                })
                $scope.postsProducts.products.map(function (product) {
                    $scope.templateProducts.map(function (templateProduct) {
                        if (product.id === templateProduct.id) {
                            product.inTemplate = true;
                        }
                    })
                })
            });
        })
    } else {
        window.location.href = '/event/Template/myTemplates';
    }

    eventSvc.get('/event/Template/getTemplateGroupData?eventTemplateId=' + $scope.templateId).then(function(response) {
        console.log(response);
        for (var prop in response.modelList) {
            response.modelList[prop].modelDataObject = {};
            response.modelList[prop].modelData.map(function(data) {
                if (data.object_key === 'fixedPosition') {
                    response.modelList[prop].modelDataObject[data.object_key] = Number(data.value);
                } else {
                    response.modelList[prop].modelDataObject[data.object_key] = data.value;
                }
            })
        }
        $scope.eventModelArray = [];
        $scope.groupModelArray = [];
        $scope.eventModelArray.push(response.modelList.groupEventList, response.modelList.eventPrivatePublicInstructions, response.modelList.createEventInstructions);
        $scope.groupModelArray.push(response.modelList.groupEventList, response.modelList.createGroupInstructions);
        sortEvents(response.modelList, 'createEventInstructions');
        sortGroups(response.modelList, 'createGroupInstructions');
        
        $timeout(function() {
            for (var i = 0; i < $scope.eventModelArray.length; i++) {
                $scope.eventModelArray[i].modelDataObject.instructionTextHolder = $scope.eventModelArray[i].modelDataObject.instructionText;
                $scope.eventModelArray[i].modelDataObject.instructionText = $sce.trustAsHtml($scope.eventModelArray[i].modelDataObject.instructionText);
                if ($scope.eventModelArray[i].modelDataObject.instructionText2) {
                    $scope.eventModelArray[i].modelDataObject.instructionTextHolder2 = $scope.eventModelArray[i].modelDataObject.instructionText2;
                    $scope.eventModelArray[i].modelDataObject.instructionText2 = $sce.trustAsHtml($scope.eventModelArray[i].modelDataObject.instructionText2);
                }
                if (!$scope.eventModelArray[i].modelDataObject.fixedPosition) {
                    $('#eventModelHeader' + i).css({background: '#eee'});
                    $('#eventModelBody' + i).css({background: '#eee'});
                } else {
                    $('#eventModel' + i).css({cursor: 'move'});
                    $('#eventModel' + i).addClass('sortable');
                }
            }
            for (var i = 0; i < $scope.groupModelArray.length; i++) {
                $scope.groupModelArray[i].modelDataObject.instructionTextHolder = $scope.groupModelArray[i].modelDataObject.instructionText;
                $scope.groupModelArray[i].modelDataObject.instructionText = $sce.trustAsHtml($scope.groupModelArray[i].modelDataObject.instructionText);
                if ($scope.groupModelArray[i].modelDataObject.instructionText2) {
                    $scope.groupModelArray[i].modelDataObject.instructionTextHolder2 = $scope.groupModelArray[i].modelDataObject.instructionText2;
                    $scope.groupModelArray[i].modelDataObject.instructionText2 = $sce.trustAsHtml($scope.groupModelArray[i].modelDataObject.instructionText2);
                }
                if (!$scope.groupModelArray[i].modelDataObject.fixedPosition) {
                    $('#groupModelHeader' + i).css({background: '#eee'});
                    $('#groupModelBody' + i).css({background: '#eee'});
                } else {
                    $('#groupModel' + i).css({cursor: 'move'});
                    $('#groupModel' + i).addClass('sortable');
                }
            }
        }, 100);
        $scope.list = $scope.groupModelArray;
        resizeAndPosition();  
    })

    $scope.changeModels = function(modelName) {
        if (modelName === 'event') {
            $scope.list = $scope.eventModelArray;
        } else if (modelName === 'group') {
            $scope.list = $scope.groupModelArray;
        }
    }

    $scope.customizeModel = function(model, array, index) {
        windowScrollTop = $(window).scrollTop();
        if (model.modelDataObject.next === 'groupEventList') {
            return;
        }
        $scope.indexHolder.array = array;
        $scope.indexHolder.index = index;
        $scope.templateToEdit = model;
        $scope.modalShow = true;
        $('#myModal14').modal('show');
    }

    $scope.saveCustomizations = function(model) {
        $scope.templateToEdit.modelDataObject.instructionText = $sce.trustAsHtml($scope.templateToEdit.modelDataObject.instructionTextHolder);
        if ($scope.templateToEdit.instructionText2) {
            $scope.templateToEdit.modelDataObject.instructionText2 = $sce.trustAsHtml($scope.templateToEdit.modelDataObject.instructionTextHolder2);
        }
        $scope[$scope.indexHolder.array + 'ModelArray'][$scope.indexHolder.index] = $scope.templateToEdit;
        $('#myModal14').modal('hide');
    }

    /**
     * Modal Event Holder
     */

    $scope.showModal = function (type) {
        windowScrollTop = $(window).scrollTop();
        $scope.modalToDisplay = type;
        $scope.modalShow = true;
        $scope.content = true;
    }

    /**
     * Submit Template
     */
    $scope.submitForm = function () {
        var warning = [];
        if (!$scope.template.name) {
            warning.push('Template name cannot be empty.');
        }
        if (!$scope.template.description) {
            warning.push('Template description cannot be empty.');
        }
        if ($scope.templatePosts.length === 0) {
            warning.push('Must have at least one post selected.');
        }
        if ($scope.templateProducts.length === 0) {
            warning.push('Must have at least one product selected.');
        }
        if (warning.length > 0) {
            warning.map(function (error, index) {
                setTimeout(function (error) {
                    toastr.error(error);
                }, (index * 100), error);
            });
            return false;
        }  

        $scope.template.templateId = $scope.templateId;
        $scope.template.templatePosts = JSON.stringify($scope.templatePosts);
        $scope.template.templateProducts = JSON.stringify($scope.templateProducts);
        /**
         * Call Service To Ensure Save
         */
        console.log($scope.template);

        eventSvc.post("/event/Template/save", $scope.template).then(function (result) {
            console.log(result);
            /**
             * Check for failed Ajax
             */
            if (result === false) {
                $state.go('error');
                return;
            }
            /**
             * Check for error in PHP save
             */
            if (result.result == false) {
                $state.go('error');
                return;
            }

            /* re-construct model list data to be saved */
            var modelListHolder = {};
            for (var i = 0; i < $scope.eventModelArray.length; i++) {
                $scope.eventModelArray[i].modelDataObject.instructionText = $scope.eventModelArray[i].modelDataObject.instructionTextHolder;
                delete $scope.eventModelArray[i].modelDataObject.instructionTextHolder;
                if ($scope.eventModelArray[i].modelDataObject.instructionText2) {
                    $scope.eventModelArray[i].modelDataObject.instructionText2 = $scope.eventModelArray[i].modelDataObject.instructionTextHolder2;
                    delete $scope.eventModelArray[i].modelDataObject.instructionTextHolder2;
                }
                modelListHolder[$scope.eventModelArray[i].modelDataObject.next] = $scope.eventModelArray[i];
            }
            for (var i = 0; i < $scope.groupModelArray.length; i++) {
                $scope.groupModelArray[i].modelDataObject.instructionText = $scope.groupModelArray[i].modelDataObject.instructionTextHolder;
                delete $scope.groupModelArray[i].modelDataObject.instructionTextHolder;
                if ($scope.groupModelArray[i].modelDataObject.instructionText2) {
                    $scope.groupModelArray[i].modelDataObject.instructionText2 = $scope.groupModelArray[i].modelDataObject.instructionTextHolder2;
                    delete $scope.groupModelArray[i].modelDataObject.instructionTextHolder2;
                }
                modelListHolder[$scope.groupModelArray[i].modelDataObject.next] = $scope.groupModelArray[i];
            }
            for (var prop in modelListHolder) {
                for (var i = 0; i < modelListHolder[prop].modelData.length; i++) {
                    var holder = modelListHolder[prop].modelDataObject[modelListHolder[prop].modelData[i].object_key];
                    if (holder) {
                        modelListHolder[prop].modelData[i].value = holder.toString();
                    }
                }
                if (modelListHolder[prop].required) {
                    modelListHolder[prop].required = 1;
                } else {
                    modelListHolder[prop].required = 0;
                }
                if (modelListHolder[prop].showAnyway) {
                    modelListHolder[prop].showAnyway = 1;
                } else {
                    modelListHolder[prop].showAnyway = 0;
                }
                if (modelListHolder[prop].override) {
                    modelListHolder[prop].override = 1;
                } else {
                    modelListHolder[prop].override = 0;
                }
                delete modelListHolder[prop].modelDataObject;
            }
            
            var modelListData = {};
            modelListData.modelList = JSON.stringify(modelListHolder);
            console.log(modelListData);

            eventSvc.post('/event/Template/saveTemplateGroupData?eventTemplateId=' + result.id, modelListData).then(function(response) {
                console.log(response);
                //Y'all Move Along Now
                window.location.href = '/event/Template/myTemplates';
            })
        });
    }

    $scope.switchCheckbox = function(model, prop) {
        if (!model.hasOwnProperty(prop)) {
            model[prop] = true;
        } else {
            model[prop] = !model[prop];
        }
    }

    $scope.viewModelExample = function(model) {
        windowScrollTop = $(window).scrollTop();
        if (model.modelDataObject.video) {
            eventSvc.post('/event/Event/getMediaRequest?mediaLibraryId=' + model.modelDataObject.video).then(function(videoQueryResponse) {
                $scope.templateToDisplay = model;
                $scope.templateToDisplay.modelDataObject.videoId = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + videoQueryResponse.media.code);
                $scope.modalShow = true;
                $('#myModal12').modal('show');
            })
        } else {
            $scope.templateToDisplay = model;
            $scope.modalShow = true;
            $('#myModal12').modal('show');
        }
    }

    $(window).resize(function () {
        resizeAndPosition();    
    });
}