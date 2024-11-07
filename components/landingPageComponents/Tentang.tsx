import { Check } from "lucide-react";
import { motion } from "framer-motion";
export function Tentang({ judul, deskripsi, gambar, konten }: any) {
  return (
    <section className="min-h-dvh responsive-padding grid md:grid-cols-2">
      <div className="grid place-content-center">
        <motion.div
          initial={{ opacity: 0, translateY: 100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          whileInView={{ opacity: 100, translateY: 0 }}
          className=" bg-center bg-contain bg-no-repeat w-40 md:w-60 xl:w-80 aspect-square grid place-content-center"
          style={{
            backgroundImage: `url("${gambar[0]}")`,
          }}
        ></motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="grid content-center gap-4"
      >
        <p className="text-3xl font-bold">{judul[0]}</p>
        <p className="text-lg font-bold text-muted-foreground">
          {deskripsi[0]}
        </p>
        <ul className="font-bold space-y-2 text-orange-500">
          {konten[0].map((k: string, i: number) => (
            <li key={i} className="flex items-center gap-4">
              <div className="p-1.5 bg-primary text-background rounded-full">
                <Check />{" "}
              </div>
              {k}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="grid content-center gap-4"
      >
        <p className="text-3xl font-bold">{judul[1]}</p>
        <p className="text-lg font-bold text-muted-foreground">
          {deskripsi[1]}
        </p>
        <ul className=" font-bold space-y-2 text-orange-500">
          {konten[1].map((k: string, i: number) => (
            <li key={i} className="flex items-center gap-4">
              <div className="p-1.5 bg-primary text-background rounded-full">
                <Check />{" "}
              </div>
              {k}
            </li>
          ))}
        </ul>
      </motion.div>
      <div className="grid place-content-center">
        <motion.div
          initial={{ opacity: 0, translateY: 100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          whileInView={{ opacity: 100, translateY: 0 }}
          className=" bg-center bg-contain bg-no-repeat w-40 md:w-60 xl:w-80 aspect-square grid place-content-center"
          style={{
            backgroundImage: `url("${gambar[1]}")`,
          }}
        ></motion.div>
      </div>
    </section>
  );
}
