import { z } from 'zod';

// Reglas de validación del formulario de Account
export const accountSchema = z
  .object({
    username:   z.string().min(3, 'account.errors.usernameTooShort'),
    email:      z.email(),
    phone:      z.string().optional(),
    university: z.string().optional(),
    career:     z.string().optional(),
    password:   z.string().optional(),
    confirm:    z.string().optional(),
  })
  .refine(
    // Si ingresó contraseña nueva, debe tener al menos 6 caracteres
    (d) => !d.password || d.password.length >= 6,
    { message: 'account.errors.passwordTooShort', path: ['password'] }
  )
  .refine(
    // Si ingresó contraseña nueva, debe coincidir con la confirmación
    (d) => !d.password || d.password === d.confirm,
    { message: 'account.errors.passwordMismatch', path: ['confirm'] }
  );

export type AccountFormData = z.infer<typeof accountSchema>;