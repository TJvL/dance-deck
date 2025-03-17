use crate::categories::data::{CategoryEntry, CategoryNode, CategoryRecord, NewCategoryRecord};
use crate::categories::tree::build_category_tree;
use crate::error::ApplicationError;
use crate::schema::categories::dsl::categories;
use crate::schema::categories::id;
use crate::setup::Database;
use diesel::ExpressionMethods;
use diesel::QueryDsl;
use diesel::{RunQueryDsl, delete};
use std::sync::Mutex;
use tauri::{State, command};

#[command]
pub fn get_category_root_node(
    state: State<'_, Mutex<Database>>,
) -> Result<CategoryNode, ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|poison_error| ApplicationError::MutexLock(poison_error.to_string()))?;

    let category_list = categories.load::<CategoryRecord>(&mut database.connection)?;
    let category_root = build_category_tree(category_list);

    Ok(category_root)
}

#[command]
pub fn get_all_categories(
    state: State<'_, Mutex<Database>>,
) -> Result<Vec<CategoryEntry>, ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|e| ApplicationError::MutexLock(e.to_string()))?;

    let category_records = categories.load::<CategoryRecord>(&mut database.connection)?;
    let category_list: Vec<_> = category_records
        .iter()
        .map(|category_record| CategoryEntry {
            id: category_record.id,
            name: category_record.name.clone(),
        })
        .collect();

    Ok(category_list)
}

#[command]
pub fn add_category(
    state: State<'_, Mutex<Database>>,
    new_category: NewCategoryRecord,
) -> Result<(), ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|poison_error| ApplicationError::MutexLock(poison_error.to_string()))?;

    diesel::insert_into(categories)
        .values(&new_category)
        .execute(&mut database.connection)?;

    Ok(())
}

#[command]
pub fn remove_category(
    state: State<'_, Mutex<Database>>,
    category_id: i32,
) -> Result<(), ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|e| ApplicationError::MutexLock(e.to_string()))?;

    delete(categories.filter(id.eq(category_id))).execute(&mut database.connection)?;

    Ok(())
}
