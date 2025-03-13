use crate::error::ApplicationError;
use crate::schema::categories::dsl::categories;
use crate::schema::categories::id;
use crate::setup::Database;
use diesel::ExpressionMethods;
use diesel::QueryDsl;
use diesel::{Insertable, Queryable, RunQueryDsl, delete};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Mutex;
use tauri::{State, command};

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CategoryNode {
    pub id: i32,
    pub name: String,
    pub child_categories: Vec<CategoryNode>,
}

#[derive(Debug, Queryable)]
#[diesel(table_name = crate::schema::categories)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Category {
    pub id: i32,
    pub parent_id: Option<i32>,
    pub name: String,
}

#[derive(Debug, Deserialize, Insertable)]
#[serde(rename_all = "camelCase")]
#[diesel(table_name = crate::schema::categories)]
pub struct NewCategory<'a> {
    pub parent_id: i32,
    pub name: &'a str,
}

pub fn build_category_tree(flat_categories: Vec<Category>) -> CategoryNode {
    let mut node_map: HashMap<i32, (CategoryNode, Option<i32>)> = flat_categories
        .iter()
        .map(|category| {
            (
                category.id,
                (
                    CategoryNode {
                        id: category.id,
                        name: category.name.clone(),
                        child_categories: Vec::new(),
                    },
                    category.parent_id,
                ),
            )
        })
        .collect();

    let ids: Vec<i32> = node_map.keys().copied().collect();

    for identifier in ids {
        if let Some(&(_, Some(parent_id))) = node_map.get(&identifier) {
            if let Some(child_tuple) = node_map.get(&identifier) {
                let child_node = child_tuple.0.clone();
                if let Some((parent_node, _)) = node_map.get_mut(&parent_id) {
                    parent_node.child_categories.push(child_node);
                }
            }
        }
    }

    flat_categories
        .iter()
        .find(|cat| cat.parent_id.is_none())
        .and_then(|cat| node_map.get(&cat.id))
        .map(|(node, _)| node.clone())
        .expect("No root category found")
}

#[command]
pub fn get_all_categories(
    state: State<'_, Mutex<Database>>,
) -> Result<CategoryNode, ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|poison_error| ApplicationError::MutexLock(poison_error.to_string()))?;

    let category_list = categories.load::<Category>(&mut database.connection)?;
    let category_root = build_category_tree(category_list);

    Ok(category_root)
}

#[command]
pub fn add_category(
    state: State<'_, Mutex<Database>>,
    new_category: NewCategory,
) -> Result<CategoryNode, ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|poison_error| ApplicationError::MutexLock(poison_error.to_string()))?;

    diesel::insert_into(categories)
        .values(&new_category)
        .execute(&mut database.connection)?;

    let category_list = categories.load::<Category>(&mut database.connection)?;
    let category_root = build_category_tree(category_list);

    Ok(category_root)
}

#[command]
pub fn remove_category(
    state: State<'_, Mutex<Database>>,
    category_id: i32,
) -> Result<CategoryNode, ApplicationError> {
    let mut database = state
        .lock()
        .map_err(|e| ApplicationError::MutexLock(e.to_string()))?;

    delete(categories.filter(id.eq(category_id))).execute(&mut database.connection)?;

    let category_list = categories.load::<Category>(&mut database.connection)?;
    let category_root = build_category_tree(category_list);

    Ok(category_root)
}
