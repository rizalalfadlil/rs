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
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
        <p className="text-lg font-bold text-muted-foreground">
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
          className="max-w-72 md:max-w-md xl:max-w-full"
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
                },
                index: number
              ) => (
                <CarouselItem key={index}>
                  <div className="p-1 z-0">
                    <Card className="bg-primary text-background">
                      <CardContent className="p-6 flex flex-col md:flex-row-reverse gap-8 xl:min-h-80 content-center">
                        <p className=" italic place-self-center">
                          "{r.ulasan}"
                        </p>
                        <div className="text-sm place-self-end md:min-w-20">
                          <b className="">{r.rating}/5</b>
                          <p className="">{r.nama}</p>
                          <p>{r.jabatan}</p>
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
