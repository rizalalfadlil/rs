import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq({ konten }: { konten: { q: string; a: string }[] }) {
  return (
    <section className="responsive-padding min-h-screen grid content-center md:grid-cols-2">
      <div className="text-lg space-y-4 grid content-center">
        <p className="text-3xl font-bold text-primary">FAQ</p>
        <p>pertanyaan yang sering diajukan</p>
      </div>
      <div>
        <Accordion type="single">
          {konten.map((k, i) => (
            <AccordionItem value={`q-${i+1}`} key={i}>
              <AccordionTrigger>{k.q}</AccordionTrigger>
              <AccordionContent>{k.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
