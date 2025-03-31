"use client";

import { toast } from "sonner";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => toast("Hello World", { description: "wave your hand" })}>Toast</button>
    </div>
  );
}
