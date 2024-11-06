import { Check } from "lucide-react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";
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
            backgroundImage: `url("${gambar}")`,
          }}
        ></motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="grid content-center gap-4"
      >
        <p className="text-3xl font-bold">{judul}</p>
        <p className="text-lg font-bold text-muted-foreground">{deskripsi}</p>
        <ul className="font-bold space-y-2 text-orange-500">
          {konten.map(
            (
              k:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<AwaitedReactNode>
                | null
                | undefined,
              i: Key | null | undefined
            ) => (
              <li key={i} className="flex items-center gap-4">
                <div className="p-1.5 bg-primary text-background rounded-full">
                  <Check />{" "}
                </div>
                {k}
              </li>
            )
          )}
        </ul>
      </motion.div>
    </section>
  );
}
