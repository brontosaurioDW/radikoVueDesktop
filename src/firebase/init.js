// Initialize Firebase
var config = {
	apiKey: "AIzaSyAgBCwDl60eO0X_HtPnDXUCC_TD80o7rZc",
	authDomain: "radikochat.firebaseapp.com",
	databaseURL: "https://radikochat.firebaseio.com",
	projectId: "radikochat",
	storageBucket: "",
	messagingSenderId: "552545608136"
};
firebase.initializeApp(config);
//Fin del código que copiamos de la consola de firebase que la inicializa
	
//Obtenemos la instancia de Firebase
let fbdb = firebase.database();