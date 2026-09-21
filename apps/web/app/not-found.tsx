import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="error-code">404</span>
      <h1>Esta corriente no llega hasta aquí.</h1>
      <p>This current does not reach this far.</p>
      <Link className="button button-dark" href="/es" prefetch={false}>Volver al inicio <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
