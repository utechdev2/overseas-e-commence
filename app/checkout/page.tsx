"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  if (!items.length) {
    return <main className="checkout-page"><div className="empty-cart"><p>YOUR BAG IS EMPTY.</p><Link className="button button-dark" href="/shop">RETURN TO SHOP →</Link></div></main>;
  }

  return (
    <main className="checkout-page">
      <div className="checkout-wrap">
        <Link href="/cart" className="back-link"><ArrowLeft size={15}/> BACK TO BAG</Link>
        <div className="checkout-grid">
          <section>
            <p className="eyebrow">DELIVERY DETAILS</p>
            <h1>CHECKOUT</h1>
            <form className="checkout-form">
              <div className="form-row"><input required placeholder="First name" /><input required placeholder="Last name" /></div>
              <input required type="email" placeholder="Email address" />
              <input required placeholder="Phone number" />
              <input required placeholder="Address" />
              <div className="form-row"><input required placeholder="City" /><select defaultValue="Ghana"><option>Ghana</option><option>Nigeria</option><option>United Kingdom</option><option>United States</option><option>Other</option></select></div>
              <div className="checkout-note">PAYMENT & DELIVERY INTEGRATION WILL BE CONNECTED TO THE LIVE STORE IN THE NEXT PHASE.</div>
              <button className="checkout-button" type="button">PLACE ORDER — GHS {subtotal} →</button>
            </form>
          </section>
          <aside className="checkout-summary">
            <p className="eyebrow">YOUR ORDER</p>
            {items.map((item) => <div className="summary-item" key={item.slug + item.size}><span>{item.name} × {item.quantity}<small>{item.size}</small></span><b>GHS {item.price * item.quantity}</b></div>)}
            <div className="summary-total"><span>SUBTOTAL</span><b>GHS {subtotal}</b></div>
          </aside>
        </div>
      </div>
    </main>
  );
}
