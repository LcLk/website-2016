angular.module('lclk.nav')
 .directive( 'sidebar', ['eventService', function(eventService) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: "modules/nav/html/sidebar.html",
    link: function($scope, element){
      // Init Variables
      $scope.active = false;

      // Event Listeners
      $scope.$on('event.nav.sidebar.show',function(){toggleVisible(true)});
      $scope.$on('event.nav.sidebar.hide',function(){toggleVisible(false)});

      // Functionality
      toggleVisible = function(bool) {
        $scope.$apply(function(){
          $scope.active = bool;
        });
      };
    }
  };
}])
 .directive( 'tableOfContents', ['eventService', function(eventService) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: "modules/nav/html/table_of_contents.html",
    link: function($scope, $element){
      // Init Variables
      $scope.active = false;
      $scope.tocClass = 'fa fa-plus-circle';
      $scope.table = eventService.nav.tableOfContents.table;
      
      // Event Listeners
      $scope.$on('event.nav.tableOfContents.reload', function(){reloadTable()});

      reloadTable = function(){
        $scope.table = eventService.nav.tableOfContents.table;
      }
      $scope.toggleTOC = function(){
          $scope.showTOC = !$scope.showTOC;
          $scope.tocClass = $scope.showTOC ? 'fa fa-minus-circle': 'fa fa-plus-circle'
      };
      $scope.toggleTOC();
    }
  };
}])
 .directive( 'tocItem', ['$compile', '$location', '$anchorScroll', 'eventService', function($compile, $location, $anchorScroll, eventService) {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    templateUrl: "modules/nav/html/toc_item.html", 
    link: function($scope, $element){
      $element.find('a').on('click', function() {
        $location.hash($scope.item.id);
        $anchorScroll();
        if(window.innerWidth < 500){
          eventService.nav.sidebar.hide();
        }
      });
      // recursive directives cause infinite loops, so if there is another list in an item,
      // it has to be compiled and added into the directive here
      if($scope.item.children.length > 0){
        var list = angular.element('<ul ng-repeat="i in item.children"><toc-item item="i"></toc-item></ul>');
        $compile(list)($scope);
        $element.find('ul').replaceWith(list);
      }
    }
  };
}])
.directive( 'sidebarIcon', ['eventService', function(eventService) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: "modules/nav/html/sidebar_icon.html",
    link: function($scope, $element){
      // Init Params
      $scope.active = false;
      // Event Listeners
      $scope.$on('event.nav.sidebar.show', function(){ $scope.active = true; });
      $scope.$on('event.nav.sidebar.hide', function(){ $scope.active = false; });
      $element.bind('click', function (e) {
        $scope.active = !$scope.active;
        eventService.nav.sidebar.toggle($scope.active);
      });
    }
  };
}])
.directive( 'sectionsMenu', function() {
  return {
    restrict: 'E',
    templateUrl: "modules/nav/html/sections/menu.html",
    link: function(scope, element){  
      scope.sections = [
        {
          url:"home",
          text:"Home",
          icon: "home",
          color: "blue"
        },
        {
          url:"blog",
          text:"Blog",
          icon: "paragraph",
          color: "yellow"
        },
        {
          url:"profile",
          text:"Profile",
          icon: "user",
          color: "green"
        }
      ];
    }
  };
})
.directive( 'sectionsButton', ['$routeParams', function($routeParams) {
  return {
    restrict: 'E',
    scope: {
      url: '=',
      text: '=',
      icon: '=',
      color: '='
    },
    templateUrl: "modules/nav/html/sections/button.html",
    link: function(scope, element){
      scope.isSelected = function() {
        return $routeParams.section == scope.url;
      }
    }
  };
}]);
