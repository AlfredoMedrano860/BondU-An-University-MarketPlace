import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'login.errors.passwordTooShort'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string().min(3, 'signup.errors.usernameTooShort'),
  email: z.email(),
  password: z.string().min(6, 'signup.errors.passwordTooShort'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'forgotPassword.errors.passwordTooShort'),
    confirm: z.string().min(1, 'forgotPassword.errors.confirmRequired'),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'forgotPassword.errors.passwordMismatch',
    path: ['confirm'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
