angular.module('parseAuth')
    .factory('Post', function() {
        var factory = {};

        factory.get = function(postId) {
            var Post = Parse.Object.extend("Post");
            var query = new Parse.Query(Post);
            return query.get()
        }

        factory.all = function() {
            var Post = Parse.Object.extend("Post");
            var query = new Parse.Query(Post);
            query.equalTo("createdBy", Parse.User.current());
            return query.find()
        }

        factory.save = function(post) {
            var Post = Parse.Object.extend("Post"); // define Post object in Parse DB
            var newPost = new Post(); // instantiate Post object instance
            newPost.set("title", post.title);
            newPost.set("body", post.body);
            newPost.set("createdBy", Parse.User.current());
            return newPost.save()
        }

        factory.destroy = function(postId) {
            factory.get(postId)
                .then(function(post) {
                    return post.destroy() // When object was retrieved successfully.
                }, function(error) {
                    console.log("error retrieving post:", error);
                    // logs a Parse.Error with an error code and description.
                })
        }
        // END Post Factory
        return factory;
    })