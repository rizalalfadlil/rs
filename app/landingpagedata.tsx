/* eslint-disable react/jsx-key */
import { Berita } from "@/components/landingPageComponents/Berita";
import { Faq } from "@/components/landingPageComponents/Faq";
import { Home } from "@/components/landingPageComponents/Home";
import { Galeri } from "@/components/landingPageComponents/Galeri";
import { Pencapaian } from "@/components/landingPageComponents/Pencapaian";
import Layanan from "@/components/landingPageComponents/Services";
import { Tentang } from "@/components/landingPageComponents/Tentang";
import { Ulasan } from "@/components/landingPageComponents/Ulasan";
import { ArrowDown, User, Hospital } from "lucide-react";

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
  export const sections = [
    <Home
      teks1="PARAMEDIKA HOMECARE"
      teks2="Kini berobat tidak perlu keluar rumah, Dokter dan Perawat Kami siap mengobati Anda dirumah."
      teks3="Biaya dokter dan suster terjangkau,
              mulai dari Rp 250.000"
      teksSelengkapnya="Lihat Selengkapnya"
      teksKontak="Pesan Sekarang"
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
          isi: `
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium eos esse dolorum earum natus, officia aliquid culpa. Cupiditate magni, totam quibusdam debitis, consectetur aliquam dolorem nam perferendis, officia quidem commodi.`,
          deskripsi: "Free consultation with our trusted doctors and get the best recomendations"
        },
        {
          gambar: "./HOME.png",
          judul: "Homecare",
          isi: `
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium eos esse dolorum earum natus, officia aliquid culpa. Cupiditate magni, totam quibusdam debitis, consectetur aliquam dolorem nam perferendis, officia quidem commodi.`,
          deskripsi: "Buy  your medicines with our mobile application with a simple delivery system"
        },
        {
          gambar: "./image9.png",
          judul: "Midwife Services",
          isi: ``,
          deskripsi: "Choose your doctor from thousands of specialist, general, and trusted hospitals"
        },
        {
          gambar: "./image10.png",
          judul: "Caregiver",
          isi: ``,
          deskripsi: "Free consultation with our trusted doctors and get the best recomendations"
        },
        {
          gambar: "./image11.png",
          judul: "Homecare",
          isi: ` `,
          deskripsi: "Track and save your medical history and health data"
        },
        {
          gambar: "",
          judul: "Homecare",
          isi: `Buy  your medicines with our mobile application with a simple delivery system`,
          deskripsi: ""
        },
        {
          gambar: "",
          judul: "Homecare",
          isi: `Buy  your medicines with our mobile application with a simple delivery system`,
          deskripsi: ""
        },
        {
          gambar: "",
          judul: "Homecare",
          isi: `Buy  your medicines with our mobile application with a simple delivery system`,
          deskripsi: ""
        },
      ]}
    />,
    <Tentang
      judul={["Jika Anda Pernah Mengalami Hal Ini", "ParamedikaHomecare.com, Solusinya!"]}
      deskripsi={["", ""]}
      gambar={["./images.jpg", "./images2.jpg"]}
      konten={[
        [
          "Sakit tapi tidak punya waktu untuk berobat ke rumah sakit atau Klinik",
          "Sedang sakit dan ingin segera berkonsultasi dengan dokter.",
          "Merasa tidak nyaman untuk dirawat di Rumah Sakit.",
          "Sudah minum obat namun tidak kunjung sembuh.",
          "Kesulitan untuk pergi ke Rumah Sakit.",
        ],
        ["Layanan medical homecare yang aman nyaman dan terpercaya.", 
          "Fasilitas lengkap sesuai dengan kebutuhan anda.",
          "Tenaga kesehatan professional dan bersertifikat.",
          "Pelayanan kesehatan langsung di rumah anda.",
          "Konsultasi gratis dan Cepat dan sigap."
        ],
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
    <Galeri
      judul="Galeri"
      deskripsi={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
    reiciendis neque odit sint cum ut molestiae quae, nam quasi inventore
    laboriosam perferendis quaerat exercitationem, debitis facere
    perspiciatis? Nostrum, ad sint.`}
      konten={["https://img.icons8.com/ios-filled/100/tiktok--v1.png"]}
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