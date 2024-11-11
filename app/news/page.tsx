"use client";
import { getNewsList } from "@/backend/controler/news";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Footer } from "../../components/Footer";
dayjs.locale("id");
export default function News() {
  const [newsData, setNewsData]: any = useState([]);

  const getNewsData = async () => {
    setNewsData(await getNewsList());
  };

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <main className="flex min-h-dvh flex-col">
      <Header />
      <div className="grow p-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          {newsData.map(
            (
              n: {
                gambar: any;
                judul: string;
                penulis: string;
                dibuat: string;
                teks: string;
                id: string;
              },
              i: any
            ) => (
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
            )
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}


