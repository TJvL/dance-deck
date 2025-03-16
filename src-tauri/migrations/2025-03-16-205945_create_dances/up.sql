CREATE TABLE dances
(
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name            TEXT NOT NULL,
    synonyms        TEXT,
    category_id     INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE INDEX idx_dances_name ON dances (name);
