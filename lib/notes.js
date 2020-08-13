const fs = require('fs');
const path = require('path');

//function that filters the data into the array 
function filterByQuery(query, notesArray) {
    let newNotesArray = [];
    //save newNotesArray as an array
    let filteredResults = notesArray;
    //if newNotesArray is a string, place it into a new array and save
    if (typeof query.newNotesArray === 'string') {
        newNotesArray = [query.newNotesArray];
    }
    else {
        newNotesArray = query.newNotesArray;
    }
    console.log(newNotesArray);

    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }

    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
}

//funciton that adds an ID to the index in the array
function addId(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

//function that creates new note index for the array
function createNewNote(body, notesArray) {
    //function's main code will go here 
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
}

//function that validates the note
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery, 
    addId, 
    createNewNote, 
    validateNote
};