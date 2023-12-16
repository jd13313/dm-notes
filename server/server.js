const express = require('express');
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