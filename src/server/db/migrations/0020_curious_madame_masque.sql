CREATE TABLE `media_genres` (
	`id` integer PRIMARY KEY NOT NULL,
	`media_id` integer NOT NULL,
	`genre_id` integer NOT NULL,
	FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`genre_id`) REFERENCES `genres`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_genres` (
	`id` integer PRIMARY KEY NOT NULL,
	`genre_id` integer NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT '"2026-05-23T14:17:16.494Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-23T14:17:16.494Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_genres`("id", "genre_id", "name", "created_at", "updated_at") SELECT "id", "genre_id", "name", "created_at", "updated_at" FROM `genres`;--> statement-breakpoint
DROP TABLE `genres`;--> statement-breakpoint
ALTER TABLE `__new_genres` RENAME TO `genres`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `genres_genre_id_unique` ON `genres` (`genre_id`);--> statement-breakpoint
CREATE TABLE `__new_media` (
	`id` integer PRIMARY KEY NOT NULL,
	`media_id` integer NOT NULL,
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
	`similar` text,
	`created_at` integer DEFAULT '"2026-05-23T14:17:16.494Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-23T14:17:16.494Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_media`("id", "media_id", "title", "original_title", "overview", "poster_path", "rating", "seasons", "episodes", "episode_run_time", "release_date", "finished_date", "creators", "backdrop_path", "characters", "similar", "created_at", "updated_at") SELECT "id", "media_id", "title", "original_title", "overview", "poster_path", "rating", "seasons", "episodes", "episode_run_time", "release_date", "finished_date", "creators", "backdrop_path", "characters", "similar", "created_at", "updated_at" FROM `media`;--> statement-breakpoint
DROP TABLE `media`;--> statement-breakpoint
ALTER TABLE `__new_media` RENAME TO `media`;--> statement-breakpoint
CREATE UNIQUE INDEX `media_media_id_unique` ON `media` (`media_id`);--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer,
	`created_at` integer DEFAULT '"2026-05-23T14:17:16.493Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-23T14:17:16.493Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "username", "email", "email_verified", "created_at", "updated_at") SELECT "id", "username", "email", "email_verified", "created_at", "updated_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);