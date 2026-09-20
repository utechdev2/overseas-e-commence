import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProduct, getProducts } from "@/lib/store";
import { ProductPurchase } from "@/components/product-purchase";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <main className="product-page">
      <Link href="/shop" className="back-link"><ArrowLeft size={15}/> BACK TO SHOP</Link>
      <div className="product-detail">
        <div className="detail-image"><Image src={product.image} alt={product.name} fill priority sizes="60vw" /></div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p><h1>{product.name}</h1>
          <div className="detail-price">GHS {product.price}</div><p>{product.description}</p>
          <ProductPurchase slug={product.slug} name={product.name} price={product.price} image={product.image} sizes={product.sizes} />
          <div className="detail-notes"><span>+</span> Premium streetwear construction</div>
          <div className="detail-notes"><span>+</span> Designed in Ghana</div>
          <div className="detail-notes"><span>+</span> Nationwide & international delivery</div>
        </div>
      </div>
    </main>
  );
}
