use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use tauri::{command, App, Manager, State};
// use crate::error::Error;

pub struct Database {
}

pub fn setup_database(application: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let database = Database {  };
    application.manage(Mutex::new(database));

    Ok(())
}

#[derive(Deserialize, Serialize)]
pub struct Track {
    pub id: i64,
    pub track_name: String,
    pub artist_name: String,
    pub dance_name: String,
}

// #[command]
// pub fn get_tracks(state: State<'_, Arc<Mutex<Database>>>) -> Result<Vec<Track>, Error> {
//     let database = state
//         .lock()
//         .expect("database mutex poisoned this is most likely a bug in the application");
// 
//     let mut statement = database.connection.prepare("SELECT * FROM Tracks")?;
// 
//     let tracks = statement
//         .query_map([], |row| {
//             Ok(Track {
//                 id: row.get(0)?,
//                 track_name: row.get(1)?,
//                 artist_name: row.get(2)?,
//                 dance_name: row.get(3)?,
//             })
//         })?
//         .filter_map(Result::ok)
//         .collect();
// 
//     Ok(tracks)
// }
// 
// #[command]
// pub fn add_track(
//     state: State<'_, Arc<Mutex<Database>>>,
//     track: Track,
// ) -> Result<(), Error> {
//     let database = state
//         .lock()
//         .expect("database mutex poisoned this is most likely a bug in the application");
// 
//     database.connection.execute(
//         "INSERT INTO Tracks (track_name, artist_name, dance_name) VALUES (?1, ?2, ?3)",
//         params![track.track_name, track.artist_name, track.dance_name],
//     )?;
// 
//     Ok(())
// }
