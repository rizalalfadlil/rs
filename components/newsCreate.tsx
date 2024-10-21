import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SaveNewsToFirebase } from "@/backend/controler/news"; // Impor fungsi Firebase
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const WriteNewsPage = ({
  data,
  id,
  getNewsData,
}: {
  data?: any;
  id?: string;
  getNewsData: any;
}) => {
  const [judul, setjudul] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [penulis, setpenulis] = useState("");
  const [teks, setteks] = useState("");

  useEffect(() => {
    clearForm();
    if (data) {
      setjudul(data.judul || "");
      setpenulis(data.penulis || "");
      setteks(data.teks || "");
      setImageFile(null);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newsData = {
      judul,
      penulis,
      teks,
      gambar: data?.gambar || "", // Gunakan gambar dari data jika tidak ada file baru
    };

    try {
      await SaveNewsToFirebase(id, newsData, imageFile);

      getNewsData();
    } catch (error) {
      console.error("Gagal menyimpan berita:", error);
      getNewsData();
    }
  };
  const clearForm = () => {
    setjudul("");
    setImageFile(null);
    setpenulis("");
    setteks("");
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

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
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Penulis
            </label>
            <Input
              type="text"
              value={penulis}
              onChange={(e) => setpenulis(e.target.value)}
              placeholder="Masukkan nama penulis"
              required
            />
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
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {id ? "Perbarui Berita" : "Publikasikan Berita"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WriteNewsPage;
