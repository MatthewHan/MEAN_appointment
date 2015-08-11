var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller: 'AppointmentsController',
		controllerAs: 'apptsCtrl',
		templateUrl: '/partials/appointments.partial.html'
	})
	.when('/new', {
		controller: 'AppointmentsController',
		controllerAs: 'apptsCtrl',
		templateUrl: '/partials/new.partial.html'
	})

	.otherwise('/');
})