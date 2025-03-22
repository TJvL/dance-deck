use crate::error::ApplicationError;
use crate::global::{Configuration, Database};
use crate::migration::run_migrations;
use diesel::{Connection, SqliteConnection};
use std::env::current_dir;
use std::error::Error;
use std::fs::{File, read_to_string};
use std::io::{ErrorKind, Write};
use std::sync::Mutex;
use tauri::{App, Manager};
use toml::{from_str, to_string_pretty};

const CONFIG_FILENAME: &str = "config.toml";
const LIBRARY_FOLDER: &str = "library";
const DATABASE_FILENAME: &str = "database.db";

pub fn setup(application: &mut App) -> Result<(), Box<dyn Error>> {
    let config = check_configuration()?;

    let mut connection = SqliteConnection::establish(config.database_name.as_str())?;

    run_migrations(&mut connection);

    let database = Database { connection };

    application.manage(Mutex::new(config));
    application.manage(Mutex::new(database));

    #[cfg(debug_assertions)]
    {
        let window = application
            .get_webview_window("main")
            .expect("no main window");
        window.open_devtools();
    }

    Ok(())
}

pub fn write_config(configuration: &Configuration) -> Result<(), ApplicationError> {
    let contents = to_string_pretty(&configuration)?;
    let mut file = File::create(CONFIG_FILENAME)?;
    file.write_all(contents.as_bytes())?;
    file.flush()?;
    Ok(())
}

fn check_configuration() -> Result<Configuration, Box<dyn Error>> {
    let result = read_to_string(CONFIG_FILENAME);
    match result {
        Ok(contents) => Ok(from_str::<Configuration>(contents.as_str())?),
        Err(error) => {
            if error.kind() == ErrorKind::NotFound {
                let current_directory = &current_dir()?;
                let path = current_directory.join(LIBRARY_FOLDER);
                let config = Configuration {
                    library_root: path.display().to_string(),
                    database_name: DATABASE_FILENAME.to_string(),
                };
                write_config(&config)?;
                Ok(config)
            } else {
                Err(Box::new(error))
            }
        }
    }
}
