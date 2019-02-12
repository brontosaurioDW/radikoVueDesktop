// Datos de la API de FB
import Firebase from 'firebase';

export const config = {
	apiKey: "AIzaSyARk56_VHK1MmRStD9nDwCPxiDUfkfM6b8",
	authDomain: "radikochat-ff500.firebaseapp.com",
	databaseURL: "https://radikochat-ff500.firebaseio.com",
	projectId: "radikochat-ff500",
	storageBucket: "radikochat-ff500.appspot.com",
	messagingSenderId: "99413101533"
};

export const app = Firebase.initializeApp(config);

export const fbdb = app.database();

export const refMensajes 	= fbdb.ref('mensajes');