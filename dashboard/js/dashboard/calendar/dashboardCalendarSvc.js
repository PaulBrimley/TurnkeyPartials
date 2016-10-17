angular.module('homer').service('dashboardCalendarSvc',function($http) {

	var baseUrl = '/BackOffice/Index/';

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	this.events = [
    {
      id: 003,
      title: 'Repeating Event',
      start: new Date(y, m, d-3, 16, 0),
      allDay: false,
      imageurl: '/StaticContent/BackOffice/images/dashboard/facebookIcon.png'
    },
    {
    	id: 004,
      title: 'Homer task',
      start: new Date(y, m, d + 5, 19, 0),
      allDay: false,
      imageurl: '/StaticContent/BackOffice/images/dashboard/twitterIcon.png'
    },
    {
      id: 005,
      title: 'Repeating Event',
      start: new Date(y, m, d+4, 16, 0),
      allDay: false,
      imageurl: '/StaticContent/BackOffice/images/dashboard/snapchatIcon.png'
    },
    {
    	id: 006,
      title: 'Meeting',
      start: new Date(y, m, d, 10, 30),
      allDay: false,
      imageurl: '/StaticContent/BackOffice/images/dashboard/instagramIcon.png'
    },
    {
    	id: 007,
      title: 'Lunch',
      start: new Date(y, m, d, 12, 0),
      allDay: false,
      imageurl: '/StaticContent/BackOffice/images/dashboard/lunchIcon.png'
    },
    {
    	id: 008,
      title: 'Birthday Party',
      start: new Date(y, m, d+1, 19, 0),
      allDay: false,
      imageurl: '/StaticContent/BackOffice/images/dashboard/birthdayIcon.png'
    },
    {
    	id: 009,
      title: 'Test for Google',
      start: new Date(y, m, 28),
      allDay: false,
      imageurl: '/StaticContent/BackOffice/images/dashboard/googleIcon.png'
    }
  ];

	this.getEventInfo = function(eventId) {
		return $http.get(baseUrl + 'geteventdetail/?', {params: {eventId: eventId}})
		.then(function(response) {
			return response.data;
		})
		.catch(function(err) {
			return err;
		})
	}
})