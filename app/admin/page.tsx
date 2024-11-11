/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, menuList } from "../../components/Sidebar";
import { AccountList } from "../../components/adminPagesSection/AccountList";
import { ReviewPage } from "../../components/adminPagesSection/ReviewPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DoorOpen, Newspaper, Star, User } from "lucide-react";
import NewsPage from "@/components/adminPagesSection/NewsPage";
import ConsoleToaster from "@/components/ConsoleToaster";
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
import GalleryPage from "@/components/adminPagesSection/GalleryPage";
import OrderPage from "@/components/adminPagesSection/OrderPage";

export default function Page() {
  const [Page, setPage] = useState("akun");
  const [userData, setUserData]: any = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pagesList: any = {
    akun: <AccountList />,
    review: <ReviewPage />,
    berita: <NewsPage userData={userData} />,
    galeri:<GalleryPage/>,
    order:<OrderPage userData={userData}/>
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
    <div className="flex w-full min-h-dvh">
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
                  {menuList.map((m,i)=>(
                    <p className="p-4 flex gap-4 items-center font-medium justify-center hover:bg-muted rounded-md cursor-pointer" onClick={()=>setPage(m.target)}>
                    {m.icon} {m.text}
                  </p>
                  ))}
                </Card>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-500">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
          <div className="p-10 border-b-2 border-gray-100 flex flex-col items-center">
            <img src="logo.png" alt="Admin Login" className="w-20 h-20 mb-6 rounded-full shadow-lg" />
            <p className="text-gray-700 text-2xl font-semibold">Admin Login</p>
          </div>
          <div className="p-10 space-y-10">
            <div>
              <label className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition duration-200"
              />
            </div>
            <button
              className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 transform hover:-translate-y-1"
              onClick={LoginAction}
            >
              Log in
            </button>
            <p className="text-center text-base text-gray-500 mt-6">
              Belum punya akun? <a href="#" className="text-blue-500 hover:underline">Daftar sekarang</a>
            </p>
          </div>
        </div>
      </div>             
      )}
      <ConsoleToaster />
    </div>
  );
}
