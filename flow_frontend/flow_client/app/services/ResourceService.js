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
        service.SendPasswordResetEmail = SendPasswordResetEmail;
        service.FinishPasswordReset = FinishPasswordReset;
        return service;

        // Used to retrieve a temporary token for the user to upload media during their logged in session
        function GetS3Token(){
            return $http.get('http://localhost:8080/api/resources/s3token').then(handleSuccess, handleError('Error retrieving s3 token.'));
        }

        // Send password reset e-mail to the address provided
        function SendPasswordResetEmail(email){
            return $http.post('http://localhost:8080/api/resources/passwordreset', email).then(handleSuccess, handleError('Error sending password reset e-mail.'));
        }

        // Allow for a user to update and finish their password reset
        function FinishPasswordReset(password){
            return $http.post('http://localhost:8080/api/resources/finish-reset-password', password).then(handleSuccess, handleError('error completing reset password request.'));
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