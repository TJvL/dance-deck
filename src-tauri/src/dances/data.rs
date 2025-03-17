use diesel::{Insertable, Queryable};
use serde::Deserialize;

#[derive(Debug, Queryable)]
#[diesel(table_name = crate::schema::dances)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct DanceRecord {
    pub id: i32,
    pub name: String,
    pub category_id: i32,
    pub synonyms: Option<String>,
}

#[derive(Debug, Deserialize, Insertable)]
#[serde(rename_all = "camelCase")]
#[diesel(table_name = crate::schema::dances)]
pub struct NewDanceRecord<'a> {
    pub name: &'a str,
    pub category_id: i32,
}

#[derive(Clone, Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DanceEntry {
    pub name: String,
    pub category: String,
    pub synonyms: Vec<String>,
}
