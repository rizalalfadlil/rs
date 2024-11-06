"use client";
import { getNewsList, getOneNews } from "@/backend/controler/news";
import { Header } from "@/components/Header";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "dayjs/locale/id";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
dayjs.locale("id");
interface news {
  gambar: any;
  judul: string;
  penulis: string;
  dibuat: string;
  teks: string;
  id: string;
}
export default function page({ params }: any) {
  const [news, setnews]: news | any = useState();
  const [newsList, setnewsList]: any = useState([]);
  const getNews = async () => {
    setnews(await getOneNews(params.id));
    setnewsList(await getNewsList());
  };
  useEffect(() => {
    getNews();
  }, []);

  const randomNews = (array: Array<news>, count: number) => {
    if (count < array.length) {
      return array.slice(0, 3);
    } else {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  };

  return (
    <main className="flex min-h-dvh flex-col">
      <Header />
      <div className="grow md:px-40 xl:px-80">
        {news ? (
          <div className="p-4 space-y-8">
            <Button
              variant="secondary"
              onClick={() => (window.location.href = "/news")}
            >
              <ArrowLeft />
              Kembali
            </Button>
            <p className="text-2xl font-bold">{news.judul}</p>
            <div
              className="bg-cover border rounded-md bg-no-repeat bg-center w-full h-40"
              style={{ backgroundImage: `url("${news.gambar}")` }}
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>{news.penulis}</p>
              <p>{dayjs(news.dibuat).format("DD MMMM YYYY")}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: news.teks }} />

            <div className="bg-muted text-muted-foreground border p-4 rounded-md space-y-4">
              <p>baca juga</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {randomNews(newsList, 3).map((n: news,i:number) => (
                  <Card
                  key={i}
                    className="hover:bg-muted cursor-pointer transition-color duration-300"
                    onClick={() => (window.location.href = `/news/${n.id}`)}
                  >
                    <CardHeader>
                      <div
                        style={{ backgroundImage: `url("${n.gambar}")` }}
                        className="w-full bg-center bg-cover bg-no-repeat aspect-video rounded-t-lg"
                      ></div>
                      <p className="font-bold">{n.judul}</p>
                      <div className="lg:flex items-center justify-between text-muted-foreground text-xs">
                        <div>{n.penulis}</div>
                        <div>{dayjs(n.dibuat).format("DD MMMM YYYY")}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: n.teks.slice(0, 100) + "...",
                        }}
                        className="text-sm"
                      />
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="p-0">
                        baca selengkapnya
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          "memuat"
        )}
      </div>
    </main>
  );
}
