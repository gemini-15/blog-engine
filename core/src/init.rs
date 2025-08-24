use actix_web::{web};
use actix_files as fs;

use crate::api::{fetch_articles, get_article, get_tags, post_tags};

/**
 * Setup routes 
 */
fn setup_routes(cfg: &mut web::ServiceConfig) -> &mut web::ServiceConfig {
    cfg
        .service((
            fetch_articles,
            get_article,
            get_tags,
            post_tags,
        ))
        .service(
            fs::Files::new("/", "./articles")
            .use_last_modified(true),
        )

}

/**
 * Init
*/
pub fn initialize(cfg: &mut web::ServiceConfig) {
    setup_routes(cfg);
}