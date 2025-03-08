use crate::category::add_category;
use setup::setup_database;
use tauri::{Builder, generate_context, generate_handler};

mod category;
mod error;
mod migration;
mod schema;
pub mod setup;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .setup(setup_database)
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(generate_handler![add_category])
        .run(generate_context!())
        .expect("error while running application");
}
