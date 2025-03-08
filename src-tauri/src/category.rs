use crate::error::ApplicationError;
use crate::schema::categories::dsl::categories;
use crate::schema::categories::name;
use crate::setup::Database;
use diesel::{
    ExpressionMethods, Insertable, OptionalExtension, QueryDsl, Queryable, RunQueryDsl,
    SqliteConnection,
};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use tauri::{State, command};

#[derive(Deserialize, Serialize, Queryable)]
#[diesel(table_name = crate::schema::categories)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Category {
    pub id: i32,
    pub parent_id: Option<i32>,
    pub name: String,
}

#[derive(Deserialize, Serialize, Insertable)]
#[diesel(table_name = crate::schema::categories)]
pub struct NewCategory<'a> {
    pub parent_id: i32,
    pub name: &'a str,
}

pub fn seed_root_category(connection: &mut SqliteConnection) -> Result<(), ApplicationError> {
    let existing_root: Option<Category> = categories
        .filter(name.eq("Dance"))
        .first(connection)
        .optional()?;

    if existing_root.is_none() {
        let new_root = NewCategory {
            parent_id: 0,
            name: "Dance",
        };
        diesel::insert_into(categories)
            .values(&new_root)
            .execute(connection)?;
    }

    Ok(())
}

#[command]
pub fn add_category(
    state: State<'_, Arc<Mutex<Database>>>,
    new_category: NewCategory,
) -> Result<Category, ApplicationError> {
    let mut database = state
        .lock()
        .expect("database mutex poisoned this is most likely a bug in the application");

    diesel::insert_into(categories)
        .values(&new_category)
        .execute(&mut database.connection)?;

    let updated_root: Category = categories
        .filter(name.eq("Dance"))
        .first(&mut database.connection)?;

    Ok(updated_root)
}
