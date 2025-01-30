-- Your SQL goes here
CREATE TABLE `tracks`(
	`id` INTEGER NOT NULL PRIMARY KEY,
	`artist_id` INTEGER NOT NULL,
	`dance_id` INTEGER NOT NULL,
	`playback_count` INTEGER NOT NULL,
	FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`),
	FOREIGN KEY (`dance_id`) REFERENCES `dances`(`id`)
);

CREATE TABLE `artists`(
	`id` INTEGER NOT NULL PRIMARY KEY,
	`name` TEXT NOT NULL
);

CREATE TABLE `dances`(
	`id` INTEGER NOT NULL PRIMARY KEY,
	`name` TEXT NOT NULL
);

