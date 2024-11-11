"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  getAllImages,
  uploadImage,
  deleteImage,
} from "@/backend/controler/gallery";
import { Button } from "../ui/button";
import { Trash, Upload } from "lucide-react";
import { Input } from "../ui/input";

export default function GalleryPage() {
  const [images, setImages] = useState<{ url: string; path: string }[]>([]);

  const getImages = async () => {
    const res = await getAllImages();
    setImages(res);
  };

  useEffect(() => {
    getImages();
  }, []);

  // Fungsi untuk mengunggah gambar baru
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        await uploadImage(file);
        getImages(); // Memperbarui daftar gambar setelah unggah
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  // Fungsi untuk menghapus gambar berdasarkan path
  const handleDelete = async (path: string) => {
    try {
      await deleteImage(path);
      getImages(); // Memperbarui daftar gambar setelah penghapusan
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 flex-wrap py-4">
          {images.map((m, i) => (
            <div key={i} className="max-w-sm space-y-2">
              <img src={m.url} className="rounded-md" alt={`image-${i}`} />
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => handleDelete(m.path)}
              >
                <Trash /> Hapus
              </Button>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <b>tambah gambar</b>
        <Input
          type="file"
          onChange={handleUpload}
          accept="image/*"
        />
        </div>
      </CardContent>
    </Card>
  );
}
