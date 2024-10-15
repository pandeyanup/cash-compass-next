import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen content-center items-center justify-center space-x-2 text-center">
      <Loader2 className="animate animate-spin text-2xl text-primary" />
      <p className="text-2xl">Loading... </p>
    </div>
  );
};

export default Loading;
