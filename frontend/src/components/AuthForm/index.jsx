// import React, { useState } from 'react';

// /**
//  * Componente AuthForm é um formulário reutilizável para autenticação (registro e login).
//  * @param {function} onSubmit - Função a ser chamada no envio do formulário.
//  * @param {string} title - Título do formulário, indicando se é "Register" ou "Login".
//  */
// const AuthForm = ({ onSubmit, title }) => {
//   const [formData, setFormData] = useState({ email: '', password: '', username: '' });

//   // Handle de mudanças nos campos do formulário
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle do envio do formulário
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData); // Chama a função onSubmit passada como prop
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {title === 'Register' && (
//         <div>
//           <label>Username:</label>
//           <input type="text" name="username" value={formData.username} onChange={handleChange} required />
//         </div>
//       )}
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//       </div>
//       <button type="submit">{title}</button>
//     </form>
//   );
// };

// export default AuthForm;