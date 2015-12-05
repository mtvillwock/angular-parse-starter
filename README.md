# Angular Auth with Parse

Instructions pending.

Steps:

1. Get boilerplate code (from cloning this repo) using `git clone <this repo's url>.
1. Sign up for a Parse account.
<!-- more steps here for registering for Parse? -->
1. Navigate to Settings and find your `ApplicationId` and `JavascriptKey`.
1. Add the keys to the `Parse.initialize()` function call in your `app.js` file.
1. Boot up a simple server using `http-server` for Node or `python -m SimpleHTTPServer 8000` to server your `index.html` page.
1. Navigate to `localhost:8000` and sign up!

```javascript
Parse.initialize("ApplicationId",
  "JavascriptKey");
```

TODO:
[ ] Add information about building out the rest of the boilerplate app.
[ ] Add instructions about making a new model and controller for posting/querying data.
