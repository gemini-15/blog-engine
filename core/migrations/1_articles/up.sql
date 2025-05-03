-- article table UUId here must be changed to unique
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL, 
    title VARCHAR NOT NULL, 
    file_name VARCHAR NOT NULL,
    path_image VARCHAR NOT NULL, 
    path_article VARCHAR NOT NULL, 
    image_cont VARCHAR NOT NULL,
    chunk_content TEXT NOT NULL, 
    pub_date TIMESTAMP WITH TIME ZONE NOT NULL,
    read_time VARCHAR NOT NULL
)
