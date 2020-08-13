const router = require('express').Router();
const notes = require('../db/notes');

//route that GETs /api/notes
router.get('/notes', (req, res) => {
    notes.getNotes().then(notes => res.json(notes))
        .catch(err => res.status(400).json(err))
});

//route that POSTs /api/notes
router.post('/notes', (req, res) => {
    notes.addNote(req.body).then(notes => res.json(notes))
        .catch(err => res.status(400).json(err))
});

router.delete('/notes/:id', (req, res) => {
    notes.removeNote(req.params.id).then(() => res.json({ ok: true }))
        .catch(err => res.status(400).json(err))
});


module.exports = router;