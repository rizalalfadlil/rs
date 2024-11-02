"use client";
import { getNewsList } from "@/backend/controler/news";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { Button } from "../ui/button";

export function Berita({}) {
  const [newsData, setNewsData]: any = useState([]);

  const getNewsData = async () => {
    setNewsData(await getNewsList());
  };

  useEffect(() => {
    getNewsData();
  }, []);
  return (
    <section className="responsive-padding min-h-screen grid content-center gap-4">
      <p className="text-3xl font-bold">Blog</p>
      <div className="grid md:grid-cols-3 gap-2">
        {newsData.slice(0,3).map((n: { gambar: any; id: any; judul: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, i: Key | null | undefined) => (
          <div key={i} className="p-4 space-y-2 rounded-md hover:bg-muted transition-all duration-300">
            <div
              className="w-full aspect-square bg-center bg-cover bg-no-repeat rounded-md"
              style={{ backgroundImage: `url("${n.gambar}")` }}
            />
            <a className="font-bold" href={`/news/${n.id}`}>{n.judul}</a>
          </div>
        ))}
      </div>
      <Button variant="link" onClick={()=>window.location.href="/news"}>Lainnya</Button>
    </section>
  );
}
