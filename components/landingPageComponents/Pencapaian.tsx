import { ReactNode } from "react";

export function Pencapaian({judul,deskripsi,konten}: {
  judul: string;
  deskripsi: string;
  konten: {
    ikon: React.JSX.Element | Element | ReactNode;
    jumlah: number;
    judul: string;
    warna: string;
  }[];
}) {
  return <section className="responsive-padding min-h-screen items-center grid content-center space-y-4">
      <p className="text-center text-2xl font-bold">{judul}</p>
      <p className="text-center pb-20 md:px-20">{deskripsi}</p>
      <div className="flex items-center flex-wrap justify-center gap-20 text-sm">
        {konten.map((k, i) => <div key={i} className="flex items-center gap-4">
            <div style={{
          backgroundColor: k.warna
        }} className={` row-span-2 grid place-content-center rounded-xl text-white p-8 aspect-square shadow-lg`}>
              {k.ikon}
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{k.jumlah}</p>
              <p>{k.judul}</p>
            </div>
          </div>)}
      </div>
    </section>;
}
  