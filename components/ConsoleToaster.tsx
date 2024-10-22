import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";
import { Toaster } from "./ui/toaster";

const ConsoleToaster = () => {
  const { toast } = useToast();
  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      originalConsoleLog.apply(console, args);
      const logMessage = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
        )
        .join(" ");
      toast({
        description: logMessage,
      })
    };
    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default ConsoleToaster;
