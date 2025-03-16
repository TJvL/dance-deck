use diesel::{Insertable, Queryable};
use serde::Deserialize;
use serde_json::error::Category;

#[derive(Debug, Queryable)]
#[diesel(table_name = crate::schema::dances)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Dance {
    pub name: String,
    pub category: Category,
    pub synonyms: Vec<String>,
}

#[derive(Debug, Deserialize, Insertable)]
#[serde(rename_all = "camelCase")]
#[diesel(table_name = crate::schema::dances)]
pub struct NewDance<'a> {
    pub name: &'a str,
    pub category_id: i32,
}
