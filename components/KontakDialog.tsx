import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { info } from "@/app/landingpagedata";

export default function KontakDialog({ children }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-primary">Informasi Kontak</DialogTitle>
        <div className="grid md:grid-cols-2">
          <div className="space-y-2">
            <div>
              <p className="text-sm px-4">email</p>
              <Button
                variant="ghost"
                className=" font-bold justify-start w-full"
                onClick={() =>
                  (window.location.href = `mailto:${info.kontak.email}`)
                }
              >
                <Mail /> {info.kontak.email}
              </Button>
            </div>
            <div>
              <p className="text-sm px-4">whatsapp</p>
              <Button
                variant="ghost"
                className=" font-bold justify-start w-full"
                onClick={() =>
                  (window.location.href = `https://wa.me/${info.kontak.telepon}`)
                }
              >
                <Phone /> {info.kontak.telepon}
              </Button>
            </div>
          </div>
          <div>
            <p className="text-sm px-4">alamat</p>
            <span className=" justify-start w-full text-sm font-bold">
              <MapPin className="inline" size={16} /> {info.kontak.alamat}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
