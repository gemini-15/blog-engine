
// This api file defines the endpoints 
// of the app which will serve as the RESTAPI
use actix_web::{get, post, web, Responder, Result};
use chrono::Utc;
use serde::{Serialize, Deserialize};
use uuid::{Uuid};
use crate::{crud_ops::{query_article_by_id, search_articles_from_tags}, db_connection::DbPool};
use diesel::{prelude::*};
use std::{any, fs};
use yaml_front_matter::{Document, YamlFrontMatter};
use crate::crud_ops::{MdMetadata};
use log;

/**
 *  List all articles
    params : None 
    result : all articles chunks, images and uuids to be requested 
            to be shown
*/
#[get("/articles")]
pub async fn fetch_articles(db_pool: web::Data<DbPool>) -> Result<impl Responder> {
    use crate::schema::articles::dsl::*;

    log::info!("[/articles] Requesting all articles.");
    #[derive(Queryable, Serialize)]
    struct ListArticlesReq {
        uuid_article: Uuid,
        title: String, 
        chunk_content: String,
        path_image: String, 
        image_cont: String,
        pub_date: chrono::DateTime<Utc>, 
        read_time: String
    } 

    let mut connection = db_pool.get().unwrap();

    let list_articles = articles.select((uuid, title, chunk_content, path_image, image_cont, pub_date, read_time))
        .order(pub_date.desc())
        .load::<ListArticlesReq>(&mut connection).expect("Database query failed.");
    
    
    Ok(web::Json(list_articles))
}

// /*
// function for getting an article based on the uuid sent on the request
//     params : uuid
//     result : reroute to the body of the article present in the DB 
// */
#[get("/articles/{uuid_article}")]
pub async fn get_article(db_pool: web::Data<DbPool>, uuid_article: web::Path<String>) -> Result<impl Responder> {
    use crate::schema::articles::dsl::*;
    
    #[derive(Queryable, Serialize, Debug)]
    struct ArticleReq {
        uuid_article: Uuid,
        title: String, 
        chunk_content: String,
        path_image: String, 
        image_cont: String,
        path_article: String,
        pub_date: chrono::DateTime<Utc>, 
        read_time: String,
    } 

    #[derive(Queryable, Serialize, Debug)]
    struct ResponseArticle {
        articlereq: ArticleReq, 
        document_content: String, 
    }

    let parsed_uuid = Uuid::parse_str(&uuid_article.into_inner()).unwrap();
    let mut connection = db_pool.get().unwrap();
    log::info!("[/articles/{:?}] Requesting article.", parsed_uuid);
    let article_queried: ArticleReq = articles.filter(uuid.eq(parsed_uuid))
        .select((uuid, title, chunk_content, path_image, image_cont, path_article, pub_date, read_time))
        .first::<ArticleReq>(&mut connection).expect("Database query failed.");

    log::info!("article found : {:?}", article_queried);

    let md_article = fs::read_to_string(article_queried.path_article.clone()).unwrap();
    let document: Document<MdMetadata> = YamlFrontMatter::parse::<MdMetadata>(&md_article).unwrap();

    let response = ResponseArticle {
        articlereq: article_queried, 
        document_content: document.content
    };

    Ok(web::Json(response))
}


/**
 * Listing all tags
 */
#[get("/tags")]
pub async fn get_tags(db_pool: web::Data<DbPool>) -> Result<impl Responder> {
    use crate::schema::tags::dsl::*;

    let mut connection = db_pool.get().unwrap();
    log::info!("Querying all tags.");

    let tags_query : Vec<String> = tags.select(tag_name).load(&mut connection).expect("Database query failed.");
    log::info!("Tags available are : {:?}", tags_query);
    Ok(web::Json(tags_query))
}


#[derive(Deserialize)]
pub struct TagsSelected {
    tags: Vec<String>,
}

/**
 * Filter by tags
 */
#[post("/tags")]
pub async fn post_tags(db_pool: web::Data<DbPool>, tags_selected: web::Json<TagsSelected>) -> Result<impl Responder>{
    // Search and filter all the articles ids with the tags selected
    let mut connection = db_pool.get().unwrap();
    let  tags_selected = tags_selected.tags.clone();
    // searching for article id and matching with 
    let article_ids = search_articles_from_tags(&mut connection, tags_selected).unwrap();

    match query_article_by_id(&mut connection, article_ids) {
        Ok(articles_queried) => {
            log::info!("The list of articles queried are : {:?}", articles_queried);
            Ok(web::Json(articles_queried))
        }
        Err(e) => {
            log::error!("The query of the article has failed.");
            Err(actix_web::error::ErrorBadRequest(e))
        }
    }

}


// TODO: adding the changes to the tags list which must be a slice
// #[get("/search/{tags}")]
// pub async fn search_articles(db_pool: web::Data<DbPool>) -> Result<impl Responder> {

// }

/*
    uploading a new article : 
        conditions: 
            - must be through localhost only. 

 */