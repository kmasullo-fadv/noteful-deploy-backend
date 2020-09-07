const knex = require('knex');

const foldersService = {
    getAllFolders (db) {
        return db.from('noteful_folders')
        .select('*');
    },
    getFolderById (db, id) {
        return db.from('noteful_folders')
        .where('id', id)
        .first();
    },
    deleteFolder (db, id) {
        return db.from('noteful_folders')
        .where('id', id)
        .delete();
    },
    addFolder (db, newName) {
        return db
        .insert({
            name: newName.name
        })
        .into('noteful_folders')
        .returning('*')
        .then(rows => {
           return rows[0];
        });
    },
    updateFolder (db, update) {
        return db('noteful_folders')
        .update(update);
    }
}

module.exports = foldersService;