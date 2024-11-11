import { info } from "@/app/landingpagedata";
import { Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import { Button } from "../ui/button";

export function Footer({}) {
    return (
      <footer className="bg-primary responsive-padding py-8 text-background">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-4">
            <b>Kontak Kami</b>
            <div className="space-y-2">
              <iframe
                src={info.kontak.GMapLink}
                className="w-full aspect-square rounded-xl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <p>Jalan....</p>
            </div>
            <div className="space-y-2">
              {info.kontak.email && (
                <a
                  href={`mailto:${info.kontak.email}`}
                  className="flex items-center gap-2"
                >
                  <Mail />
                  <span>{info.kontak.email}</span>
                </a>
              )}
              {info.kontak.telepon && (
                <a className="flex items-center gap-2">
                  <Phone />
                  <span>{info.kontak.telepon}</span>
                </a>
              )}
            </div>
          </div>
          <div className="grid gap-4 content-start">
            <b>Sosial Media</b>
            {info.sosial.instagram && (
              <Button variant="ghost" className="justify-start">
                <Instagram />
                {info.sosial.instagram}
              </Button>
            )}
            {info.sosial.facebook && (
              <Button variant="ghost" className="justify-start">
                <Facebook />
                {info.sosial.facebook}
              </Button>
            )}
            {info.sosial.linkedin && (
              <Button variant="ghost" className="justify-start">
                <Linkedin />
                {info.sosial.linkedin}
              </Button>
            )}
          </div>
          <div className="grid gap-4 content-start">
            <b>Atribusi</b>
            <p>
              gambar, ikon dari diambil{" "}
              <a href="https://icons8.com">icons8.com</a>
            </p>
          </div>
        </div>
      </footer>
    );
  }
  