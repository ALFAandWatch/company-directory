import * as Yup from 'yup';

export const loginSchema = Yup.object({
   email: Yup.string()
      .email('Email inválido')
      .required('El email es obligatorio'),
   password: Yup.string().required('La contraseña es obligatoria'),
});
