"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CreateOrder } from "@/backend/controler/order";

export default function KontakSheet({ children }: any) {
  const kota = [
    "jakarta",
    "bogor",
    "depok",
    "tangerang/tangsel",
    "bekasi",
    "lainnya",
  ];
  const layanan = [
    "perawatan",
    "caregiver",
    "Fisioterapi/Terapi Wacara/Okupasi",
    "dokter home visit",
    "bidan",
    "alat kesehatan",
    "psikiater/Psikolog",
  ];
  const found = ["teman atau kenalan", "sosial media", "searching di interten"];

  const [namaDepan, setNamaDepan] = useState<string>("");
  const [namaBelakang, setNamaBelakang] = useState<string>("");
  const [telepon, setTelepon] = useState<string | number>(0);
  const [selectedKota, setSelectedKota] = useState("");
  const [selectedLayanan, setSelectedLayanan] = useState("");
  const [selectedFound, setSelectedFound] = useState("");
  const [kondisi, setKondisi] = useState("");
  const submit = async () => {
    const data = {
      namaDepan,
      namaBelakang,
      telepon,
      selectedKota,
      selectedLayanan,
      selectedFound,
      kondisi,
      tanggal: new Date(),
      selesai: false,
    };
    console.log(data);
    try {
      const res = await CreateOrder(data);
      window.location.href = `/result/${res}`
    } catch (e) {
      console.error(e);
    }
    clearForm();
  };

  const clearForm = () => {
    setNamaDepan("");
    setNamaBelakang("");
    setTelepon(0);
    setSelectedKota("");
    setSelectedLayanan("");
    setKondisi("");
    setSelectedFound("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetTitle className="text-primary">Informasi Kontak</SheetTitle>
        <div className="space-y-6 capitalize md:p-4">
          <b>nama pasien</b>
          <div className="gap-4 grid">
            <div className="space-y-2">
              <b>nama depan</b>
              <Input
                value={namaDepan}
                onChange={(e) => setNamaDepan(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <b>nama belakang</b>
              <Input
                value={namaBelakang}
                onChange={(e) => setNamaBelakang(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <b>no telepon</b>
            <Input
              type="number"
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
            />
          </div>
          <hr />
          <div className="space-y-2">
            <b>kota</b>
            <RadioGroup value={selectedKota} onValueChange={setSelectedKota}>
              {kota.map((k, i) => (
                <div className="flex items-center gap-2">
                  <RadioGroupItem value={k} id={k} />
                  <label htmlFor={k}>{k}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <b>layanan perawatan homecare</b>
            <RadioGroup
              value={selectedLayanan}
              onValueChange={setSelectedLayanan}
            >
              {layanan.map((l, i) => (
                <div className="flex items-center gap-2">
                  <RadioGroupItem value={l} id={l} />
                  <label htmlFor={l}>{l}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <b>darimana anda mengetahui homecare</b>
            <Select value={selectedFound} onValueChange={setSelectedFound}>
              <SelectTrigger>
                <SelectValue placeholder="pilih" />
              </SelectTrigger>
              <SelectContent>
                {found.map((m, i) => (
                  <SelectItem value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <b>Kondisi pasien</b>
            <p>jelaskan kondisi pasien secara singkat</p>
            <Textarea value={kondisi} onChange={(e)=>setKondisi(e.target.value)} />
          </div>
          <Button
            className="w-full"
            onClick={submit}
            disabled={
              namaDepan === "" ||
              namaBelakang === "" ||
              telepon === 0 ||
              selectedKota === "" ||
              selectedLayanan === "" ||
              selectedFound === "" ||
              kondisi === ""
            }
          >
            Kirim
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
