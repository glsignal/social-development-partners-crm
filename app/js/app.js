'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ngSanitize', 
  'ngCsv'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/organisations', {templateUrl: '/app/partials/organisations.html', controller: 'organisationList'});
  $routeProvider.when('/contacts', {templateUrl: '/app/partials/contacts.html', controller: 'contactList'});
  $routeProvider.when('/contact/:id', {templateUrl: '/app/partials/contact.html', controller: 'singleContact'});
  $routeProvider.when('/organisation/:id', {templateUrl: '/app/partials/organisation.html', controller: 'singleOrganisation'});
  $routeProvider.when('/mailchimp', {templateUrl: 'partials/mailchimp.html', controller: 'contactList'});
  $routeProvider.otherwise({redirectTo: '/organisations'});
}]);

