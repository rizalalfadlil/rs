"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { AccountList } from "../../components/AccountList";
import { ReviewPage } from "../../components/ReviewPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";
import NewsPage from "@/components/NewsPage";
import ConsoleToaster from "@/components/ConsoleToaster";
import { Input } from "@/components/ui/input";
import { getUserData, login, logout } from "@/backend/controler/account";
import { auth } from "@/backend/firebase"; // Impor auth dari Firebase
import { onAuthStateChanged } from "firebase/auth"; // Impor untuk mendeteksi perubahan status autentikasi
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function Page() {
  const [Page, setPage] = useState("akun");
  const pagesList: any = {
    akun: <AccountList />,
    review: <ReviewPage />,
    berita: <NewsPage />,
  };
  const [userData, setUserData]:any = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <div className="bg-muted grow p-4 space-y-4 overflow-y-scroll h-screen">
            <Card className="flex items-center justify-between p-4">
              <div>
                <p>hello, {userData.fullName || "user"}</p>
              </div>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                  <Button variant="ghost">
                  <DoorOpen />
                </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Yakin ingin log out ?</AlertDialogTitle>
                    <AlertDialogFooter>
                      <AlertDialogAction onClick={logout}>log out</AlertDialogAction>
                      <AlertDialogCancel>batal</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
            {pagesList[Page]}
          </div>
        </>
      ) : (
        <div className="w-full grid sm:grid-cols-2 bg-muted">
          <div className="p-8 xl:px-20 bg-background border grid content-center">
            <div className="space-y-4">
              <p className="text-2xl font-bold">Admin Login</p>
              <div>
                <label>email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={LoginAction}>
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
