app = angular.module('lclk', [
  'ngRoute',
  'lclk.layout',
  'lclk.nav',
  'lclk.blog',
  'lclk.home',
  'lclk.profile']);

app.config( function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when('/sections/:section', {
        templateUrl: function(args){
          return "sections/" + args.section + "/index.html"
        }
      }).
      otherwise( { 
        redirectTo: "/sections/home" 
      });
});
app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  //when the route is changed scroll to the proper element.
  $anchorScroll.yOffset = 100;
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
});