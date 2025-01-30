use crate::data::{setup_database};
use tauri::{generate_context, generate_handler, Builder};
use tauri_plugin_opener::init;

mod data;
mod error;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .setup(setup_database)
        .plugin(init())
        .invoke_handler(generate_handler![])
        .run(generate_context!())
        .expect("error while running tauri application");
}
