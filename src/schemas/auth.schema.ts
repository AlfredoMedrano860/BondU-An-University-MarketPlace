import { z } from 'zod';

/** Valida el formulario de inicio de sesión. Usado en {@link useLogin}. */
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'login.errors.passwordTooShort'),
});

/** Valida el formulario de registro. Usado en {@link useSignUp}. */
export const registerSchema = z.object({
  username: z.string().min(3, 'signup.errors.usernameTooShort'),
  email: z.email(),
  password: z.string().min(6, 'signup.errors.passwordTooShort'),
});

/** Valida el correo del primer paso de recuperación de contraseña. Usado en {@link useForgotPassword}. */
export const forgotPasswordSchema = z.object({
  email: z.email(),
});

/** Valida la nueva contraseña del último paso de recuperación de contraseña. Usado en {@link useForgotPassword}. */
export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'forgotPassword.errors.passwordTooShort'),
    confirm: z.string().min(1, 'forgotPassword.errors.confirmRequired'),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'forgotPassword.errors.passwordMismatch',
    path: ['confirm'],
  });
