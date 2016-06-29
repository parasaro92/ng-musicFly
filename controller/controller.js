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

      return output;
    };
});

myApp.controller('MusicCtrl', function(MusicService, $scope, $timeout, $mdSidenav, $log, $http, $routeParams){

    //var music = this;

    var promiseRsp = MusicService.getMusic();
    promiseRsp.then(function(data){
        // console.log(data);
        $scope.musics = data;
        //console.log($scope.musics);
        angular.forEach(data, function(value, key) {
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
                $http.put(api, createTrackObj).then(function(response){
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
});

myApp.service('MusicService', function($resource, $q){

  var vm = this; 

  vm.getMusic = function() {
    
    var resObj =  $resource('http://104.197.128.152:8000/v1/tracks');
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

