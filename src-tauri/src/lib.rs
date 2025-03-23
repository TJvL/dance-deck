use crate::categories::commands::{
    add_category, get_all_categories, get_category_root_node, remove_category,
};
use crate::dances::commands::{
    add_dance, add_synonym, get_all_dances, remove_dance, remove_synonym,
};
use crate::library::command::{choose_library_root, get_library_root, import_all_tracks};
use setup::setup;
use tauri::{Builder, Manager, generate_context, generate_handler};
use tauri_plugin_prevent_default::Flags;

mod categories;
mod dances;
mod error;
pub mod global;
mod library;
mod migration;
mod schema;
mod setup;
mod tracks;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .setup(setup)
        .plugin(
            tauri_plugin_prevent_default::Builder::new()
                .with_flags(
                    Flags::CONTEXT_MENU
                        | Flags::PRINT
                        | Flags::DOWNLOADS
                        | Flags::RELOAD
                        | Flags::FIND
                        | Flags::DEV_TOOLS
                        | Flags::OPEN
                        | Flags::FOCUS_MOVE
                        | Flags::SOURCE,
                )
                .build(),
        )
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("no main window")
                .set_focus();
        }))
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
            get_all_dances,
            add_dance,
            remove_dance,
            add_synonym,
            remove_synonym,
            get_library_root,
            choose_library_root,
            import_all_tracks,
        ])
        .run(generate_context!())
        .expect("error while running application");
}
