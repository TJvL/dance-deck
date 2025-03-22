use diesel::SqliteConnection;
use serde::{Deserialize, Serialize};

pub struct Database {
    pub connection: SqliteConnection,
}

#[derive(Deserialize, Serialize)]
pub struct Configuration {
    pub library_root: String,
    pub database_name: String,
}
