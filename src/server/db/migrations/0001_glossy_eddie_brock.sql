CREATE TABLE `popular` (
	`id` integer PRIMARY KEY NOT NULL,
	`series_id` integer NOT NULL,
	`name` text NOT NULL,
	`poster_path` text,
	`created_at` integer DEFAULT '"2026-05-12T15:33:26.786Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-12T15:33:26.786Z"' NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer,
	`created_at` integer DEFAULT '"2026-05-12T15:33:26.786Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-12T15:33:26.786Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "username", "email", "email_verified", "created_at", "updated_at") SELECT "id", "username", "email", "email_verified", "created_at", "updated_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);