use serde::{Serialize, Serializer};

#[derive(Debug, thiserror::Error)]
pub enum ApplicationError {
    #[error(transparent)]
    Database(#[from] diesel::result::Error),
    #[error(transparent)]
    FileSystem(#[from] std::io::Error),
    #[error("mutex lock error: {0}")]
    MutexLock(String),
}

impl Serialize for ApplicationError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
