(function(){
  angular.module("w2e",[])
  .controller("MainController",["$scope",
    function($scope){
      var map;
      var directionMap;
      var pos;
      var dest;
      $scope.reselect = function(){
        initMap();
      }
      var initMap = function() {
        console.log("initMap running")
        $scope.detecting = true;
        $scope.chosen = null;
        $scope.going = false;
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 2
        });


        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch({
            location: pos,
            radius: 500,
            types: ['restaurant']
          }, callback);
          }, function() {
            $scope.back = "please check your GPS is turned on"
          });
        } else {
          // Browser doesn't support Geolocation
            $scope.back = "please check your browser supports GPS"
        }
      }
      var callback = function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          rand = Math.floor(Math.random() * results.length )
          console.log(results[rand])
          dest = {lat:results[rand].geometry.location.lat(),lng:results[rand].geometry.location.lng()};
          $scope.$apply(function(){
                      $scope.detecting = false;
                      $scope.selected = results[rand];
                      $scope.chosen = results[rand].name;
                      $scope.address = results[rand].vicinity;
                  });  
          }
      }
      $scope.direction = function(){
        $scope.going = true;
        initDirection();
      }

      initMap();

      var initDirection =  function () {

    var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
      var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: pos,  
          destination: dest,  
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            google.maps.event.trigger(directionMap,"resize")
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
      var directionMap = new google.maps.Map(document.getElementById('directionMap'), {
        zoom: 14,
        center: pos
      });
      directionsDisplay.setMap(directionMap);
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      document.getElementById('mode').addEventListener('change', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      });
    }

    }])}())