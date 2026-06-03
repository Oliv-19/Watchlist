import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer, check, primaryKey } from "drizzle-orm/sqlite-core";


export const user = sqliteTable('user', {
        id: integer('id').primaryKey(),
        email: text('email').notNull().unique(),
        passwordHash: text('password_hash').notNull(),
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
        createdAt: integer('created_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()),
        updatedAt: integer('updated_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()) 
    }
)

export const mediaGenres = sqliteTable('media_genres', {
    mediaId: integer('media_id').notNull().references(() => media.id, {onDelete: 'cascade'}),
    genreId: integer('genre_id').notNull().references(() => genres.id, {onDelete: 'cascade'}),
}, (t) => ({
    pk:primaryKey({columns: [t.mediaId, t.genreId]})
}))

export const mediaRelations = relations(media, ({ many }) => ({
  mediaGenres: many(mediaGenres),
  peopleMedia: many(peopleMedia),
}))

export const genresRelations = relations(genres, ({ many }) => ({
  mediaGenres: many(mediaGenres),
}))

export const mediaGenresRelations = relations(mediaGenres, ({ one }) => ({
  media: one(media, { fields: [mediaGenres.mediaId], references: [media.id] }),
  genre: one(genres, { fields: [mediaGenres.genreId], references: [genres.id] }),
}))

export const people = sqliteTable('people', {
        id: integer('id').primaryKey(),
        name: text('name').notNull(),
        originalName: text('original_name'),
        order: integer('order').notNull(),
        biography: text('biography'),
        profilePath: text('profile_path'),
        alsoKnownAs: text('also_known_as', {mode: 'json'}),
        knownFor: text('known_for'),
        birthplace: text('birthplace'),
        birthday: text('birthday'),
        createdAt: integer('created_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()),
        updatedAt: integer('updated_at', { mode: "timestamp" })
            .notNull()
            .default(new Date()) 
    }
)

export const peopleMedia = sqliteTable('people_media', {
    mediaId: integer('media_id').notNull().references(() => media.id, {onDelete: 'cascade'}),
    peopleId: integer('people_id').notNull().references(() => people.id, {onDelete: 'cascade'}),
}, (t) => ({
    pk:primaryKey({columns: [t.mediaId, t.peopleId]})
}))

export const peopleRelations = relations(people, ({ many }) => ({
  peopleMedia: many(peopleMedia),
}))

export const mediaPeopleRelations = relations(peopleMedia, ({ one }) => ({
  media: one(media, { fields: [peopleMedia.mediaId], references: [media.id] }),
  people: one(people, { fields: [peopleMedia.peopleId], references: [people.id] }),
}))

export const airingToday = sqliteTable('airing_today', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    backdropPath: text('backdrop_path'),
})