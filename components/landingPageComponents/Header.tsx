import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Header({ sections, logo }: any) {
  const navs = sections.map((s:any, i:number) => {
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
  const dropNavs = sections.map((s:any, i:number) => {
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
    <header className="fixed top-8 w-full z-50 responsive-padding">
  <div className="rounded-full p-4 px-8 border shadow-lg backdrop-blur-md bg-white/80 flex justify-between items-center transition-all duration-300">
  
    {/* Logo */}
    <div className="flex items-center gap-2">
  {/* Logo */}
  <div
    className="h-10 w-10 bg-contain bg-no-repeat bg-center rounded-full shadow-sm transition-transform duration-300 transform hover:scale-105"
    style={{ backgroundImage: `url("${logo}")` }}
  />
  {/* Text */}
  <p className="text-gray-800 font-semibold text-lg">ParamedikaHomecare</p>
</div>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center gap-4 text-sm text-gray-700 font-medium">
      {navs.slice(0, 3)}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="rounded-full p-2 hover:bg-gray-100 transition duration-300">
            <Menu className="text-lg text-gray-700" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-gray-700">
          {dropNavs.slice(3)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    {/* Mobile Navigation */}
    <div className="flex md:hidden items-center gap-2 text-sm">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="rounded-full p-2 hover:bg-gray-100 transition duration-300">
            <Menu className="text-xl text-gray-700" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-gray-700">
          {dropNavs}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</header>
  );
}
