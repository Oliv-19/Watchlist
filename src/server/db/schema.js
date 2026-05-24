import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer, check, primaryKey } from "drizzle-orm/sqlite-core";


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

export const genres = sqliteTable('genres', {
        id : integer('id').primaryKey(),
        name: text('name').notNull(),
        createdAt: integer('created_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()),
        updatedAt: integer('updated_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()) 
    }
)

export const media = sqliteTable('media', {
        id: integer('id').primaryKey(),
        title: text('title').notNull(),
        originalTitle: text('original_title').notNull(),
        overview: text('overview').notNull(),
        posterPath: text('poster_path'),
        rating: integer('rating'),
        seasons: integer('seasons'),
        episodes: integer('episodes'),
        episodeRunTime: integer('episode_run_time'),
        releaseDate: text('release_date'),
        finishedDate: text('finished_date'),
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

export const mediaGenres = sqliteTable('media_genres', {
    mediaId: integer('media_id').notNull().references(() => media.id),
    genreId: integer('genre_id').notNull().references(() => genres.id),
}, (t) => ({
    pk:primaryKey({columns: [t.mediaId, t.genreId]})
}))

export const mediaRelations = relations(media, ({ many }) => ({
  mediaGenres: many(mediaGenres),
}))

export const genresRelations = relations(genres, ({ many }) => ({
  mediaGenres: many(mediaGenres),
}))

export const mediaGenresRelations = relations(mediaGenres, ({ one }) => ({
  media: one(media, { fields: [mediaGenres.mediaId], references: [media.id] }),
  genre: one(genres, { fields: [mediaGenres.genreId], references: [genres.id] }),
}))