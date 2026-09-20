"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";

const navItems = [
  ["HOME", "/"],
  ["SHOP", "/shop"],
  ["OUR STORY", "/our-story"],
  ["THE FOREIGN BOYS CLAN", "/our-story"],
  ["LOOKBOOK", "/lookbook"],
  ["CONTACT", "/contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-symbol">O</span><span>OVERSEAS</span>
      </Link>

      <nav>
        {navItems.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
      </nav>

      <div className="header-actions">
        <button className="icon-button" aria-label="Search"><Search size={17}/></button>
        <button className="icon-button" aria-label="Account"><User size={17}/></button>
        <Link className="bag-link" href="/cart" aria-label="Shopping bag">
          <ShoppingBag size={17}/><span className="bag-count">{itemCount}</span>
        </Link>
        <button className="menu-button" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X/> : <Menu/>}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {navItems.filter(([label]) => label !== "THE FOREIGN BOYS CLAN").map(([label, href]) => (
            <Link onClick={() => setOpen(false)} href={href} key={label}>{label}</Link>
          ))}
          <Link onClick={() => setOpen(false)} href="/cart">BAG ({itemCount})</Link>
        </div>
      )}
    </header>
  );
}
