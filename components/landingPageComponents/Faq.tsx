import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
export function Faq({ konten }: { konten: { q: string; a: string }[] }) {
  return (
    <section className="responsive-padding min-h-dvh grid content-center md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
        className="text-lg space-y-4 grid content-center"
      >
        <p className="text-3xl font-bold text-primary">FAQ</p>
        <p className="text-lg font-bold text-muted-foreground">
          pertanyaan yang sering diajukan
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileInView={{ opacity: 100, translateY: 0 }}
      >
        <Accordion type="single">
          {konten.map((k, i) => (
            <AccordionItem value={`q-${i + 1}`} key={i}>
              <AccordionTrigger>{k.q}</AccordionTrigger>
              <AccordionContent>{k.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
