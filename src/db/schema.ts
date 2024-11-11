import { integer, pgTable, varchar, serial, json } from 'drizzle-orm/pg-core'

// Tabla de contactos
export const contactsTable = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  lastname: varchar('lastname', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  numbers: json('numbers').notNull(),
  addresses: json('addresses').notNull(),
})

// // Tabla de contactos
// export const contactsTable = pgTable('contacts', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 255 }).notNull(),
//   lastname: varchar('lastname', { length: 255 }).notNull(),
//   email: varchar('email', { length: 255 }).notNull().unique(),
// })

// // Tabla de teléfonos
// export const phonesTable = pgTable('phones', {
//   id: serial('id').primaryKey(),
//   contactId: integer('contact_id')
//     .notNull()
//     .references(() => contactsTable.id),
//   phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
// })

// // Tabla de direcciones
// export const addressesTable = pgTable('addresses', {
//   id: serial('id').primaryKey(),
//   contactId: integer('contact_id')
//     .notNull()
//     .references(() => contactsTable.id),
//   street: varchar('street', { length: 255 }),
//   noExt: varchar('no_ext', { length: 10 }),
//   city: varchar('city', { length: 255 }),
//   state: varchar('state', { length: 255 }),
//   zip: varchar('zip', { length: 10 }),
//   country: varchar('country', { length: 255 }).notNull(),
// })
