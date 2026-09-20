"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";

type Props = {
  slug: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
};

export function ProductPurchase({ slug, name, price, image, sizes }: Props) {
  const [size, setSize] = useState(sizes[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function add() {
    addItem({ slug, name, price, image, size });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return <>
    <div className="size-label">SELECT SIZE</div>
    <div className="sizes">
      {sizes.map((option) => (
        <button className={size === option ? "selected" : ""} onClick={() => setSize(option)} key={option}>
          {option}
        </button>
      ))}
    </div>
    <button className="add-cart" onClick={add}>
      {added ? <><Check size={18}/> ADDED TO BAG</> : <><ShoppingBag size={18}/> ADD TO BAG — GHS {price}</>}
    </button>
  </>;
}
