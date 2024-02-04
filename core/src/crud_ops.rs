use serde::{Serialize, Deserialize};
use serde_json;
use yaml_front_matter::{Document, YamlFrontMatter};
use std::fs;
use glob::glob;
use crate::db_connection::DbPool;
use actix_web::{web::{self}};
use crate::models::{Article, Tag, TagItem};
use diesel::{insert_into, PgConnection};
use diesel::QueryDsl;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use diesel::{RunQueryDsl, ExpressionMethods};
use log;

/**
 * Routine to register the articles present with the static files
 * Which means it must act as a scheduler (? or not), but the articles
 * in Markdown present on the static file storage have to be registered 
 * on the database 
 * the format that must be taken into account is the following : 
 * -    the file must contain a title represented by the first line 
 * -    An image must follow this title, with a valid one, otherwise a 
 *      the path must be replaced or not registered in the db entry
 * -    A chunk content (corresponding to a description of the article) 
 *      must also be registered as an entry in the db. With a maximum of 
 *      200 words. 
 * -    An information of the publication date must also be specified, 
 *      2 different options are possible : either retrieve the date from
 *      the metadata of the file and then registered it in the db 
 * -    A checksum of the file (MD5 or SHA-256) must be added to verify the 
 *      integrity of the file (so that there is no same article redundantly)
 * -    A file that has been deleted from articles folder must not appear 
 *      
 * These are the tasks for now 
 * Futures features : 
 * -    Update : managing the update OK
 * -    Handling none existing files
 *      
 */


/**
 * MdMetadata Struct 
 */
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MdMetadata {
    uid: i32, 
    title: String, 
    description: String, 
    tags: Vec<String>, 
    date: String,
    path_image: String, 
    image_cont: String,
    read_time: String, 
}



#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct MdArticle {
    pub metadata: MdMetadata, 
    pub content: String, 
}



impl MdArticle {
    pub fn init(file_directory: String) -> Self {
        log::info!("file directory is : {:?}", file_directory);
        // must also get the file some time of another 
        let document: Document<MdMetadata> = YamlFrontMatter::parse::<MdMetadata>(&fs::read_to_string(file_directory).unwrap()).unwrap();
        Self {
            metadata: document.metadata, 
            content: document.content
        }
    }

    pub fn get_metadata(&mut self) -> MdMetadata {
        self.metadata.clone()
    }
}


/**
 * Find markdown file in directory and extract metadata
 */
fn get_markdown_file(article_directory: String) -> String {
    let mut article_path: String = article_directory.to_owned();
    article_path.push_str("/*.md");
    let mut path_to_file = String::from("");
    for entry in glob(&article_path).expect("Failed to read glob pattern") {
        path_to_file = match entry {
            Ok(path) => path.to_str().unwrap().to_owned(),
            Err(_e) => String::from(""),
        };
    };
    log::info!("The path to the file is : {:?}", path_to_file);
    path_to_file
}

/**
 *  List articles directory and the markdown file and its metadata
 * TODO: still needs a check if the path found is a directory or something else
 * 
 */
fn list_articles_directory(path: String) -> Vec<String> {
    let path_articles = fs::read_dir(path).unwrap();
    log::info!("The path to the articles : {:?}", path_articles);
    let mut articles_list = Vec::new();
    for path in path_articles {
        let article_directory = path.unwrap().path().display().to_string();
        log::info!("article directory found at : {:?}", article_directory);
        articles_list.push(article_directory);
    }
    articles_list
} 


/**
 * Insert an article metadata into database function
 */
fn write_article(conn: &mut PgConnection, article_metadata: &MdMetadata, path_article_index: String) -> Article {
    use crate::schema::articles::dsl::*;
    // find if another file is present
    // extracting the insertion model
    let uuid_n = Uuid::new_v4();
    let publication_date = DateTime::parse_from_rfc3339(&article_metadata.date.clone()).unwrap().with_timezone(&Utc);
    // Creating new article instance structure
    let new_article =  Article {
        id: Some(article_metadata.uid), 
        title: article_metadata.title.clone(), 
        path_image: article_metadata.path_image.clone(), 
        path_article: path_article_index.clone(), 
        image_cont: article_metadata.image_cont.clone(),
        chunk_content: article_metadata.description.clone(),
        pub_date: publication_date, 
        uuid: uuid_n,
        read_time: article_metadata.read_time.clone(),
    };
    let returned_article = new_article.clone();
    // Inserting into the database
    diesel::insert_into(articles)
        .values(new_article)
        .execute(conn).expect("Connection failed.");
    
    returned_article  
}

/**
 * Updates articles in database
 */
fn update_article(conn: &mut PgConnection, article_metadata: &MdMetadata, path_article_index: String) -> Result<usize, diesel::result::Error> {
    use crate::schema::articles::dsl::*;
    
    let publication_date = DateTime::parse_from_rfc3339(&article_metadata.date.clone()).unwrap().with_timezone(&Utc);

    // Updating the entry
    let updated_article = diesel::update(articles
        .filter(path_article.eq(path_article_index.clone())))
        .set(pub_date.eq(publication_date))
        .execute(conn);
    
    let _update_article = diesel::update(articles
        .filter(path_article.eq(path_article_index.clone())))
        .set(title.eq(&article_metadata.title.clone()))
        .execute(conn);

    let _update_article = diesel::update(articles
        .filter(path_article.eq(path_article_index.clone())))
        .set(chunk_content.eq(&article_metadata.description.clone()))
        .execute(conn);

    let _update_article = diesel::update(articles
        .filter(path_article.eq(path_article_index.clone())))
        .set(image_cont.eq(&article_metadata.image_cont.clone()))
        .execute(conn);

    let _update_article = diesel::update(articles
        .filter(path_article.eq(path_article_index.clone())))
        .set(path_image.eq(&article_metadata.path_image.clone()))
        .execute(conn);

    updated_article
}

/**
 * Queries the articles registered in the Database and filter by the metadata article passed on
 * If True, the article will not be registered 
 * If false, we can register it
 */
fn query_articles_by(conn: &mut PgConnection, article_metadata: &MdMetadata) -> Result<bool, diesel::result::Error> {
    use crate::schema::articles::dsl::*;

    let uid = article_metadata.uid;
    let article_found = articles
        .filter(id.eq(uid))
        .limit(1)
        .load::<Article>(conn).expect("Database query failed.");

    if article_found.len() !=0 {
        Ok(true)
    }
    else {
        Ok(false)
    }
}

/**
 * Insert tags of the articles by retrieving it from the metadata
 * Iteration through the vec<String> and filtering to see if the tag is already 
 * present in the database table. 
 */
fn insert_tags(conn: &mut PgConnection, article_metadata: &MdMetadata) -> Result<Vec<String>, diesel::result::Error> {
    use crate::schema::tags::dsl::*;
    use crate::schema::item_tag::dsl::*;
    
    let tags_article = article_metadata.tags.clone();

    let post_id = article_metadata.uid.clone();

    log::info!("tags are : {:?}", tags_article);
    let mut tags_remaining : Vec<String> = Vec::new();
    
    for tag in tags_article.iter() {
        log::info!("tag is : {:?}", tag);
        let tag_found = tags
            .filter(tag_name.eq(tag))
            .limit(1)
            .load::<Tag>(conn).expect("Database query failure.");
        log::info!("Tag found is : {:?}", tag_found);
        tags_remaining.push(tag.to_string());
        if tag_found.len() == 0 {
            // Tag not found, and inserting a new one
            log::info!("New tag found not registered : {:?}", tag);
            log::info!("Inserting new tag.");
            let new_tag = insert_into(tags).values(tag_name.eq(tag)).execute(conn);
            log::info!("{:?}", new_tag);

            // Linking the current article to the tag newly added
            // Querying the newly created tag's ID
            log::info!("Linking the article to the tag.");
            let new_tag_id = tags
                        .filter(tag_name.eq(tag))
                        .limit(1)
                        .select(id)
                        .load::<i32>(conn).expect("Database query failure.");
            log::info!("Tag inserted ID is : {:?}", new_tag_id);

            // Inserting tag_id and article_id in tag_item table
            let new_tag_item = format!(r#"{{
                "tag_id": {}, 
                "article_id": {}
            }}"#, new_tag_id[0],post_id);

            let new_tag_item_json = serde_json::from_str::<TagItem>(&new_tag_item).unwrap();
            let new_tag_item_insert = insert_into(item_tag).values(&new_tag_item_json).execute(conn);

            log::info!("New Tag Item added : {:?} ", new_tag_item_json);
            log::info!("{:?}", new_tag_item_insert);
        }
        else {
            // Tag found 
            log::warn!("tag already in the DB : {:?}", tag_found);
            let tagitem_tag_id: i32 =  tag_found[0].id.unwrap();
            // Verifying that the tag is referenced
            match item_tag.filter(tag_id.eq(tagitem_tag_id)).limit(1).select(article_id).load::<i32>(conn) {
                Ok(tagitem_article_id) => {
                    // Tag is referenced
                    log::info!("Tag Item is referenced : {:?}", tagitem_article_id);
                }   
                Err(err) =>  {
                    // Tag is not referenced
                    // TODO: Adding referencing when there is update of other
                    log::info!("Tag Item is not referenced");
                }
            }
        }

        
    }
    Ok(tags_remaining)

}




/**
 * Connect to DB and register the paths and metadata
 * 
 */
pub async fn register_articles(db_pool: web::Data<DbPool>) {
    // get connection
    let mut connection = db_pool.get().unwrap();

    // retrieving the articles 
    let path_articles = String::from("./articles");
    let path_articles_list = list_articles_directory(path_articles);

    // registering the metadata

    let mut articles = Vec::new();
    for article_directory in path_articles_list {
        let article = get_markdown_file(article_directory.clone());
        let mut article_data = MdArticle::init(article.clone());
        let article_data_offset = article_data.clone();

        let article_exists = query_articles_by(&mut connection, &article_data.get_metadata());

        if !article_exists.unwrap() {
            articles.push(article_data_offset);
            let new_article = write_article(&mut connection, &article_data.get_metadata(), article.clone());
            log::info!("New article registered : {:?}", new_article);
        } else {
            log::warn!("Article already registered on the database.");
            log::info!("Updating article.");
            let _ret = update_article(&mut connection, &article_data.get_metadata(), article.clone());
        }

        // adding tags
        let _tags_vec = insert_tags(&mut connection, &article_data.get_metadata());
    }

}