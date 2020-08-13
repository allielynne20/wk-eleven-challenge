const express = require('express');
const { notes } = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');

const apiRoutes = require('./routes/apiRoute');
const htmlRoutes = require('./routes/htmlRoute');

app.use(express.static('public'));

//parse incoming string/ array data
app.use(express.urlencoded({ extended: true }));

//parse incoming JSON data
app.use(express.json());

app.use('/notes', apiRoutes);
app.use.apply('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}.`)
});