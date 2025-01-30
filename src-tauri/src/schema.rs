// @generated automatically by Diesel CLI.

diesel::table! {
    artists (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    dances (id) {
        id -> Integer,
        name -> Text,
    }
}

diesel::table! {
    tracks (id) {
        id -> Integer,
        name -> Text,
        artist_id -> Integer,
        dance_id -> Integer,
        playback_count -> Integer,
    }
}

diesel::joinable!(tracks -> artists (artist_id));
diesel::joinable!(tracks -> dances (dance_id));

diesel::allow_tables_to_appear_in_same_query!(
    artists,
    dances,
    tracks,
);
