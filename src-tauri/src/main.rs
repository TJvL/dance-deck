// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use diesel::{Connection, SqliteConnection};
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

const DATABASE_URL: &str = "database.db";
const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");

fn main() {
    let mut connection =
        SqliteConnection::establish(DATABASE_URL).expect("could not access or create database");
    connection
        .run_pending_migrations(MIGRATIONS)
        .expect("database migration failed");
    dance_deck_lib::run()
}
