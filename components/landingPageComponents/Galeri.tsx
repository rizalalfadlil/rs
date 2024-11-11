"use client";
import { getAllImages } from "@/backend/controler/gallery";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export function Galeri({ judul, deskripsi, konten }: any) {
  const [images, setImages] = useState<any>([]);

  const getImages = async () => {
    try {
      const res = await getAllImages();
      setImages(res);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getImages();
  }, []);

  return (
    <section className="responsive-padding min-h-dvh bg-primary space-y-20 py-20 text-white grid content-center">
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
      >
        <p className="text-3xl font-bold">{judul}</p>
        <p className="md:w-1/2">{deskripsi}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="flex gap-8 flex-wrap justify-center"
      >
        {images.map((k:{url:string}, i: any) => (
          <img src={k.url} className="md:max-w-sm" />
        ))}
      </motion.div>
    </section>
  );
}
