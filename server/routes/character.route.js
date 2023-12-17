const express = require('express');
const characterRoute = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dbc = new sqlite3.Database('db/dm-notes.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the dm-notes database.');
    }
});

const baseSelectSql = `
    SELECT  id,
            name,
            description,
            notes,
            ac,
            hp_max,
            hp_current,
            str,
            dex,
            con,
            int,
            wis,
            cha,
            class,
            image
    FROM    characters
`;

/**
 * Character GET all
 */
characterRoute.get('/', (req, res) => {  
    dbc.all(baseSelectSql, [], (err, characterRows) => {
        if (err) throw err;

        res.send({
            data: characterRows
        });
    });
});

/**
 * Character GET by ID
 */
characterRoute.get('/:characterId', (req, res) => {
    const { characterId } = req.params;
    const sql = `
        ${baseSelectSql}
        WHERE id = ?
    `;

    dbc.get(sql, [characterId], (err, characterRow) => {
        if (err) throw err;

        res.send({
            data: characterRow
        });
    });
});

/**
 * Character PUT
 */
characterRoute.post('/', (req, res) => {
    const characterData = req.body;
    const characterSql = `
        INSERT INTO characters (name, description, notes, ac, hp_max, hp_current, str, dex, con, int, wis, cha, class, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    dbc.run(characterSql, [
        characterData.name,
        characterData.description,
        characterData.notes,
        characterData.ac,
        characterData.hp_max,
        characterData.hp_current,
        characterData.str,
        characterData.dex,
        characterData.con,
        characterData.int,
        characterData.wis,
        characterData.cha,
        characterData.class,
        characterData.image
    ], function(err) {
        if (err) throw err;

        res.send({
            message: "success"
        });
    });
});

/**
 * Character PUT
 * 
 */
characterRoute.put('/:characterId', (req, res) => {
    const { characterId } = req.params;
    const characterData = req.body;

    console.log(characterData);
    const characterSql = `
        UPDATE  characters
        SET     name = ?,
                description = ?,
                notes = ?,
                ac = ?,
                hp_max = ?,
                hp_current = ?,
                str = ?,
                dex = ?,
                con = ?,
                int = ?,
                wis = ?,
                cha = ?,
                class = ?,
                image = ?
        WHERE   id = ?
    `;

    dbc.run(characterSql, [
        characterData.name,
        characterData.description,
        characterData.notes,
        characterData.ac,
        characterData.hp_max,
        characterData.hp_current,
        characterData.str,
        characterData.dex,
        characterData.con,
        characterData.int,
        characterData.wis,
        characterData.cha,
        characterData.class,
        characterData.image,
        characterId
    ], function(err) {
        if (err) throw err;

        res.send({
            message: "success"
        });
    });
});


characterRoute.delete('/:characterId', (req, res) => {
    const { characterId } = req.params;
    const characterSql = `
        DELETE FROM characters
        WHERE id = ?
    `;

    dbc.run(characterSql, [characterId], function(err) {
        if (err) throw err;

        res.send({
            message: "success"
        });
    });
});


module.exports = characterRoute;