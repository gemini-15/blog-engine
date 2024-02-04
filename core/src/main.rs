use actix_web::{HttpServer, App, middleware};
use actix_web::web::Data;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use actix_cors::Cors;
use dotenv::dotenv;
use std::env;
use log;
use env_logger;

mod crud_ops;
use crud_ops::register_articles;

pub mod api;
pub mod db_connection;
pub mod init;
pub mod schema;
pub mod models;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations/");

/**
 * Main function 
 */
#[actix_web::main]
async fn main() -> std::result::Result<(), std::io::Error> {
    // Init logger 
    env_logger::init();

    // must be change for docker 
    dotenv().ok();
    let port = env::var("PORT").unwrap_or("8080".to_string());

    let mut listen_address: String = "0.0.0.0:".to_owned();
    listen_address.push_str(&port);
    let db_pool = Data::new(db_connection::get_connection_pool());
    let mut connection = db_pool.get().unwrap();
    let _ = connection.run_pending_migrations(MIGRATIONS);

    register_articles(db_pool.clone()).await;
    log::info!("Listening at {:?}", listen_address);
    HttpServer::new(move || {
        let cors = Cors::default()
                    .allow_any_origin()
                    .allow_any_header()
                    .allow_any_method();

        App::new()
            .wrap(cors)
            .app_data(db_pool.clone())
            .configure(init::initialize)
            .wrap(middleware::Logger::default())
    })
        .bind(listen_address)?
        .run()
        .await
}