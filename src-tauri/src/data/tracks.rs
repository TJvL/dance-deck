use crate::data::setup::Database;
use crate::error::ApplicationError;
use crate::schema::tracks;
use diesel::{
    insert_into, Insertable, QueryDsl, Queryable, RunQueryDsl, Selectable, SelectableHelper,
};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use tauri::{command, State};

#[derive(Deserialize, Serialize, Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::tracks)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Track {
    pub id: i32,
    pub name: String,
    pub artist_id: i32,
    pub dance_id: i32,
    pub playback_count: i32,
}

#[command]
pub fn get_all_tracks(state: State<'_, Arc<Mutex<Database>>>) -> Result<Vec<Track>, ApplicationError> {
    let mut database = state
        .lock()
        .expect("database mutex poisoned this is most likely a bug in the application");

    let results = tracks::table
        .select(Track::as_select())
        .load::<Track>(&mut database.connection)?;
    Ok(results)
}

#[command]
pub fn add_track(state: State<'_, Arc<Mutex<Database>>>, track: Track) -> Result<(), ApplicationError> {
    let mut database = state
        .lock()
        .expect("database mutex poisoned this is most likely a bug in the application");

    insert_into(tracks::table)
        .values(&track)
        .execute(&mut database.connection)?;

    Ok(())
}
