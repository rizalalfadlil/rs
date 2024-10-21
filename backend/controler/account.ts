import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export async function register(
  email: string,
  password: string,
  fullName: string,
  role: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Simpan data tambahan ke Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName: fullName,
      role: role,
      email: email,
      created_at: Date.now(),
    });

    console.log("Registrasi berhasil");
  } catch (error) {
    console.log("Error saat registrasi: ", error);
  }
}
// Fungsi untuk login pengguna
export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Login berhasil");
    return user.uid;
  } catch (error) {
    console.log("Error saat login: ", error);
    return null;
  }
}

export const getUserData = async () => {
  const user = auth.currentUser; // Mendapatkan user yang sedang login
  if (user) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("No user data found in Firestore");
      }
      const userData = {
        uid: user.uid,
        email: user.email,
        ...userDoc.data(), // Menggabungkan data dari Firestore
      };

      return userData; // Mengembalikan data user sebagai objek
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error; // Melempar kembali error untuk penanganan lebih lanjut
    }
  }else{
    console.log("login terlebih dahulu!")
  }
};
export async function logout() {
  try {
    await auth.signOut();
    console.log("Logout berhasil");
  } catch (error) {
    console.error("Error saat logout: ", error);
  }
}

export async function getUsersList() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}
export async function updateAccount(data: { fullName: string; role: string; email: string; created_at: number; }, id: string) {
  try {
    await setDoc(doc(db, "users", id), data);
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error(e);
  }
}
