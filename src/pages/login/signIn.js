/* eslint-disable import/no-cycle */
import firebase from '../../services/firebase.js';
import { changePage } from '../../router.js';

export const signIn = (email, password) => {
  let hasError = false;

  const emailError = document.querySelector('#sign-in-email-error');
  const passwordError = document.querySelector('#sign-in-password-error');
  const signInError = document.querySelector('#sign-in-error');

  emailError.style.display = 'none';
  passwordError.style.display = 'none';
  signInError.style.display = 'none';

  if (!email) {
    emailError.innerHTML = 'Ops, faltou seu email!';
    emailError.style.display = 'block';
    hasError = true;
  }

  if (password) {
    passwordError.innerHTML = 'Ops, faltou sua senha';
    passwordError.style.display = 'block';
    hasError = true;
  }
  if (hasError) {
    try {
      firebase.signIn(email, password);
      changePage('/');
    } catch (error) {
      console.error(error);
      signInError.innerHTML = 'Ops, não está autenticado.';
      signInError.style.display = 'block';
    }
  }
};
