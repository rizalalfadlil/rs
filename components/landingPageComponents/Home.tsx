import KontakDialog from "../KontakDialog";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
export const Home = ({
  teks1 = "n",
  teks2 = "",
  teks3 = "",
  teksSelengkapnya = "button",
  teksKontak = "button 2",
  urlGambar = "",
}: any) => {
  return (
    <section className="grid md:grid-cols-2 min-h-dvh responsive-padding">
      <div className="grid content-center space-y-5">
        <motion.p
          initial={{ opacity: 0, translateY: 100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          whileInView={{ opacity: 100, translateY: 0 }}
          className="text-xs font-bold text-muted-foreground tracking-widest"
        >
          {teks1}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, translateY: 100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          whileInView={{ opacity: 100, translateY: 0 }}
          className="font-bold text-4xl text-primary"
        >
          {teks2}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, translateY: 100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          whileInView={{ opacity: 100, translateY: 0 }}
          className="font-medium text-muted-foreground"
        >
          {teks3}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, translateY: 100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          whileInView={{ opacity: 100, translateY: 0 }}
          className="grid md:flex items-center gap-6"
        >
          <Button
            className="rounded-full"
            onClick={() => (window.location.href = "#section-2")}
          >
            {teksSelengkapnya}
          </Button>
          <KontakDialog>
            <Button variant="outline" className="rounded-full">
              {teksKontak}
            </Button>
          </KontakDialog>
        </motion.div>
      </div>
      <div className=" grid place-content-center">
        <motion.img
          initial={{ opacity: 0, translateY: 100 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          whileInView={{ opacity: 100, translateY: 0 }}
          src={urlGambar}
          style={{
            maxWidth: "100%",
          }}
        />
      </div>
    </section>
  );
};
