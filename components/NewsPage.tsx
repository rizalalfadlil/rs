import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Pencil, Plus, Trash, Undo2 } from "lucide-react";
import WriteNewsPage from "./newsCreate";
import { DeleteNews, getNewsList } from "@/backend/controler/news";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export default function NewsPage() {
  const [newsData, setNewsData]: any = useState([]);
  const [selectedNews, setSelectedNews] = useState(-1);
  const [writingMode, setWritingMode] = useState(false);

  useEffect(() => {
    getNewsData();
  }, []);
  const getNewsData = async () => {
    setNewsData(await getNewsList());
    setWritingMode(false);
  };
  const deleteNews = async () => {
    await DeleteNews(newsData[selectedNews].id)
    setSelectedNews(-1)
    getNewsData()
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Berita</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedNews >= 0 ? (
            writingMode ? (
              <>
                <div className="w-full flex justify-end">
                  <Button variant="ghost" onClick={() => setWritingMode(false)}>
                    <Undo2 />
                  </Button>
                </div>
                <WriteNewsPage
                  data={newsData[selectedNews]}
                  id={newsData[selectedNews].id}
                  getNewsData={getNewsData}
                />
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Button variant="ghost" onClick={() => setSelectedNews(-1)}>
                      <ArrowLeft />
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => setWritingMode(!writingMode)}
                      variant="ghost"
                    >
                      <Pencil />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost">
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus berita</AlertDialogTitle>
                          <AlertDialogDescription>
                            hapus berita "{newsData[selectedNews].judul}" ?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction onClick={deleteNews}>hapus</AlertDialogAction>
                          <AlertDialogCancel>batal</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <h1 className="text-2xl font-bold">
                  {newsData[selectedNews].judul}
                </h1>
                <div className="flex items-center justify-between text-xs">
                  <p>{newsData[selectedNews].penulis}</p>
                  <p>{newsData[selectedNews].dibuat}</p>
                </div>
                <div
                  className=" w-full h-80 bg-no-repeat bg-center bg-cover rounded-md"
                  style={{
                    backgroundImage: `url("${newsData[selectedNews].gambar}")`,
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: newsData[selectedNews].teks,
                  }}
                />
              </div>
            )
          ) : writingMode ? (
            <>
              <div>
                <Button variant="ghost" onClick={() => setWritingMode(false)}>
                  <Undo2 />
                </Button>
              </div>
              <WriteNewsPage getNewsData={getNewsData} />
            </>
          ) : (
            <div className="space-y-2">
              {newsData.map(
                (
                  n: {
                    judul: string;
                    penulis: string;
                  },
                  i: React.SetStateAction<number>
                ) => (
                  <div
                    className="p-4 hover:bg-muted transition-all duration-300 rounded-md cursor-pointer"
                    onClick={() => setSelectedNews(i)}
                  >
                    <p className="text-sm">
                      <b>{n.judul}</b> - {n.penulis}
                    </p>
                  </div>
                )
              )}
              <Button
                className="border-dashed w-full"
                variant="outline"
                onClick={() => setWritingMode(true)}
              >
                <Plus /> Buat berita baru
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
