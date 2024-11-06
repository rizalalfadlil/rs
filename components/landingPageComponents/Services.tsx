import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";

export default function Layanan({
  judul,
  deskripsi,
  konten,
}: {
  judul: string;
  deskripsi: string;
  konten: { gambar: string; judul: string; isi: string }[];
}) {
  return (
    <section className="responsive-padding min-h-dvh grid content-center gap-8">
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="space-y-2"
      >
        <p className="text-3xl font-bold capitalize text-primary">{judul}</p>
        <p className="">{deskripsi}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, translateY:100 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          whileInView={{ opacity: 100, translateY:0 }} className="grid md:grid-cols-3 xl:grid-cols-4 py-2 gap-4">
        {konten.map((k, i) => (
          <div className="p-4 flex flex-col justify-center rounded-xl hover:bg-muted transition-all duration-300 border">
            <img src={k.gambar} alt={k.gambar} />
            <b>{k.judul}</b>
            <p>{k.isi}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
