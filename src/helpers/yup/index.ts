import * as yup from 'yup';

const createUserFormSchema = yup.object().shape({
  first_name: yup.string().required('Primeiro nome é obrigatório'),
  last_name: yup.string().required('Último nome é obrigatório'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(4, 'Senha deve ter no mínimo 4 caracteres')
    .max(12, 'Senha deve ter no máximo 12 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

const signInUserFormSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(4, 'Senha deve ter no mínimo 4 caracteres')
    .max(12, 'Senha deve ter no máximo 12 caracteres'),
});

const ticketFormSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  description: yup
    .string()
    .required('Descrição é obrigatória')
    .min(20, 'Mínimo de 20 caracteres para descrever o problema'),
  priority: yup.string().required('Prioridade é obrigatória'),
});

export { createUserFormSchema, signInUserFormSchema, ticketFormSchema };
