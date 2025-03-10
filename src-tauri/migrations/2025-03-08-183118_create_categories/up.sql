CREATE TABLE categories
(
    id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER,
    name      TEXT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_categories_name ON categories (name);
