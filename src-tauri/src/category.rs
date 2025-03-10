use diesel::QueryDsl;
use diesel::ExpressionMethods;
use crate::error::ApplicationError;
use crate::schema::categories::dsl::categories;
use crate::setup::Database;
use diesel::{delete, Insertable, Queryable, RunQueryDsl};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use tauri::{State, command};
use crate::schema::categories::id;

#[derive(Clone, Serialize)]
pub struct CategoryNode {
    pub id: i32,
    pub name: String,
    pub child_categories: Vec<CategoryNode>,
}

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

pub fn build_category_tree(flat_categories: Vec<Category>) -> Option<CategoryNode> {
    let mut node_map: HashMap<i32, (CategoryNode, Option<i32>)> = flat_categories
        .into_iter()
        .map(|cat| {
            (
                cat.id,
                (
                    CategoryNode {
                        id: cat.id,
                        name: cat.name,
                        child_categories: Vec::new(),
                    },
                    cat.parent_id,
                ),
            )
        })
        .collect();

    let mut root: Option<CategoryNode> = None;

    for identifier in node_map.clone().keys() {
        if let Some(&(_, parent_opt)) = node_map.get(identifier) {
            if let Some(parent_id) = parent_opt {
                if let Some((child_node, _)) = node_map.remove(identifier) {
                    if let Some((parent_node, _)) = node_map.get_mut(&parent_id) {
                        parent_node.child_categories.push(child_node);
                    }
                }
            } else {
                root = node_map.remove(identifier).map(|(node, _)| node);
            }
        }
    }

    root
}

#[command]
pub fn get_all_categories(
    state: State<'_, Arc<Mutex<Database>>>,
) -> Result<Option<CategoryNode>, ApplicationError> {
    println!("Getting all categories");
    
    let mut database = state
        .lock()
        .map_err(|poison_error| ApplicationError::MutexLock(poison_error.to_string()))?;

    let category_list = categories.load::<Category>(&mut database.connection)?;
    let category_root = build_category_tree(category_list);

    Ok(category_root)
}

#[command]
pub fn add_category(
    state: State<'_, Arc<Mutex<Database>>>,
    new_category: NewCategory,
) -> Result<Option<CategoryNode>, ApplicationError> {
    println!("Adding new category");
    
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
    state: State<'_, Arc<Mutex<Database>>>,
    category_id: i32,
) -> Result<Option<CategoryNode>, ApplicationError> {
    println!("Removing category {}", category_id);
    
    let mut database = state
        .lock()
        .map_err(|e| ApplicationError::MutexLock(e.to_string()))?;

    delete(categories.filter(id.eq(category_id)))
        .execute(&mut database.connection)?;

    let category_list = categories.load::<Category>(&mut database.connection)?;
    let category_root = build_category_tree(category_list);
    
    Ok(category_root)
}
