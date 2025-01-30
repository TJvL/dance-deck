PRAGMA
foreign_keys = ON;

CREATE TABLE Artists
(
    artist_name TEXT PRIMARY KEY
);

CREATE TABLE Dances
(
    dance_name TEXT PRIMARY KEY
);

CREATE TABLE Tracks
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    track_name  TEXT NOT NULL,
    artist_name TEXT NOT NULL,
    dance_name  TEXT NOT NULL,
    FOREIGN KEY (artist_name) REFERENCES Artists (artist_name) ON DELETE CASCADE,
    FOREIGN KEY (dance_name) REFERENCES Dances (dance_name) ON DELETE CASCADE
);
