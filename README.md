# Angular Auth with Parse

## Why use Parse?

Parse is a cloud-hosted "backend as a service", similar to Firebase. It features a nice browser based dashboard for managing your database and abstracts away a lot of the backend development concerns like setting up your API routes for your client app to query.

Long story short, if you're a frontend focused developer, Parse will make your life easier, and if you're a backend focused developer, it will save you a lot of time when it comes to authentication and your basic model concerns so that you can focus on more complex server-side issues.

### The Angular App

1. Get boilerplate code (from cloning this repo) using `git clone <this repo's url>``.
1. Boot up a simple server using `http-server` for Node (port `8081`) or `python -m SimpleHTTPServer <port number>` to serve your `index.html` page.
1. Navigate to `localhost:<your port>`.

### Connecting Parse

In order to use Parse, we'll need to register for an account and add some code to our Angular app.

1. Sign up for a Parse account.
1. Navigate to Settings and find your `ApplicationId` and `JavascriptKey`.
1. Add the keys to the `Parse.initialize()` function call in your `app.js` file.

```javascript
Parse.initialize("ApplicationId",
  "JavascriptKey");
```

### Using the Auth

Now that we have our app connected to Parse, let's try using it!

1. On `localhost:<your port>`, fill out the form to sign up as a new user.
1. In the Parse dashboard, click on your app name, then click "data" on the left hand side. You should see several entries, including "Role",  "Session", and "User".
1. Click on "User" and see if your data was added to the database.

### Stretch: Add another resource

TODO:
[ ] Add information about building out the rest of the boilerplate app.
[ ] Add instructions about making a new model and controller for posting/querying data.
