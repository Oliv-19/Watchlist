CREATE TABLE `people` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`biography` text NOT NULL,
	`profile_path` text,
	`also_known_as` integer,
	`known_for` integer,
	`birthplace` integer,
	`birthday` integer,
	`all_media` text,
	`created_at` integer DEFAULT '"2026-05-24T12:14:31.041Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-24T12:14:31.041Z"' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `people_media` (
	`media_id` integer NOT NULL,
	`people_id` integer NOT NULL,
	PRIMARY KEY(`media_id`, `people_id`),
	FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`people_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_genres` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT '"2026-05-24T12:14:31.040Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-24T12:14:31.040Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_genres`("id", "name", "created_at", "updated_at") SELECT "id", "name", "created_at", "updated_at" FROM `genres`;--> statement-breakpoint
DROP TABLE `genres`;--> statement-breakpoint
ALTER TABLE `__new_genres` RENAME TO `genres`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_media` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`original_title` text NOT NULL,
	`overview` text NOT NULL,
	`poster_path` text,
	`rating` integer,
	`seasons` integer,
	`episodes` integer,
	`episode_run_time` integer,
	`release_date` text,
	`finished_date` text,
	`creators` text,
	`backdrop_path` text,
	`characters` text,
	`created_at` integer DEFAULT '"2026-05-24T12:14:31.040Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-24T12:14:31.040Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_media`("id", "title", "original_title", "overview", "poster_path", "rating", "seasons", "episodes", "episode_run_time", "release_date", "finished_date", "creators", "backdrop_path", "characters", "created_at", "updated_at") SELECT "id", "title", "original_title", "overview", "poster_path", "rating", "seasons", "episodes", "episode_run_time", "release_date", "finished_date", "creators", "backdrop_path", "characters", "created_at", "updated_at" FROM `media`;--> statement-breakpoint
DROP TABLE `media`;--> statement-breakpoint
ALTER TABLE `__new_media` RENAME TO `media`;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer,
	`created_at` integer DEFAULT '"2026-05-24T12:14:31.039Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-24T12:14:31.039Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "username", "email", "email_verified", "created_at", "updated_at") SELECT "id", "username", "email", "email_verified", "created_at", "updated_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);