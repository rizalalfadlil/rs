/* eslint-disable react/jsx-key */
"use client";
import { Faq } from "@/components/landingPageComponents/Faq";
import { Tentang } from "@/components/landingPageComponents/Tentang";
import { Pencapaian } from "@/components/landingPageComponents/Pencapaian";

import {
  ArrowDown,
  Facebook,
  Hospital,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Partner } from "@/components/landingPageComponents/Partner";
import { Button } from "@/components/ui/button";
import { Berita } from "@/components/landingPageComponents/Berita";
import { Ulasan } from "@/components/landingPageComponents/Ulasan";
import { Header } from "@/components/landingPageComponents/Header";
import { Home } from "@/components/landingPageComponents/Home";
import Layanan from "@/components/landingPageComponents/Services";
import ScrollToTop from "@/components/ScrollToTop";
import { FloatingButton } from "../components/FloatingButton";

//edit teks disini
export const info = {
  nama: "paramadika homecare",
  logo: "./logo.png",
  kontak: {
    GMapLink:
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15843.233204955519!2d107.69076162053221!3d-6.913509687874907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1730504466701!5m2!1sen!2sid",
    alamat: "Jalan...",
    email: "email@gmail.com",
    telepon: "081234567890",
  },
  sosial: {
    //opsional
    instagram: "https://instagram.com/nama",
    facebook: "https://facebook.com/nama",
    twitter: "https://twitter.com/nama",
    linkedin: "https://linkedin.com/nama",
  },
};

//edit teks disini

//hampir semua teks nya contoh asal-asalan, harus diganti semua
const sections = [
  <Home
    teks1="PARAMEDIKA HOMECARE"
    teks2="Kini berobat tidak perlu keluar rumah, Dokter dan Perawat Kami siap mengobati Anda dirumah."
    teks3="Biaya dokter dan suster terjangkau,
            mulai dari Rp 250.000"
    teksSelengkapnya={
      <>
        Lihat Selengkapnya <ArrowDown />
      </>
    }
    teksKontak="Kontak Kami"
    urlGambar="./homecare.png"
  />,
  //bebas hapus bagian (<Komponen ... />) yang mana aja kalo kebanyakan/ ga penting/ ga ada datanya
  <Layanan
    judul="Layanan Kami"
    deskripsi={`Kami menyediakan pilihan terbaik untuk Anda. 
      Sesuaikan dengan kebutuhan kesehatan Anda dan pastikan Anda menjalani 
      perawatan dengan dokter kami yang berkualifikasi tinggi, Anda dapat 
      berkonsultasi dengan kami jenis layanan mana yang cocok untuk kesehatan Anda`}
    konten={[
      {
        gambar: "./layanan2.png",
        judul: "Consultation",
        isi: `Free consultation with our trusted doctors and get the best recomendations`,
      },
      {
        gambar: "./HOME.png",
        judul: "Homecare",
        isi: `Buy  your medicines with our mobile application with a simple delivery system`,
      },
      {
        gambar: "./image9.png",
        judul: "Midwife Services",
        isi: `Choose your doctor from thousands of specialist, general, and trusted hospitals`,
      },
      {
        gambar: "./image10.png",
        judul: "Caregiver",
        isi: `Free consultation with our trusted doctors and get the best recomendations`,
      },
      {
        gambar: "./image11.png",
        judul: "Homecare",
        isi: `Track and save your medical history and health data `,
      },
      {
        gambar: "",
        judul: "Homecare",
        isi: `Buy  your medicines with our mobile application with a simple delivery system`,
      },
      {
        gambar: "",
        judul: "Homecare",
        isi: `Buy  your medicines with our mobile application with a simple delivery system`,
      },
      {
        gambar: "",
        judul: "Homecare",
        isi: `Buy  your medicines with our mobile application with a simple delivery system`,
      },
    ]}
  />,
  <Tentang
    judul={["ParamedikaHomecare.com, Solusinya!", "judul 2"]}
    deskripsi={["", ""]}
    gambar={["./wanita.png", "./wanita.png"]}
    konten={[
      [
        "Layanan medical homecare yang aman nyaman dan terpercaya.",
        "Fasilitas lengkap sesuai dengan kebutuhan anda.",
        "Tenaga kesehatan professional dan bersertifikat.",
        "Pelayanan kesehatan langsung di rumah anda.",
        "Konsultasi gratis dan Cepat dan sigap.",
      ],
      ["konten 2", "konten 2"],
    ]}
  />,
  <Pencapaian
    judul="Pencapaian Kami"
    deskripsi={`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
  delectus labore quas dicta laudantium atque voluptatem necessitatibus, a
  qui harum magni reprehenderit vitae voluptatibus recusandae porro
  exercitationem quos facere placeat!`}
    konten={[
      {
        ikon: <User size={48} />,
        jumlah: 20,
        judul: "Tahun beroprasi",
        warna: "blue",
      },
      {
        ikon: <Hospital size={48} />,
        jumlah: 100,
        judul: "Jumlah cabang di seluruh Indonesia",
        warna: "red",
      },
      /* cara nambahinnya kopas yang di atas terus ganti teks nya, cara tambah ikon : 
      1. cari namanya di https://lucide.dev/icons
      2. tulis namanya di baris import ... from "lucide-react"
      */
    ]}
  />,
  <Partner
    judul="Partner kami"
    deskripsi={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
  reiciendis neque odit sint cum ut molestiae quae, nam quasi inventore
  laboriosam perferendis quaerat exercitationem, debitis facere
  perspiciatis? Nostrum, ad sint.`}
    konten={[
      {
        gambar: "https://img.icons8.com/ios-filled/100/tiktok--v1.png",
        judul: "tiktok",
      },
      //cara nambahinnya kopas yang di atas terus ganti teks nya
      //gambarnya harus png/svg warna hitam polos
    ]}
  />,
  <Faq
    konten={[
      {
        q: "pertanyaan",
        a: "jawaban",
      },
      {
        q: "pertanyaan lain",
        a: "jawaban lain",
      },
    ]}
  />,

  //data ulasan & berita isinya dari halaman admin
  <Ulasan judul="Ulasan" deskripsi="deskripsi ulasan" />,
  <Berita />,
];
export default function LandingPage() {
  return (
    <div>
      <Header sections={sections} logo={info.logo} />
      <main className="pt-40 md:pt-0">
        {sections.map((s, i) => (
          <div key={i} id={`section-${i + 1}`}>
            {s}
          </div>
        ))}
      </main>
      <FloatingButton />
      <Footer />
    </div>
  );
}
function Footer({}) {
  return (
    <footer className="bg-primary responsive-padding py-8 text-background">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <b>Kontak Kami</b>
          <div className="space-y-2">
            <iframe
              src={info.kontak.GMapLink}
              className="w-full aspect-square rounded-xl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <p>Jalan....</p>
          </div>
          <div className="space-y-2">
            {info.kontak.email && (
              <a
                href={`mailto:${info.kontak.email}`}
                className="flex items-center gap-2"
              >
                <Mail />
                <span>{info.kontak.email}</span>
              </a>
            )}
            {info.kontak.telepon && (
              <a className="flex items-center gap-2">
                <Phone />
                <span>{info.kontak.telepon}</span>
              </a>
            )}
          </div>
        </div>
        <div className="grid gap-4 content-start">
          <b>Sosial Media</b>
          {info.sosial.instagram && (
            <Button variant="ghost" className="justify-start">
              <Instagram />
              {info.sosial.instagram}
            </Button>
          )}
          {info.sosial.facebook && (
            <Button variant="ghost" className="justify-start">
              <Facebook />
              {info.sosial.facebook}
            </Button>
          )}
          {info.sosial.linkedin && (
            <Button variant="ghost" className="justify-start">
              <Linkedin />
              {info.sosial.linkedin}
            </Button>
          )}
        </div>
        <div className="grid gap-4 content-start">
          <b>Atribusi</b>
          <p>
            gambar, ikon dari diambil{" "}
            <a href="https://icons8.com">icons8.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
