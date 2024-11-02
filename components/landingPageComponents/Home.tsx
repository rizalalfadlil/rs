import { Button } from "../ui/button";

export const Home = ({
  teks1 = "n",
  teks2 = "",
  teks3 = "",
  teksSelengkapnya = "button",
  teksKontak = "button 2",
  urlGambar = "",
}: any) => {
  return (
    <section className="grid md:grid-cols-2 min-h-screen responsive-padding">
      <div className="grid content-center space-y-5">
        <p className="text-xs font-bold text-muted-foreground tracking-widest">
          {teks1}
        </p>
        <p className="font-bold text-4xl text-primary">{teks2}</p>
        <p className="font-medium text-muted-foreground">{teks3}</p>
        <div className="grid md:flex items-center gap-6">
          <Button className="rounded-full">{teksSelengkapnya}</Button>
          <Button variant="outline" className="rounded-full">
            {teksKontak}
          </Button>
        </div>
      </div>
      <div className=" grid place-content-center">
        <img
          src={urlGambar}
          style={{
            maxWidth: "100%",
          }}
        />
      </div>
    </section>
  );
};
