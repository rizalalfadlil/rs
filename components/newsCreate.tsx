import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SaveNewsToFirebase } from "@/backend/controler/news"; // Impor fungsi Firebase
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const WriteNewsPage = ({
  data,
  id,
  getNewsData,
  userData,
}: {
  data?: any;
  id?: string;
  getNewsData: any;
  userData: { fullName: string };
}) => {
  const [judul, setjudul] = useState("");
  const [imageFile, setImageFile]: any = useState(null);
  const [teks, setteks] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    clearForm();
    if (data) {
      setjudul(data.judul || "");
      setteks(data.teks || "");
      setImageFile(null);
    }
  }, [data]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const newsData = {
      judul,
      penulis: userData.fullName,
      teks,
      gambar: data?.gambar || "", // Gunakan gambar dari data jika tidak ada file baru
    };

    try {
      await SaveNewsToFirebase(newsData, imageFile, id);

      getNewsData();
    } catch (error) {
      console.error("Gagal menyimpan berita:", error);
      getNewsData();
    }
  };
  const clearForm = () => {
    setjudul("");
    setImageFile(null);
    setteks("");
  };

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  // const removeImage = () => {
  //   setImageFile(null);
  //   setImageUrl("");
  // };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Judul Berita
            </label>
            <Input
              type="text"
              value={judul}
              onChange={(e) => setjudul(e.target.value)}
              placeholder="Masukkan judul berita"
              required
              maxLength={100}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Gambar Berita
            </label>
            <Input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required={!id} // Gambar wajib untuk create, tidak wajib untuk update
            />
            {imageUrl && (
              <>
                <div
                  className="w-full h-60 bg-center bg-cover bg-no-repeat mt-4 rounded-md relative"
                  style={{ backgroundImage: `url("${imageUrl}")` }}
                ></div>
                {imageFile && (
                  <p
                    className={`text-xs text-muted-foreground ${
                      imageFile.size > 5000000 && "text-red-500"
                    }`}
                  >
                    {(imageFile.size / 1000000).toFixed(2)} MB / 5 MB
                  </p>
                )}
              </>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Penulis
            </label>
            <Input disabled value={userData.fullName} />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Isi Berita
            </label>
            <ReactQuill
              theme="snow"
              value={teks}
              onChange={setteks}
              placeholder="Tulis berita di sini"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!judul || !teks || (imageFile && imageFile.size > 5000000)}
          >
            {id ? "Perbarui Berita" : "Publikasikan Berita"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WriteNewsPage;
