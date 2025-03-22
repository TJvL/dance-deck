use diesel::Insertable;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Insertable)]
#[serde(rename_all = "camelCase")]
#[diesel(table_name = crate::schema::dances)]
pub struct NewDanceRecord<'a> {
    pub name: &'a str,
    pub category_id: i32,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DanceEntry {
    pub id: i32,
    pub name: String,
    pub category: String,
    pub synonyms: Vec<SynonymEntry>,
}

#[derive(Debug, Deserialize, Insertable)]
#[serde(rename_all = "camelCase")]
#[diesel(table_name = crate::schema::synonyms)]
pub struct NewSynonymRecord<'a> {
    pub name: &'a str,
    pub dance_id: i32,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SynonymEntry {
    pub id: i32,
    pub name: String,
}
