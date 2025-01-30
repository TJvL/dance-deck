use crate::data::setup::setup_database;
use crate::data::tracks::{add_track, get_all_tracks};
use tauri::{generate_context, generate_handler, Builder};
use tauri_plugin_opener::init;

mod data;
mod error;
mod schema;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .setup(setup_database)
        .plugin(init())
        .invoke_handler(generate_handler![get_all_tracks, add_track])
        .run(generate_context!())
        .expect("error while running tauri application");
}
