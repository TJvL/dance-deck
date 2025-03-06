use serde::{Serialize, Serializer};
use std::fmt::{Display, Formatter};

#[derive(Debug, thiserror::Error)]
pub enum ApplicationError {
    #[error(transparent)]
    Database(#[from] diesel::result::Error),
    FileSystem(#[from] std::io::Error),
    Mp3Tagging(#[from] id3::Error),
}

impl Display for ApplicationError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            ApplicationError::Database(error) => write!(f, "database error: {}", error),
            ApplicationError::FileSystem(error) => write!(f, "file system error: {}", error),
            ApplicationError::Mp3Tagging(error) => write!(f, "MP3 tag error: {}", error),
        }
    }
}

impl Serialize for ApplicationError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
