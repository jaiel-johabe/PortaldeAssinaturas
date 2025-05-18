/**
 * Portal de Assinaturas
 * 
 * @copyright 2025 JAIEL JOHABE MACEDO BARBOZA
 * @license MIT
 */

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxx",  // Edite esses campos, caso queira configurar o firebase para autenticação de login.
  authDomain: "xxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxxxxxxx"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
