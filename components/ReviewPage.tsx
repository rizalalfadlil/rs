"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Minus, Plus, Save, Trash } from "lucide-react";

export function ReviewPage({}) {
  const exampleReview = [
    {
      nama: "Andi Setiawan",
      jabatan: "CEO PT Sukses Makmur",
      ulasan:
        "Sebagai CEO, saya selalu mencari alat yang bisa membantu tim pemasaran kami bekerja lebih efisien. Aplikasi ini benar-benar mengubah cara kami mengelola kampanye. Fitur otomatisasinya sangat membantu dalam menghemat waktu dan sumber daya. Selain itu, laporan analitik yang disediakan sangat mendalam, memungkinkan kami untuk mengambil keputusan berdasarkan data yang akurat. Saya sangat merekomendasikan aplikasi ini bagi perusahaan yang ingin meningkatkan efektivitas pemasaran mereka.",
      skor: 4.5,
    },
    {
      nama: "Rina Kartika",
      jabatan: "CFO Bina Sejahtera",
      ulasan:
        "Sebagai CFO, efisiensi dan ketepatan laporan keuangan adalah prioritas utama saya. Aplikasi ini menyediakan banyak fitur yang memudahkan saya dan tim dalam mengelola anggaran, laporan keuangan, dan proyeksi. Namun, ada beberapa fitur yang dapat ditingkatkan, terutama dalam hal kecepatan pemrosesan data untuk perusahaan dengan volume transaksi yang besar. Secara keseluruhan, ini adalah solusi yang sangat bermanfaat bagi departemen keuangan kami.",
      skor: 4.0,
    },
    {
      nama: "Budi Wirawan",
      jabatan: "CTO Tech Innovators",
      ulasan:
        "Dalam peran saya sebagai CTO, integrasi API yang lancar dan dokumentasi yang jelas sangatlah penting. Aplikasi ini memenuhi harapan saya dalam hal itu. Proses integrasi ke sistem internal kami berjalan sangat baik tanpa hambatan yang berarti. Dokumentasi yang disediakan pun sangat jelas, memudahkan pengembang kami untuk cepat beradaptasi. Meskipun demikian, saya menemukan beberapa bug kecil yang memerlukan perbaikan, tetapi secara keseluruhan, ini adalah alat yang sangat membantu untuk proyek-proyek teknis kami.",
      skor: 4.2,
    },
    {
      nama: "Siti Aisyah",
      jabatan: "Founder Kreativa Digital",
      ulasan:
        "Sebagai founder dari startup yang bergerak di bidang kreatif, saya membutuhkan aplikasi yang dapat mempermudah pengelolaan tim dan proyek. Saya senang menemukan aplikasi ini karena memiliki banyak fitur yang sangat relevan bagi kami. Dari manajemen tugas hingga kolaborasi antar departemen, semuanya menjadi lebih teratur dan efisien. Saya juga menyukai fitur pelacakan waktu yang membantu kami memantau produktivitas tim secara real-time. Ini adalah investasi yang sangat berharga untuk startup seperti kami.",
      skor: 4.8,
    },
    {
      nama: "Joko Susilo",
      jabatan: "COO Global Ventures",
      ulasan:
        "Sebagai COO, saya harus memastikan bahwa operasi bisnis berjalan dengan lancar. Aplikasi ini memberikan solusi manajemen yang komprehensif untuk kebutuhan operasional kami. Saya sangat terkesan dengan kemudahan penggunaannya dan kemampuan skalabilitasnya. Kami dapat dengan mudah menyesuaikan fitur-fitur yang tersedia sesuai dengan pertumbuhan bisnis kami. Namun, saya berharap ada lebih banyak fitur yang mendukung otomatisasi tugas rutin agar tim bisa lebih fokus pada hal-hal yang strategis.",
      skor: 4.7,
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimoni</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-2">
        {exampleReview.map((r, i) => (
          <Sheet>
            <SheetTrigger asChild>
              <div className="space-y-2 hover:bg-muted transition-all duration-300 p-4 rounded-md cursor-pointer">
                <div>
                  <p className=" font-bold">{r.nama}</p>
                  <p className="text-xs">{r.jabatan}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">{r.ulasan}</p>
                  <p className="font-bold">{r.skor}/5</p>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Review dari {r.nama}</SheetTitle>
                <SheetDescription>{r.jabatan}</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div>
                  <label htmlFor="">review</label>
                  <Textarea value={r.ulasan} rows={8} className="resize-none" />
                </div>
                <div>
                  <label htmlFor="">skor</label>
                  <div className="flex gap-2 items-center">
                    <Button>
                      <Minus />
                    </Button>
                    <Input type="number" className="grow" value={r.skor} />
                    <Button>
                      <Plus />
                    </Button>
                  </div>
                </div>
              </div>
              <SheetFooter className="grid grid-cols-2">
                <Button>
                  <Save /> simpan
                </Button>
                <Button variant="secondary">
                  <Trash /> hapus
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </CardContent>
    </Card>
  );
}
