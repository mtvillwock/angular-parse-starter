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
});