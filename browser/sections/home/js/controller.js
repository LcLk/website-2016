home = angular.module('lclk.home',[]);

blog.controller('HomeCtrl', function($scope, $element, contentsScrawlerService){
  $scope.test = "Hello Home World";
  $scope.age = parseInt((new Date().getTime() - Date.UTC(1992,9,1)) / (60*60*24*365*1000));
  console.log($scope.age);
});
