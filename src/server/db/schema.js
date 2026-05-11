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