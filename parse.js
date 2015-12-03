document.addEventListener("DOMContentLoaded", function(event) {
    Parse.initialize("bYRCHbq0EJhEWnMuoOOhmiZJAtwwyZ5vye6buY9c", "EQWXh2GKp22bzLZDbJ2PpKd5XCfOkpM2Kvshou2l");


    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({
        foo: "bar"
    }, {
        success: function(object) {
            $(".success").show();
        },
        error: function(model, error) {
            $(".error").show();
        }
    });

    var user = new Parse.User();
    user.set("username", "my name");
    user.set("password", "my pass");
    user.set("email", "email@example.com");

    // other fields can be set just like with Parse.Object
    user.set("phone", "650-555-0000");

    user.signUp(null, {
        success: function(user) {
            // Hooray! Let them use the app now.
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
        }
    });
});