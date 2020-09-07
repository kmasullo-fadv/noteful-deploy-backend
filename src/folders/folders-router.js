const { v4: uuidv4 } = require('uuid');
const express  = require('express');
const foldersRouter = require('express').Router();
const path = require('path');
const xss = require('xss');
const jsonParser = express.json();
const foldersService = require('./folders-service');
const notesService = require('../notes/notes-service');

foldersRouter
    .route('/')
    .get((req, res, next) => {
        let connection = req.app.get('db');
        foldersService.getAllFolders(connection)
            .then(folders => {
                res.json(folders)
            })
            .catch(next);
    })
    .post((req, res, next) => {
        const { name } = req.body;
        const newName = {name};
        foldersService.addFolder(
            req.app.get('db'),
            newName
        )
        .then(folder => {
            res.json(folder)
        })
        .catch(next);
    })

foldersRouter
    .route('/:id')
    .get((req, res, next) => {
        let connection = req.app.get('db');
        const { id } = req.params;
        foldersService.getFolderById(connection, id)
            .then(folder => {
                if(!folder){
                    return res.sendStatus(404);
                }
                res.status(200).json(folder);
            })
            .catch(next);
    })
    .delete((req, res, next) => {
        foldersService.deleteFolder(
            req.app.get('db'),
            req.params.id
        )
        .then(() => {
            res.status(204).end()
        })
        .catch(next);
    })
    .patch((req, res, next) => {
        const { name } = req.body;
        console.log(req.body);
        let update = {name, id: req.params.id}
        foldersService.updateFolder(
            req.app.get('db'),
            update
        )
        .then(
            res.status(204).end()
        )
        .catch(next);
    })

module.exports = {foldersRouter};