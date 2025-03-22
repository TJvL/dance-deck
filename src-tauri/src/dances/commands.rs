use crate::dances::data::{DanceEntry, NewDanceRecord, NewSynonymRecord, SynonymEntry};
use crate::error::ApplicationError;
use crate::schema::categories::dsl::{categories as categories_table, name as category_name_field};
use crate::schema::dances::dsl::{
    dances as dances_table, id as dance_id_field, name as dance_name_field,
};
use crate::schema::synonyms::dsl::{
    dance_id as synonym_dance_id_field, id as synonym_id_field, name as synonym_name_field,
    synonyms as synonyms_table,
};
use crate::setup::Database;
use diesel::{
    ExpressionMethods, JoinOnDsl, NullableExpressionMethods, QueryDsl, RunQueryDsl, delete,
    insert_into,
};
use std::collections::HashMap;
use std::sync::Mutex;
use tauri::{State, command};

#[command]
pub fn get_all_dances(
    state: State<'_, Mutex<Database>>,
) -> Result<Vec<DanceEntry>, ApplicationError> {
    let mut db = state
        .lock()
        .map_err(|e| ApplicationError::MutexLock(e.to_string()))?;

    let results = dances_table
        .inner_join(categories_table)
        .left_join(synonyms_table.on(synonym_dance_id_field.eq(dance_id_field)))
        .select((
            dance_id_field,
            dance_name_field,
            category_name_field,
            synonym_id_field.nullable(),
            synonym_name_field.nullable(),
        ))
        .load::<(i32, String, String, Option<i32>, Option<String>)>(&mut db.connection)?;

    let mut map: HashMap<i32, (String, String, Vec<SynonymEntry>)> = HashMap::new();
    for (dance_id, dance_name, category_name, optional_synonym_id, optional_synonym_name) in results
    {
        let entry =
            map.entry(dance_id)
                .or_insert((dance_name.clone(), category_name.clone(), Vec::new()));
        if let (Some(synonym_id), Some(synonym_name)) = (optional_synonym_id, optional_synonym_name)
        {
            entry.2.push(SynonymEntry {
                id: synonym_id,
                name: synonym_name,
            });
        }
    }

    let dance_entries = map
        .into_iter()
        .map(
            |(dance_id, (dance_name, category_name, synonyms))| DanceEntry {
                id: dance_id,
                name: dance_name,
                category: category_name,
                synonyms,
            },
        )
        .collect();

    Ok(dance_entries)
}

#[command]
pub fn add_dance(
    state: State<'_, Mutex<Database>>,
    new_dance: NewDanceRecord,
) -> Result<(), ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|e| ApplicationError::MutexLock(e.to_string()))?;

    insert_into(dances_table)
        .values(&new_dance)
        .execute(&mut database.connection)?;

    Ok(())
}

#[command]
pub fn remove_dance(
    state: State<'_, Mutex<Database>>,
    dance_id: i32,
) -> Result<(), ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|e| ApplicationError::MutexLock(e.to_string()))?;

    delete(dances_table.filter(dance_id_field.eq(dance_id))).execute(&mut database.connection)?;

    Ok(())
}

#[command]
pub fn add_synonym(
    state: State<'_, Mutex<Database>>,
    new_synonym: NewSynonymRecord,
) -> Result<(), ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|e| ApplicationError::MutexLock(e.to_string()))?;

    insert_into(synonyms_table)
        .values(&new_synonym)
        .execute(&mut database.connection)?;

    Ok(())
}

#[command]
pub fn remove_synonym(
    state: State<'_, Mutex<Database>>,
    synonym_id: i32,
) -> Result<(), ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|e| ApplicationError::MutexLock(e.to_string()))?;

    delete(synonyms_table.filter(synonym_id_field.eq(synonym_id)))
        .execute(&mut database.connection)?;

    Ok(())
}
