import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage';
import * as Client from './client-provider.js';
import {app} from '../app/app'

export function init(){
  if (!firebase.apps.length) {
    return firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));
  } else {
    return firebase.app();
  }
};

// export function establishObserver(){
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       console.log('Se ha conectado');
//       user.getIdToken(true).then((token) => {
//         app.loginUser(token);
//         app.setEmail(user.email);
//             Client.getUserData(token).then((resp) => {
//               app.loginRegisteredUSer(resp.id);
//           }).catch((error) => {
//             if(Math.floor(error / 100) === 4){
//               app.loginRegisteredUSer("");
//               // history.push({
//               //   pathname: app.routes().signupdata, 
//               //   state: {email: user.email}
//               // });
//             } else {
//               console.log(error);
//             }
//           })
//       });
//     } else {
//       app.signOutUser();
//       console.log('Se ha desconectado');
//     }
//   });
// };

export function createUserWithMailAndPassword(email, password){
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export function signInWithMailAndPassword(email, password){
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export function getIdToken(forceRefresh){
  return firebase.auth().currentUser.getIdToken(forceRefresh);
};

export function signOut(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};

export function sendPasswordResetEmail(email){
  firebase.auth().sendPasswordResetEmail(email);
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

