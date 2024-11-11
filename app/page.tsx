/* eslint-disable react/jsx-key */
"use client";

import { Header } from "@/components/landingPageComponents/Header";
import { FloatingButton } from "../components/FloatingButton";
import { info, sections } from "./landingpagedata";
import { Footer } from "@/components/Footer";


export default function LandingPage() {
  return (
    <div>
      <Header sections={sections} logo={info.logo} />
      <main className="pt-40 md:pt-0">
        {sections.map((s, i) => (
          <div key={i} id={`section-${i + 1}`}>
            {s}
          </div>
        ))}
      </main>
      <FloatingButton />
      <Footer />
    </div>
  );
}