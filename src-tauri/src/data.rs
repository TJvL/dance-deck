use rusqlite::Connection;
use std::error::Error;
use std::sync::Mutex;
use tauri::{App, Manager};

pub struct Database {
    pub connection: Connection,
}

pub fn setup(_application: &mut App) -> Result<(), Box<dyn Error>> {
    let connection = Connection::open("./database.db3")?;
    connection.execute(
        "CREATE TABLE IF NOT EXISTS Songs (
            id INTEGER PRIMARY KEY,
            song_name TEXT NOT NULL,
            artist_name TEXT NOT NULL,
            dance_name TEXT NOT NULL
            )",
        (),
    )?;
    
    let database = Database { connection };
    _application.manage(Mutex::new(database));

    Ok(())
}

#[tauri::command]
pub fn get_song_info() {
    println!("I was invoked from JavaScript!");
}
