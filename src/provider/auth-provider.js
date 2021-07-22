import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage';

export function init(){
  if (!firebase.apps.length) {
    return firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));
  } else {
    return firebase.app();
  }
};

export async function createUserWithMailAndPassword(email, password){
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export async function signInWithMailAndPassword(email, password){
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export async function getIdToken(forceRefresh){
  return firebase.auth().currentUser.getIdToken(forceRefresh);
};

export async function signOut(){
  return firebase.auth().signOut()
};

export async function sendPasswordResetEmail(email){
  return firebase.auth().sendPasswordResetEmail(email);
};

export function errorMessageTranslation(error){
	switch (error.code) {
    case 'auth/email-already-exists':
      return 'El correo electrónico ya está asociado a una cuenta.';

    case 'auth/invalid-email':
      return 'El corre electrónico no es válido.';

    case 'auth/invalid-password':
      return 'La contraseña no es válida.';

    case 'auth/wrong-password':
      return 'La contraseña no es correcta.'

    case 'auth/user-not-found':
      return 'El usuario indicado no existe.';

    default:
      return 'Error interno. Revise sus credenciales o inténtelo más tarde.'
  }
};

