angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  
  $scope.data = {};

  $scope.init = function() {
    Links.getAll()
    .then(function(links) {
      $scope.data.links = links;
      console.log('this is my links data====================', links);

    }); 
    // $scope.data.links = links;
  };

  $scope.init(); 

     

});

