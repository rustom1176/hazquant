"use client";

import { useState } from "react";

export function ResetRequestForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/password-reset/request", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: String(form.get("email") || "") }),
    });
    setStatus(res.ok ? "done" : "error");
  }
  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      {status === "done" && <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">If an account exists, a reset link has been prepared. Check your email.</div>}
      {status === "error" && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">Unable to process request. Please try again.</div>}
      <div><label className="label" htmlFor="email">Email address</label><input className="input" id="email" name="email" type="email" autoComplete="email" required /></div>
      <button type="submit" className="btn-primary w-full" disabled={status==="loading"}>{status==="loading"?"Sending...":"Send reset link"}</button>
    </form>
  );
}
