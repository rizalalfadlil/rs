import { Flag, Newspaper, Star, User } from "lucide-react";
import React from "react";
export function Sidebar({ page, setPage }: any) {
  const menuList = [
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
      target: "banner",
      icon: <Flag />,
      text: "banner",
    },
  ];
  const MenuItem = ({ target, icon, text }: any) => {
    return (
      <div
        className={`hover:bg-muted ${
          page == target && "bg-muted"
        } capitalize cursor-pointer rounded-md font-bold transition-all duration-300 p-2 px-4 flex items-center gap-6`}
        onClick={()=>setPage(target)}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </div>
    );
  };
  return (
    <aside className="border flex flex-col xl:min-w-80">
      <div>
        <p className="text-2xl p-4 font-bold">App title</p>
      </div>
      <div className="grow space-y-2 text-sm p-2">
        {menuList.map((m, i) => (
          <MenuItem
            target={m.target}
            icon={m.icon}
            text={m.text}
          />
        ))}
      </div>
    </aside>
  );
}
