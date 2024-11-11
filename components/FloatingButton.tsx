/* eslint-disable react/jsx-key */
"use client";
import { ArrowUp, LayoutGrid, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function FloatingButton({}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-0 right-0 responsive-padding">
      <div className={`p-4 grid gap-4  rounded-xl justify-items-end `}>
        {open && <Collapsible />}
        <Button
          className="aspect-square rounded-full bg-background"
          variant="outline"
          onClick={() => setOpen(!open)}
        >
          {!open ? <LayoutGrid /> : <X />}
        </Button>
      </div>
    </div>
  );
}

function Collapsible({}) {
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);
  return (
    <div
      className={`grid gap-4 transition-all rounded-xl bg-background shadow-sm border p-4 duration-300 ${
        rendered ? "scale-100" : "scale-0"
      }`}
    >
      <Button className="rounded-full" onClick={() => (window.location.href = "#footer")}>
        <Phone /> kontak kami
      </Button>
      <Button
        className="rounded-full"
        variant="secondary"
        onClick={() => (window.location.href = "#section-1")}
      >
        <ArrowUp /> Kembali ke atas
      </Button>
    </div>
  );
}
