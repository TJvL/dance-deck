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

diesel::table! {
    libraries (id) {
        id -> Integer,
        path -> Text,
    }
}

diesel::table! {
    library_tracks (id) {
        id -> Integer,
        library_id -> Integer,
        track_id -> Integer,
    }
}

diesel::joinable!(tracks -> artists (artist_id));
diesel::joinable!(tracks -> dances (dance_id));
diesel::joinable!(library_tracks -> libraries (library_id));
diesel::joinable!(library_tracks -> tracks (track_id));

diesel::allow_tables_to_appear_in_same_query!(artists, dances, tracks);
diesel::allow_tables_to_appear_in_same_query!(libraries, library_tracks, tracks);
