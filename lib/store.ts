import { createClient } from "@/lib/supabase/server";

export type Product = {
  name: string; slug: string; category: string; price: number; image: string;
  badge: string; description: string; sizes: string[];
};

const fallbackProducts: Product[] = [
  { name:"Global Tee", slug:"global-tee", category:"Tees", price:250, badge:"NEW", image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85", description:"A heavyweight everyday tee carrying the first OVERSEAS graphic language.", sizes:["S","M","L","XL","2XL"] },
  { name:"Unity Tee", slug:"unity-tee", category:"Tees", price:200, badge:"CORE", image:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85", description:"Minimal front branding with a statement back graphic.", sizes:["S","M","L","XL","2XL"] },
  { name:"Classic Cap", slug:"classic-cap", category:"Caps", price:200, badge:"CORE", image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=85", description:"Structured six-panel cap finished with the OVERSEAS mark.", sizes:["OS"] },
  { name:"Heritage Bandana", slug:"heritage-bandana", category:"Accessories", price:120, badge:"LIMITED", image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85", description:"A graphic bandana built around the symbols of the movement.", sizes:["OS"] },
  { name:"Foreign Boys Hoodie", slug:"foreign-boys-hoodie", category:"Hoodies", price:420, badge:"DROP 01", image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85", description:"Heavy fleece hoodie made for late nights, long flights and city streets.", sizes:["S","M","L","XL","2XL"] },
  { name:"Overseas Essential", slug:"overseas-essential", category:"Tees", price:220, badge:"ESSENTIAL", image:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=85", description:"The essential everyday uniform for the community.", sizes:["S","M","L","XL","2XL"] }
];

export async function getProducts(): Promise<Product[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return fallbackProducts;
  const supabase = await createClient();
  const { data } = await supabase.from("products")
    .select("name,slug,description,price,image_url,featured,categories!inner(name,slug),product_variants(size)")
    .eq("active", true).in("categories.slug", ["tees","hoodies","caps","accessories"])
    .order("featured", { ascending:false }).order("created_at", { ascending:true });
  if (!data?.length) return fallbackProducts;
  return data.map((item) => {
    const category = Array.isArray(item.categories) ? item.categories[0] : item.categories;
    const variants = Array.isArray(item.product_variants) ? item.product_variants : [];
    return {
      name:item.name, slug:item.slug, category:category?.name ?? "Collection", price:Number(item.price),
      image:item.image_url ?? fallbackProducts.find(p=>p.slug===item.slug)?.image ?? "",
      badge:item.featured ? "FEATURED" : "CORE", description:item.description ?? "",
      sizes:variants.map(v=>v.size).filter(Boolean)
    };
  });
}

export async function getProduct(slug: string) {
  return (await getProducts()).find(product => product.slug === slug);
}

export const categories = [
  { name:"TEES", href:"/shop", image:fallbackProducts[0].image },
  { name:"HOODIES", href:"/shop", image:fallbackProducts[4].image },
  { name:"CAPS", href:"/shop", image:fallbackProducts[2].image },
  { name:"BANDANAS", href:"/shop", image:fallbackProducts[3].image },
  { name:"LADIES", href:"/shop", image:fallbackProducts[5].image }
];

export const story = {
  intro:"OVERSEAS was born from a vision to connect Ghanaian identity with global culture.",
  image:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=85",
  body:"We believe where you come from should never limit where you can go. OVERSEAS is a Ghanaian streetwear project built around movement, identity and community.",
  bodyTwo:"The Foreign Boys Clan is more than a name. It is a shared language for young creatives, builders and dreamers who carry home with them wherever they go."
};
