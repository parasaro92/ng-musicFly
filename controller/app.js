var myApp = angular.module('myApp',['ngMaterial', 'ngRoute', 'ngResource', 'material.svgAssetsCache', 'ui.bootstrap', 'ngAnimate']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider.
    when('/', {
      templateUrl: 'pages/music-list.html',
      controller: 'MusicCtrl',
      controllerAs: 'music'
    }).
    // when('/:id', {
    //   templateUrl: 'pages/music-list.html',
    //   controller: 'MusicCtrl',
    //   controllerAs: 'music'
    // }).
    when('/new', {
      templateUrl: 'pages/new-song.html',
      controller: 'GenreCtrl',
      controllerAs: 'genre'
    }).
    
    otherwise({
      redirectTo: '/'
    });
}]);