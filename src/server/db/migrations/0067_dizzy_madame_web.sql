PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_genres` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT '"2026-06-21T22:10:00.308Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-06-21T22:10:00.308Z"' NOT NULL
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
	`created_at` integer DEFAULT '"2026-06-21T22:10:00.308Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-06-21T22:10:00.308Z"' NOT NULL
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
	`created_at` integer DEFAULT '"2026-06-21T22:10:00.309Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-06-21T22:10:00.309Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_people`("id", "name", "original_name", "order", "biography", "profile_path", "also_known_as", "known_for", "birthplace", "birthday", "created_at", "updated_at") SELECT "id", "name", "original_name", "order", "biography", "profile_path", "also_known_as", "known_for", "birthplace", "birthday", "created_at", "updated_at" FROM `people`;--> statement-breakpoint
DROP TABLE `people`;--> statement-breakpoint
ALTER TABLE `__new_people` RENAME TO `people`;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` integer DEFAULT '"2026-06-21T22:10:00.307Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-06-21T22:10:00.307Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "email", "password_hash", "created_at", "updated_at") SELECT "id", "email", "password_hash", "created_at", "updated_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);