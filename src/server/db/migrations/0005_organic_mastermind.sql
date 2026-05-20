PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_media` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` integer NOT NULL,
	`original_title` integer NOT NULL,
	`poster_path` text,
	`overview` text NOT NULL,
	`rating` integer,
	`seasons` integer,
	`episodes` integer,
	`episode_run_time` integer,
	`release_date` text,
	`genres` text,
	`creators` text,
	`backdrop_path` text,
	`characters` text,
	`similar` text,
	`created_at` integer DEFAULT '"2026-05-20T16:26:23.290Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-20T16:26:23.290Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_media`("id", "title", "original_title", "poster_path", "overview", "rating", "seasons", "episodes", "episode_run_time", "release_date", "genres", "creators", "backdrop_path", "characters", "similar", "created_at", "updated_at") SELECT "id", "title", "original_title", "poster_path", "overview", "rating", "seasons", "episodes", "episode_run_time", "release_date", "genres", "creators", "backdrop_path", "characters", "similar", "created_at", "updated_at" FROM `media`;--> statement-breakpoint
DROP TABLE `media`;--> statement-breakpoint
ALTER TABLE `__new_media` RENAME TO `media`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_onAir` (
	`id` integer PRIMARY KEY NOT NULL,
	`media_id` integer,
	`created_at` integer DEFAULT '"2026-05-20T16:26:23.290Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-20T16:26:23.290Z"' NOT NULL,
	FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_onAir`("id", "media_id", "created_at", "updated_at") SELECT "id", "media_id", "created_at", "updated_at" FROM `onAir`;--> statement-breakpoint
DROP TABLE `onAir`;--> statement-breakpoint
ALTER TABLE `__new_onAir` RENAME TO `onAir`;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer,
	`created_at` integer DEFAULT '"2026-05-20T16:26:23.289Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-20T16:26:23.289Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "username", "email", "email_verified", "created_at", "updated_at") SELECT "id", "username", "email", "email_verified", "created_at", "updated_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);