use crate::category::{add_category, get_all_categories};
use setup::setup;
use tauri::{Builder, generate_context, generate_handler};

mod category;
mod error;
mod migration;
mod schema;
pub mod setup;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .setup(setup)
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(generate_handler![add_category, get_all_categories])
        .run(generate_context!())
        .expect("error while running application");
}
