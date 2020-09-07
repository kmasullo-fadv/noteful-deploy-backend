const knex = require('knex');

const notesService = {
    getAllNotes (db) {
        return db.from('noteful_notes')
        .select('*');
    },
    getNoteById (db, id) {
        return db.from('noteful_notes')
        .where('id', id)
        .first();
    },
    getNotesByFolder(db, folderid) {
        return db.from('noteful_notes')
        .where('folderid', folderid)
    },
    deleteNote (db, id) {
        return db.from('noteful_notes')
        .where('id', id)
        .delete();
    },
    addNote (db, update) {
        return db
        .insert({
            name: update.name,
            content: update.content,
            folderid: update.folderid,
            date_modified: update.modified
        })
        .into('noteful_notes')
        .returning('*')
        .then(rows => {
           return rows[0];
        });
    },
    updateNote (db, id, update) {
        return db('noteful_notes')
        .where('id', id)
        .update(update)
    }
}

module.exports = notesService;