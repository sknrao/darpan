const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const port = 3003;

const app = express();

const users = [];

// Set up the view engine and the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public/images")));

// Parse incoming requests (for POST requests)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a more secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set `secure: true` if you're using HTTPS
}));

// Set up ejsMate as the view engine
app.engine("ejs", ejsMate);

// Start the server
app.listen(port, () => {
    console.log("Server is listening on port ", port);
});

// Routes

// Store the last visited page in the session (on each request)
app.use((req, res, next) => {
    if (req.session.user && req.originalUrl !== '/login' && req.originalUrl !== '/signup') {
        req.session.lastVisitedPage = req.originalUrl;  // Store the current page if the user is logged in
    }
    next();
});

// Home route
app.get('/', (req, res) => {
    req.session.user = { name: 'yn', loggedIn: true };  // Example session data
    res.send("Cab booking is ready");
});

// Cabs route
app.get('/cabs', (req, res) => {
    if (req.session.user && req.session.user.loggedIn) {
        res.render("index.ejs", { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

// Cab details route
app.get('/cabDetails', (req, res) => {
    if (req.session.user) {
        res.render("carDetails.ejs", { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

// Route to Bangalore to Mysore page
app.get('/BangloreToMysore', (req, res) => {
    if (req.session.user) {
        res.render("BtoM.ejs", { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

// Signup route (renders signup form)
app.get('/signup', (req, res) => {
    res.render("signup.ejs");
});

// Handle signup data (store username and password)
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists
    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.send("Username already exists. Please choose another one.");
    }

    // Store the new user
    users.push({ username, password });
    res.send("User registered successfully! <a href='/login'>Login here</a>");
});

// Login route (renders login form)
app.get('/login', (req, res) => {
    res.render("login.ejs");
});

// Handle login data (validate user credentials)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Store user session data
        req.session.user = { name: user.username, loggedIn: true };

        // Check if the last visited page exists, and redirect to that page if it does
        const lastVisitedPage = req.session.lastVisitedPage || '/cabs'; // Default to /cabs if no last page
        res.redirect(lastVisitedPage);
    } else {
        res.send("Invalid credentials. Please try again.");
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send("Error logging out");
        }
        res.redirect('/login');
    });
});
