
    angular
        .module('flowApp')
        .directive('UsernameAvailable', function(ResourceService, $timeout, $q) {
            return {
                restrict:'AE',
                require:'ngModel',
                link: function(scope, elm, attr, model){
                    model.$asyncValidators.usernameExists = function(){

                        ResourceService.CheckUniqueUsername(elm.val()).success(function(data){
                           console.log(data);
                        });

                        var defer = $q.defer();
                        $timeout(function(){
                            model.$setValidity('usernameExists', false);
                            defer.resolve;
                        }, 1000);
                        return defer.promise;
                    };
                }
            }
        });