import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">OVERSEAS / 404</p>
        <h1>NOT FOUND.</h1>
        <p>The page you are looking for has moved or does not exist.</p>
        <Link className="button button-dark" href="/shop">RETURN TO SHOP →</Link>
      </section>
    </main>
  );
}
