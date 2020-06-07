import * as functions from 'firebase-functions';
// import * as Firestore from '@google-cloud/firestore';
import * as admin from 'firebase-admin'

interface IUser {
  userUID: string;
  mail: string;
  fullName: string;
  phone1: string;
  phone2: string;
  address: string;
  neighborhood: string;
  city: string;
  photo?: string;
};

const DB_NAME = 'shaarei-zedek';
const PATH_USERS = DB_NAME + '/data/users'
const firestore = new admin.firestore.Firestore()
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {

  addNewUser(user)
});

function addNewUser(user: admin.auth.UserRecord): void {
  const userDetails = UserFormat(user);
  const usersCollectionRef = firestore.collection( PATH_USERS)

  usersCollectionRef.add(userDetails).then(documentReference => {
    const path = documentReference.path;
    console.log(`Root location for document is`, path);
  }).catch(e => console.log(e))
}

function UserFormat(user: admin.auth.UserRecord): IUser {
  return {
    userUID: user.uid,
    mail: user.email || '',
    fullName: user.displayName || '',
    phone1: user.phoneNumber || '',
    phone2: '',
    address: '',
    neighborhood: '',
    city: '',
    photo: user.photoURL || '',
  }
}