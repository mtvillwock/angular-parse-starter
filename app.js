// initialize Parse with Application ID and Javascript Key
Parse.initialize("bYRCHbq0EJhEWnMuoOOhmiZJAtwwyZ5vye6buY9c", "EQWXh2GKp22bzLZDbJ2PpKd5XCfOkpM2Kvshou2l");

angular.module('parseAuth', [])
    .run(['$rootScope',
        function($scope) {
            $scope.scenario = 'Sign up';
            $scope.currentUser = Parse.User.current();

            $scope.signUp = function(form) {
                var user = new Parse.User();
                user.set("email", form.email);
                user.set("username", form.username);
                user.set("password", form.password);
                // set other User values here
                // user.set("attributeName", attributeValue)
                // user.set("phone", "000-123-4567");

                user.signUp(null, {
                    success: function(user) {
                        $scope.currentUser = user;
                        $scope.$apply();
                    },
                    error: function(user, error) {
                        alert("Unable to sign up:  " + error.code + " " + error.message);
                    }
                });
            };

            $scope.logIn = function(form) {
                Parse.User.logIn(form.username, form.password, {
                    success: function(user) {
                        $scope.currentUser = user;
                        $scope.message = $scope.currentUser.attributes.username + " logged in";
                        $scope.$broadcast('logged_in', $scope.message);
                        $scope.$apply();
                    },
                    error: function(user, error) {
                        alert("Unable to log in: " + error.code + " " + error.message);
                    }
                });
            };

            $scope.logOut = function(form) {
                Parse.User.logOut();
                $scope.currentUser = null;
                $scope.message = "User logged out";
                $scope.$broadcast('logged_out', $scope.message);
            };
        // END ROOT CONTROLLER
        }
    ]);