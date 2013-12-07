'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('organisationList', ["$scope", "$rootScope", "angularFireCollection",
  function($scope, $rootScope, angularFireCollection) {
    var cntcts = new Firebase("https://sdp-cms.firebaseio.com/contacts");
    var cntctsArray
    $scope.contacts = angularFireCollection(cntcts, function(cntct){
      cntctsArray = cntct.val();
      var orgs = new Firebase("https://sdp-cms.firebaseio.com/organisations");

      //console.log(cntctsArray);

      $scope.organisations = angularFireCollection(orgs, function(org) {
        var orgArray = org.val();
        angular.forEach(orgArray, function(org, key){
          //console.log(key);
          var principalId = org.principal;
          org.id = key;
          if (principalId != null) {
            var principalContact = cntctsArray[principalId];
            if (principalContact != null) {
              principalContact.id = principalId;
              org.principal = principalContact;
            }
            else {
              console.log("Principal " + principalId + " not found");
            }
            //console.log(org);
          }
          else {
            console.log("Org without a principal!");
            console.log(org);
          }
        });
        $scope.stuffedOrgs = orgArray;
      });

    });
  }
])
  .controller('contactList', ["$scope", "$rootScope", "angularFireCollection",
    function($scope, $rootScope, angularFireCollection) {
      var contacts = new Firebase("https://sdp-cms.firebaseio.com/contacts");
      $scope.testDump = []; 
      $scope.contacts = angularFireCollection(contacts, function(i) {
        $scope.generateExportableData(); 
      });
      $scope.generateExportableData = function() {
        // console.log($scope.contacts);
        for (var i = 0; i < $scope.contacts.length; i++) {
          var oldObj = $scope.contacts[i];
          // console.log(oldObj);
          var newObject = {
            "First Name": oldObj.firstname,
            "Last Name": oldObj.lastname, 
            "Job Title": oldObj.jobtitle,
            "Company": oldObj.organisation, // TODO - REPLACE WITH RESOLVED ORG NAME.
            "E-mail Address": oldObj.email,
            "Primary Phone": oldObj.phone.landline, 
            "Other Phone": oldObj.phone.other
          }
          $scope.contactsDump.push(newObject);
        };
        console.log($scope.contactsDump);
      }
    }
  ])
  .controller('singleOrganisation', ["$scope", "$rootScope", "angularFire", "angularFireCollection", "$routeParams",
    function($scope, $rootScope, angularFire, angularFireCollection, $routeParams) {
      var payments = new Firebase("https://sdp-cms.firebaseio.com/organisations/" + $routeParams.id + "/payments/");
      angularFireCollection(payments, function(i) {
          var stuffedPmnts = i.val();
          angular.forEach(stuffedPmnts, function(pmnt, key){
              pmnt.id = key;
          });

          $scope.payments = stuffedPmnts;});
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
