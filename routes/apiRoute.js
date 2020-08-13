const router = require('express').Router();
//gets new Notes from db/notes
const notes = require('../db/notes');

//route that GETs /api/notes, GETs resonse from user
router.get('/notes', (req, res) => {
    notes.getNotes().then(notes => res.json(notes))
        .catch(err => res.status(400).json(err))
});

//route that POSTs /api/notes, POSTs request from server with the response given from user
router.post('/notes', (req, res) => {
    notes.addNote(req.body).then(notes => res.json(notes))
        .catch(err => res.status(400).json(err))
});

//route the DELETEs notes with the ids
router.delete('/notes/:id', (req, res) => {
    notes.removeNote(req.params.id).then(() => res.json({ ok: true }))
        .catch(err => res.status(400).json(err))
});


module.exports = router;