CREATE TABLE `characters` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `age` int,
  `history` varchar(255)
);

CREATE TABLE `movies` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `image` varchar(255),
  `title` varchar(255),
  `release_date` date,
  `qualify` int,
  `genre_id` int
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` (255),
  `pass` varchar(255)
);

CREATE TABLE `genres` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `image` varchar(255)
);

CREATE TABLE `character_movie` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `character_id` int,
  `movie_id` int
);

ALTER TABLE `movies` ADD FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`);

ALTER TABLE `character_movie` ADD FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);

ALTER TABLE `character_movie` ADD FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`);
