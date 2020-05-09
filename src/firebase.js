import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
	apiKey: "AIzaSyDm7C7UnzU7klbLthkgPASDfFEuHDl8B-o",
	authDomain: "stickhere-e2aa9.firebaseapp.com",
	databaseURL: "https://stickhere-e2aa9.firebaseio.com",
	projectId: "stickhere-e2aa9",
	storageBucket: "stickhere-e2aa9.appspot.com",
	messagingSenderId: "303947328850",
	appId: "1:303947328850:web:6d310879d7286681549e8b",
	measurementId: "G-YP2WM13CWY"
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.database()

export function setValueListener(ref, callback) {
	ref.on('value', snapshot => {
		const data = snapshot.val()
		if (data) {
			callback(data)
		}
	})
}
