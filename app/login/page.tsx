"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("Sending sign-in link…");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + "/account" },
    });
    setMessage(error ? error.message : "Check your email for the sign-in link.");
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">OVERSEAS / ACCOUNT</p>
        <h1>WELCOME<br/>BACK.</h1>
        <p>Sign in with your email. We&apos;ll send you a secure magic link.</p>
        <form onSubmit={submit}>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
          <button className="checkout-button" type="submit">SEND SIGN-IN LINK →</button>
        </form>
        {message && <div className="auth-message">{message}</div>}
        <Link href="/shop" className="back-link">← BACK TO SHOP</Link>
      </div>
    </main>
  );
}
