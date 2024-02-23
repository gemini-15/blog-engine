use diesel::{Insertable, Queryable, associations::Identifiable};
use super::schema::*;
use serde::{Serialize, Deserialize};
use chrono::{DateTime, Utc};


/**
 *  Article Model
 *  UUID is randomly generated at insertion time
 * ID is a unique identifier for each article
 * */  

#[derive(Queryable, Insertable, Identifiable, Debug, Serialize, Deserialize, Clone)]
#[diesel(primary_key(id))]
#[diesel(table_name = articles)]
pub struct Article {
    #[diesel(deserialize_as=i32)]
    pub id: Option<i32>,
    pub uuid: uuid::Uuid,
    pub title: String, 
    pub path_image: String, 
    pub path_article: String, 
    pub image_cont: String,
    pub chunk_content: String, 
    pub pub_date: DateTime<Utc>, 
    pub read_time: String,
}


/**
 * Tag Model
 */


#[derive(Queryable, Debug, Insertable, Serialize, Deserialize, Clone)]
#[diesel(primary_key(id))]
#[diesel(table_name = tags)]
pub struct Tag {
    #[diesel(deserialize_as=i32)]
    pub id: Option<i32>,
    pub tag_name: String, 
}

/** Tag Item Model
 */
#[derive(Queryable, Debug, Insertable, Serialize, Deserialize, Clone)]
#[diesel(table_name = item_tag)]
pub struct TagItem {
    #[diesel(deserialize_as=i32)]
    pub tag_id: Option<i32>, 
    pub article_id: Option<i32>, 
}
