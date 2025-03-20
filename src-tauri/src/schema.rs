// @generated automatically by Diesel CLI.

diesel::table! {
    categories (id) {
        id -> Integer,
        parent_id -> Nullable<Integer>,
        name -> Text,
    }
}

diesel::table! {
    dances (id) {
        id -> Integer,
        name -> Text,
        category_id -> Integer,
    }
}

diesel::table! {
    synonyms (id) {
        id -> Integer,
        name -> Text,
        dance_id -> Integer,
    }
}

diesel::joinable!(dances -> categories (category_id));
diesel::joinable!(synonyms -> dances (dance_id));

diesel::allow_tables_to_appear_in_same_query!(
    categories,
    dances,
    synonyms,
);
