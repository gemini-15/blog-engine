-- -- item_tag table / links tags with articles
-- -- Article has a Many-to-Many relation with item_tag (many articles articles may have many item tag)
-- -- Tag has a Many-to-Many relation with item_tag (many tags may have many item tag)
CREATE TABLE item_tag (
    tag_id SERIAL NOT NULL, 
    article_id SERIAL NOT NULL, 
    PRIMARY KEY (tag_id, article_id),
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON UPDATE CASCADE, 
    FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE CASCADE
)
