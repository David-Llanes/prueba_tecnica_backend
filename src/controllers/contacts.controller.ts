import { Request, Response } from 'express'
import { db } from '../db'
import { contactsTable } from '../db/schema'

import { sql } from 'drizzle-orm'
import { Contact } from '../types'
import { contactSchema } from '../utils/schema-validators'
import { formatErrors } from '../utils/utils'

class ContactsController {
  // Get All Contacts
  async getAll(req: Request, res: Response) {
    const { q } = req.query as { q?: string }

    try {
      const contacts = (await db
        .select()
        .from(contactsTable)
        .orderBy(contactsTable.name)) as Contact[]

      const filteredContacs = q
        ? contacts.filter((c) => {
            const filterValue = q.toLowerCase()
            return (
              c.name.toLowerCase().includes(filterValue) ||
              c.lastname.toLowerCase().includes(filterValue) ||
              c.email.toLowerCase().includes(filterValue) ||
              c.numbers.some((n) => n.includes(q))
            )
          })
        : contacts

      res.json(filteredContacs)
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ message: 'Ocurrió un error al obtener los contactos.' })
    }
  }

  // Get Contact by ID
  async getById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const contact = await db
        .select()
        .from(contactsTable)
        .where(sql`id = ${id}`)

      if (contact.length === 0) {
        res
          .status(404)
          .json({ message: 'No se encontró un contacto con esa ID.' })
      }

      res.json(contact[0])
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ message: 'Ocurrió un error al obtener el contacto.' })
    }
  }

  // Create Contact
  async create(req: Request, res: Response) {
    // const { name, lastname, email, numbers, addresses } = req.body

    try {
      const result = contactSchema.safeParse(req.body)

      if (!result.success) {
        const formattedErrors = formatErrors(result.error)
        return res.status(422).json({ errors: formattedErrors })
      }

      const { name, lastname, email, numbers, addresses } = result.data

      const contacts = await db
        .insert(contactsTable)
        .values({ name, lastname, email, numbers, addresses })
        .returning()

      contacts.length === 0
        ? res.status(500).json({ message: 'Error al crear el contacto.' })
        : res.status(201).json(contacts[0])
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ message: 'Ocurrió un error al crear el contacto.' })
    }
  }

  // Update Contact
  async update(req: Request, res: Response) {
    const { id } = req.params

    try {
      const result = contactSchema.safeParse(req.body)

      if (!result.success) {
        const formattedErrors = formatErrors(result.error)
        return res.status(422).json({ errors: formattedErrors })
      }

      const { name, lastname, email, numbers, addresses } = result.data
      const updatedId = await db
        .update(contactsTable)
        .set({ name, lastname, email, numbers, addresses })
        .where(sql`id = ${id}`)
        .returning()

      if (updatedId.length === 0) {
        res
          .status(404)
          .json({ message: 'No se encontró ningun contacto con esa ID.' })
      }

      res.json(updatedId[0])
    } catch (error) {
      console.error(error)
      res.status(500).send('Ocurrió un error al actualizar el contacto.')
    }
  }

  // Delete Contact
  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const deletedId = await db
        .delete(contactsTable)
        .where(sql`id = ${id}`)
        .returning({ id: contactsTable.id })

      if (deletedId.length === 0) {
        res.status(404).send('Contact not found')
      }

      res.json({
        message: 'Contact deleted successfully',
        contactId: deletedId[0]!.id,
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('Error deleting contact')
    }
  }
}

const ContactsControllerInstance = new ContactsController()
export default ContactsControllerInstance
