import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../firebase";
const db = getFirestore(app);
export async function CreateOrder(data: any) {
  try {
    const docRef = await addDoc(collection(db, "order"), data);
    return docRef.id;
  } catch (e) {
    console.error(e);
  }
}

export const completeOrder = async (id: string, nama: string): Promise<void> => {
  try {
    const orderRef = doc(db, "order", id);
    await updateDoc(orderRef, { selesai: nama });
    console.log(`Order ${id} berhasil diperbarui: selesai = ${nama}`);
  } catch (error) {
    console.error("Error updating document:", error);
  }
};
export async function getOrdersList() {
  try {
    const querySnapshot = await getDocs(collection(db, "order"));
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}