angular.module('parseAuth')
    .controller("PostsCtrl", ['$scope',
        function($scope) {
            $scope.getPosts = function() {
                var allPosts = [];
                var Post = Parse.Object.extend("Post");
                var newpost = new Post();

                var query = new Parse.Query(Post);
                query.find()
                    .then(function(results) {
                        if (results.length === 0) {
                            console.log("There are no posts yet.");
                        } else {
                            for (var i = 0; i < results.length; i++) {
                                var object = results[i];
                                var foundPost = {
                                    id: object.id,
                                    title: object.get('title'),
                                    body: object.get('body')
                                };
                                allPosts.unshift(foundPost);
                            }
                            //
                            $scope.$apply();
                            console.log("allPosts is:", allPosts);
                            $scope.posts = allPosts;
                            console.log("$scope.posts is: ", $scope.posts);
                        }
                    }, function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    })
            };

            // fetch all posts on controller load
            $scope.getPosts();

            $scope.createPost = function(post) {
                // console.log("your post:", post);
                // define Post object in Parse DB
                var Post = Parse.Object.extend("Post");
                // instantiate Post object instance
                var newPost = new Post();
                // set values for Post attributes
                newPost.set("title", post.title);
                newPost.set("body", post.body);

                newPost.save(null, {
                    success: function(post) {
                        // console.log("success post", post);
                        // Execute any logic that should take place after the object is saved.
                        $scope.$apply();
                        console.log('New object created with objectId: ' + post.id);
                        $scope.getPosts();
                    },
                    error: function(post, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
                // clear input fields
                $scope.post = {};
            };
            // fetch posts when controller loads
            $scope.getPosts();
        }
    ]);