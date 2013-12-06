'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('listMembers', ["$scope", "$rootScope", "angularFireCollection", function ($scope, $rootScope, angularFireCollection) {
    var ref = new Firebase("https://sdp-cms.firebaseio.com/organisations");
    $scope.items = angularFireCollection(ref, function(i){
        console.log(i.val());
    });
}])
  .controller('singleContact', ["$scope", "$rootScope", "angularFire", "$routeParams", function ($scope, $rootScope, angularFire, $routeParams) {
    var contactId = $routeParams.id;
    var ref = new Firebase("https://sdp-cms.firebaseio.com/contacts/" + contactId);
    angularFire(ref, $scope, "contact");
  }]);
