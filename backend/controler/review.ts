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
export async function CreateReview(data: { nama: string; jabatan: string; ulasan: string; rating: number; }) {
  try {
    await addDoc(collection(db, "review"), data);
    console.log("Berhasil membuat review");
  } catch (e) {
    console.error(e);
  }
}
export async function DeleteReview(id:string) {
  try {
    await deleteDoc(doc(db, "review", id));
    console.log("Berhasil menghapus review");
  } catch (e) {
    console.error(e);
  }
}
export async function SetReview(data: { nama: string; jabatan: string; ulasan: string; rating: number; }, id: string) {
  try{
    await setDoc(doc(db,"review", id), data)
    console.log("Berhasil memperbarui review");
  }catch(e){
    console.error(e)
  }
}