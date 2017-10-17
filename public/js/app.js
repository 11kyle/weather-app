(function () {
  angular.module("WeatherApp", []) //add ngSanatize
    .controller("WeatherController", WeatherController);

  function WeatherController($scope, $http) {
    $scope.createWeather = createWeather;

    var input = document.getElementById('inputCity');
    var options = {
      types: ['(cities)']
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    var place = '';
    var name = '';
    var latitude = '';
    var longitude = '';

    // Things to load first
    function init() {
      $scope.city = {
        name: 'Denver, CO, United States',
        latitude: 39.7392358,
        longitude: -104.990251
      }

      // Google autocomplete
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        place = autocomplete.getPlace();
        name = place.formatted_address;
        latitude = place.geometry.location.lat();
        longitude = place.geometry.location.lng();
        $scope.city.name = name.replace(/[0-9]/g, '');
      });

      createWeather($scope.city);
    }

    init();

    function clearFields() {
      $scope.city.name = "";
    }

    // Create a post
    function createWeather(city) {



      if ($scope.currentCity) {
        city.name = name;
        city.latitude = latitude;
        city.longitude = longitude;
      }

      $scope.currentCity = $scope.city.name;
      
      console.log(city);
      // Display city in h1
      //$scope.currentCity = $scope.city.name;

      // This won't get executed when invoked from init()


      $http
        .post("/api/weather", city) // not saying which one so must be all
        .then(function(res) {
          $scope.weather = res.data;
          // Current day
          console.log(res.data);
          // Week
          //console.log(res.data.daily.data);
          clearFields();
        });
    }
  }

})();
