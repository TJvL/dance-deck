use crate::error::ApplicationError;
use crate::global::Configuration;
use crate::library::data::{ImportProgress, ImportedTrack};
use crate::setup::write_config;
use std::fs::{File, metadata, read_dir};
use std::path::Path;
use std::sync::Mutex;
use symphonia::core::formats::FormatOptions;
use symphonia::core::io::MediaSourceStream;
use symphonia::core::meta::{MetadataOptions, StandardTagKey};
use symphonia::core::probe::Hint;
use symphonia::default::get_probe;
use tauri::{AppHandle, Emitter, State, command};
use tauri_plugin_dialog::DialogExt;

#[command]
pub fn get_library_root(
    state: State<'_, Mutex<Configuration>>,
) -> Result<String, ApplicationError> {
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

#[command]
pub async fn import_all_tracks(
    app_handle: AppHandle,
    state: State<'_, Mutex<Configuration>>,
    directory_path: String,
) -> Result<(), ApplicationError> {
    app_handle.emit("import_started", ())?;

    let config = state
        .lock()
        .map_err(|poison_error| ApplicationError::MutexLock(poison_error.to_string()))?;

    let directory_path = Path::new(&directory_path);
    let library_root = config.library_root.clone();

    let mut imported_tracks: Vec<ImportedTrack> = Vec::new();

    let mut hint = Hint::new();
    hint.with_extension("mp3");
    let metadata_options: MetadataOptions = Default::default();
    let format_options: FormatOptions = Default::default();

    for dir_entry in read_dir(directory_path)?.flatten() {
        if dir_entry.path().is_file() && !dir_entry.path().is_symlink() {
            let path = dir_entry.path();
            let file_name = path.file_stem().unwrap().to_str().unwrap();
            let file = File::open(path.clone())?;
            
            // probe the file to check if the format is supported
            let media_source_stream = MediaSourceStream::new(Box::new(file), Default::default());
            let result = get_probe().format(
                &hint,
                media_source_stream,
                &format_options,
                &metadata_options,
            );
            match result {
                Ok(mut probe_result) => {
                    
                    // start extracting track information
                    let mut artist_name: Option<String> = None;
                    let mut title: Option<String> = None;
                    let mut dance_name: Option<String> = None;
                    if let Some(metadata) = probe_result.format.metadata().skip_to_latest() {
                        for tag in metadata.tags() {
                            if let Some(tag_key) = tag.std_key {
                                match tag_key {
                                    StandardTagKey::Artist => {
                                        artist_name = Some(tag.value.to_string())
                                    }
                                    StandardTagKey::TrackTitle => {
                                        title = Some(tag.value.to_string())
                                    }
                                    _ => {}
                                }
                            } else if tag.key == "DanceName" {
                                dance_name = Some(tag.value.to_string());
                            }
                        }
                    }
                    
                    // get dance - artist - title from the filename if possible when still not found
                    let file_name_split = file_name
                        .split("-")
                        .map(|slice| slice.trim())
                        .collect::<Vec<&str>>();
                    if file_name_split.len() == 3 {
                        if dance_name.is_none() {
                            dance_name = Some(file_name_split[0].to_string());
                        }
                        if artist_name.is_none() {
                            artist_name = Some(file_name_split[1].to_string());
                        }
                        if title.is_none() {
                            title = Some(file_name_split[2].to_string());
                        }
                    }
                    
                    app_handle.emit(
                        "import_progress",
                        ImportProgress {
                            percentage: 0,
                            current_file_name: path.display().to_string(),
                            error_message: None,
                        },
                    )?;
                    imported_tracks.push(ImportedTrack {
                        dance_name,
                        artist_name,
                        title,
                        file_path: path.display().to_string(),
                    })
                }
                Err(error) => {
                    app_handle.emit(
                        "import_progress",
                        ImportProgress {
                            percentage: 0,
                            current_file_name: path.display().to_string(),
                            error_message: Some(error.to_string()),
                        },
                    )?;
                }
            }
        }
    }

    Ok(())
}
