"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";

export function AddToCart({ productName }: { productName: string }) {
  const [added, setAdded] = useState(false);
  return <button className="add-cart" onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1800); }}>
    {added ? <><Check size={18}/> ADDED TO BAG</> : <><ShoppingBag size={18}/> ADD TO BAG — GHS 200</>}
  </button>;
}
