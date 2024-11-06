import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Menangani scroll event
  const handleScroll = () => {
    if (window.scrollY > 300) {
      // Ganti nilai 300 sesuai kebutuhan
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Menggunakan useEffect untuk menambahkan dan menghapus event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fungsi untuk menggulir ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      className={`fixed bottom-5 right-5 transition-all ${
        isVisible ? "" : "opacity-0"
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </Button>
  );
};

export default ScrollToTop;
