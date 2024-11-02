import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Header({ sections, logo }: any) {
  const navs = sections.map((s, i) => {
    const name = s.type.DisplayName || s.type.name;
    return (
      <a
        href={`#section-${i + 1}`}
        key={i}
        className=" text-primary hover:font-bold"
      >
        {name.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()}
      </a>
    );
  });
  const dropNavs = sections.map((s, i) => {
    const name = s.type.DisplayName || s.type.name;
    return (
      <DropdownMenuItem
        key={i}
        onClick={() => (window.location.href = `#section-${i + 1}`)}
        className=" text-primary hover:font-bold"
      >
        {name.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()}
      </DropdownMenuItem>
    );
  });
  return (
    <header className="fixed responsive-padding pt-8 w-full ">
      <div className="rounded-full p-4 z-80 px-8 border backdrop-blur-sm bg-background/70 flex justify-between">
        <div
          className="h-10 aspect-square bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url("${logo}")` }}
        />
        <div className="hidden md:flex items-center gap-2 text-sm">
          {navs.slice(0, 3)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="rounded-full">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dropNavs.slice(3, dropNavs.length)}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex md:hidden items-center gap-2 text-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="rounded-full">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>{dropNavs}</DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
