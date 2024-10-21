"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export function Header({ }) {
  return (
    <header className="bg-muted sticky border-b p-4 w-full top-0 flex items-center justify-between">
      <div>
        <p className="text-xl font-bold">aplikasi</p>
      </div>
      <div className="space-x-2">
        <Button variant="link" onClick={()=>window.location.href = "/"}>Home</Button>
        <Button variant="link" onClick={()=>window.location.href = "/news"}>News</Button>
      </div>
    </header>
  );
}
