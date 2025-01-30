use tauri::{generate_context, generate_handler, Builder};
use tauri_plugin_opener::init;
use crate::data::setup::setup_database;

mod data;
mod error;
mod schema;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .setup(setup_database)
        .plugin(init())
        .invoke_handler(generate_handler![])
        .run(generate_context!())
        .expect("error while running tauri application");
}
