import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

export default function Layanan({
  judul,
  deskripsi,
  konten,
}: {
  judul: string;
  deskripsi: string;
  konten: { gambar: string; judul: string; isi: string; deskripsi: string }[];
}) {
  return (
    <section className="responsive-padding min-h-dvh grid content-center gap-8">
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="space-y-2"
      >
        <p className="text-3xl text-center font-bold capitalize text-primary">
          {judul}
        </p>
        <p className="text-center ">{deskripsi}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="grid md:grid-cols-3 xl:grid-cols-4 py-2 gap-4"
      >
        {konten.map((k, i) => (
          <Dialog>
            <DialogTrigger asChild>
              <div className="p-4 flex flex-col justify-center rounded-xl hover:bg-muted transition-all duration-300 border">
                <img src={k.gambar} alt={k.gambar} />
                <b>{k.judul}</b>
                <p>{k.deskripsi}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{k.judul}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2">
                <div className="grid place-content-center">
                <img src={k.gambar} alt={k.gambar} className="max-w-60" />
                </div>
                <ScrollArea className="h-80 text-sm">
                  <b>{k.deskripsi}</b>
                  <p className="pt-4">{k.isi}</p>
                </ScrollArea>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Tutup</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </motion.div>
    </section>
  );
}
