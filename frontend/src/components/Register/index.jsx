// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { register } from '../../services/api';
// import AuthForm from '../AuthForm';

// /**
//  * Componente Register encapsula a lógica e a interface do registro de usuário.
//  */
// const Register = () => {
//   const history = useHistory(); // Hook do React Router para navegação programática

//   // Função chamada no envio do formulário de registro
//   const handleRegister = async (formData) => {
//     try {
//       await register(formData); // Chama a API para registrar o usuário
//       history.push('/login'); // Redireciona para a página de login após registro bem-sucedido
//     } catch (error) {
//       console.error('Registration error:', error.response.data.message); // Log de erro para debugging
//     }
//   };

//   return <AuthForm onSubmit={handleRegister} title="Register" />; // Usa o componente AuthForm
// };

// export default Register;