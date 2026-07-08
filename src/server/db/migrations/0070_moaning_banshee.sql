PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_genres` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT '"2026-07-08T13:25:10.965Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-08T13:25:10.965Z"' NOT NULL
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
	`created_at` integer DEFAULT '"2026-07-08T13:25:10.966Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-08T13:25:10.966Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_media`("id", "title", "original_title", "overview", "poster_path", "rating", "seasons", "episodes", "episode_run_time", "release_date", "finished_date", "creators", "backdrop_path", "characters", "created_at", "updated_at") SELECT "id", "title", "original_title", "overview", "poster_path", "rating", "seasons", "episodes", "episode_run_time", "release_date", "finished_date", "creators", "backdrop_path", "characters", "created_at", "updated_at" FROM `media`;--> statement-breakpoint
DROP TABLE `media`;--> statement-breakpoint
ALTER TABLE `__new_media` RENAME TO `media`;--> statement-breakpoint
CREATE TABLE `__new_people` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`original_name` text,
	`order` integer NOT NULL,
	`biography` text,
	`profile_path` text,
	`also_known_as` text,
	`known_for` text,
	`birthplace` text,
	`birthday` text,
	`created_at` integer DEFAULT '"2026-07-08T13:25:10.967Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-08T13:25:10.967Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_people`("id", "name", "original_name", "order", "biography", "profile_path", "also_known_as", "known_for", "birthplace", "birthday", "created_at", "updated_at") SELECT "id", "name", "original_name", "order", "biography", "profile_path", "also_known_as", "known_for", "birthplace", "birthday", "created_at", "updated_at" FROM `people`;--> statement-breakpoint
DROP TABLE `people`;--> statement-breakpoint
ALTER TABLE `__new_people` RENAME TO `people`;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` integer DEFAULT '"2026-07-08T13:25:10.957Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-07-08T13:25:10.957Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "email", "password_hash", "created_at", "updated_at") SELECT "id", "email", "password_hash", "created_at", "updated_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `__new_media_user` (
	`media_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`user_rating` integer,
	`user_review` text,
	`status` status DEFAULT 'saved' NOT NULL,
	PRIMARY KEY(`media_id`, `user_id`),
	FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_media_user`("media_id", "user_id", "user_rating", "user_review", "status") SELECT "media_id", "user_id", "user_rating", "user_review", "status" FROM `media_user`;--> statement-breakpoint
DROP TABLE `media_user`;--> statement-breakpoint
ALTER TABLE `__new_media_user` RENAME TO `media_user`;