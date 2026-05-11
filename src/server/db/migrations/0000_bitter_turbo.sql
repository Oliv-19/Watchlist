CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer,
	`created_at` integer DEFAULT '"2026-05-11T19:43:10.722Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-11T19:43:10.722Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);