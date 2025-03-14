use diesel::{Insertable, Queryable};
use serde::{Deserialize, Serialize};

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
