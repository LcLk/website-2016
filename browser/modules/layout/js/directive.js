angular.module('lclk.layout', [])
.directive( 'page', [ 'contentsScrawlerService', 'eventService' ,function( contentsScrawlerService, eventService ) {
  return {
    restrict: 'E',
    scope: false,
    link: function($scope, $element){
      // When loaded, crawl contents of page and generate a new ToC from it
      table = contentsScrawlerService.readPage($element);
      eventService.nav.tableOfContents.loadNew(table);
    }
  };
}])
.directive( 'segment', function() {
  return {
    restrict: 'E',
    scope: false,
    link: function($scope, $element){
    }
  };
})
.directive( 'view', ['eventService', function(eventService) {
  return {
    restrict: 'E',
    scope: true,
    template: '<div ng-view></div>',
    link: function($scope, $element){
      push = function(bool){
        $element.toggleClass('pushed');
      };
      $scope.$on('event.nav.sidebar.show', function(){ push(true) });
      $scope.$on('event.nav.sidebar.hide', function(){ push(false) });
      $element.bind('click', function (e) {
        if($element.hasClass('pushed')) {
          eventService.nav.sidebar.hide();
        }
      });
    }
  };
}])
.directive( 'footerBar', [ function($routeParams) {
  return {
    restrict: 'E',
    scope: {
    },
    templateUrl: "modules/nav/html/sections/footer_bar.html",
    link: function(scope, element){
    }
  };
}]);