import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, check } from "drizzle-orm/sqlite-core";


export const user = sqliteTable('user', {
        id: integer('id').primaryKey(),
        username: text('username').notNull(),
        email: text('email').notNull().unique(),
        emailVerified: integer('email_verified', { mode:'timestamp' }),
        createdAt: integer('created_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()),
        updatedAt: integer('updated_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()) 
    }, (table) => check('email', sql`${table.email} LIKE %@%.%`)
)

export const media = sqliteTable('media', {
        id: integer('id').primaryKey(),
        mediaId: integer('media_id').notNull(),
        title: integer('title').notNull(),
        originalTitle: integer('original_title').notNull(),
        overview: text('overview').notNull(),
        posterPath: text('poster_path'),
        rating: integer('rating'),
        seasons: integer('seasons'),
        episodes: integer('episodes'),
        episodeRunTime: integer('episode_run_time'),
        releaseDate: text('release_date'),
        finishedDate: text('finished_date'),
        genres: text('genres', {mode: 'json'}),
        creators: text('creators', {mode: 'json'}),
        backdropPath: text('backdrop_path'),
        characters: text('characters', {mode: 'json'}),
        similar: text('similar', {mode: 'json'}),
        createdAt: integer('created_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()),
        updatedAt: integer('updated_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()) 
    }
)