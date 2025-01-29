use crate::data::{get_song_info, setup};
use tauri::{generate_context, generate_handler, Builder};
use tauri_plugin_opener::init;

mod data;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .setup(setup)
        .plugin(init())
        .invoke_handler(generate_handler![get_song_info])
        .run(generate_context!())
        .expect("error while running tauri application");
}
