angular.module('parseAuth')
    .controller("PostsCtrl", ['$scope',
        function($scope) {
            $scope.newPost = {};
            ///////////////////////////////////////
            // callbacks for handling Parse queries
            ///////////////////////////////////////
            function getPostsSuccess(results) {
                var allPosts = [];
                if (results.length === 0) {
                    console.log("There are no posts yet.");
                    $scope.posts = [];
                    $scope.$apply();
                } else {
                    for (var i = 0; i < results.length; i++) {
                        var post = results[i];
                        console.log(post)
                        // post has id, attributes
                        // attributes include title and body
                        allPosts.unshift(post);
                    }
                    // necessary to get posts to load on page
                    console.log("allPosts is:", allPosts);
                    $scope.posts = allPosts;
                    $scope.$apply();
                    console.log("$scope.posts is: ", $scope.posts);
                }
            }

            function getPostsError(error) {
                alert("Error: " + error.code + " " + error.message);
            }

            function createPostSuccess(post) {
                // console.log("success post", post);
                // Execute any logic that should take place after the object is saved.
                console.log('New object created with objectId: ' + post.id);
                // clear input fields
                $scope.newPost = {};

                $scope.getPosts();
            }

            function createPostError(post, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            }

            ///////////////////////////////////////
            // Controller functions
            ///////////////////////////////////////

            $scope.getPosts = function() {
                var Post = Parse.Object.extend("Post");
                var newpost = new Post();

                var query = new Parse.Query(Post);
                query.find()
                    .then(getPostsSuccess, getPostsError)
            };

            // fetch all posts on controller load
            $scope.getPosts();

            $scope.createPost = function(post) {
                var Post = Parse.Object.extend("Post"); // define Post object in Parse DB
                var newPost = new Post(); // instantiate Post object instance
                newPost.set("title", post.title);
                newPost.set("body", post.body);

                newPost.save()
                    .then(createPostSuccess, createPostError);
            };

            $scope.deletePost = function(postId) {
                var Post = Parse.Object.extend("Post");
                var query = new Parse.Query(Post);
                query.get(postId)
                    .then(function(post) {
                        // The object was retrieved successfully.
                        post.destroy()
                            .then(function(post) {
                                $scope.getPosts();
                                console.log("post destroyed: ", post)
                            }, function(post, error) {
                                console.log("error deleting post:", error, post)
                            })
                    }, function(error) {
                        console.log("error retrieving post");
                        // The object was not retrieved successfully.
                        // error is a Parse.Error with an error code and description.
                    })
            }
        }
    ]);