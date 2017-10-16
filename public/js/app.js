(function () {
  angular.module("WeatherApp", []) //add ngSanatize
    .controller("WeatherController", WeatherController);

  function WeatherController($scope, $http) {
    $scope.createWeather = createWeather;

    var input = document.getElementById('inputCity');
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    var options = {
      types: ['(cities)']
    };

    // Things to load first
    function init() {
      $scope.city = {
        name: 'Denver, CO, United States'
      }

      createWeather($scope.city);
    }

    // Google autocomplete
    google.maps.event.addDomListener(window, 'load', init);
    /*
    function clearFields() {
      $scope.city.name = "";
    }
    */

    // Create a post
    function createWeather(city) {

      $scope.currentCity = input.value;
      console.log($scope.currentCity);
      
      if ($scope.currentCity) {
        city.name = $scope.currentCity;
      } else {
        $scope.currentCity = 'Denver, CO, United States';
      }

      $http
        .post("/api/weather", city) // not saying which one so must be all
        .then(function(res) {
          $scope.weather = res.data;
          // Current day
          console.log(res.data);
          // Week
          console.log(res.data.daily.data);
          //clearFields();
        });
    }
  }

})();
