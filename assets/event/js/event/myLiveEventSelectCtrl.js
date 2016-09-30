angular.module('eventPlanner').controller('myLiveEventSelectCtrl', myLiveEventSelectCtrl);


function myLiveEventSelectCtrl($scope, $sce, $timeout, eventSvc) {
    
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

    function resizeAndPosition() {
        setTimeout(function() {
            $('.blankHostImage').height($('.blankHostImage').width());
        })

        waitForFinalEvent(function(){
            if( isBreakpoint('xs') ) {
                setTimeout(function() {
                    $('.rightAlignHolder').removeClass('textAlignRight');
                    $('.rightAlignHolder').addClass('marginBottomFive');
                    for (var i = 0; i < $scope.events.length; i++) {
                        $('#event' + i).css({clear: 'none'});
                        $('#blank').css({clear: 'none'});
                        if (i % 2 === 0) {
                            $('#event' + i).css({clear: 'both'});
                        } else {
                            $('#blank').css({clear: 'both'});
                        }
                    }
                }, 100)
            }

            if( isBreakpoint('sm') ) {
                setTimeout(function() {
                    $('.rightAlignHolder').addClass('textAlignRight');
                    $('.rightAlignHolder').removeClass('marginBottomFive');
                    $('.eventSelectButton').addClass('btn-block');
                    for (var i = 0; i < $scope.events.length; i++) {
                        $('#event' + i).css({clear: 'none'});
                        $('#blank').css({clear: 'none'});
                        if (i % 2 === 0) {
                            $('#event' + i).css({clear: 'both'});
                        } else {
                            $('#blank').css({clear: 'both'});
                        }
                    }
                }, 100)
            }

            if( isBreakpoint('md') ) {
                setTimeout(function() {
                    $('.rightAlignHolder').addClass('textAlignRight');
                    $('.rightAlignHolder').removeClass('marginBottomFive');
                    $('.eventSelectButton').removeClass('btn-block');
                    for (var i = 0; i < $scope.events.length; i++) {
                        $('#event' + i).css({clear: 'none'});
                        $('#blank').css({clear: 'none'});
                        if (i % 2 === 0) {
                            $('#event' + i).css({clear: 'both'});
                        } else {
                            $('#blank').css({clear: 'both'});
                        }
                    }
                }, 100)
            }

            if( isBreakpoint('lg') ) {
                setTimeout(function() {
                    $('.rightAlignHolder').addClass('textAlignRight');
                    $('.rightAlignHolder').removeClass('marginBottomFive');
                    $('.eventSelectButton').removeClass('btn-block');
                    for (var i = 0; i < $scope.events.length; i++) {
                        $('#event' + i).css({clear: 'none'});
                        $('#blank').css({clear: 'none'});
                        if (i % 2 === 0) {
                            $('#event' + i).css({clear: 'both'});
                        } else {
                            $('#blank').css({clear: 'both'});
                        }
                    }
                }, 100)
            }
        }, 0, fullDateString.getTime());
    }   

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

    $scope.events;
    $scope.emptySlots = [];
    $scope.gh1 = {
        instrucitonActionLink: 'https://plus.google.com/hangouts/onair',
        instructionText: $sce.trustAsHtml('<ol> <li> Click the button below to visit the Hangout On Air Page to schedule an event. </li> </ol>'),
        next: 'gh2',
        previous: '',
        title: 'Schedule a Hangouts on Air instructions:',
        videoUrl: $sce.trustAsResourceUrl('https://www.youtube.com/embed/O7zewtuUM_0')
    };
    $scope.gh2 = {
        instrucitonActionLink: '',
        instructionText: $sce.trustAsHtml('<ol> <li> Click "Create a Hangout On Air" </li> </ol>'),
        next: 'gh3',
        previous: 'gh1',
        title: 'Schedule a Hangouts on Air instructions:',
        videoUrl: $sce.trustAsResourceUrl('https://www.youtube.com/embed/cxIj6qKhTNM')
    };
    $scope.gh3 = {
        instrucitonActionLink: '',
        instructionText: $sce.trustAsHtml('<ol> <li> In the field "Give it a name", copy and paste the following: <div class="input-group"> <div class="copyTextToolTip"> <input id="copyThis1" type="text" class="form-control cursorText clipboardText" value="{{modalContent.name}}" ng-click="selectText($event)" readonly> </div> <span class="input-group-btn copyTextButtonToolTip"> <button type="button" class="btn btn-default clipboardBtn copyTextSuccess" data-clipboard-target="#copyThis1"><i class="fa fa-file-text-o" aria-hidden="true"></i></button> </span> </div> </li> <li> In the field "Tell people what it\'s about", copy and paste the following: <div class="copyTextToolTip"> <input id="copyThis1" type="text" class="form-control cursorText clipboardText" value="{{modalContent.description}}" ng-click="selectText($event)" readonly> </div> <span class="input-group-btn copyTextButtonToolTip"> <button type="button" class="btn btn-default clipboardBtn copyTextSuccess" data-clipboard-target="#copyThis1"><i class="fa fa-file-text-o" aria-hidden="true"></i></button> </span> </div> </li> <li> Select the tab "Later". </li> <li> Enter the following date and time in the date and time input areas: "{{modalContent.date | date: \'shortDate\'}} {{modalContent.date | date: \'shortTime\'}}". </li> <li> Click Share. </li></ol>'),
        next: 'gh4',
        previous: 'gh2',
        title: 'Schedule a Hangouts on Air instructions:',
        videoUrl: $sce.trustAsResourceUrl('https://www.youtube.com/embed/jcoXbpnXVcw')
    };
    $scope.gh4 = {
        instrucitonActionLink: '',
        instructionText: $sce.trustAsHtml('<ol> <li> After clicking share, you will be viewing your hangouts event page. </li> <li> In the "Details" box, click the <span class="glyphicon glyphicon-link reverse"></span> Links button. </li></ol>'),
        next: 'gh5',
        previous: 'gh3',
        title: 'Register Hangout On Air with SocialMedia Suite:',
        videoUrl: $sce.trustAsResourceUrl('https://www.youtube.com/embed/rif-nCS3T0M')
    };
    $scope.gh5 = {
        instrucitonActionLink: '',
        instructionText: $sce.trustAsHtml('<ol> <li> Copy and Paste the three fields (Event page, YouTube page, and Video embed) into the respective "Turnkey Hangout Registration" fields below. </li></ol>'),
        next: '',
        previous: 'gh4',
        title: 'Register Hangout On Air with SocialMedia Suite:',
        videoUrl: $sce.trustAsResourceUrl('https://www.youtube.com/embed/A8SI1Y6miCk')
    };
    $scope.hangout = {};
    $scope.hangout.id = null;
    $scope.modalContent = {};
    $scope.templateToDisplay = 'configureGHStep1';

    setTimeout(function() {
        $('.blankHostImage').height($('.blankHostImage').width());
        $('#myModal11').on('hidden.bs.modal', function() {
            $scope.templateToDisplay = 'configureGHStep1';
        });
    })    

    $scope.cancel = function() {
        $('#myModal11').modal('hide');
        $scope.templateToDisplay = 'configureGHStep1';
    }

    $scope.configureGoogleHangout = function(liveEventId) {
        $scope.hangout.id = liveEventId;
        eventSvc.post('/event/LiveEvent/getLiveEvent/'+$scope.hangout.id).then(function(response){
            console.log(response);
            if(!response.liveEvent)
                return -1;

            if(response.liveEvent){
                $scope.modalContent.name = response.liveEvent.name;
                $scope.modalContent.description = response.liveEvent.description;
                $scope.modalContent.date = new Date(response.liveEvent.eventDate);
                $scope.modalContent.videoId = $sce.trustAsResourceUrl('https://www.youtube.com/embed/O7zewtuUM_0');
                $('#myModal11').modal('show');
            }
        });
    }

    $scope.createEvent = function(event, index) {
        eventSvc.post('/event/Event/save?eventId=' + event.id).then(function(response) {
            console.log(response);
            window.location.href = '/event/Event/create/?eventId=' + response.eventId;
        })
    };

    $scope.createLiveEvent = function () {
        window.location.href = '/event/Template/select';
    };

    $scope.deleteLiveEvent = function (event, index) {
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this live event!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    eventSvc.get('/event/LiveEvent/delete/' + event.id).then(function (response) {
                        console.log(response);
                        $scope.getMyLiveEvents();
                        if (response.result) {
                            swal("Deleted!", "Your live event has been deleted.", "success");
                            resizeAndPosition();
                        }
                    })
                }
            });
    };

    $scope.editLiveEvent = function (liveEvent, index) {
        window.location.href = '/event/LiveEvent/editLiveEvent/?liveEventId=' + liveEvent.id;
    };

    $scope.getMyLiveEvents = function() {
        eventSvc.get('/event/LiveEvent/getMyLiveEvents').then(function (response) {
            console.log(response);
            $scope.events = response.liveEvents;
            if ($scope.events) {

                $scope.events.map(function(event) {
                    event.start = new Date(event.eventDate);
                    event.startable = (new Date().getTime() + (1000 * 60 * 15)) > event.start.getTime();
                    if (event.hangout.length === 0) {
                        event.configureGH = true;
                    } else if (event.hangout.length === undefined){
                        event.configureGH = false;
                    }
                })
                var eventHolder = _.sortBy($scope.events, '-start');
                $scope.events = eventHolder;
                resizeAndPosition();
                setTimeout(function() {
                    $('.eventHostsHolder').slick({
                        dots: true,
                        arrows: false
                    });
                })
            }
        });
    }
    $scope.getMyLiveEvents();

    $scope.next = function(action) {
        $scope.modalContent.videoId = $sce.trustAsResourceUrl('https://www.youtube.com/embed/QH091zFHdQ0');
        $scope.templateToDisplay = action;
    }

    $scope.previous = function(action) {
        $scope.templateToDisplay = action;
    }

    /**
     * Submit Informaiton
     * @returns {boolean}
     */
    $scope.submit = function() {
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

        eventSvc.post('/event/LiveEvent/saveHangouts',$scope.hangout).then(function(response){
            if(response.result){
                window.location.href = '/event/LiveEvent/myLiveEvents';
            }
        })
    }

    $scope.startEvent = function (event, index) {
        swal({
                title: "Are you sure?",
                text: "Once started in Social Suite, people will be prompted to join the live feed. To ensure people are not waiting on an empty feed, please start the event in Google Hangouts promptly once redirected.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Start",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    eventSvc.get('/event/LiveEvent/start/' + event.id).then(function (response) {
                        console.log(response);
                        if (response.result) {
                            var win = window.open(event.hangout.event, '_blank');
                            win.focus()
                            swal("Started!", "Your live event has been started in Social Suite.", "success");
                            window.location.href = '/event/Index/stream/?id=' + response.id;
                        }
                    })
                }
            });
        ;
    };

    $(window).resize(function () {
        resizeAndPosition();    
    });

}