// @generated automatically by Diesel CLI.

diesel::table! {
    articles (id) {
        id -> Int4,
        uuid -> Uuid,
        title -> Varchar,
        file_name -> Varchar,
        path_image -> Varchar,
        path_article -> Varchar,
        image_cont -> Varchar,
        chunk_content -> Text,
        pub_date -> Timestamptz,
        read_time -> Varchar,
    }
}

diesel::table! {
    item_tag (tag_id, article_id) {
        tag_id -> Int4,
        article_id -> Int4,
    }
}

diesel::table! {
    tags (id) {
        id -> Int4,
        tag_name -> Varchar,
    }
}

diesel::joinable!(item_tag -> articles (article_id));
diesel::joinable!(item_tag -> tags (tag_id));

diesel::allow_tables_to_appear_in_same_query!(
    articles,
    item_tag,
    tags,
);
