"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { completeOrder, getOrdersList } from "@/backend/controler/order";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowLeft, Check } from "lucide-react";
dayjs.locale("id");

interface order {
  id: string;
  namaDepan: string;
  namaBelakang: string;
  telepon: string | number;
  selectedFound: string;
  selectedKota: string;
  selectedLayanan: string;
  selesai: string;
  tanggal: never;
  kondisi: string;
}
export default function OrderPage({ userData }: any) {
  const [data, setData] = useState<any>([]);
  const [selectedOrder, setSelectedOrder] = useState<order | null>();
  const getData = async () => {
    const res = await getOrdersList();
    setData(res);
  };
  useEffect(() => {
    getData();
  }, []);
  const complete = async () => {
    selectedOrder && (await completeOrder(selectedOrder.id, userData.fullName));
    setSelectedOrder(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>list pemesan</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {selectedOrder ? (
            <div className="space-y-4">
              <p className="font-bold">
                pesanan dari{" "}
                {`${selectedOrder.namaDepan} ${selectedOrder.namaBelakang}`} <Badge variant={selectedOrder.selesai !== ""?"default" : "destructive"}>{selectedOrder.selesai !== ""? "selesai" :"belum selesai"}</Badge>
              </p>
              <div className="grid grid-cols-2 gap-y-8">
                <div>
                  <label className="text-xs">nama depan</label>
                  <p className="text-lg font-bold">{selectedOrder.namaDepan}</p>
                </div>
                <div>
                  <label className="text-xs">nama belakang</label>
                  <p className="text-lg font-bold">
                    {selectedOrder.namaBelakang}
                  </p>
                </div>
                <div>
                  <label className="text-xs">kota</label>
                  <p className="text-lg font-bold">
                    {selectedOrder.selectedKota}
                  </p>
                </div>
                <div>
                  <label className="text-xs">layanan</label>
                  <p className="text-lg font-bold">
                    {selectedOrder.selectedLayanan}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="text-xs">kondisi</label>
                  <p className="font-bold border p-2 rounded-md">
                    {selectedOrder.kondisi}
                  </p>
                </div>
                <div>
                  <label className="text-xs">menemukan dari</label>
                  <p className="text-sm text-primary">
                    {selectedOrder.selectedFound}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="secondary"
                  onClick={() => setSelectedOrder(null)}
                >
                  <ArrowLeft />
                  kembali
                </Button>
                <Button
                  disabled={selectedOrder.selesai !== ""}
                  onClick={complete}
                >
                  <Check />
                  selesaikan
                </Button>
              </div>
              <p className="text-end text-xs">
                berinteraksi sebagai {userData.fullName}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>no</TableHead>
                  <TableHead>nama</TableHead>
                  <TableHead>tanggal</TableHead>
                  <TableHead>status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((d: order, i: number) => (
                  <TableRow
                    className="cursor-pointer select-none"
                    onClick={() => setSelectedOrder(d)}
                  >
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{d.namaDepan + " " + d.namaBelakang}</TableCell>
                    <TableCell>
                      {dayjs(d.tanggal).format("DD MMMM YYYY")}
                    </TableCell>
                    <TableCell>
                      {d.selesai !== "" ? (
                        <div className="space-y-2">
                          <Badge>selesai</Badge>
                          <p className="text-sm"> diselesaikan oleh : {d.selesai}</p>
                        </div>
                      ) : (
                        <Badge variant="destructive">belum selesai</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
