use crate::category::seed_root_category;
use crate::migration::run_migrations;
use diesel::{Connection, SqliteConnection};
use std::error::Error;
use std::sync::Mutex;
use tauri::{App, Manager};

const DATABASE_URL: &str = "database.db";

pub struct Database {
    pub connection: SqliteConnection,
}

pub fn setup_database(application: &mut App) -> Result<(), Box<dyn Error>> {
    let mut connection = SqliteConnection::establish(DATABASE_URL)
        .expect("could not access or create database file");

    run_migrations(DATABASE_URL);
    seed_root_category(&mut connection)?;

    let database = Database { connection };
    application.manage(Mutex::new(database));

    Ok(())
}
