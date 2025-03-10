use crate::migration::run_migrations;
use diesel::{Connection, SqliteConnection};
use std::error::Error;
use std::sync::Mutex;
use tauri::{App, Manager};

pub struct Database {
    pub connection: SqliteConnection,
}

pub fn setup(application: &mut App) -> Result<(), Box<dyn Error>> {
    let mut connection = SqliteConnection::establish("database.db")
        .expect("could not access or create database file");

    run_migrations(&mut connection);

    let database = Database { connection };
    application.manage(Mutex::new(database));

    Ok(())
}
