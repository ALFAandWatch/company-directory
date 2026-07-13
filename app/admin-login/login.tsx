'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabaseClient';

export default function LoginPage() {
   const router = useRouter();

   return (
      <div className="flex justify-center items-center min-h-screen bg-black text-gray-100 px-5 lg:px-0">
         <div className="w-full max-w-md p-8 bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800">
            <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

            <Formik
               initialValues={{
                  email: '',
                  password: '',
               }}
               validationSchema={Yup.object({
                  email: Yup.string()
                     .email('Email inválido')
                     .required('El email es obligatorio'),
                  password: Yup.string().required(
                     'La contraseña es obligatoria'
                  ),
               })}
               onSubmit={async (values, { setSubmitting, setStatus }) => {
                  // 🔹 1. Intentar login
                  const { error } =
                     await supabaseClient.auth.signInWithPassword({
                        email: values.email,
                        password: values.password,
                     });

                  // 🔹 2. Manejo de error
                  if (error) {
                     setStatus(error.message);
                     setSubmitting(false);
                     return;
                  }

                  // 🔹 3. Redirección
                  router.push('/admin');
                  router.refresh();
               }}
            >
               {({ isSubmitting, status }) => (
                  <Form className="flex flex-col gap-5">
                     {/* EMAIL */}
                     <div className="flex flex-col gap-1">
                        <label
                           htmlFor="email"
                           className="text-sm text-gray-300"
                        >
                           Email
                        </label>
                        <Field
                           id="email"
                           name="email"
                           type="email"
                           className="px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-500"
                        />
                        <ErrorMessage
                           name="email"
                           component="p"
                           className="text-sm text-red-400"
                        />
                     </div>

                     {/* PASSWORD */}
                     <div className="flex flex-col gap-1">
                        <label
                           htmlFor="password"
                           className="text-sm text-gray-300"
                        >
                           Contraseña
                        </label>
                        <Field
                           id="password"
                           name="password"
                           type="password"
                           className="px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-500"
                        />
                        <ErrorMessage
                           name="password"
                           component="p"
                           className="text-sm text-red-400"
                        />
                     </div>

                     {/* ERROR GLOBAL */}
                     {status && (
                        <p className="text-sm text-red-400 text-center">
                           {status}
                        </p>
                     )}

                     <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-200 hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                     </button>
                  </Form>
               )}
            </Formik>
         </div>
      </div>
   );
}
