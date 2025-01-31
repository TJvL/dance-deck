-- Your SQL goes here



CREATE TABLE `library_tracks`(
	`id` INTEGER NOT NULL PRIMARY KEY,
	`library_id` INTEGER NOT NULL,
	`track_id` INTEGER NOT NULL,
	FOREIGN KEY (`library_id`) REFERENCES `libraries`(`id`),
	FOREIGN KEY (`track_id`) REFERENCES `tracks`(`id`)
);

CREATE TABLE `libraries`(
	`id` INTEGER NOT NULL PRIMARY KEY,
	`path` TEXT NOT NULL
);

