-- Create navItems Table
CREATE TABLE navItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER,
    name TEXT NOT NULL,
    link TEXT
);

-- Populate navItems Table
INSERT INTO navItems
(id, parent_id, name, link)
VALUES(1, NULL, 'Home', '/');
INSERT INTO navItems
(id, parent_id, name, link)
VALUES(2, NULL, 'Notes', '/notes');
INSERT INTO navItems
(id, parent_id, name, link)
VALUES(3, 2, 'Session 1', '/notes/1');
INSERT INTO navItems
(id, parent_id, name, link)
VALUES(4, 2, 'Session 2', '/notes/2');
INSERT INTO navItems
(id, parent_id, name, link)
VALUES(5, 2, 'Session 3', '/notes/3');
