(function(){
    'use strict';
    angular
        .module('flowApp')
        .directive('usernameAvailable', function(ResourceService, $timeout, $q) {
            return {
                restrict:'AE',
                require:'ngModel',
                link: function(scope, elm, attr, model){
                    model.$asyncValidators.usernameUnique = function(){

                        ResourceService.CheckUniqueUsername(elm.val()).then(function(response){
                            console.log(response);
                            if(response === 'OK')
                                model.$setValidity('usernameUnique', true);
                            else
                                model.$setValidity('usernameUnique', false);
                        });

                        var defer = $q.defer();
                        $timeout(function(){
                            //model.$setValidity('usernameUnique', false);
                            defer.resolve;
                        }, 1000);
                        return defer.promise;
                    };
                }
            }
        });
})();