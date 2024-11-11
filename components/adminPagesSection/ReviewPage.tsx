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
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
} from "../ui/alert-dialog";

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
    <Card className="shadow-lg rounded-md">
      <CardHeader className="p-4 border-b">
        <CardTitle className="text-xl font-semibold text-primary">
          Testimoni
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        {/* Search bar */}
        <div className="flex items-center border rounded-md shadow-sm p-2">
          <div className="px-4 text-muted-foreground">
            <Search />
          </div>
          <Input
            placeholder="Cari testimoni..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="border-0 grow"
          />
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredData.map((r: any, i: number) => (
            <Sheet key={i}>
              <SheetTrigger asChild>
                <div
                  className="p-4 space-y-2 hover:bg-muted-light transition duration-300 rounded-md cursor-pointer shadow-sm border"
                  onClick={() => selectReview(r)}
                >
                  <div>
                    <p className="text-lg font-bold text-primary">{r.nama}</p>
                    <p className="text-sm text-muted-foreground">{r.jabatan}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">{r.ulasan}</p>
                    <p className="text-sm font-semibold">{r.rating}/5</p>
                  </div>
                </div>
              </SheetTrigger>
              <SheetContent className="space-y-4 p-6">
                <SheetHeader>
                  <SheetTitle className="text-lg font-bold">
                    Review dari {r.nama}
                  </SheetTitle>
                  <SheetDescription>{r.jabatan}</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div>
                    <label>Review</label>
                    <Textarea
                      value={ulasan}
                      onChange={(e) => setUlasan(e.target.value)}
                      rows={8}
                      className="resize-none border rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label>Rating</label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        className="border rounded-md p-2 flex-grow"
                        value={rating}
                        min={0}
                        max={5}
                        onChange={(e) => setRating(Number(e.target.value))}
                      />
                      <Button
                        onClick={() => rating > 0.5 && setRating(rating - 0.5)}
                        className="p-2 bg-gray-200 rounded-full"
                      >
                        <Minus />
                      </Button>
                      <Button
                        onClick={() => rating <= 4.5 && setRating(rating + 0.5)}
                        className="p-2 bg-gray-200 rounded-full"
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                </div>
                <SheetFooter className="flex justify-between">
                  <Button
                    onClick={updateReview}
                    disabled={!ulasan}
                    className="flex-grow bg-primary text-white"
                  >
                    <Save /> Simpan
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="secondary" className="ml-2">
                        <Trash /> Hapus
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus review ini?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction onClick={() => deleteReview(r.id)}>
                          Hapus
                        </AlertDialogAction>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>

        {/* Add new review button */}
        <Sheet onOpenChange={clearForm}>
          <SheetTrigger asChild>
            <Button className="w-full border-dashed p-4 hover:bg-muted-light transition duration-200">
              <Plus /> Buat Baru
            </Button>
          </SheetTrigger>
          <SheetContent className="space-y-4 p-6">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold">
                Buat Ulasan Baru
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-4">
              <div>
                <label>Nama</label>
                <Input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="border rounded-md p-2"
                />
              </div>
              <div>
                <label>Jabatan</label>
                <Input
                  value={jabatan}
                  onChange={(e) => setjabatan(e.target.value)}
                  className="border rounded-md p-2"
                />
              </div>
              <div>
                <label>Review</label>
                <Textarea
                  value={ulasan}
                  onChange={(e) => setUlasan(e.target.value)}
                  rows={8}
                  className="resize-none border rounded-md p-2"
                />
              </div>
              <div>
                <label>Rating</label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    className="border rounded-md p-2 flex-grow"
                    value={rating}
                    min={0}
                    max={5}
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                  <Button
                    onClick={() => rating > 0.5 && setRating(rating - 0.5)}
                    className="p-2 bg-gray-200 rounded-full"
                  >
                    <Minus />
                  </Button>
                  <Button
                    onClick={() => rating <= 4.5 && setRating(rating + 0.5)}
                    className="p-2 bg-gray-200 rounded-full"
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              <Button
                onClick={AddReview}
                disabled={!nama || !jabatan || !ulasan}
                className="w-full bg-primary text-white hover:bg-primary-dark transition duration-200"
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
