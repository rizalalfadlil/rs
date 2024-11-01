import Marquee from "@/components/Marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Check, HomeIcon, Hospital, Plus, User } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-primary">
      <Header />
      <main>
        <HeroSection />
        <KenapaHarusMemilih />
        <Pencapaian />
        <Partner />
        <Faq />
      </main>
    </div>
  );
}

const HeroSection = ({
  teks1 = "nama aplikasi",
  teks2 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit providentmaiores?",
  teks3 = "Ullam architecto dolorem error voluptatibus placeat delectus quae eligendi sed magnam",
  teksSelengkapnya = (
    <>
      Lihat Selengkapnya <ArrowDown />
    </>
  ),
  teksKontak = "Kontak Kami",
}: any) => {
  return (
    <section className="grid md:grid-cols-2 min-h-screen responsive-padding">
      <div className="grid content-center space-y-5">
        <p className="text-xs font-bold text-muted-foreground tracking-widest">
          {teks1}
        </p>
        <p className="font-bold text-4xl text-primary">{teks2}</p>
        <p className="font-medium text-muted-foreground">{teks3}</p>
        <div className="grid md:flex items-center gap-6">
          <Button className="rounded-full">{teksSelengkapnya}</Button>
          <Button variant="outline" className="rounded-full">
            {teksKontak}
          </Button>
        </div>
      </div>
      <div className=" grid place-content-center">
        <img
          src="./gummy-medical-lab.svg"
          style={{
            maxWidth: "100%",
          }}
        />
      </div>
    </section>
  );
};

function Pencapaian({
  judul = "Pencapaian Kami",
  deskripsi = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
  delectus labore quas dicta laudantium atque voluptatem necessitatibus, a
  qui harum magni reprehenderit vitae voluptatibus recusandae porro
  exercitationem quos facere placeat!`,
  konten = [
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
  ],
}: {
  judul: string;
  deskripsi: string;
  konten: {
    ikon: React.JSX.Element;
    jumlah: number;
    judul: string;
    warna: string;
  }[];
}) {
  return (
    <section className="responsive-padding min-h-screen items-center grid content-center space-y-4">
      <p className="text-center text-2xl font-bold">{judul}</p>
      <p className="text-center pb-20 md:px-20">{deskripsi}</p>
      <div className="flex items-center flex-wrap justify-center gap-20 text-sm">
        {konten.map((k, i) => (
          <div className="flex items-center gap-4">
            <div
              style={{ backgroundColor: k.warna }}
              className={` row-span-2 grid place-content-center rounded-xl text-white p-8 aspect-square shadow-lg`}
            >
              {k.ikon}
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{k.jumlah}</p>
              <p>{k.judul}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Partner({
  judul = "Partner kami",
  deskripsi = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
reiciendis neque odit sint cum ut molestiae quae, nam quasi inventore
laboriosam perferendis quaerat exercitationem, debitis facere
perspiciatis? Nostrum, ad sint.`,
  konten = [
    {
      gambar: "https://img.icons8.com/ios-filled/100/tiktok--v1.png",
      judul: "tiktok",
    },
  ],
}: any) {
  return (
    <section className="responsive-padding min-h-screen bg-primary space-y-20 text-white grid content-center">
      <div>
        <p className="text-3xl font-bold">{judul}</p>
        <p className="md:w-1/2">{deskripsi}</p>
      </div>
      <div className="flex gap-8 flex-wrap justify-center">
        {konten.map((k, i) => (
          <div className="flex items-center text-xl md:text-[4rem] font-bold gap-4">
            <div
              className="w-20 md:w-32 aspect-square bg-center bg-cover bg-no-repeat invert"
              style={{
                backgroundImage: `url("${k.gambar}")`,
              }}
            />
            {k.judul}
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq({}) {
  return (
    <section className="responsive-padding min-h-screen grid content-center md:grid-cols-2">
      <div className="text-lg space-y-4 grid content-center">
        <p className="text-3xl font-bold text-primary">FAQ</p>
        <p>(Tanya Jawab Umum)</p>
      </div>
      <div>
        <Accordion type="single">
          <AccordionItem value="q1">
            <AccordionTrigger>pertanyaan 1</AccordionTrigger>
            <AccordionContent>Jawaban 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>pertanyaan 2</AccordionTrigger>
            <AccordionContent>Jawaban 2</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>pertanyaan 3</AccordionTrigger>
            <AccordionContent>Jawaban 3</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

function KenapaHarusMemilih({
  judul = "kenapa harus memilih kami",
  deskripsi = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempore
iste obcaecati optio unde perferendis perspiciatis adipisci in maxime
doloremque rerum quo doloribus, consectetur est ipsa voluptate animi
natus. Cum.`,
  gambar = "./pixeltrue-icons-seo-ads-on-google-1.svg",
  konten = [
    "semua dalam paket gratis, plus",
    "akses lebih awal ke fitur baru",
    "Tersedia di seluruh penjuru indonesia",
    "Respons cepat, selalu aktif 24 jam",
    "Gratis selamanya",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  ],
}: any) {
  return (
    <section className="min-h-screen responsive-padding grid md:grid-cols-2">
      <div className="grid place-content-center">
        <div className=" bg-center bg-contain bg-no-repeat w-40 md:w-60 xl:w-80 aspect-square grid place-content-center" style={{backgroundImage:`url("${gambar}")`}}>
          gambar disini
        </div>
      </div>
      <div className="grid content-center gap-4">
        <p className="text-3xl font-bold">{judul}</p>
        <p className="text-lg font-bold text-muted-foreground">{deskripsi}</p>
        <ul className="font-bold space-y-2 text-orange-500">
          {konten.map((k, i) => (
            <li className="flex items-center gap-4">
              <div className="p-1.5 bg-primary text-background rounded-full">
                <Check />{" "}
              </div>
              {k}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Header({}) {
  return (
    <header className="fixed responsive-padding pt-8 w-full ">
      <div className="rounded-full p-4 px-8 border backdrop-blur-sm bg-background/70">
        this is sticky header
      </div>
    </header>
  );
}
