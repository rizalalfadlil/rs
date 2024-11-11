import { Home, Images, LayoutList, Newspaper, Star, User } from "lucide-react";
import React from "react";
export const menuList = [
  {
    target: "beranda",
    icon: <Home />,
    text: "beranda",
  },
  {
    target: "berita",
    icon: <Newspaper />,
    text: "berita",
  },
  {
    target: "review",
    icon: <Star />,
    text: "review",
  },
  {
    target: "akun",
    icon: <User />,
    text: "akun",
  },
  {
    target: "galeri",
    icon: <Images />,
    text: "galeri",
  },
  {
    target: "order",
    icon: <LayoutList />,
    text: "Pesan",
  },
];
export function Sidebar({ page, setPage }: any) {

  const MenuItem = ({ target, icon, text }: any) => {
    return (
      <div
        className={` ${
          page == target ? "bg-muted text-blue-700" : "hover:bg-muted/10"
        } capitalize cursor-pointer rounded-md font-bold transition-all duration-300 p-4 flex items-center gap-6`}
        onClick={() => setPage(target)}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </div>
    );
  };
  return (
    <aside
      className="w-80 min-h-screen text-white flex flex-col shadow-lg"
      style={{ background: "#3749A6" }}
    >
      <div className="flex items-center p-6 space-x-4">
        <div className="bg-white p-2 rounded-lg shadow-lg">
          <img src="logo.png" alt="Logo" className="w-10 h-10" />
        </div>
        <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-pink-500 text-transparent bg-clip-text">
          Paramedika
        </p>
      </div>
      <div className="grow space-y-3 text-lg p-4">
        {menuList.map((m, i) => (
          <MenuItem
            key={i}
            target={m.target}
            icon={m.icon}
            text={m.text}
            className="hover:bg-blue-700 transition duration-300 ease-in-out p-3 rounded-lg"
          />
        ))}
      </div>
    </aside>
  );
}
