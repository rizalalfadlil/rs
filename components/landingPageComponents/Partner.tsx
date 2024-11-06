import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";
import { motion } from "framer-motion";
export function Partner({ judul, deskripsi, konten }: any) {
  return (
    <section className="responsive-padding min-h-dvh bg-primary space-y-20 text-white grid content-center">
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
      >
        <p className="text-3xl font-bold">{judul}</p>
        <p className="md:w-1/2">{deskripsi}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="flex gap-8 flex-wrap justify-center"
      >
        {konten.map(
          (
            k: {
              gambar: any;
              judul:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<AwaitedReactNode>
                | null
                | undefined;
            },
            i: Key | null | undefined
          ) => (
            <div
              key={i}
              className="flex items-center text-xl md:text-[4rem] font-bold gap-4"
            >
              <div
                className="w-20 md:w-32 aspect-square bg-center bg-cover bg-no-repeat invert"
                style={{
                  backgroundImage: `url("${k.gambar}")`,
                }}
              />
              {k.judul}
            </div>
          )
        )}
      </motion.div>
    </section>
  );
}
