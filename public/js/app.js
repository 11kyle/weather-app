(function () {
  angular.module("WeatherApp", []) //add ngSanatize
    .controller("WeatherController", WeatherController);

  function WeatherController($scope, $http) {
    $scope.createWeather = createWeather;

    // Things to load first
    function init() {
      $scope.city = {
        name: 'Denver'
      }
      createWeather($scope.city);
    }
    init(); // call init

    /*
    function clearFields() {
      $scope.city.name = "";
    }
    */

    // Create a post
    function createWeather(city) {
      console.log(city);

      $http
        .post("/api/weather", city) // not saying which one so must be all
        .then(function(res) {
          $scope.weather = res.data;
            console.log(res.data);
            console.log(res.data.currently.summary);

            // Week
            console.log(res.data.daily.data);
            //clearFields();
        });
    }
  }

})();
