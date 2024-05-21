// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { login } from '../../services/api';
// import AuthForm from '../AuthForm';

// /**
//  * Componente Login encapsula a lógica e a interface do login de usuário.
//  */
// const Login = () => {
//   const history = useHistory(); // Hook do React Router para navegação programática

//   // Função chamada no envio do formulário de login
//   const handleLogin = async (formData) => {
//     try {
//       const response = await login(formData); // Chama a API para fazer login
//       localStorage.setItem('token', response.data.token); // Armazena o token de autenticação no localStorage
//       history.push('/dashboard'); // Redireciona para a página protegida após login bem-sucedido
//     } catch (error) {
//       console.error('Login error:', error.response.data.message); // Log de erro para debugging
//     }
//   };

//   return <AuthForm onSubmit={handleLogin} title="Login" />; // Usa o componente AuthForm
// };

// export default Login;