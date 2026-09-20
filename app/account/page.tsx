import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <main className="auth-page"><div className="auth-card"><p className="eyebrow">OVERSEAS / ACCOUNT</p><h1>YOUR<br/>ACCOUNT.</h1><p>Sign in to view your profile and orders.</p><Link className="checkout-button checkout-link" href="/login">SIGN IN →</Link></div></main>;
  }

  return <main className="auth-page"><div className="auth-card"><p className="eyebrow">OVERSEAS / ACCOUNT</p><h1>WELCOME.</h1><p>{user.email}</p><div className="account-links"><Link href="/shop">SHOP THE DROP →</Link><Link href="/cart">VIEW SHOPPING BAG →</Link></div></div></main>;
}
