/**
 * Created by DN on 2016-10-28.
 */
(function(){
    'use strict';
    angular
        .module('flowApp')
        .directive('emailAvailable', function(ResourceService, $timeout, $q) {
            return {
                restrict:'AE',
                require:'ngModel',
                link: function(scope, elm, attr, model){
                    model.$asyncValidators.emailUnique = function(){

                        // Check that the e-mail address is unique
                        ResourceService.CheckUniqueUsername(elm.val()).then(function(response){
                            if(response.code === 'OK')
                                model.$setValidity('emailUnique', true);
                            else
                                model.$setValidity('emailUnique', false);
                        });

                        var defer = $q.defer();
                        $timeout(function(){
                            //model.$setValidity('emailUnique', false);
                            defer.resolve;
                        }, 1000);
                        return defer.promise;
                    };
                }
            }
        });
})();