angular.module('parseAuth')
    .controller("PostsCtrl", ['$scope',
        function($scope) {

            $scope.createPost = function(post) {
              console.log("your post:", post);
                // define Post object in Parse DB
                var Post = Parse.Object.extend("Post");
                // instantiate Post object instance
                var newPost = new Post();
                // set values for Post attributes
                newPost.set("title", post.title);
                newPost.set("body", post.body);
                // clear input fields
                $scope.post = {};

                newPost.save(null, {
                    success: function(post) {
                      console.log("success post", post);
                        // Execute any logic that should take place after the object is saved.
                        console.log('New object created with objectId: ' + post.id);
                    },
                    error: function(post, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
            }

        }
    ])