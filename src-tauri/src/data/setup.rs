use diesel::{Connection, SqliteConnection};
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use std::sync::Mutex;
use tauri::{App, Manager};

const DATABASE_URL: &str = "database.db";
const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");

pub struct Database {
    pub connection: SqliteConnection,
}

pub fn setup_database(application: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let mut connection =
        SqliteConnection::establish(DATABASE_URL).expect("could not access or create database");
    connection
        .run_pending_migrations(MIGRATIONS)
        .expect("database migration failed");

    let database = Database {
        connection,
    };
    application.manage(Mutex::new(database));

    Ok(())
}
