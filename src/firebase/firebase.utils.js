import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA9bgxErYyllClM9Ng9-693k-lhNHmUiFo",
    authDomain: "crwn-db-32dea.firebaseapp.com",
    databaseURL: "https://crwn-db-32dea.firebaseio.com",
    projectId: "crwn-db-32dea",
    storageBucket: "crwn-db-32dea.appspot.com",
    messagingSenderId: "964629844296",
    appId: "1:964629844296:web:5d6889e5f0471384dae37d",
};


export const createUserProfileDocument = async (userAuth, ...additionalParams) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalParams
            })
        } catch (error) {
            console.log('an error is occured when creating user', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;