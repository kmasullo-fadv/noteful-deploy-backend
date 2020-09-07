const { v4: uuidv4 } = require('uuid');
const express  = require('express');
const notesRouter = require('express').Router();
const path = require('path');
const xss = require('xss');
const jsonParser = express.json();
const notesService = require('./notes-service');

notesRouter
    .route('/')
    .get((req, res, next) => {
        let connection = req.app.get('db');
        notesService.getAllNotes(connection)
            .then(folders => {
                res.json(folders)
            })
            .catch(next);
    })
    .post((req, res, next) => {
        const { name, content, folderId, modified } = req.body;
        const folderid = folderId
        const update = { name, content, folderid, modified };
        notesService.addNote(
            req.app.get('db'),
            update
        )
        .then(note => {
            res.json(note)
        })
        .catch(next)
    });

notesRouter
    .route('/:id')
    .get((req, res, next) => {
        notesService.getNoteById(
            req.app.get('db'),
            req.params.id
        )
        .then(note => {
            if(!note){
                res.sendStatus(404)
            }
            res.json(note)
        })
        .catch(next);
    })
    .delete((req, res, next) => {
        notesService.deleteNote(
            req.app.get('db'),
            req.params.id
        )
        .then(
            res.status(204).end()
        )
        .catch(next);
    })
    .patch((req, res, next) => {
        const { name, content, folderId } = req.body;
        const folderid = folderId
        const date_modified = new Date().toLocaleDateString()
        let update = { name, content, folderid, date_modified};
        notesService.updateNote(
            req.app.get('db'),
            req.params.id,
            update
        )
        .then(
            res.status(204).end()
        )
        .catch(next);
    })

module.exports = {notesRouter};