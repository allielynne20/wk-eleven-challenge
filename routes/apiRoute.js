const { filterByQuery, addId, createNewNote, validateNote } = require('../lib/notes');
const { notes } = require('../db/db.json');
const router = require('express').Router();

//route that GETs /api/notes
router.get('/api/notes', (req, res) => {
    let text = notes;
    if (req.query) {
        text = filterByQuery(req.query, text);
    }
    res.json(text);
});

//route that POSTs /api/notes
router.post('/api/notes', (req, res) => {
    //req.body is where the incoming data content will go

    //set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    //if any datain req.body is incorrect, send 400 error back 
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    }
    else {
        //add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);

        res.json(note);
    }
});


module.exports = router;