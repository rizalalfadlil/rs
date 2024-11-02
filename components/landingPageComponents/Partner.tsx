import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";

export function Partner({
judul,deskripsi,konten}: any) {
    return (
      <section className="responsive-padding min-h-screen bg-primary space-y-20 text-white grid content-center">
        <div>
          <p className="text-3xl font-bold">{judul}</p>
          <p className="md:w-1/2">{deskripsi}</p>
        </div>
        <div className="flex gap-8 flex-wrap justify-center">
          {konten.map((k: { gambar: any; judul: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, i: Key | null | undefined) => (
            <div key={i} className="flex items-center text-xl md:text-[4rem] font-bold gap-4">
              <div
                className="w-20 md:w-32 aspect-square bg-center bg-cover bg-no-repeat invert"
                style={{
                  backgroundImage: `url("${k.gambar}")`,
                }}
              />
              {k.judul}
            </div>
          ))}
        </div>
      </section>
    );
  }