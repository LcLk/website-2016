angular.module('lclk.layout')
.factory('eventService', function($rootScope){
  var event = {
    nav: {
      sidebar: {},
      tableOfContents: {}
    },
    tableofContents: {
      table: null
    }
  };
  // nav Module
  //  -> Sidebar
  event.nav.sidebar.toggle = function(bool){
    if(bool)
      $rootScope.$broadcast('event.nav.sidebar.show');
    else
      $rootScope.$broadcast('event.nav.sidebar.hide');
  }
  event.nav.sidebar.show = function(){event.nav.sidebar.toggle(true)};
  event.nav.sidebar.hide = function(){event.nav.sidebar.toggle(false)};

  //  -> Table of Contents
  event.nav.tableOfContents.loadNew = function(newTable){
    event.nav.tableOfContents.table = newTable;
    $rootScope.$broadcast('event.nav.tableOfContents.reload');
  }
  return event;
})
.factory('contentsScrawlerService', function($rootScope){
  var scrawler = {};

  // Read the current page for segments and headings and return a tree of their texts and ids
  // which can be used as a table of contents
  scrawler.readPage = function(element){
    var page = new Node(
      element.find('header')[0].id,
      element.find('header').html().trim()
      );
    var segments = element.find('segment');
    for(var i = 0;i < segments.length;i++){
      var segment = angular.element(segments[i]); 
      page.addChild( new Node(
        segment[0].id,
        segment.find('header').find('h1').html().trim()
        ));
    }
    return page;
  };

  return scrawler;
});


function Node(id, text){
  this.id = id;
  this.text = text;
  this.children = [];
  this.addChild = function(node){
    this.children.push(node);  
  }
};
