angular.module('lclk.nav')
  .factory('pushView', function() {
    toggleView = function(bool){
      console.log('toogled');
      angular.element(document.querySelector('body')).toggleClass('pushed', bool);
    };
    return {
      show: function(){toggleView(true)},
      hide: function(){toggleView(false)},
      toggle: function(bool){toggleView(bool)}
    }
  });

