use serde::Serialize;

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ImportedTrack {
    pub dance_name: Option<String>,
    pub artist_name: Option<String>,
    pub title: Option<String>,
    pub file_path: String,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ImportProgress {
    pub percentage: u8,
    pub current_file_name: String,
    pub error_message: Option<String>,
}
