const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 5000;

const navItems =  [
    { name: 'Home', href: '/', hasAccordion: false },
    { name: 'Notes', href: '/notes', hasAccordion: true, subNav:[
        { name: 'Session 1', href: '/notes/session1', hasAccordion: false },
        { name: 'Session 2', href: '/notes/session2', hasAccordion: false },
        { name: 'Session 3', href: '/notes/session2', hasAccordion: false },
    ]},
    { name: 'Characters', href: '/characters', hasAccordion: true },
    { name: 'Presentables', href: '/presentables', hasAccordion: true },
];

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
    res.send({
        data: navItems
    });
});

app.get('/v1/navigation', (req, res) => {
    const db = new sqlite3.Database('./db/dm-notes.sqlite', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the dm-notes database.');
    });
    
    const sql = `
        SELECT  id,
                parent_id,
                name,
                link
        FROM    navItems
    `;

    db.all(sql, [], (err, navItemRows) => {
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