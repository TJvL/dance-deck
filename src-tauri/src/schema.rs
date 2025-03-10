// @generated automatically by Diesel CLI.

diesel::table! {
    categories (id) {
        id -> Integer,
        parent_id -> Nullable<Integer>,
        name -> Text,
    }
}
