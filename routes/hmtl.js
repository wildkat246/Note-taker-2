const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend, } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
    );
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    const createNote = {
        title,
        text,
        id: uuidv4()
    };
    readAndAppend(createNote, "./db/db.json");
    res.json("Note created"); 
});

notes.delete('/:id', (req, res) => {
  const uniqueNoteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== uniqueNoteId);
      writeToFile('./db/db.json', result);
      res.json(`Successfully deleted`);
    });
});

module.exports = notes;