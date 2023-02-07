import app from "./FirebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  onChildAdded,
  onChildChanged,
} from "firebase/database";
const auth = getAuth(app);
const database = getDatabase(app);

const signIn = (obj) => {
  const { email, password, userName, contact } = obj;
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const reference = ref(database, `users/${user.uid}`);
        obj.id = user.uid;
        set(reference, obj)
          .then(() => {
            // Data saved successfully!
            resolve("data sent successfully to firebase ");
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorCode);
        // ..
      });
  });
};
const login = (email, password) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const reference = ref(database, `users/${user.uid}`);
        onValue(reference, (e) => {
          if (e.exists()) {
            resolve(e.val());
          } else {
            reject("No user Found");
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorCode);
      });
  });
};
const checkUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // resolve(uid);
        resolve(uid);
        // ...
      } else {
        reject("No user Login");
        // User is signed out
        // ...
      }
    });
  });
};

const sendData = (userObj, userName, id) => {
  return new Promise((resolve, reject) => {
    let postListRef;
    if (id) {
      postListRef = ref(database, `${userName}/${id}`);
    } else {
      let addRef = ref(database, userName);
      userObj.id = push(addRef).key;
      postListRef = ref(database, `${userName}/${userObj.id}`);
    }
    set(postListRef, userObj)
      .then((success) => {
        resolve(
          `Data sent succcessfully to this ${userName} and id=${userObj.id}`
        );
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const getData = (userName, id) => {
  const reference = ref(database, `${userName}/${id ? id : ""}`);
  return new Promise((resolve, reject) => {
    onValue(
      reference,
      (snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          if (id) {
            resolve(data);
          } else {
            let arr = Object.values(data);
            resolve(arr);
          }
        } else {
          reject("no data found");
        }
      },
      {
        onlyOnce: false,
      }
    );
  });
};
export { signIn, login, checkUser, sendData, getData };
