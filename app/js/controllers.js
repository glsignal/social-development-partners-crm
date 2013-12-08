'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('organisationList', ["$scope", "$rootScope", "angularFireCollection",
  function($scope, $rootScope, angularFireCollection) {
    var cntcts = new Firebase("https://sdp-cms.firebaseio.com/contacts");
    var cntctsArray;
    $scope.massiveDump = []; 
    $scope.generateExportableData = function(massiveArray) {
      //console.log(contactsArray);
      angular.forEach(massiveArray, function(oldObj, key){
        console.log(oldObj, key);
        var newObject = {
          "Organisation": quote(oldObj.name),
          "Date Joined": quote(oldObj.datejoined),
          "Principal Contact": quote(isDefined(oldObj, 'principal', 'firstname') + " " + isDefined(oldObj, 'principal', 'lastname')), 
          "Primary Email": quote(isDefined(oldObj, 'principal', 'email')) ,
          "Primary Phone": quote(isDefined(oldObj, 'principal', 'landline')) ,
          "Address": quote(isDefined(oldObj, 'address', 'address1') + ", " + isDefined(oldObj, 'address', 'address2')) ,
          "City": quote(isDefined(oldObj, 'address', 'city')),
          "Postcode": quote(isDefined(oldObj, 'address', 'postcode')),
          "Street Address": quote(isDefined(oldObj, 'address', 'streetaddress') + ", " + isDefined(oldObj, 'address', 'suburb'))
        }
        $scope.massiveDump.push(newObject);
      });
      console.log($scope.massiveDump);

      function quote(str) {
        if (typeof(str) === "string") {
          // console.log(str);
          if (str.indexOf(",") >= 0 || str.indexOf("\"") >= 0) {
            if (str.indexOf("\"") >= 0) {
              str = str.replace("\"", "\"\"");
            }
            str = "\"" + str + "\"";
          }
        }
        return str;
      };
      
      function isDefined(oldObj, parent, child) {
        if(oldObj[parent] == undefined) {
          return "N/A";
        }
        else {
          var childVal = oldObj[parent][child];
          if (childVal == null) {
            return "N/A";
          }
          else {
            return childVal;
          }
        }
      };
    };

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
        
        $scope.generateExportableData(orgArray); 
      });

    });
  }
])
  .controller('contactList', ["$scope", "$rootScope", "angularFireCollection",
    function($scope, $rootScope, angularFireCollection) {
      var contacts = new Firebase("https://sdp-cms.firebaseio.com/contacts");
      $scope.contactsDump = []; 

      $scope.generateExportableData = function(contactsArray) {
        //console.log(contactsArray);
        for (var i = 0; i < contactsArray.length; i++) {
          var oldObj = contactsArray[i];
          //console.log(oldObj);
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
        }
      }

      var orgs = new Firebase("https://sdp-cms.firebaseio.com/organisations");
      angularFireCollection(orgs, function(org) {
        var orgArray = org.val();
        angularFireCollection(contacts, function(i) {
            var cntctArray = i.val();
            $scope.generateExportableData(cntctArray); 
            var emailBuffer = "";
            angular.forEach(cntctArray, function(contact, key) {
              var orgId = contact.organisation;
              contact.id = key;
              if (orgId != null) {
                var contactOrg = orgArray[orgId];
                if (contactOrg != null) {
                  contactOrg.id = orgId;
                  contact.organisation = contactOrg;
                }
                else {
                  console.log("Organisation " + orgId + " not found");
                }
                //console.log(contact);
              }
              else {
                console.log("Contact without organisation!");
                console.log(contact);
              }

              if (contact.email != null) {
                emailBuffer += (contact.firstname == null ? '' : contact.firstname) + "|" + (contact.lastname == null ? '' : contact.lastname) + "|" + contact.email + ",";
              }
              else {
                console.log("Contact without email! " + key);
              }
            });
            emailBuffer = emailBuffer.substring(0, emailBuffer.length - 1);
            $scope.contacts = cntctArray;
            $scope.mailChimpData = emailBuffer;
        });
      });
      //console.log($scope.contactsDump);
    }
  ])
  .controller('singleOrganisation', ["$scope", "$rootScope", "angularFire", "angularFireCollection", "$routeParams",
    function($scope, $rootScope, angularFire, angularFireCollection, $routeParams) {
        var payments = new Firebase("https://sdp-cms.firebaseio.com/organisations/" + $routeParams.id + "/payments/");

        angularFire(payments, $scope, 'payments');

        //This doesn't frekin work!
        angular.forEach($scope.payments, function(pmnt, key){
            pmnt.status = "unpaid";
            if (pmnt.amountpaid > 0) {
                pmnt.status = "paid";
            }
        });

        var ref = new Firebase("https://sdp-cms.firebaseio.com/organisations/" + $routeParams.id);
        angularFire(ref, $scope, "organisation");
    }
  ])
  .controller('addOrganisation', ["$scope", "$rootScope", "$location", "angularFireCollection",
        function($scope, $rootScope, $location, angularFireCollection) {
            $scope.orgs = new Firebase("https://sdp-cms.firebaseio.com/organisations/");
            $scope.addOrg = function(org) {
                console.log("Running Add Org");
                var id = $scope.orgs.push(org).name();
                $scope.id = id;
                $location.path( '/organisation/' + id + '/').replace();
            };
        }
    ])
  .controller('addContact', ["$scope", "$rootScope", "$location", "angularFireCollection",
      function($scope, $rootScope, $location, angularFireCollection) {
          $scope.contacts = new Firebase("https://sdp-cms.firebaseio.com/contacts/");
          $scope.addContact = function(contact) {
              var id = $scope.contacts.push(contact).name();
              $scope.id = id;
              $location.path( '/contact/' + id + '/').replace();
          };
      }
  ])
  .controller('singleContact', ["$scope", "$rootScope", "angularFire", "$routeParams",
   function($scope, $rootScope, angularFire, $routeParams) {
    var ref = new Firebase("https://sdp-cms.firebaseio.com/contacts/" + $routeParams.id);
    angularFire(ref, $scope, "contact");
   }
  ])
