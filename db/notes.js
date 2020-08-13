const fs = require('fs');
const util = require('util');
//installed with npm
const uuidv1 = require('uuid/v1');
//these are going to read and write the files
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    //funciton reads the db.json file (array of notes)
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    //function writes the note that was read, json,stringify's it and then rewrites the db.json file
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
    //function gets the note, concatinates the added note to an empty array (finalNotes) and returns it
    getNotes() {
        return this.read().then(notes => {
            let finalNotes;
            try {
                finalNotes = [].concat(JSON.parse(notes))
            }
            catch (err) {
                finalNotes = [];
            }
            return finalNotes;
        })
    }
    //function that takes note, validates that is has a title and text, adds an id to it, runs getNotes, and then spreads the array to to add the new note to it
    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Title and/or text are invalid.')
        }
        const newNote = { title, text, id: uuidv1() }
        return this.getNotes().then(notes => [...notes, newNote])
            .then(updatedNote => this.write(updatedNote))
            .then(() => newNote);
    }
    //function that takes the id of a note and filters through the array of notes and reprints the array, if the id matches in the filter it leaves that note out when it rewrites the array
    removeNote(id) {
        return this.getNotes().then(notes => notes.filter(note => note.id !== id))
            .then(updatedNote => this.write(updatedNote));
    }
}

module.exports = new Notes();