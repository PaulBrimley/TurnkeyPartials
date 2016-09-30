angular.module('homer').controller('dashboardCalendarCtrl', function($scope, $compile, dashboardCalendarSvc) {

  $scope.currentEvent = {};
  $scope.currentEvent.imageurl = '/loader.gif';
  
  $scope.clearCurrentEvent = function() {
    $scope.currentEvent = {};
    $scope.currentEvent.imageurl = '/loader.gif';
  };

  $scope.eventsF = function (start, end, timezone, callback) {
    var s = new Date(start).getTime() / 1000;
    var e = new Date(end).getTime() / 1000;
    var m = new Date(start).getMonth();
    var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
    callback(events);
  };

  $scope.eventTest = [dashboardCalendarSvc.events, $scope.eventsF];

  $scope.eventRender = function( event, element, view ) {
    if (event.imageurl) {
      element.find(".fc-event-time").context.innerHTML = '<div class="fc-content" data-toggle="modal" data-target="#myModal"><div style="background: url('+event.imageurl+') no-repeat center; background-size: contain; height="100%">&nbsp</div></div>';
      element.attr({
        'tooltip': event.title,
        'tooltip-append-to-body': true,
        'style': 'background-color: transparent; color: rgba(58, 135, 173, 1); border: none',
        'ng-click': 'getEventInfo($event, ' + event.id + ')'
      });
    } else {
      element.attr({
        'tooltip': event.title,
        'tooltip-append-to-body': true,
        'style': 'background-color: transparent; color: rgba(58, 135, 173, 1); border: none',
        'ng-click': 'getEventInfo('+element+', ' + event.id + ')'
      });
    }
    $compile(element)($scope);
  };

  $scope.getEventInfo = function(event, eventId) {
    
    dashboardCalendarSvc.getEventInfo(eventId)
      .then(function(response) {
        // $scope.currentEvent = response; /*** include when we get back information from the server ***/
        for (var i = 0; i < dashboardCalendarSvc.events.length; i++) {
          if (Number(response) === dashboardCalendarSvc.events[i].id) {
            $scope.currentEvent = dashboardCalendarSvc.events[i];
          }
        }
      })
      .catch(function(err) {
        console.log('err', err);
      });
  };

  $scope.uiConfig = {
    calendar:{
      height: 470,
      editable: true,
      header:{
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      eventRender: $scope.eventRender
    }
  };

})