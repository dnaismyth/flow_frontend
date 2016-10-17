/**
 * Created by DN on 2016-10-16.
 */
/**
 * The purpose of this service is to provide resources for the user,
 * ex: temporary s3 token so they are able to put/read from an s3 bucket.
 */
(function() {
    'use strict';
    angular
        .module('flowApp')
        .factory('ResourceService', ResourceService);

    ResourceService.$inject = ['$http'];
    function ResourceService($http) {
        var service = {}
        service.GetS3Token = GetS3Token;
        return service;

        // Used to retrieve a temporary token for the user to upload media during their logged in session
        function GetS3Token(){
            return $http.get('http://localhost:8080/api/resources/s3token').then(handleSuccess, handleError('Error retrieving s3 token.'));
        }

        // private functions
        function handleSuccess(res){
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
}) ();