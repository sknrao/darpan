const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// Set up session
app.use(session({
  secret: 'your-secret-key', // Make sure to use a secure secret
  resave: false,
  saveUninitialized: true,
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data (if needed)
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  const currentPage = req.session.page || 'home'; // Default to 'home' if no page is stored in session
  res.render('home', { currentPage });
});

app.get('/about-us', (req, res) => {
  req.session.page = 'about-us'; // Store the current page in the session
  res.render('aboutus', { currentPage: 'about-us' });
});

app.get('/contact-us', (req, res) => {
  req.session.page = 'contact-us'; // Store the current page in the session
  res.render('contactus', { currentPage: 'contact-us' });
});

// Fallback route for unknown URLs
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
