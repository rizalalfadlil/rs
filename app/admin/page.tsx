/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { AccountList } from "../../components/AccountList";
import { ReviewPage } from "../../components/ReviewPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DoorOpen, Newspaper, Star, User } from "lucide-react";
import NewsPage from "@/components/NewsPage";
import ConsoleToaster from "@/components/ConsoleToaster";
import { Input } from "@/components/ui/input";
import { getUserData, login, logout } from "@/backend/controler/account";
import { auth } from "@/backend/firebase"; // Impor auth dari Firebase
import { onAuthStateChanged } from "firebase/auth"; // Impor untuk mendeteksi perubahan status autentikasi
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Page() {
  const [Page, setPage] = useState("akun");
  const [userData, setUserData]: any = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pagesList: any = {
    akun: <AccountList />,
    review: <ReviewPage />,
    berita: <NewsPage userData={userData} />,
  };

  interface User {
    fullName: string;
    email: string;
    password: string;
    created_at: string;
    id: string;
    role: string;
  }
  // Menggunakan onAuthStateChanged untuk mendeteksi login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUserData(); // Ambil data pengguna dari Firestore
        setUserData(data);
      } else {
        setUserData(null); // Set ke null jika tidak ada user yang login
      }
    });

    return () => unsubscribe(); // Membersihkan listener saat komponen unmount
  }, []);

  const LoginAction = async () => {
    await login(email, password);
    clearForm();
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex w-full min-h-screen">
      {userData ? (
        <>
          <Sidebar page={Page} setPage={setPage} />
          <div className="bg-muted grow p-4 space-y-4 overflow-y-scroll h-screen flex flex-col">
            <Card className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm">hello</p>
                <p className="text-2xl font-semibold">
                  {userData.fullName || "user"}
                </p>
              </div>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost">
                      <DoorOpen /> Log-out
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Yakin ingin log out ?</AlertDialogTitle>
                    <AlertDialogFooter>
                      <AlertDialogAction onClick={logout}>
                        log out
                      </AlertDialogAction>
                      <AlertDialogCancel>batal</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
            {pagesList[Page] ? (
              pagesList[Page]
            ) : (
              <div className="space-y-4">
                <p className="font-semibold text-xl">Halaman Utama</p>
                <Card className="grid sm:grid-cols-3 p-4 h-40">
                <p className="p-4 flex gap-4 items-center font-medium justify-center hover:bg-muted rounded-md cursor-pointer" onClick={()=>setPage("akun")}>
                  <User/> Akun
                </p>
                <p className="p-4 flex gap-4 items-center font-medium justify-center hover:bg-muted rounded-md cursor-pointer" onClick={()=>setPage("review")}>
                  <Newspaper/> Berita
                </p>
                <p className="p-4 flex gap-4 items-center font-medium justify-center hover:bg-muted rounded-md cursor-pointer" onClick={()=>setPage("berita")}>
                  <Star/> Testimoni
                </p>
                </Card>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-white">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 border-b-2 border-gray-100 flex flex-col items-center">
            <img src="logo.png" alt="Admin Login" className="w-16 h-16 mb-2" />
            <p className="text-gray-600 mt-2 text-center">Admin Login</p>
          </div>
          <div className="p-8 space-y-8">
  <div>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <Input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full mt-2 p-3 border rounded-lg shadow-sm transition duration-200 ease-in-out hover:shadow-md focus:shadow-lg focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Password</label>
    <Input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full mt-2 p-3 border rounded-lg shadow-sm transition duration-200 ease-in-out hover:shadow-md focus:shadow-lg focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
    />
  </div>
  <Button
    className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
    onClick={LoginAction}
  >
    Log in
  </Button>
</div>

        </div>
      </div>     
      )}
      <ConsoleToaster />
    </div>
  );
}
