use crate::dances::data::{Dance, NewDance};
use crate::error::ApplicationError;
use crate::setup::Database;
use std::sync::Mutex;
use tauri::{State, command};

#[command]
pub fn get_all_dances(state: State<'_, Mutex<Database>>) -> Result<Vec<Dance>, ApplicationError> {
    unimplemented!()
}

#[command]
pub fn add_dance(
    state: State<'_, Mutex<Database>>,
    new_dance: NewDance,
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
