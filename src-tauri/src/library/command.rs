use crate::error::ApplicationError;
use crate::global::Configuration;
use crate::setup::write_config;
use std::fs::read_dir;
use std::path::Path;
use std::sync::Mutex;
use tauri::{AppHandle, State, command};
use tauri_plugin_dialog::DialogExt;

#[command]
pub fn get_library_root(state: State<'_, Mutex<Configuration>>) -> Result<String, ApplicationError> {
    let config = state
        .lock()
        .map_err(|poison_error| ApplicationError::MutexLock(poison_error.to_string()))?;
    
    Ok(config.library_root.clone())
}

#[command]
pub async fn choose_library_root(
    app_handle: AppHandle,
    state: State<'_, Mutex<Configuration>>,
) -> Result<Option<String>, ApplicationError> {
    let mut config = state
        .lock()
        .map_err(|poison_error| ApplicationError::MutexLock(poison_error.to_string()))?;

    let optional_path = app_handle.dialog().file().blocking_pick_folder();
    if let Some(file_path) = optional_path {
        let path = file_path.to_string();
        read_dir(Path::new(&path))?;
        let temp = config.library_root.clone();
        config.library_root = path;
        
        match write_config(&config) { 
            Ok(_) => Ok(Some(config.library_root.clone())),
            Err(error) => {
                config.library_root = temp;
                Err(error)
            }
        }
    } else { 
        Ok(None)
    }
}
