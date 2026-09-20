"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <Link href="/shop" className="back-link"><ArrowLeft size={15}/> CONTINUE SHOPPING</Link>
        <p className="eyebrow">YOUR SELECTION</p>
        <h1>SHOPPING BAG</h1>
      </div>

      {items.length === 0 ? (
        <section className="empty-cart">
          <p>YOUR BAG IS CURRENTLY EMPTY.</p>
          <Link className="button button-dark" href="/shop">EXPLORE THE DROP →</Link>
        </section>
      ) : (
        <section className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.slug + item.size}>
                <div className="cart-image"><Image src={item.image} alt={item.name} fill sizes="160px" /></div>
                <div className="cart-info">
                  <div><p className="eyebrow">{item.size} / OVERSEAS</p><h2>{item.name}</h2><strong>GHS {item.price}</strong></div>
                  <div className="cart-controls">
                    <div className="quantity"><button onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}><Minus size={13}/></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}><Plus size={13}/></button></div>
                    <button className="remove" onClick={() => removeItem(item.slug, item.size)}><Trash2 size={14}/> REMOVE</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="cart-summary">
            <p className="eyebrow">ORDER SUMMARY</p>
            <div><span>SUBTOTAL</span><b>GHS {subtotal}</b></div>
            <div><span>DELIVERY</span><span>CALCULATED AT CHECKOUT</span></div>
            <button className="checkout-button">PROCEED TO CHECKOUT →</button>
            <small>Secure checkout. Ghana delivery and international shipping options will be connected in the next phase.</small>
          </aside>
        </section>
      )}
    </main>
  );
}
