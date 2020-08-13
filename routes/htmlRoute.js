const path = require('path');
const router = require('express').Router();

//route that serves the index page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//route that serves the notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


module.exports = router;