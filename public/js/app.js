(function () {
  angular.module("WeatherApp", []) //add ngSanatize
    .controller("WeatherController", WeatherController);

  function WeatherController($scope, $http) {
    $scope.createWeather = createWeather;

    // Things to load first
    function init() {
      //getAllPosts();
    }
    init(); // call init

    function clearFields() {
      $scope.city.name = "";
    }

    // Create a post
    function createWeather(city) {
      console.log(city);
      console.log(typeof(city));

      $http
        .post("/api/weather", city) // not saying which one so must be all
        .then(function(res) {
          $scope.weather = res.data;
            console.log(res.data);
            console.log(res.data.summary);
            console.log(res.data.temperature);
            clearFields();
        });
    }
  }

})();
