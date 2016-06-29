myApp.filter('unique', function() {
    return function(collection, keyname) {
      var output = [],
      keys = [];

      angular.forEach(collection, function(item) {
        var key = item[keyname];
        if(keys.indexOf(key) === -1) {
          keys.push(key);
          output.push(item);
          // console.log(output);
        }
      });

      console.log(output);
      return output;
    };
});

myApp.controller('MusicCtrl', function(MusicService, $scope, $timeout, $mdSidenav, $log, $http, $routeParams){

    //var music = this;

    var promiseRsp = MusicService.getMusic();
    promiseRsp.then(function(data){
        // console.log(data);
        // $scope.genres = data.genres[0];
        $scope.musics = data.results;
        console.log($scope.musics);
        angular.forEach(data.results, function(value, key) {
            //console.log(value.rating);
            $scope.rating = value.rating;
            // console.log(music.rating);
            $scope.max = 5;
            $scope.isReadonly = true;
        });

        $scope.genres = ['bollywood','jazz'];

        var id = $routeParams.id
        $scope.api = "http://104.197.128.152:8000/v1/tracks/" + id; 

        $scope.createTrack = function(track){
            var createTrackObj = {
                title: track.title,
                rating: track.rating,
                genres: track.genre 
            };
            if(angular.isDefined($routeParams.id)){
                $http.put($scope.api, createTrackObj).then(function(response){
                    console.log(response);
                });
            }else {
                $http.post("http://104.197.128.152:8000/v1/tracks",createTrackObj).then(function(response){
                    console.log(response);
                    $scope.musics.push(createTrackObj);
                });
                
            }

        }

    },function(err){
        console.log(err);
    });

    $scope.openSidebar = function(){
        $mdSidenav('left').open();
    }

    $scope.closeSidebar = function(){
        $mdSidenav('left').close();
    }

    $scope.editTrack = function(id){
      $scope.editing = true;
      $scope.openSidebar();
      MusicService.getMusicid(id).then(function(result){
        $scope.track = result;
      },function(err){
        console.log(err);
      });
    }

    $scope.editSave = function(track){
      $scope.editing = false;
      var id = track.id;
      MusicService.updateMusic(track).then(function(result){
        MusicService.getMusic().then(function(res){
          $scope.musics = res.results;
        },function(err){
          console.log(err);
        });
      },function(err){
        console.log(err);
      })
      $scope.closeSidebar();
    }
});

myApp.controller('GenreCtrl', function(MusicService, $scope, $mdSidenav, $http, $routeParams){

  var promiseRsp = MusicService.getGenre();
    promiseRsp.then(function(data){
      // $scope.genres = data.genres[0];
      // console.log($scope.genres);
      $scope.genres = data;
      // console.log($scope.genres);
      angular.forEach(data, function(value, key) {
          //console.log(value.rating);
          $scope.name = value.name;
          console.log($scope.name);
      });

      var id = $routeParams.id
        $scope.api = "http://104.197.128.152:8000/v1/genres/" + id; 

        $scope.createTrack = function(genre){
            var createTrackObj = {
                name: genre.name,
            };
            if(angular.isDefined($routeParams.id)){
                $http.put(api, createTrackObj).then(function(response){
                    console.log(response);
                });
            }else {
                $http.post("http://104.197.128.152:8000/v1/genres",createTrackObj).then(function(response){
                    console.log(response);
                    $scope.genres.push(createTrackObj);
                });
                
            }
        }
    },function(err){
        console.log(err);
    });

 $scope.openSidebar = function(){
        $mdSidenav('left').open();
    }

    $scope.closeSidebar = function(){
        $mdSidenav('left').close();
    }
});

myApp.service('MusicService', function($http, $resource, $q){

  var vm = this; 

  vm.getMusic = function() {
    
    var resObj =  $http({
      method: 'GET',
      url: "http://104.197.128.152:8000/v1/tracks"
    });
    // var rsp = resObj.get();
    var deferred = $q.defer();
    resObj.success(function(data){
        console.log(data);
        // angular.forEach(data, function(value, key) {
        //     //console.log(value.rating);
        //     vm.rate = value.rating;
        //     vm.max = 5;
        //     vm.isReadonly = true;
        // });
        var len = data.length;
        for(var i=0; i<len; i++){
            ObjList = data[i];
        }
        deferred.resolve(data);
    });
    resObj.error(function(err) {
        deferred.reject(err);
    });
    return deferred.promise;
  }

  vm.getMusicid = function(id) {
    
    var resObj =  $http({
      method: 'GET',
      url: "http://104.197.128.152:8000/v1/tracks/" + id
    });
    // var rsp = resObj.get();
    var deferred = $q.defer();
    resObj.success(function(data){
        console.log(data);
        // angular.forEach(data, function(value, key) {
        //     //console.log(value.rating);
        //     vm.rate = value.rating;
        //     vm.max = 5;
        //     vm.isReadonly = true;
        // });
        var len = data.length;
        for(var i=0; i<len; i++){
            ObjList = data[i];
        }
        deferred.resolve(data);
    });
    resObj.error(function(err) {
        deferred.reject(err);
    });
    return deferred.promise;
  }

  vm.updateMusic = function(track) {
    
    var resObj =  $http({
      method: 'PUT',
      url: "http://104.197.128.152:8000/v1/tracks/" + track.id
    });
    // var rsp = resObj.get();
    var deferred = $q.defer();
    resObj.success(function(data){
        console.log(data);
        // angular.forEach(data, function(value, key) {
        //     //console.log(value.rating);
        //     vm.rate = value.rating;
        //     vm.max = 5;
        //     vm.isReadonly = true;
        // });
        var len = data.length;
        for(var i=0; i<len; i++){
            ObjList = data[i];
        }
        deferred.resolve(data);
    });
    resObj.error(function(err) {
        deferred.reject(err);
    });
    return deferred.promise;
  }

  vm.getGenre = function(){

    var resObj =  $resource('http://104.197.128.152:8000/v1/genres');
    var rsp = resObj.query();
    var deferred = $q.defer();
    rsp.$promise.then(function(data){
        // console.log(data);
        // angular.forEach(data, function(value, key) {
        //     //console.log(value.rating);
        //     vm.rate = value.rating;
        //     vm.max = 5;
        //     vm.isReadonly = true;
        // });
        var len = data.length;
        for(var i=0; i<len; i++){
            ObjList = data[i];
        }
        deferred.resolve(data);
    },function(err) {
        deferred.reject(err);
    });
    return deferred.promise;
  }
});

