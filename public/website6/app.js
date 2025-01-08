const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware for session management
app.use(session({
  secret: 'your_secret_key', // You can change this to something more secure
  resave: false,
  saveUninitialized: true,
}));

// Simulate a simple user for demonstration purposes
const validUser = { username: 'testuser', password: 'password123' };

// Home page route (shows login form or welcome message if logged in)
app.get('/', (req, res) => {
  if (req.session.username) {
    res.render('index', { username: req.session.username });
  } else {
    res.render('login', { message: req.session.message || '' });
    req.session.message = ''; // Clear any previous messages
  }
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the credentials are correct
  if (username === validUser.username && password === validUser.password) {
    req.session.username = username; // Store username in session
    res.redirect('/'); // Redirect to home page (index)
  } else {
    req.session.message = 'Invalid credentials. Please try again.'; // Store error message in session
    res.redirect('/'); // Redirect back to login page
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out.');
    }
    res.redirect('/'); // Redirect to login page after logging out
  });
});

// Add more routes for other pages (if needed)
// For example, a dashboard or profile page
app.get('/dashboard', (req, res) => {
  if (req.session.username) {
    res.render('dashboard', { username: req.session.username });
  } else {
    res.redirect('/');
  }
});

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
