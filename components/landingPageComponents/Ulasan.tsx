"use client";
import { GetAllReview } from "@/backend/controler/review";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { User } from "lucide-react";
export function Ulasan({
  judul = "ulasan",
  deskripsi,
}: {
  judul: string;
  deskripsi: string;
}) {
  const [reviews, setReviews] = useState<any>([]);

  useEffect(() => {
    getReviews();
  }, []);
  const getReviews = async () => {
    setReviews(await GetAllReview());
  };
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <section className="responsive-padding min-h-dvh grid content-center space-y-8">
    <div className="space-y-2">
      <p className="text-3xl text-center font-bold text-primary">{judul}</p>
      <p className="md:text-lg font-bold text-muted-foreground text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
        dignissimos cumque ad aut laborum optio nihil animi magni ipsam? Hic
        esse non dolor, minima nemo reiciendis quibusdam ab aspernatur
        dignissimos?
      </p>
    </div>
    <motion.div
      initial={{ opacity: 0, translateY: 100 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      whileInView={{ opacity: 100, translateY: 0 }}
      className="w-full flex justify-center"
    >
      <Carousel
        plugins={[plugin.current]}
        className="max-w-60 md:max-w-md"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {reviews.map(
            (
              r: {
                ulasan: string;
                rating: string | number;
                nama: string;
                jabatan: string;
                foto: string; // URL foto pengguna atau icon
              },
              index: number
            ) => (
              <CarouselItem key={index}>
                <div className="p-4 z-0">
                  <Card className="bg-primary text-background shadow-lg rounded-lg">
                    <CardContent className="p-6 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-center w-full">
                      <p className="italic text-center text-base md:text-lg max-w-sm lg:max-w-md">
                        "{r.ulasan}"
                      </p>
                      <div className="text-sm flex flex-col items-center md:items-end gap-2">
                        {/* Bagian Gambar atau Icon */}
                        <div className="rounded-full overflow-hidden bg-muted w-16 h-16">
                          {r.foto ? (
                            <img src={r.foto} alt={`${r.nama} photo`} className="w-full h-full object-cover" />
                          ) : (
                            <User className=" text-foreground/30 w-full h-full p-2"/>
                          )}
                        </div>
                        <div className="text-center md:text-right">
                          <b>{r.rating}/5</b>
                          <p className="font-semibold">{r.nama}</p>
                          <p className="text-muted-foreground">{r.jabatan}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
      </Carousel>
    </motion.div>
  </section>
  );
}
