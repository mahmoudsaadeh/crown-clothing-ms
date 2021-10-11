// node js may allow imports (depending on time of watching the videos)
// similar to ES6 'import' that we used to use in our frontend
// require is an older version of import

// express is a library that allows us to build an API server easily
const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');
// this is a native module
const path = require('path');

// if we are in development or testing
if(process.env.NODE_ENV !== 'production') {
    // this loads dotenv into our process environment
    require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
// the server will be on a different port than localhost
// localhost will be on 3000, and server on 5000
// when deploying to heroku, it sets up the process port for you
const port = process.env.PORT || 5000;

// it tells that any of the requests that come in, I want you to process the body tag and convert it to json so that we can use it (bodyParser is a middleware)
// with fetch, when we make a request and get a response back, we make .json() on the response --> this is a way for us for not to do that everytime
app.use(bodyParser.json());
// urlencoded makes sure that the url strings that are getting in and we're passing out do not contain things like spaces or symbols, and if they do, they will get properly escaped (because urls are strict about what character they should contain)
app.use(bodyParser.urlencoded({ extended: true }));
// cors: it stands for 'cross origin request'
// our web server is being hosted from some origin (place or port), for example in development, it's port 5000, our frontend is hosted on port 3000, so a different port and thus a different origin. When frontend makes a request to our backend, cors checks that the origin is the same, if not the same, it denies the request (A SAFETY FEATURE). For eg, if amazon makes request to a google server, google sees that that website is coming from a different web server (different origin) --> this is a cross origin request that will be blocked
// so the usage of cors here is to ensure that we make request properly to our backend
app.use(cors());

if(process.env.NODE_ENV === 'production') {
    // static is a middleware function that allows us to serve a certain file in this url (path) that we pass to it
    // __dirname: a directory key name (which is a part of node js) which tells us what directory we are currently in, and that we're pointing to client/build 
    app.use(express.static(path.join(__dirname, 'client/build')));

    // *: means that every url that the user hits, we will return the following function
    // app.get() is how we tell our app what the REST (GET, POST, UPDATE, DELETE) parameters for each url will be
    app.get('*', function(req, res) {
        // response: send the static files (html, css, and js)
        res.sendFile(path.join(__dirname, 'client/build', 'index.html')); 
    });
}

// after all the previous code runs, start listening at port 5000
app.listen(port, error => {
    if (error) {
        throw error;
    }
    console.log('Server running on port ' + port);
});

// backend payment route
// /payment is the name of the route that we want to hit
app.post('/payment', (req, res) => {
    // the request object provides us with the token that we need in order to make the charge
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    }

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr }); // 500 is a failure status code
        }
        else {
            res.status(200).send({ success: stripeRes }); // 200 is a success status code
        }
    })
})


