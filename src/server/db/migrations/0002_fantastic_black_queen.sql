CREATE TABLE `media` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` integer NOT NULL,
	`name` text NOT NULL,
	`poster_path` text,
	`overview` text,
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
	`created_at` integer DEFAULT '"2026-05-18T21:54:34.021Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-18T21:54:34.021Z"' NOT NULL
);
--> statement-breakpoint
DROP TABLE `popular`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer,
	`created_at` integer DEFAULT '"2026-05-18T21:54:34.018Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-18T21:54:34.018Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "username", "email", "email_verified", "created_at", "updated_at") SELECT "id", "username", "email", "email_verified", "created_at", "updated_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);