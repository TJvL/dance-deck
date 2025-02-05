use std::sync::{Arc, Mutex};
use diesel::{Insertable, QueryDsl, Queryable, RunQueryDsl, Selectable, SelectableHelper};
use serde::{Deserialize, Serialize};
use crate::error::Error;
use tauri::{command, AppHandle, State};
use tauri_plugin_dialog::DialogExt;
use crate::data::setup::Database;
use crate::schema::libraries;

#[derive(Deserialize, Serialize, Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::libraries)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Library {
    pub id: i32,
    pub path: String,
}

#[derive(Deserialize, Serialize, Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::library_tracks)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct LibraryTrack {
    pub library_id: i32,
    pub track_id: i32,
}

#[command]
fn initialize_library(application: AppHandle, state: State<'_, Arc<Mutex<Database>>>) -> Result<(), Error> {
    
    let path = application.dialog().file().blocking_pick_folder();

    let mut database = state
        .lock()
        .expect("database mutex poisoned this is most likely a bug in the application");
    let results = libraries::table.select(Library::as_select()).load(&mut database.connection);

    Ok(())
}
