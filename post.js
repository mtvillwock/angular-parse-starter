angular.module('parseAuth')
    .factory('Post', function() {
        var factory = {};

        factory.all = function() {
            var Post = Parse.Object.extend("Post");
            var newpost = new Post();

            var query = new Parse.Query(Post);
            query.equalTo("createdBy", Parse.User.current());
            return query.find()
        }

        return factory;
    })