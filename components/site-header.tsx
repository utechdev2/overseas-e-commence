"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link className="brand" href="/"><span className="brand-symbol">O</span><span>OVERSEAS</span></Link>
    <nav>{["HOME","SHOP","OUR STORY","THE FOREIGN BOYS CLAN","LOOKBOOK","CONTACT"].map((item) => <Link key={item} href={item === "HOME" ? "/" : item === "SHOP" ? "/shop" : item === "OUR STORY" || item === "THE FOREIGN BOYS CLAN" ? "/our-story" : item === "LOOKBOOK" ? "/lookbook" : "/contact"}>{item}</Link>)}</nav>
    <div className="header-actions"><Search size={17}/><User size={17}/><Link href="/shop"><ShoppingBag size={17}/></Link><button className="menu-button" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>
    {open && <div className="mobile-menu">{["/","/shop","/our-story","/lookbook","/contact"].map((href, i) => <Link onClick={() => setOpen(false)} href={href} key={href}>{["HOME","SHOP","OUR STORY","LOOKBOOK","CONTACT"][i]}</Link>)}</div>}
  </header>;
}
