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
import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  getUsersList,
  register,
  updateAccount,
} from "@/backend/controler/account";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");
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
    setFilteredData(await getUsersList());
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

  const [searchTerm, setSearchTerm] = useState(""); // State untuk term pencarian
  const [filteredData, setFilteredData] = useState(userExample);

  const handleSearch = (value: string) => {
    setSearchTerm(value); // Mengupdate term pencarian
    setFilteredData(filterData(userExample, value)); // Mengupdate hasil pencarian
  };

  // Fungsi filter untuk mencari berdasarkan semua key
  const filterData = (data: any[], searchTerm: string) => {
    if (!searchTerm) {
      return data;
    }

    return data.filter((item) =>
      Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col gap-6">
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 grow">
      <CardHeader className="border-b p-4">
        <CardTitle className="text-xl font-semibold text-primary">Account Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <div className="flex items-center gap-2 border rounded-md p-2">
          <div className="p-2 text-muted-foreground">
            <Search />
          </div>
          <Input
            placeholder="Cari akun..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="border-0 flex-grow"
          />
        </div>
        
        <Sheet onOpenChange={clearForm}>
          <SheetTrigger asChild>
            <Button
              onClick={createAccount}
              className="flex items-center gap-2 my-4 bg-primary text-white hover:bg-primary-dark transition-all"
            >
              <Plus /> Buat Akun Baru
            </Button>
          </SheetTrigger>
          <SheetContent className="space-y-4 p-6">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold">Buat Akun Baru</SheetTitle>
            </SheetHeader>
            
            {/* Input Form */}
            <div className="space-y-2">
              <label>Nama</label>
              <Input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                maxLength={50}
                className="border rounded-md"
              />
              <p className="text-xs text-muted-foreground">{nama.length} / 50</p>
            </div>
            
            <div className="space-y-2">
              <label>Email</label>
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md"
              />
              <p className={`text-xs ${!isValidEmail(email) ? 'text-red-500' : 'text-muted-foreground'}`}>
                {isValidEmail(email) ? "Valid email" : "Invalid email"}
              </p>
            </div>
            
            <div className="space-y-2">
              <label>Password</label>
              <Input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                maxLength={20}
                className="border rounded-md"
              />
              <p className={`text-xs ${password.length < 8 ? 'text-red-500' : 'text-muted-foreground'}`}>
                {password.length} / 20
              </p>
            </div>
  
            <div className="space-y-2">
              <label>Role</label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="border rounded-md">
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              className="w-full bg-primary text-white hover:bg-primary-dark transition-all"
              onClick={RegisterAccount}
              disabled={nama.length < 1 || !isValidEmail(email) || password.length < 8}
            >
              Register
            </Button>
          </SheetContent>
        </Sheet>
  
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Dibuat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((u: User, i: number) => (
              <Sheet key={i}>
                <SheetTrigger asChild>
                  <TableRow
                    onClick={() => selectAccount(i)}
                    className={`cursor-pointer hover:bg-muted transition-all ${i === index && clicked && 'bg-muted-light'}`}
                  >
                    <TableCell>{u.fullName} <Badge className="ml-2">{u.role}</Badge></TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{dayjs(u.created_at).format("DD MMMM YYYY")}</TableCell>
                  </TableRow>
                </SheetTrigger>
                <SheetContent className="space-y-4 p-6">
                  <SheetHeader>
                    <SheetTitle className="text-lg font-bold">Edit Akun</SheetTitle>
                  </SheetHeader>
                  
                  <div className="space-y-2">
                    <label>Nama</label>
                    <Input
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      maxLength={20}
                      className="border rounded-md"
                    />
                    <p className={`text-xs ${nama.length < 1 ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {nama.length} / 20
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label>Role</label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="border rounded-md">
                        <SelectValue placeholder="Pilih Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
  
                  <Button
                    className="w-full bg-primary text-white hover:bg-primary-dark transition-all"
                    onClick={UpdateAccount}
                    disabled={nama.length < 1}
                  >
                    Simpan
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
