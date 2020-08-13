const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoute');
const htmlRoutes = require('./routes/htmlRoute');

app.use(express.static('public'));

//parse incoming string/ array data
app.use(express.urlencoded({ extended: true }));

//parse incoming JSON data
app.use(express.json());

//links to the route files 
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}.`)
});

