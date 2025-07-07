const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Make sure uploads/ exists
const verifyToken = require('../Middleware/auth'); // ✅ Import middleware

router.use(express.urlencoded({ extended: false }));

// ✅ Protected route to render home page
router.get('/', verifyToken, (req, res) => {
    res.render('home', { username: req.user.username }); // optional: pass username
});

// ✅ Protected upload route
router.post('/upload', verifyToken, upload.single("file"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect('/');
});

module.exports = router;
