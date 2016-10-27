(function(){
    'use strict';
    angular
        .module('flowApp')
        .directive('usernameAvailable', function(ResourceService, $timeout, $q) {
            return {
                restrict:'AE',
                require:'ngModel',
                link: function(scope, elm, attr, model){
                    model.$asyncValidators.usernameExists = function(){

                        ResourceService.CheckUniqueUsername(elm.val()).then(function(response){
                            console.log(response.data);
                            model.$setValidity('usernameExists', true);
                        });

                        var defer = $q.defer();
                        $timeout(function(){
                            model.$setValidity('usernameExists', false);
                            defer.resolve;
                        }, 2000);
                        return defer.promise;
                    };
                }
            }
        });
})();