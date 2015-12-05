angular.module('parseAuth')
    .controller("PostsCtrl", ['$scope',
        function($scope) {

            $scope.createPost = function(post) {
              console.log("your post:", post);
                var Post = Parse.Object.extend("Post");
                var newpost = new Post();

                newpost.set("title", post.title);
                newpost.set("body", post.body);

                newpost.save(null, {
                    success: function(post) {
                      console.log("success post", post);
                        // Execute any logic that should take place after the object is saved.
                        console.log('New object created with objectId: ' + post.id);
                        $scope.post = {};
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