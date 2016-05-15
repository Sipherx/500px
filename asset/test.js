var pxpic = angular.module('pxpic', ['ngMaterial']);

pxpic.controller('picController', function($scope, fetchData){

  var promise = fetchData.getPhoto();
  promise.then(function(data){
    var details = [];
    angular.forEach(data, function(item) {
      var userPhoto = {
      image : item.image_url,
      name : item.name,
      rate : item.rating,
      link : 'http://500px.com' + item.url,
      vote : item.votes_count,
      camera : item.camera || 'N/A',
      aperature : item.aperature || 'N/A',
      lens : item.lens || 'N/A',
      iso : item.iso || 'N/A',
      author : item.user.fullname,
      avatar : item.user.userpic_url,
      shutter : item.shutter_speed || 'N/A',
      focal : item.focal_length || 'N/A'
      }
      details.push(userPhoto);
    })
    $scope.details = details;
  });
  
  $scope.e = '-vote';
  $scope.order = function(e){
    $scope.reverse = ($scope.e=e) ? !$scope.reverse : false;
    $scope.e = e;
  }

})

pxpic.service('fetchData', function($q){

  _500px.init({
    sdk_key: 'a51bae00a674aa2c7f9dcbf2fb783c602a2ea6e3'
  });

  this.getPhoto = function(){
    return $q(function(resolve, reject) {
      _500px.api('/photos', { feature: 'popular', sort: 'votes_count', rpp: '50', image_size: '2048'}, function(res){
        resolve(res.data.photos);
      });
    })
  }


});
