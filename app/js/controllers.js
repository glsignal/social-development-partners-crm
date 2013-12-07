'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('memberList', ["$scope", "$rootScope", "angularFireCollection",
  function($scope, $rootScope, angularFireCollection) {
    var orgs = new Firebase("https://sdp-cms.firebaseio.com/organisations");
    $scope.organisations = angularFireCollection(orgs, function(i) {});
  }
])
  .controller('contactList', ["$scope", "$rootScope", "angularFireCollection",
    function($scope, $rootScope, angularFireCollection) {
      var orgs = new Firebase("https://sdp-cms.firebaseio.com/organisations");
      $scope.organisations = angularFireCollection(orgs, function(i) {});
    }
  ])
  .controller('singleContact', ["$scope", "$rootScope", "angularFire", "$routeParams",
    function($scope, $rootScope, angularFire, $routeParams) {
      var ref = new Firebase("https://sdp-cms.firebaseio.com/contacts/" + $routeParams.id);
      angularFire(ref, $scope, "contact");
    }
  ])
  .controller('singleMember', ["$scope", "$rootScope", "angularFire", "$routeParams",
    function($scope, $rootScope, angularFire, $routeParams) {
      var ref = new Firebase("https://sdp-cms.firebaseio.com/members/" + $routeParams.id);
      angularFire(ref, $scope, "member");
    }
  ])
