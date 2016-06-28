var myApp = angular.module('myApp',['ngMaterial', 'ngRoute', 'ngResource', 'material.svgAssetsCache', 'ui.bootstrap', 'ngAnimate']);

myApp.config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
  // $httpProvider.defaults.headers.get = { 'X-Auth-Token' : 'e3645ed0f9d647b09d963cb8bdb68ec7' }

  $routeProvider.
    when('/', {
      templateUrl: 'pages/music-list.html',
      controller: 'MusicCtrl',
      controllerAs: 'music'
    }).
    when('/new', {
      templateUrl: 'pages/new-song.html',
      controller: 'MusicCtrl',
      controllerAs: 'music'
    }).
    when('/edit/:id', {
      templateUrl: 'pages/new-song.html',
      controller: 'MusicCtrl',
      controllerAs: 'music'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);