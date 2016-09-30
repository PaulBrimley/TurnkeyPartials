angular.module('eventPlanner').controller('liveEventCreateCtrl', function ($scope, $timeout, eventSvc) {

    /*
     Global Functions
     */
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

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

    /*
     INIT
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

    var QueryString = function () {
      // This function is anonymous, is executed immediately and 
      // the return value is assigned to QueryString!
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
            // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
          query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
          query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
      } 
      return query_string;
    }();

    $('#myModal8').on('hidden.bs.modal', function () {
        resizeAndPosition();
        $scope.nameToSearch = '';
        $scope.modalShow = false;
        $scope.$apply();
    })
    
    function resizeAndPosition() {
        waitForFinalEvent(function(){
            if( isBreakpoint('xs') ) {
                setTimeout(function() {
                    $('.contentFooter-fixed').css({right: '30px'});
                    $('.rightAlignHolder').removeClass('textAlignRight');
                    $('.rightAlignHolder').addClass('marginBottomFive');
                    $('.halfWidthHolder').removeClass('widthFiftyOne');
                    for (var i = 0; i < $scope.event.administrators.length; i++) {
                        $('#adminHolder' + i).css({clear: 'none'});
                    }
                }, 100)
            }

            if( isBreakpoint('sm') ) {
                setTimeout(function() {
                    $('.contentFooter-fixed').css({right: '55px'});
                    $('.rightAlignHolder').addClass('textAlignRight');
                    $('.rightAlignHolder').removeClass('marginBottomFive');
                    $('.halfWidthHolder').addClass('widthFiftyOne');
                    for (var i = 0; i < $scope.event.administrators.length; i++) {
                        $('#adminHolder' + i).css({clear: 'none'});
                        if (i % 3 === 0) {
                            $('#adminHolder' + i).css({clear: 'both'});
                        }
                    }
                }, 100)
            }

            if( isBreakpoint('md') ) {
                setTimeout(function() {
                    $('.contentFooter-fixed').css({right: '55px'});
                    $('.rightAlignHolder').addClass('textAlignRight');
                    $('.rightAlignHolder').removeClass('marginBottomFive');
                    $('.halfWidthHolder').addClass('widthFiftyOne');
                    for (var i = 0; i < $scope.event.administrators.length; i++) {
                        $('#adminHolder' + i).css({clear: 'none'});
                        if (i % 3 === 0) {
                            $('#adminHolder' + i).css({clear: 'both'});
                        }
                    }
                }, 100)
            }

            if( isBreakpoint('lg') ) {
                setTimeout(function() {
                    $('.contentFooter-fixed').css({right: '55px'});
                    $('.rightAlignHolder').addClass('textAlignRight');
                    $('.rightAlignHolder').removeClass('marginBottomFive');
                    $('.halfWidthHolder').removeClass('widthFiftyOne');
                    for (var i = 0; i < $scope.event.administrators.length; i++) {
                        $('#adminHolder' + i).css({clear: 'none'});
                        if (i % 4 === 0) {
                            $('#adminHolder' + i).css({clear: 'both'});
                        }
                    }
                }, 100)
            }
        }, 0, fullDateString.getTime());
    }

    $scope.adminEventRoles;
    $scope.adminRoleArray = [];
    $scope.availableTimeZones = [];
    $scope.selectedAdminType = '';
    $scope.availableAdmins = [];
    $scope.event = {};
    $scope.event.group = [];
    $scope.event.administrators = [];
    $scope.event.templateId = QueryString.templateId;
    $scope.modalShow = false;
    $scope.nameSearchPlaceholder = 'Enter name to search...';
    $scope.nameToSearch = '';

    var today = new Date();
    $scope.dayHolder = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    $scope.timeHolder = '12:00 AM';

    $("#adminSearch").validate({
        errorPlacement: function(error, element) {
            $( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );
        },
        errorElement: "span",
    });

    $('#datepicker1').datepicker({container: '#datepicker'});
    $('#datepicker1').blur(function (event) {
        if (event.target.value === "") {
            $scope.dayHolder = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            $scope.$apply();
        }
    });

    $('#timepicker1').timepicker('setTime', '12:00 AM');
    $('#timepicker1').change(function (event) {
        $scope.timeHolder = event.target.value;
        $scope.$apply();
    });    

    /**
     * Get Template
     */
    eventSvc.get('/event/Template/getTemplate/' + $scope.event.templateId).then(function (response) {
        $scope.event.name = response.translations[0].name;
        $scope.event.description = response.translations[0].description;
        $scope.event.when = response.start_when;
        $scope.event.time = response.start_time;
        /**
         * Get Roles
         */
        eventSvc.get('/event/LiveEvent/adminEventRoles').then(function (response) {

            if (response.roles)
                $scope.event.roleArray=response.roles.map(function(role){
                    return role;
                });
            else
                return [];
        });
        /**
         * Get Groups
         */
        eventSvc.get('/event/LiveEvent/getGroups').then(function (response) {
            console.log(response);
            if (response.groups)
                $scope.event.groups=response.groups.map(function(group){
                    return group;
                });
            else
                return [];
        });
        resizeAndPosition();
    });

    eventSvc.get('/common/Index/getTimezones').then(function(response) {
        for (var prop in response) {
            $scope.availableTimeZones.push({zone: prop, value: response[prop]})
        }
    })

    /**
     * Modal Close
     */
    $scope.closeModal = function () {
        
        var newAdminArray = [];
        var warning = [];
        
        $scope.availableAdmins.map(function(availableAdmin) {
            if (availableAdmin.selected) {
                var checker = false;
                if (availableAdmin.roles) {
                    for (var prop in availableAdmin.roles) {
                        if (availableAdmin.roles[prop]) {
                            checker = true;
                        }
                    }
                }
                if (!checker) {
                    warning.push('Must have at least one administrator role selected for: ' +  availableAdmin.name);
                }
            }
        })

        if (warning.length > 0) {
            warning.map(function (error, index) {
                setTimeout(function (error) {
                    toastr.error(error);
                }, (index * 100), error);
            });
            return false;
        }

        newAdminArray = $scope.availableAdmins.reduce(function (prev, curr, index, array) {
            if (curr.selected === true) {
                prev.push(curr);
                return prev;

            } else
                return prev;

        }, []);

        newAdminArray.map(function (newAdmin) {
            for (var prop in newAdmin.roles) {
                if (newAdmin.roles[prop]) {
                    $scope.event.roleArray.map(function(adminRole) {
                        if (prop === adminRole.label) {
                            newAdmin.role.push(adminRole);
                        }
                    })
                }
            }
        });

        newAdminArray.map(function(newAdmin) {
            $scope.event.administrators.push(newAdmin);
        })
        
        $('#myModal8').modal('hide');
        $scope.modalShow = false;
        $scope.nameToSearch = '';
        $scope.availableAdmins = [];
    };

    /**
     * Remove Admin
     * @param index
     */
    $scope.removeAdmin = function (index) {
        $scope.event.administrators.splice(index, 1);
    };

    /**
     * Selected a role
     */

    $scope.roleCheckboxSelected = function(admin) {
        var checker = false;
        for (var prop in admin.roles) {
            if (admin.roles[prop]) {
                checker = true;
            }
        }

        if (checker) {
            admin.selected = true;
        } else {
            admin.selected = false;
        }
    }

    $scope.roleSelected = function (admin, role) {
        if (!admin.roles) {
            admin.roles = {};
            admin.roles[role.label] = true;
        } else if (admin.roles[role.label]) {
            admin.roles[role.label] = false;
        } else if (!admin.roles[role.label]) {
            admin.roles[role.label] = true;
        }
        var checker = false;
        for (var prop in admin.roles) {
            if (admin.roles[prop]) {
                checker = true;
            }
        }

        if (checker) {
            admin.selected = true;
        } else {
            admin.selected = false;
        }
    };

    /**
     * Save Live Event
     */
    $scope.saveEvent = function () {
        var warning = [];
        var presentorCheck = false;
        $scope.event.administrators.map(function(presentor) {
            presentor.role.map(function(role) {
                if (role.key === 'presenter') {
                    presentorCheck = true;
                }
            })
        })
        var groupHolder = []
        $scope.event.groups.map(function(group) {
            if (group.selected) {
                groupHolder.push(group);
            }
        })
        $scope.event.group = groupHolder;
        console.log($scope.event.group);

        if ($scope.event.administrators.length === 0)
            warning.push('Must have at least one administrator selected.');

        if (!presentorCheck)
            warning.push('Must have at least one administrator with a role as presentor.');

        if ($scope.event.group.length === 0)
            warning.push('Must choose at least one group');

        if (!$scope.event.name)
            warning.push('Must have an event name.');

        if (!$scope.event.description)
            warning.push('Must have an event description.');

        if (!$scope.dayHolder)
            warning.push('Must select an event day.');

        if (!$scope.timeHolder)
            warning.push('Must select an event time.');

        if (!$scope.event.timeZone)
            warning.push('Must select an event time zone.');

        if (warning.length > 0) {
            warning.map(function (error, index) {
                setTimeout(function (error) {
                    toastr.error(error);
                }, (index * 100), error);
            });
            return false;
        }

        /**
         * Manage Data Before Ajax
         */

        $scope.event.date = $scope.dayHolder + ' ' + $scope.timeHolder;

        /**
         * Deep copy of object before we strigify for some of the more complex
         * objects in case we ever need the info before we redirect
         */
        $scope.tempEvent = angular.copy($scope.event);

        $scope.tempEvent.administrators = JSON.stringify($scope.event.administrators);
        $scope.tempEvent.group = JSON.stringify($scope.event.group);
        $scope.tempEvent.timeZone = $scope.event.timeZone.zone;
        /**
         * Save
         */
        console.log($scope.tempEvent);
        eventSvc.post('/event/LiveEvent/save', $scope.tempEvent).then(function (response) {
            console.log(response);
            if(response.result) {
                window.location.href = "/event/LiveEvent/myLiveEvents"
            }
        });
    };

    /**
     * Search Administrator
     */
    $scope.searchName = function () {
        $scope.availableAdmins = [];
        if (!$scope.nameToSearch) {
            $scope.nameSearchPlaceholder = 'Please enter a name to search...';
            $('#nameSearchInput').addClass('inputError');
            return;
        } else {
            $('#nameSearchInput').removeClass('inputError');
        }
        eventSvc.post('/event/LiveEvent/search', {name: $scope.nameToSearch}).then(function (response) {
            if (response.administrators) {

                response.administrators.map(function (e) {
                    for (var i = 0; i < $scope.event.administrators.length; i++) {
                        if ($scope.event.administrators[i].name === e.name) {
                            return;
                        }
                    }
                    $scope.availableAdmins.push({
                        selected: false,
                        userImg: e.image,
                        name: e.name,
                        id: e.id,
                        role: []
                    });
                });
                $('#myModal8').modal('show');
            }
        });
    }

    $scope.selectAdmin = function(admin) {
        admin.selected = !admin.selected;
        if (!admin.selected){
            for (var prop in admin.roles) {
                admin.roles[prop] = false;
            }
        }
    }

    $scope.selectAdminCheckbox = function(admin) {
        if (!admin.selected){
            for (var prop in admin.roles) {
                admin.roles[prop] = false;
            }
        }
    }

    /**
     * Open Model
     */
    $scope.showModal = function () {
        $scope.modalShow = true;
    };

    /**
     * Modal Watch
     */
    $scope.$watch('modalShow', function (newValue, oldValue) {
        if (newValue !== false) {
            $(document.body).parent().css({overflow: 'hidden'});
        } else {
            $(document.body).parent().css({overflow: 'visible'});
        }
    });

    $(window).resize(function () {
        resizeAndPosition();    
    });

});