"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function AccountList() {
  const [userExample, setUserExample] = useState([
    {
      name: "Ahmad Yusuf",
      email: "ahmad.yusuf@example.com",
      role: "admin",
      created: "2023-05-01",
    },
    {
      name: "Siti Nurhaliza",
      email: "siti.nurhaliza@example.com",
      role: "user",
      created: "2023-06-15",
    },
    {
      name: "Budi Santoso",
      email: "budi.santoso@example.com",
      role: "moderator",
      created: "2023-04-22",
    },
    {
      name: "Dewi Anggraini",
      email: "dewi.anggraini@example.com",
      role: "user",
      created: "2023-07-08",
    },
    {
      name: "Indra Wijaya",
      email: "indra.wijaya@example.com",
      role: "admin",
      created: "2023-03-12",
    },
    {
      name: "Lina Hartati",
      email: "lina.hartati@example.com",
      role: "user",
      created: "2023-08-05",
    },
    {
      name: "Rizky Pratama",
      email: "rizky.pratama@example.com",
      role: "moderator",
      created: "2023-09-21",
    },
    {
      name: "Putri Maharani",
      email: "putri.maharani@example.com",
      role: "user",
      created: "2023-02-27",
    },
    {
      name: "Agus Saputra",
      email: "agus.saputra@example.com",
      role: "admin",
      created: "2023-01-10",
    },
    {
      name: "Tina Novita",
      email: "tina.novita@example.com",
      role: "user",
      created: "2023-04-30",
    },
  ]);

  const [clicked, setclicked] = useState(false);
  const [index, setindex] = useState(0);
  const [editMode, seteditMode] = useState(false);

  const selectAccount = (i: number) => {
    setclicked(true);
    setindex(i);
    seteditMode(false)
  };
  const createAccount = () => { 
    seteditMode(true)
    setclicked(true)
   }
  function InfoSheet() {
    function EditForm({}) {
      return (
        <form action="" className="space-y-4">
          <div className="">
            <label>name</label>
            <Input value={userExample[index].name} />
          </div>
          <div className="">
            <label>email</label>
            <Input value={userExample[index].email} />
          </div>
          <div className="">
            <label>role</label>
            <Select value={userExample[index].role}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">user</SelectItem>
                <SelectItem value="admin">admin</SelectItem>
                <SelectItem value="moderator">moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      );
    }
    function RegisterForm({}) {
      return (
        <form action="" className="space-y-4">
          <div className="">
            <label>name</label>
            <Input />
          </div>
          <div className="">
            <label>email</label>
            <Input/>
          </div>
          <div className="">
            <label>role</label>
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">user</SelectItem>
                <SelectItem value="admin">admin</SelectItem>
                <SelectItem value="moderator">moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <label>password</label>
            <Input type="password"/>
          </div>
        </form>
      );
    }
    return (
      <Sheet open={clicked} onOpenChange={setclicked}>
        <SheetContent>
          <div className="space-y-4">
            {!editMode?(<EditForm/>):(<RegisterForm/>)}
          </div>
          <SheetFooter className="grid grid-cols-2 gap-2 py-2">
            <Button>Simpan</Button>
            <Button variant="secondary">Hapus</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <div className="flex gap-4">
      <Card className="grow">
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={createAccount} className="flex items-center gap-2 my-4">
            <Plus /> Buat akun baru
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>nama</TableHead>
                <TableHead>email</TableHead>
                <TableHead>dibuat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userExample.map((u, i) => (
                <TableRow
                  key={i}
                  onClick={() => selectAccount(i)}
                  className={`${
                    i === index && clicked && "bg-muted"
                  } cursor-pointer`}
                >
                  <TableCell>
                    {u.name} <Badge>{u.role}</Badge>
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <InfoSheet />
    </div>
  );
}
