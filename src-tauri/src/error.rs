use serde::{Serialize, Serializer};

#[derive(Debug, thiserror::Error)]
pub enum ApplicationError {
    #[error(transparent)]
    Internal(#[from] tauri::Error),
    #[error(transparent)]
    Config(#[from] toml::ser::Error),
    #[error(transparent)]
    Database(#[from] diesel::result::Error),
    #[error(transparent)]
    FileSystem(#[from] std::io::Error),
    #[error("mutex lock error: {0}")]
    MutexLock(String),
}

#[derive(Debug, Serialize)]
#[serde(tag = "kind", content = "message")]
#[serde(rename_all = "camelCase")]
enum FrontendApplicationError {
    Internal(String),
    Config(String),
    Database(String),
    FileSystem(String),
    MutexLock(String),
}

impl Serialize for ApplicationError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let error_message = self.to_string();
        let error_kind = match self {
            Self::Internal(_) => FrontendApplicationError::Internal(error_message),
            Self::Config(_) => FrontendApplicationError::Config(error_message),
            Self::Database(_) => FrontendApplicationError::Database(error_message),
            Self::FileSystem(_) => FrontendApplicationError::FileSystem(error_message),
            Self::MutexLock(_) => FrontendApplicationError::MutexLock(error_message),
        };
        error_kind.serialize(serializer)
    }
}
