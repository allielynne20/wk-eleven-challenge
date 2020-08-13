const fs = require('fs');
const util = require('util');
const uuidv1 = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
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
    addNote(note) {
        const {title, text} = note;
        if (!title || !text) {
            throw new Error('Title and Text are invailid.')
        }
        const newNote = {title, text, id:uuidv1()}
        return this.getNotes().then(notes => [...notes, newNote])
        .then(updatedNote => this.write(updatedNote))
        .then(() => newNote);
    }
    removeNote(id) {
        return this.getNotes().then(notes => notes.filter(note => note.id !== id))
        .then(updatedNote => this.write(updatedNote));
    }
}

module.exports = new Notes();