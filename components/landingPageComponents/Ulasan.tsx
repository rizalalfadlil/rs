"use client";
import { GetAllReview } from "@/backend/controler/review";
import React,{ useEffect, useState } from "react";
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
export function Ulasan({}) {
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
    <section className="responsive-padding min-h-screen grid content-center space-y-8">
      <p className="text-3xl font-bold">Ulasan</p>
      <motion.div initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}>
      <Carousel
        plugins={[plugin.current]}
        className="md:w-full max-w-xs md:max-w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {reviews.map((r, index) => (
            <CarouselItem key={index}>
              <div className="p-1 z-0">
                <Card>
                  <CardContent className="p-6 grid gap-6">
                    <p className="text-2xl font-semibold italic">"{r.ulasan}"</p>
                    <p className="text-2xl font-semibold">{r.rating}/5</p>
                    <b className="text-md font-semibold">{r.nama} - {r.jabatan}</b>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      </motion.div>
    </section>
  );
}
