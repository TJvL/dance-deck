// @generated automatically by Diesel CLI.

diesel::table! {
    artists (id) {
        id -> Integer,
        name -> Text,
    }
}

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

diesel::table! {
    tracks (id) {
        id -> Integer,
        title -> Text,
        artist_id -> Integer,
        dance_id -> Integer,
    }
}

diesel::joinable!(dances -> categories (category_id));
diesel::joinable!(synonyms -> dances (dance_id));
diesel::joinable!(tracks -> artists (artist_id));
diesel::joinable!(tracks -> dances (dance_id));

diesel::allow_tables_to_appear_in_same_query!(
    artists,
    categories,
    dances,
    synonyms,
    tracks,
);
