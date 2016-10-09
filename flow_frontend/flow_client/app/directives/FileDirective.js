(function(){
    'use strict';
    angular
        .module('flowApp')
        .directive('file', function() {
        return {
            restrict: 'AE',
            scope: {
                file: '@'
            },
            link: function(scope, el, attrs){
                el.bind('change', function(event){
                    var files = event.target.files;
                    var file = files[0];
                    scope.file = file;
                    scope.$parent.file = file;
                    scope.$apply();
                    console.log("the name is:" + scope.file.name);
                });
            }
        };
    });
})();
