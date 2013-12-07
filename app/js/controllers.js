'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('organisationList', ["$scope", "$rootScope", "angularFireCollection",
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
          //console.log(org);
        }
        else {
          console.log("Org without a principal!");
          console.log(org);
        }
      });
      $scope.stuffedOrgs = orgArray;
    });
  }
])
  .controller('contactList', ["$scope", "$rootScope", "angularFireCollection",
    function($scope, $rootScope, angularFireCollection) {
      var contacts = new Firebase("https://sdp-cms.firebaseio.com/contacts");
      $scope.contacts = angularFireCollection(contacts, function(i) {});
    }
  ])
  .controller('singleOrganisation', ["$scope", "$rootScope", "angularFire", "$routeParams",
    function($scope, $rootScope, angularFire, $routeParams) {
      var ref = new Firebase("https://sdp-cms.firebaseio.com/organisations/" + $routeParams.id);
      angularFire(ref, $scope, "organisation");
    }
  ])
  .controller('singleContact', ["$scope", "$rootScope", "angularFire", "$routeParams",
   function($scope, $rootScope, angularFire, $routeParams) {
    var ref = new Firebase("https://sdp-cms.firebaseio.com/contacts/" + $routeParams.id);
    angularFire(ref, $scope, "contact");
   }
  ])
