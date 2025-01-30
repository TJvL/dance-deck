use std::sync::{Arc, Mutex};
use serde::{Deserialize, Serialize};
use tauri::{command, State};
use crate::data::setup::Database;
use crate::error::Error;

#[derive(Deserialize, Serialize)]
pub struct Track {
    pub id: i64,
    pub track_name: String,
    pub artist_name: String,
    pub dance_name: String,
}

#[command]
pub fn get_tracks(state: State<'_, Arc<Mutex<Database>>>) -> Result<Vec<Track>, Error> {
    let database = state
        .lock()
        .expect("database mutex poisoned this is most likely a bug in the application");
    
    

    Ok(vec![])
}

#[command]
pub fn add_track(
    state: State<'_, Arc<Mutex<Database>>>,
    track: Track,
) -> Result<(), Error> {
    let database = state
        .lock()
        .expect("database mutex poisoned this is most likely a bug in the application");

    

    Ok(())
}
