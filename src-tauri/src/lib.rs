use crate::categories::commands::{
    add_category, get_all_categories, get_category_root_node, remove_category,
};
use setup::setup;
use tauri::{Builder, generate_context, generate_handler};

mod categories;
mod dances;
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
        .plugin(
            tauri_plugin_log::Builder::new()
                .clear_targets()
                .targets([
                    tauri_plugin_log::Target::new(tauri_plugin_log::TargetKind::Stdout),
                    tauri_plugin_log::Target::new(tauri_plugin_log::TargetKind::Webview),
                ])
                .build(),
        )
        .invoke_handler(generate_handler![
            add_category,
            get_category_root_node,
            remove_category,
            get_all_categories,
        ])
        .run(generate_context!())
        .expect("error while running application");
}
