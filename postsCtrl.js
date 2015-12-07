angular.module('parseAuth')
    .controller("PostsCtrl", ['$scope',
        function($scope) {
            ///////////////////////////////////////
            // callbacks for handling Parse queries
            ///////////////////////////////////////
            function getPostsSuccess(results) {
                var allPosts = [];
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
                    $scope.$apply();
                    console.log("allPosts is:", allPosts);
                    $scope.posts = allPosts;
                    console.log("$scope.posts is: ", $scope.posts);
                }
            }

            function getPostsError(error) {
                alert("Error: " + error.code + " " + error.message);
            }

            function createPostSuccess(post) {
                // console.log("success post", post);
                // Execute any logic that should take place after the object is saved.
                $scope.$apply();
                console.log('New object created with objectId: ' + post.id);
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
                // clear input fields
                $scope.post = {};
            };

            // fetch posts when controller loads
            $scope.getPosts();
        }
    ]);