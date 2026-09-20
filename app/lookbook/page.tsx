import Image from "next/image";
import { products } from "@/lib/store";

export default function LookbookPage() {
  const images = [products[0].image, products[2].image, products[4].image, products[1].image, products[5].image, products[3].image];
  return <main className="page-shell"><section className="page-heading"><p className="eyebrow">ABROKYIRE ABA GHANA</p><h1>LOOKBOOK</h1><p>Visual stories from the movement.</p></section><div className="lookbook-grid">{images.map((image, i) => <div className={i % 3 === 0 ? "lookbook-item tall" : "lookbook-item"} key={i}><Image src={image} alt="OVERSEAS lookbook" fill sizes="(max-width: 700px) 100vw, 33vw" /></div>)}</div></main>;
}
