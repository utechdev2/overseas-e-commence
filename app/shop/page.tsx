import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/store";

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <main className="page-shell">
      <section className="page-heading"><p className="eyebrow">THE COLLECTION</p><h1>SHOP OVERSEAS</h1><p>Streetwear rooted in Ghana, made for everywhere.</p></section>
      <div className="filter-row"><span>{products.length} PRODUCTS</span><span>ALL / TEES / HOODIES / CAPS / ACCESSORIES</span></div>
      <section className="shop-grid">
        {products.map((product) => (
          <Link href={`/shop/${product.slug}`} className="product-card" key={product.slug}>
            <div className="product-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 50vw, 25vw" /><span>{product.badge}</span></div>
            <div className="product-meta"><div><b>{product.name}</b><small>{product.category}</small></div><strong>GHS {product.price}</strong></div>
            <div className="view-link">VIEW PRODUCT <ArrowRight size={14}/></div>
          </Link>
        ))}
      </section>
    </main>
  );
}
