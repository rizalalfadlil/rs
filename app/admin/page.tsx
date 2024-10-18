"use client"
import React, { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { AccountList } from "../../components/AccountList";
import { ReviewPage } from "../../components/ReviewPage";

export default function page({ params }: any) {
  const [Page, setPage] = useState("akun")
  const pagesList:any = {
    akun:<AccountList/>,
    review:<ReviewPage/>
  }
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar page={Page} setPage={setPage} />
      <div className="bg-muted grow p-4 space-y-4 overflow-y-scroll h-screen">
        {pagesList[Page]}
      </div>
    </div>
  );
}



