'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/members', {templateUrl: 'partials/members.html', controller: 'memberList'});
  $routeProvider.when('/contacts', {templateUrl: 'partials/contacts.html', controller: 'contactList'});
  $routeProvider.when('/contact/:id', {templateUrl: 'partials/contact.html', controller: 'singleContact'});
  $routeProvider.when('/member/:id', {templateUrl: 'partials/member.html', controller: 'singleMember'});
  $routeProvider.otherwise({redirectTo: '/members'});
}]);

