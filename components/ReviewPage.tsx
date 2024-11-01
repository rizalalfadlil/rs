/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Minus, Plus, Save, Search, Trash } from "lucide-react";
import {
  CreateReview,
  DeleteReview,
  GetAllReview,
  SetReview,
} from "@/backend/controler/review";
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

export function ReviewPage({}) {
  const [reviews, setReviews]: any[] = useState([]);

  const [nama, setNama] = useState("");
  const [jabatan, setjabatan] = useState("");
  const [ulasan, setUlasan] = useState("");
  const [rating, setRating] = useState(0);
  const [id, setId] = useState("");
  async function getReviewData() {
    const res: any = await GetAllReview();
    setReviews(res);
    setFilteredData(res);
    clearForm();
  }
  async function AddReview() {
    const data = { nama, jabatan, ulasan, rating };
    await CreateReview(data);
    getReviewData();
    clearForm();
  }
  function clearForm() {
    setNama("");
    setjabatan("");
    setUlasan("");
    setRating(0);
    setId("");
  }
  async function selectReview(data: {
    nama: string;
    jabatan: string;
    ulasan: string;
    rating: any;
    id?: any;
  }) {
    setNama(data.nama);
    setjabatan(data.jabatan);
    setUlasan(data.ulasan);
    setRating(data.rating);
    setId(data.id);
  }
  async function updateReview() {
    const data = { nama, jabatan, ulasan, rating };
    await SetReview(data, id);
    getReviewData();
    window.location.reload();
  }
  async function deleteReview(id: string) {
    DeleteReview(id);
    getReviewData();
  }
  useEffect(() => {
    getReviewData();
  }, []);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk term pencarian
  const [filteredData, setFilteredData] = useState(reviews);

  const handleSearch = (value: string) => {
    setSearchTerm(value); // Mengupdate term pencarian
    setFilteredData(filterData(reviews, value)); // Mengupdate hasil pencarian
  };

  // Fungsi filter untuk mencari berdasarkan semua key
  const filterData = (data: never[], searchTerm: string) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Testimoni</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <div className="grid md:grid-cols-2 gap-2">
          {filteredData.map(
            (
              r: {
                nama: string;
                jabatan: string;
                ulasan: string;
                rating: string | number;
                id: string;
              },
              i: number
            ) => (
              <Sheet key={i}>
                <SheetTrigger asChild>
                  <div
                    className="space-y-2 hover:bg-muted transition-all duration-300 p-4 rounded-md cursor-pointer"
                    onClick={() => selectReview(r)}
                  >
                    <div>
                      <p className=" font-bold">{r.nama}</p>
                      <p className="text-xs">{r.jabatan}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm break-words">{r.ulasan}</p>
                      <p className="font-bold">{r.rating}/5</p>
                    </div>
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Review dari {r.nama}</SheetTitle>
                    <SheetDescription>{r.jabatan}</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div>
                      <label htmlFor="">review</label>
                      <Textarea
                        value={ulasan}
                        onChange={(e) => setUlasan(e.target.value)}
                        rows={8}
                        className="resize-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="">rating</label>
                      <div className="flex gap-2 items-center">
                        <Input
                          type="number"
                          className="grow"
                          value={rating}
                          min={0}
                          max={5}
                          onChange={(e) => setRating(Number(e.target.value))}
                        />
                        <Button
                          onClick={() =>
                            rating > 0.5 && setRating(rating - 0.5)
                          }
                        >
                          <Minus />
                        </Button>
                        <Button
                          onClick={() =>
                            rating <= 4.5 && setRating(rating + 0.5)
                          }
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <SheetFooter className="grid grid-cols-2">
                    <Button
                      onClick={updateReview}
                      disabled={jabatan == "" || ulasan == ""}
                    >
                      <Save /> simpan
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="secondary">
                          <Trash /> hapus
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            konfirmasi hapus data
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            hapus data {r.id} ?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction onClick={() => deleteReview(r.id)}>
                            hapus
                          </AlertDialogAction>
                          <AlertDialogCancel>batal</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            )
          )}
        </div>
        <Sheet onOpenChange={clearForm}>
          <SheetTrigger asChild>
            <Button className="h-auto border-dashed" variant="outline">
              <Plus />
              buat baru
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>buat ulasan</SheetTitle>
            </SheetHeader>
            <div className="space-y-2 py-2">
              <div>
                <label htmlFor="">nama</label>
                <Input value={nama} onChange={(e) => setNama(e.target.value)} />
              </div>
              <div>
                <label htmlFor="">jabatan</label>
                <Input
                  value={jabatan}
                  onChange={(e) => setjabatan(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">review</label>
                <Textarea
                  rows={8}
                  className="resize-none"
                  value={ulasan}
                  onChange={(e) => setUlasan(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">rating</label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    className="grow"
                    value={rating}
                    min={0}
                    max={5}
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                  <Button
                    onClick={() => rating > 0.5 && setRating(rating - 0.5)}
                  >
                    <Minus />
                  </Button>
                  <Button
                    onClick={() => rating <= 4.5 && setRating(rating + 0.5)}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              <Button
                onClick={AddReview}
                disabled={nama == "" || jabatan == "" || ulasan == ""}
                className="w-full"
              >
                Simpan
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
}
