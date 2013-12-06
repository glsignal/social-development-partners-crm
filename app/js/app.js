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
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'itemsCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.controller('itemsCtrl', ["$scope", "$rootScope", "angularFireCollection", function ($scope, $rootScope, angularFireCollection) {
    var ref = new Firebase("https://sdp-cms.firebaseio.com/organisations");
    $scope.items = angularFireCollection(ref, function(i){
        console.log(i.val());
    });
}]);

