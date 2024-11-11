import { CONFIG } from './config'
import express from 'express'
import cors from 'cors'
import contactsRouter from './routes/contacts.route'
import { serverError, notFound } from './middleware/errorHandlers'
import { db } from './db'
import { contactsTable } from './db/schema'
import { FAKE_CONTACTS } from './utils/constants'

function initializeServer() {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json())
  app.use(cors())

  app.use('/api/seed', async (req, res) => {
    try {
      // Eliminar datos de las tablas
      await db.delete(contactsTable)

      const promises = FAKE_CONTACTS.map((c) =>
        db.insert(contactsTable).values(c)
      )

      // Insertar datos en la tabla
      await Promise.all(promises)

      console.log('Datos insertados exitosamente')

      res.send('Database seeded')
    } catch (error) {
      console.error(error)
      res.status(500).send('Error seeding database')
    }
  })

  app.use('/api/contacts', contactsRouter)

  // Manejo de errores
  app.use(notFound)
  app.use(serverError)

  app.listen(CONFIG.PORT, () => {
    console.log(`Server is running on ${CONFIG.BASE_URL}`)
  })
}

initializeServer()
