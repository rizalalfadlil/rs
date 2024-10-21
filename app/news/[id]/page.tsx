"use client";
import { getOneNews } from "@/backend/controler/news";
import { Header } from "@/components/Header";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "dayjs/locale/id";
dayjs.locale("id");
export default function page({ params }: any) {
  const [news, setnews]: any = useState();
  const getNews = async () => {
    setnews(await getOneNews(params.id));
  };
  useEffect(() => {
    getNews();
  }, []);
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="grow md:px-40 xl:px-80">
        {news ? (
          <div className="p-4 space-y-8">
            <p className="text-2xl font-bold">{news.judul}</p>
            <div
              className="bg-contain border rounded-md bg-no-repeat bg-center w-full h-40"
              style={{ backgroundImage: `url("${news.gambar}")` }}
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>{news.penulis}</p>
              <p>{dayjs(news.dibuat).format("DD MMMM YYYY")}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: news.teks }} />
          </div>
        ) : (
          "error"
        )}
      </div>
    </main>
  );
}
