import { ReactNode } from "react";
import { motion } from "framer-motion";
export function Pencapaian({
  judul,
  deskripsi,
  konten,
}: {
  judul: string;
  deskripsi: string;
  konten: {
    ikon: React.JSX.Element | Element | ReactNode |any;
    jumlah: number;
    judul: string;
    warna: string;
  }[];
}) {
  return (
    <section className="responsive-padding min-h-dvh items-center grid content-center space-y-4">
      <motion.p
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="text-center text-3xl text-primary font-bold"
      >
        {judul}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="text-center pb-20 md:px-20 text-lg font-bold text-muted-foreground"
      >
        {deskripsi}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="flex items-center flex-wrap justify-center gap-20 text-sm"
      >
        {konten.map((k, i) => (
          <div key={i} className="flex items-center gap-4">
            <div
              style={{
                backgroundColor: k.warna,
              }}
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
      </motion.div>
    </section>
  );
}
