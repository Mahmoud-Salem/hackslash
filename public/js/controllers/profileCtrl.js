angular.module('pettts')
.controller('profileController',function($scope,$http,profileService,$window){
    $scope.messageRated = $window.sessionStorage.messageRated;
    $scope.submitRate = function() {
        var rating = $scope.rate;
        var rated = $scope.userInfo.email;
        if(rating > 5 || rating < 1){
            $scope.message = "Rating must be between 1 and 5"
        }else{
            profileService.rate(rating,rated,$scope);
        }
    };
    
    $scope.submitEdit = function() {
        var edit = $scope.edit;
        profileService.edit(edit,$scope);
    };

    $scope.delete = function() {
        $scope.messagePass = undefined;
        $scope.messageNotGiven = undefined;
        var password = $scope.dPassword;
        var verify = $scope.dVerify;
        if(password){
            if(password == verify){
                profileService.delete(password,$scope);
            }else{
                $scope.messagePass = 'Your passwords don\'t match.';
            }
        }else{
            $scope.messageNotGiven = 'You need to enter your password.';
        }
    };

    $scope.passChange = function() {
        $scope.messageEmpty = undefined;
        $scope.messageError = undefined;
        $scope.messageNew = undefined;
        $scope.messageOld = undefined;
        var password = $scope.password;
        var verify = $scope.verify;
        var newPassword = $scope.newPassword;
        var verNewPassword = $scope.verNewPassword;
        if(password && newPassword){
            if(newPassword == verNewPassword && newPassword.length > 5 ){
                if(password == verify){
                    if(password != newPassword){
                        profileService.pass(password,newPassword,$scope);
                    }else{
                        $scope.messageError = "Your old and new passwords need to be different.";
                    }
                }else{
                    $scope.messageOld = "Your old password doesn't match.";     
                }
            }else{
                $scope.messageNew = "Your new password doesn't match.";
            }
        }else{
           $scope.messageEmpty = "Please enter both your old and new passwords.";
        }
    };

  
    profileService.view().then(function(response){
        $scope.teet = "bla";
        $scope.userInfo = response.data.userProfileInfo;
        $scope.Posts = response.data.myPosts;
        if($scope.Posts == "||&This user has no Posts yet.&||")
        {
            $scope.Posts = undefined;
        }
        $scope.myEmail = $window.sessionStorage.email;
    });
})