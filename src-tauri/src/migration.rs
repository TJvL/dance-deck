use diesel::SqliteConnection;
use diesel_migrations::{EmbeddedMigrations, MigrationHarness, embed_migrations};

const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");

pub fn run_migrations(connection: &mut SqliteConnection) {
    connection
        .run_pending_migrations(MIGRATIONS)
        .expect("database migration failed");
}
