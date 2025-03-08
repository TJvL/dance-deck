mod embedded {
    use refinery::embed_migrations;
    embed_migrations!("./migrations");
}

pub fn run_migrations(database_url: &str) {
    unimplemented!()
}
