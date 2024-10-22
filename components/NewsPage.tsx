import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Pencil, Plus, Search, Trash, Undo2 } from "lucide-react";
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
import { Input } from "./ui/input";

export default function NewsPage({
  userData,
}: {
  userData: { fullName: string };
}) {
  const [newsData, setNewsData]: any = useState([]);
  const [selectedNews, setSelectedNews] = useState(-1);
  const [writingMode, setWritingMode] = useState(false);

  useEffect(() => {
    getNewsData();
  }, []);
  const getNewsData = async () => {
    setNewsData(await getNewsList());
    setFilteredData(await getNewsList());
    setWritingMode(false);
  };
  const deleteNews = async () => {
    await DeleteNews(newsData[selectedNews].id);
    setSelectedNews(-1);
    getNewsData();
  };
  const [searchTerm, setSearchTerm] = useState(""); // State untuk term pencarian
  const [filteredData, setFilteredData] = useState(newsData);

  const handleSearch = (value: string) => {
    setSearchTerm(value); // Mengupdate term pencarian
    setFilteredData(filterData(newsData, value)); // Mengupdate hasil pencarian
  };

  // Fungsi filter untuk mencari berdasarkan semua key
  const filterData = (data: any[], searchTerm: string) => {
    if (!searchTerm) {
      return data;
    }

    return data.filter((item) =>
      Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
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
                  userData={userData}
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
                          <AlertDialogAction onClick={deleteNews}>
                            hapus
                          </AlertDialogAction>
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
              <WriteNewsPage getNewsData={getNewsData} userData={userData} />
            </>
          ) : (
            <div className="space-y-2">
              <div className="rounded-md border flex items-center">
                  <div className="p-2 px-4 text-muted-foreground">
                    <Search />
                  </div>
                  <Input
                    placeholder="cari"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="border-0 grow"
                  />
                </div>
              {filteredData.map(
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
