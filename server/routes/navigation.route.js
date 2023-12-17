const express = require('express');
const navigationRoute = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dbc = new sqlite3.Database('db/dm-notes.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the dm-notes database.');
    }
});

navigationRoute.get('/', (req, res) => {  
    const sql = `
        SELECT  id,
                parent_id,
                name,
                link
        FROM    navItems
    `;

    dbc.all(sql, [], (err, navItemRows) => {
        if (err) throw err;

        const navItems = [];

        navItemRows.forEach((navItemRow) => {
            if (!navItemRow.parent_id) {
                navItems.push(navItemRow);
            } else {
                const parentIndex = navItems.findIndex((navItem) => navItem.id === navItemRow.parent_id);
                
                if (parentIndex > -1) {
                    if (!navItems[parentIndex].subNav) {
                        navItems[parentIndex].subNav = [];
                    }
                    navItems[parentIndex].subNav.push(navItemRow);
                }
            }
        });

        res.send({
            data: navItems
        });
    });
});

module.exports = navigationRoute;