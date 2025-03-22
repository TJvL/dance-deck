CREATE TABLE categories
(
    id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER,
    name      TEXT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE INDEX idx_categories_name ON categories (name);

INSERT INTO categories (parent_id, name) VALUES (NULL, 'Dans');

CREATE TABLE dances
(
    id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE UNIQUE INDEX idx_dances_name ON dances (name);

CREATE TABLE synonyms
(
    id       INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name     TEXT NOT NULL,
    dance_id INTEGER NOT NULL,
    FOREIGN KEY (dance_id) REFERENCES dances (id)
);

CREATE UNIQUE INDEX idx_synonyms_name ON synonyms (name);

CREATE TABLE artists
(
    id   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE tracks
(
    id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title     TEXT NOT NULL,
    artist_id INTEGER NOT NULL,
    dance_id  INTEGER NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artists (id),
    FOREIGN KEY (dance_id) REFERENCES dances (id)
);
