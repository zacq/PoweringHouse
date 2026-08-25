import { partnerById } from "@/lib/partners";

/** content-map v2 §7.2 — both cards redirect to EKShop; no local e-commerce is built. */
export function EcommerceCards() {
  const ekshop = partnerById("ekshop");

  return (
    <div className="themes__grid">
      <a className="theme" href={ekshop.url}>
        <span className="theme__tag">E-Commerce</span>
        <h3>E-Commerce listing</h3>
        <p>Enlist your business for more customers.</p>
        <span className="theme__count">{ekshop.name}</span>
      </a>
      <a className="theme" href={ekshop.url}>
        <span className="theme__tag">Point of sale</span>
        <h3>Tara POS</h3>
        <p>Sell in person and online from one system.</p>
        <span className="theme__count">{ekshop.name}</span>
      </a>
    </div>
  );
}
