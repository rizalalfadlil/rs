import { ref, uploadBytes, deleteObject, listAll, getDownloadURL, getStorage } from "firebase/storage";
import { app } from "../firebase";

const storage = getStorage(app)
// Tipe untuk response upload
interface UploadResponse {
  url: string;
  path: string;
}

// Fungsi untuk mengunggah gambar ke folder "gallery"
export async function uploadImage(file: File): Promise<UploadResponse> {
  try {
    const storageRef = ref(storage, `gallery/${file.name}`);
    await uploadBytes(storageRef, file);

    // Mendapatkan URL untuk gambar yang baru diunggah
    const url = await getDownloadURL(storageRef);
    return { url, path: storageRef.fullPath };
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
}

// Fungsi untuk menghapus gambar berdasarkan path di Storage
export async function deleteImage(path: string): Promise<void> {
  try {
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
    console.log(`Image ${path} deleted successfully.`);
  } catch (error) {
    console.error("Delete Error:", error);
    throw error;
  }
}

// Fungsi untuk mendapatkan semua gambar dari folder "gallery"
export async function getAllImages(): Promise<UploadResponse[]> {
  const galleryRef = ref(storage, "gallery");
  const result: UploadResponse[] = [];

  try {
    const list = await listAll(galleryRef);

    for (const itemRef of list.items) {
      const url = await getDownloadURL(itemRef);
      result.push({ url, path: itemRef.fullPath });
    }

    return result;
  } catch (error) {
    console.error("Get Images Error:", error);
    throw error;
  }
}
