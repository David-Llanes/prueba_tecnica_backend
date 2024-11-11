import z from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'El Nombre no puede estar vacío')
    .max(255, 'El Nombre no debe exceder 255 caracteres'),
  lastname: z.string().max(255, 'El apellido no debe exceder 255 caracteres'),
  email: z
    .string()
    .email('Debes propircionar un correo válido')
    .max(255, 'El correo electrónico no debe exceder 255 caracteres'),
  numbers: z
    .array(
      z.string().refine((value) => /^[0-9]{10,20}$/.test(value), {
        message:
          'El número de teléfono debe contener entre 10 y 20 dígitos numéricos',
      })
    )
    .nonempty('Debes proporcionar al menos un número de teléfono'),
  addresses: z
    .array(
      z
        .string()
        .min(1, 'La dirección no debe estar vacía')
        .max(255, 'La dirección no debe exceder 255 caracteres')
    )
    .nonempty('Debes proporcionar al menos una dirección'),
})
