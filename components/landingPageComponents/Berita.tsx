"use client";
import { getNewsList } from "@/backend/controler/news";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {motion} from "framer-motion"
export function Berita({}) {
  const [newsData, setNewsData]: any = useState([]);

  const getNewsData = async () => {
    setNewsData(await getNewsList());
  };

  useEffect(() => {
    getNewsData();
  }, []);
  return (
    <section className="responsive-padding min-h-dvh grid content-center gap-4">
      <p className="text-3xl text-center font-bold text-primary">Blog</p>
      <motion.div initial={{ opacity: 0, translateY:100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          whileInView={{ opacity: 100, translateY:0 }} className="grid md:grid-cols-3 2xl:grid-cols-4 gap-2">
        {newsData.slice(0,3).map((n: { gambar: any; id: any; judul: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, i: Key | null | undefined) => (
          <div key={i} className="p-4 space-y-2 rounded-md hover:bg-muted transition-all duration-300">
            <div
              className="w-full aspect-square bg-center bg-cover bg-no-repeat rounded-md"
              style={{ backgroundImage: `url("${n.gambar}")` }}
            />
            <a className="font-bold" href={`/news/${n.id}`}>{n.judul}</a>
          </div>
        ))}
      </motion.div>
      <Button variant="link" onClick={()=>window.location.href="/news"}>Lainnya</Button>
    </section>
  );
}
