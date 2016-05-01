var pxpic = angular.module('pxpic', ['ngMaterial']);

pxpic.controller('picController', function($scope, fetchData){

    $scope.details =[];
    fetchData.getPhoto(function(err, photos)  {
        if(err){
        }
        else{
            $scope.data = photos;
            photosets();
        }

    });
    function photosets(){
        angular.forEach($scope.data, function(item){
          $scope.$apply(function(){

            var userPhoto = {}
            userPhoto.image = item.image_url;
            userPhoto.name = item.name;
            userPhoto.rate = item.rating;
            userPhoto.link = 'http://500px.com' + item.url;
            userPhoto.vote = item.votes_count;
            userPhoto.camera = item.camera || 'N/A';
            userPhoto.aperature = item.aperature || 'N/A';
            userPhoto.lens = item.lens || 'N/A';
            userPhoto.iso = item.iso || 'N/A';
            userPhoto.author = item.user.fullname;
            userPhoto.avatar = item.user.userpic_url;
            userPhoto.shutter = item.shutter_speed || 'N/A';
            userPhoto.focal = item.focal_length || 'N/A';

            $scope.details.push(userPhoto);
          });
        });
    }

})

pxpic.service('fetchData', function(){

    _500px.init({
        sdk_key: 'a51bae00a674aa2c7f9dcbf2fb783c602a2ea6e3'
    });

    this.getPhoto = function(callback){
        _500px.api('/photos', { feature: 'popular', image_size: '2048'}, function(res){
            //error handling
            callback(null, res.data.photos);
        });
    }

});
