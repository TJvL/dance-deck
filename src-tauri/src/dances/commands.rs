use crate::dances::data::{DanceEntry, NewDanceRecord};
use crate::error::ApplicationError;
use crate::schema::categories::dsl::{categories, name as category_name};
use crate::schema::dances::dsl::{dances, name as dance_name, synonyms as dance_synonyms};
use crate::setup::Database;
use diesel::{QueryDsl, RunQueryDsl};
use std::sync::Mutex;
use tauri::{State, command};

#[command]
pub fn get_all_dances(
    state: State<'_, Mutex<Database>>,
) -> Result<Vec<DanceEntry>, ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|e| ApplicationError::MutexLock(e.to_string()))?;

    let results = dances
        .inner_join(categories)
        .select((dance_name, category_name, dance_synonyms))
        .load::<(String, String, Option<String>)>(&mut database.connection)?;

    let dance_entries = results
        .into_iter()
        .map(|(d_name, c_name, syn_opt)| {
            let synonyms = match syn_opt {
                Some(s) => s
                    .split(',')
                    .map(|s| s.trim().to_string())
                    .filter(|s| !s.is_empty())
                    .collect(),
                None => Vec::new(),
            };
            DanceEntry {
                name: d_name,
                category: c_name,
                synonyms,
            }
        })
        .collect();

    Ok(dance_entries)
}

#[command]
pub fn add_dance(
    state: State<'_, Mutex<Database>>,
    new_dance: NewDanceRecord,
) -> Result<(), ApplicationError> {
    unimplemented!()
}

#[command]
pub fn remove_dance(
    state: State<'_, Mutex<Database>>,
    dance_id: i32,
) -> Result<(), ApplicationError> {
    unimplemented!()
}
