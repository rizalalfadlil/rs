import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export async function GetAllReview() {
  try {
    const querySnapshot = await getDocs(collection(db, "review"));
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}
export async function CreateReview(data: any) {
  try {
    const docRef = await addDoc(collection(db, "review"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error(e);
  }
}
export async function DeleteReview(id:string) {
  try {
    await deleteDoc(doc(db, "review", id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error(e);
  }
}
export async function SetReview(data, id) {
  try{
    await setDoc(doc(db,"review", id), data)
    console.log("Document updated with ID: ", id);
  }catch(e){
    console.error(e)
  }
}