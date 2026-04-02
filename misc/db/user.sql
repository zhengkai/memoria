CREATE DATABASE IF NOT EXISTS `memoria` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

CREATE USER 'memoria'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'memoria';
GRANT USAGE ON *.* TO 'memoria'@'localhost';
ALTER USER 'memoria'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, LOCK TABLES ON `memoria`.* TO 'memoria'@'localhost';
ALTER USER 'memoria'@'localhost' ;
