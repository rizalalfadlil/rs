"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  SheetTrigger,
} from "./ui/sheet";
import {
  getUsersList,
  register,
  updateAccount,
} from "@/backend/controler/account";

interface User {
  fullName: string;
  email: string;
  password: string;
  created_at: string;
  id: string;
  role: string;
}
export function AccountList() {
  const [userExample, setUserExample]: Array<User> | any = useState([]);

  const [clicked, setclicked] = useState(false);
  const [index, setindex] = useState(0);

  const selectAccount = (i: number) => {
    setNama(userExample[i]?.fullName);
    setEmail(userExample[index]?.email);
    setRole(userExample[i]?.role);
    setclicked(true);
    setindex(i);
  };
  const createAccount = () => {
    setclicked(true);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    setUserExample(await getUsersList());
  };
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const clearForm = () => {
    setNama("");
    setEmail("");
    setPassword("");
    setRole("user");
  };
  const RegisterAccount = async () => {
    await register(email, password, nama, role);
    clearForm();
    getUsers();
  };

  function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const UpdateAccount = async () => {
    const data = { fullName: nama, role, email, created_at: Date.now() };
    await updateAccount(data, userExample[index].id);
    getUsers();
    clearForm();
  };
  return (
    <div className="flex gap-4">
      <Card className="grow">
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Sheet onOpenChange={clearForm}>
            <SheetTrigger asChild>
              <Button
                onClick={createAccount}
                className="flex items-center gap-2 my-4"
              >
                <Plus /> Buat akun baru
              </Button>
            </SheetTrigger>
            <SheetContent className="space-y-4">
              <SheetHeader>
                <SheetTitle>buat akun baru</SheetTitle>
              </SheetHeader>
              <div>
                <label>nama</label>
                <Input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">
                  ({nama.length} / 50)
                </p>
              </div>
              <div>
                <label>email</label>
                <Input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className={`text-xs ${!isValidEmail(email) && 'text-red-500'}`}>({isValidEmail(email)?"valid email":"invalid email"})</p>
              </div>
              <div>
                <label>password</label>
                <Input
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={20}
                />
                <p
                  className={`text-xs text-muted-foreground ${
                    password.length < 8 && "text-red-500"
                  }`}
                >
                  ({password.length < 8 ? `8 / ${password.length}` : `${password.length} / 20`})
                </p>
              </div>

              <div>
                <label>role</label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={RegisterAccount} disabled={nama.length < 1 || !isValidEmail(email) || password.length < 8}>
                Register
              </Button>
            </SheetContent>
          </Sheet>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>nama</TableHead>
                <TableHead>email</TableHead>
                <TableHead>dibuat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userExample.map((u: User, i: number) => (
                <Sheet>
                  <SheetTrigger asChild>
                    <TableRow
                      key={i}
                      onClick={() => selectAccount(i)}
                      className={`${
                        i === index && clicked && "bg-muted"
                      } cursor-pointer`}
                    >
                      <TableCell>
                        {u.fullName} <Badge>{u.role}</Badge>
                      </TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.created_at}</TableCell>
                    </TableRow>
                  </SheetTrigger>
                  <SheetContent className="space-y-4">
                    <SheetHeader>
                      <SheetTitle>edit akun</SheetTitle>
                    </SheetHeader>
                    <div>
                      <label>nama</label>
                      <Input
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>role</label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={UpdateAccount}>
                      simpan
                    </Button>
                  </SheetContent>
                </Sheet>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
