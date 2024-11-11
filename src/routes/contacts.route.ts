import { Router } from 'express'
import ContactsControllerInstance from '../controllers/contacts.controller'

const contactsRouter = Router()

//? GET /api/contacts
contactsRouter.get('/', ContactsControllerInstance.getAll)

//? GET /api/contacts/:id
contactsRouter.get('/:id', ContactsControllerInstance.getById)

//!? POST /api/contacts
contactsRouter.post('/', ContactsControllerInstance.create)

//? PUT /api/contacts/:id
contactsRouter.put('/:id', ContactsControllerInstance.update)

//? DELETE /api/contacts/:id
contactsRouter.delete('/:id', ContactsControllerInstance.delete)

export default contactsRouter
