var app = angular.module('snowmanApp', ["firebase"]);
app.controller('indexController', function($scope, $http) 
{
    var ref = new Firebase("https://project-snowman.firebaseio.com/");
    var authData = ref.getAuth();
    $scope.isAuthenticated = false;
    $scope.authData = authData;
    $scope.webPost = $http;
    $scope.serviceType = "snow";
    if(authData)
    {
        $scope.isAuthenticated = true; 
        $scope.userEmail = authData.password.email;
        ref.child("role").child(authData.uid).on("value", function(data) 
        {
            //set role to user, admin, or provider
            $scope.role = data.val();
            $scope.$apply();
        });
    }

    $scope.snowRemovalButtonOnClick = function()
    {
        $scope.serviceType = "snow";
    }

    $scope.lawnMowingButtonOnClick = function()
    {
        $scope.serviceType = "lawn";
    }
    
    $scope.submitForm = function() 
    {
        console.log("posting data....");
        formData = $scope.form;
        console.log(formData);
        //$http.post('form.php', JSON.stringify(data)).success(function(){/*success callback*/});
    };

    $scope.logout = function() 
    {
        ref.unauth();
        location.reload();
    } 

    $scope.login = function() 
    {
        ref.authWithPassword({
        email    : $scope.username,
        password : $scope.password
    }, function(error, authData) 
    {
        if (error) 
        {
            console.log(error);
        }
        else 
        {
            location.reload();        
        }
    });
    };
});