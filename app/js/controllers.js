'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('memberList', ["$scope", "$rootScope", "angularFireCollection",
  function($scope, $rootScope, angularFireCollection) {
    var cntcts = new Firebase("https://sdp-cms.firebaseio.com/contacts");
    var cntctsArray
    $scope.contacts = angularFireCollection(cntcts, function(cntct){
      cntctsArray = cntct.val();
    });
    
    var orgs = new Firebase("https://sdp-cms.firebaseio.com/organisations");

    var orgArray
    $scope.organisations = angularFireCollection(orgs, function(org) {
      orgArray = org.val();
      angular.forEach(orgArray, function(org, key){
        //console.log(key);
        var principalId = org.principal;
        if (principalId != null) {
          var principalContact = cntctsArray[principalId];
          principalContact.id = principalId;
          org.principal = principalContact;
        }
        else {
          console.log("Org without a principal!");
          console.log(org);
        }
      });
      //console.log(orgArray);
    });
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
