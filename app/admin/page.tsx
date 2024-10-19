"use client";
import React, { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { AccountList } from "../../components/AccountList";
import { ReviewPage } from "../../components/ReviewPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";

export default function Page({ params }: any) {
  const [Page, setPage] = useState("akun");
  const pagesList: any = {
    akun: <AccountList />,
    review: <ReviewPage />,
  };
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar page={Page} setPage={setPage} />
      <div className="bg-muted grow p-4 space-y-4 overflow-y-scroll h-screen">
        <Card className="flex items-center justify-between p-4">
        <div>
              <p>hello, user</p>
            </div>
            <div>
              <Button variant="ghost">
                <DoorOpen />
              </Button>
            </div>
        </Card>
        {pagesList[Page]}
      </div>
    </div>
  );
}
