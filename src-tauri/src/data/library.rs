use crate::data::setup::Database;
use crate::error::ApplicationError;
use crate::schema::libraries;
use diesel::{Insertable, QueryDsl, Queryable, RunQueryDsl, Selectable, SelectableHelper};
use id3::{Tag, TagLike};
use serde::{Deserialize, Serialize};
use std::fs::read_dir;
use std::io::ErrorKind;
use std::sync::{Arc, Mutex};
use tauri::{command, AppHandle, State};
use tauri_plugin_dialog::DialogExt;

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
pub fn initialize_library(
    application: AppHandle,
    state: State<'_, Arc<Mutex<Database>>>,
) -> Result<(), ApplicationError> {
    let directory_path = application.dialog().file().blocking_pick_folder();

    if let Some(directory_path) = directory_path {
        let directory = read_dir(directory_path.to_string())?;

        let mut count = 0;
        for entry in directory {
            let entry = entry?;
            count += 1;

            if entry.path().is_file() {
                let tag = Tag::read_from_path(entry.path())?;
                tag.title();
                tag.artist();
                tag.get("dance").and_then(|frame| frame.content().text());
            }
        }

        if count == 0 {
            return Err(ApplicationError::FileSystem(std::io::Error::new(
                ErrorKind::InvalidInput,
                "no files can be processed because the directory is empty",
            )));
        }
    }

    let mut database = state
        .lock()
        .expect("database mutex poisoned this is most likely a bug in the application");
    let results = libraries::table
        .select(Library::as_select())
        .load(&mut database.connection);

    Ok(())
}
