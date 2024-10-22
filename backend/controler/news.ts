import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { firebaseConfig } from "../firebase";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// Fungsi untuk membuat atau memperbarui berita di Firestore dan Storage
export const SaveNewsToFirebase = async (
  newsData: {
    judul?: string;
    penulis?: string;
    teks?: string;
    gambar: any;
    dibuat?: any;
  },
  imageFile: any,
  id?: string
) => {
  try {
    // Jika ada gambar yang diunggah
    let imageUrl = newsData.gambar || "";

    if (imageFile) {
      // Buat referensi ke Firebase Storage
      const storageRef = ref(storage, `news-images/${imageFile.name}`);

      // Unggah gambar ke Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      // Tunggu sampai upload selesai dan dapatkan URL gambar
      const snapshot = await uploadTask;
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Update newsData dengan URL gambar
    const updatedNewsData = {
      ...newsData,
      gambar: imageUrl, // Gunakan URL gambar dari Storage
      dibuat: newsData.dibuat || new Date().toISOString(),
    };

    // Jika id ada, lakukan update
    if (id) {
      const newsDocRef = doc(db, "news", id);
      await updateDoc(newsDocRef, updatedNewsData);
      console.log("Berita berhasil diperbarui");
    } else {
      await addDoc(collection(db, "news"), updatedNewsData);
    }
  } catch (error) {
    console.error("Error menyimpan berita:", error);
  }
};
export async function getNewsList() {
  try {
    const querySnapshot = await getDocs(collection(db, "news"));
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}
export async function getOneNews(id: string) {
  try {
    const news = await getDoc(doc(db, "news", id));
    return news.data();
  } catch (e) {
    console.error(e);
  }
}
export async function DeleteNews(id: string) {
  try {
    await deleteDoc(doc(db, "news", id));
    console.log("Berita berhasil dihapus");
  } catch (e) {
    console.error(e);
  }
}
