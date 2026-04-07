"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const PHONE = "59899079595";

/** =========================
 *  TYPES
 * ========================= */
type Faction = "civil" | "resistencia" | "profetas";

type Product = {
  code: string; // interno (no se muestra)
  faction: Faction;
  number: string; // "01" -> CVL-01 / RST-01 / PFT-01
  slug: string; // carpeta (solo organizativo)
  drop?: string; // ej: "DROP-01" / "SURVEILLANCE-01"
  sort?: number; // menor = aparece antes
  active?: boolean; // false = no se muestra en grid
  priceUYU?: number;
  images: string[];
  stockBySize: Record<string, number>; // { S: 2, M: 0, L: 5, XL: 1 }
};

type CartItem = {
  code: string; // interno
  size: string;
  qty: number;
};

type ShippingType = "" | "retiro" | "mvdeo" | "interior";

/** =========================
 *  DATA
 * ========================= */
const PRODUCTS: Product[] = [
  {
    code: "FK-32",
    faction: "civil",
    number: "32",
    slug: "cvl-32",
    drop: "",
    sort: 9,
    active: true,
    priceUYU: 2900,
    images: [
      "/products/civil/cvl-32/IMG_1842.jpg",
      "/products/civil/cvl-32/IMG_1844.jpg",
      "/products/civil/cvl-32/IMG_1845.jpg",
      "/products/civil/cvl-32/IMG_1847.jpg",
      "/products/civil/cvl-32/IMG_1850.jpg",
      "/products/civil/cvl-32/IMG_1852.jpg",
    ],
    stockBySize: { S: 5, M: 5, L: 5, XL: 5 },
  },
  {
    code: "FK-06",
    faction: "profetas",
    number: "01",
    slug: "pft-01",
    drop: "",
    sort: 10,
    active: true,
    priceUYU: 2600,
    images: [
      "/products/profetas/pft-01/01.jpg",
      "/products/profetas/pft-01/02.jpg",
      "/products/profetas/pft-01/03.jpg",
      "/products/profetas/pft-01/04.jpg",
      "/products/profetas/pft-01/05.jpg",
      "/products/profetas/pft-01/06.jpg",
      "/products/profetas/pft-01/07.jpg",
      "/products/profetas/pft-01/08.jpg",
      "/products/profetas/pft-01/09.jpg",
      "/products/profetas/pft-01/10.jpg",
      "/products/profetas/pft-01/11.jpg",
      "/products/profetas/pft-01/12.jpg",
      "/products/profetas/pft-01/13.jpg",
      "/products/profetas/pft-01/14.jpg",
      "/products/profetas/pft-01/15.jpg",
      "/products/profetas/pft-01/16.jpg",
      "/products/profetas/pft-01/17.jpg",
    ],
    stockBySize: { S: 5, M: 5, L: 5, XL: 5 },
  },
  {
    code: "FK-01",
    faction: "civil",
    number: "01",
    slug: "cvl-01",
    drop: "",
    sort: 10,
    active: true,
    priceUYU: 1400,
    images: [
      "/products/civil/cvl-01/1.jpg",
      "/products/civil/cvl-01/2.jpg",
      "/products/civil/cvl-01/3.jpg",
      "/products/civil/cvl-01/4.jpg",
      "/products/civil/cvl-01/5.jpg",
    ],
    stockBySize: { S: 5, M: 5, L: 5, XL: 5 },
  },
  {
    code: "FK-02",
    faction: "civil",
    number: "28",
    slug: "cvl-28",
    drop: "",
    sort: 20,
    active: true,
    priceUYU: 1500,
    images: [
      "/products/civil/cvl-28/1.jpg",
      "/products/civil/cvl-28/2.jpg",
      "/products/civil/cvl-28/3.jpg",
      "/products/civil/cvl-28/4.jpg",
      "/products/civil/cvl-28/5.jpg",
    ],
    stockBySize: { S: 5, M: 5, L: 5, XL: 5 },
  },
  {
    code: "FK-03",
    faction: "civil",
    number: "29",
    slug: "cvl-29",
    drop: "",
    sort: 20,
    active: true,
    priceUYU: 1500,
    images: [
      "/products/civil/cvl-29/1.jpg",
      "/products/civil/cvl-29/2.jpg",
      "/products/civil/cvl-29/3.jpg",
      "/products/civil/cvl-29/4.jpg",
      "/products/civil/cvl-29/5.jpg",
    ],
    stockBySize: { S: 5, M: 5, L: 5, XL: 5 },
  },
  {
    code: "FK-04",
    faction: "civil",
    number: "30",
    slug: "cvl-30",
    drop: "",
    sort: 20,
    active: true,
    priceUYU: 1500,
    images: [
      "/products/civil/cvl-30/1.jpg",
      "/products/civil/cvl-30/2.jpg",
      "/products/civil/cvl-30/3.jpg",
      "/products/civil/cvl-30/4.jpg",
      "/products/civil/cvl-30/5.jpg",
      "/products/civil/cvl-30/6.jpg",
    ],
    stockBySize: { S: 5, M: 5, L: 5, XL: 5 },
  },
  {
    code: "FK-05",
    faction: "civil",
    number: "31",
    slug: "cvl-31",
    drop: "",
    sort: 20,
    active: true,
    priceUYU: 2500,
    images: [
      "/products/civil/cvl-31/1.jpg",
      "/products/civil/cvl-31/2.jpg",
      "/products/civil/cvl-31/3.jpg",
      "/products/civil/cvl-31/4.jpg",
      "/products/civil/cvl-31/5.jpg",
    ],
    stockBySize: { S: 5, M: 5, L: 5, XL: 5 },
  },
  {
    code: "FK-07",
    faction: "civil",
    number: "24",
    slug: "cvl-24",
    drop: "",
    sort: 10,
    active: true,
    priceUYU: 2200,
    images: [
      "/products/civil/cvl-24/1.jpg",
      "/products/civil/cvl-24/2.jpg",
      "/products/civil/cvl-24/3.jpg",
      "/products/civil/cvl-24/4.jpg",
      "/products/civil/cvl-24/5.jpg",
    ],
    stockBySize: { S: 5, M: 5, L: 5, XL: 5 },
  },
  {
    code: "FK-08",
    faction: "civil",
    number: "21",
    slug: "cvl-21",
    drop: "",
    sort: 10,
    active: true,
    priceUYU: 1800,
    images: [
      "/products/civil/cvl-21/1.jpg",
      "/products/civil/cvl-21/2.jpg",
      "/products/civil/cvl-21/3.jpg",
      "/products/civil/cvl-21/4.jpg",
      "/products/civil/cvl-21/5.jpg",
    ],
    stockBySize: { S: 5, M: 5, L: 5, XL: 5 },
  },
  {
    code: "FK-09",
    faction: "civil",
    number: "20",
    slug: "cvl-20",
    drop: "",
    sort: 10,
    active: true,
    priceUYU: 2600,
    images: [
      "/products/civil/cvl-20/1.jpg",
      "/products/civil/cvl-20/2.jpg",
      "/products/civil/cvl-20/3.jpg",
      "/products/civil/cvl-20/4.jpg",
      "/products/civil/cvl-20/5.jpg",
    ],
    stockBySize: { S: 5, M: 5, L: 5, XL: 5 },
  },
];

/** =========================
 *  HELPERS
 * ========================= */
function displayCode(p: { faction: Faction; number: string }) {
  if (p.faction === "civil") return `CVL-${p.number}`;
  if (p.faction === "resistencia") return `RST-${p.number}`;
  if (p.faction === "profetas") return `PFT-${p.number}`;
  return p.number;
}

function getProductByCode(code: string) {
  return PRODUCTS.find((p) => p.code === code);
}

function waLink(message: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

// ✅ Precio sin signo, formateado es-UY (1.690)
function formatPriceUYU(n?: number) {
  if (!n && n !== 0) return "";
  return new Intl.NumberFormat("es-UY", { maximumFractionDigits: 0 }).format(n);
}

/** =========================
 *  SHIPPING
 * ========================= */
const MVDEO_ZONES = [
  { label: "Centro / Cordón / Aguada", cost: 180 },
  { label: "Parque Rodó / Punta Carretas / Pocitos", cost: 220 },
  { label: "Otras zonas Montevideo", cost: 270 },
] as const;

const INTERIOR = { label: "Interior", cost: 360 } as const;

function shippingCost(type: ShippingType, zoneLabel: string) {
  if (type === "retiro") return 0;
  if (type === "interior") return INTERIOR.cost;
  if (type === "mvdeo") {
    const found = MVDEO_ZONES.find((z) => z.label === zoneLabel);
    return found?.cost ?? 0;
  }
  return 0;
}

function shippingLabel(type: ShippingType, zoneLabel: string) {
  if (type === "retiro") return "Retiro";
  if (type === "interior") return `${INTERIOR.label} — ${formatPriceUYU(INTERIOR.cost)}`;
  if (type === "mvdeo" && zoneLabel) {
    const found = MVDEO_ZONES.find((z) => z.label === zoneLabel);
    return found ? `${found.label} — ${formatPriceUYU(found.cost)}` : zoneLabel;
  }
  return "";
}

/** =========================
 *  ✅ TRANSFER + WA MESSAGE
 * ========================= */
const TRANSFER_INFO = [
  "TRANSFERENCIA",
  "Banco: Itaú",
  "Titular: Adrián Antúnez",
  "Cuenta Nº: 2856335",
  "Moneda: UYU",
].join("\n");

function formatCartMessage(args: {
  cart: CartItem[];
  shippingType: ShippingType;
  shippingZoneLabel: string;
  customerName: string;
  address: string;
}) {
  const { cart, shippingType, shippingZoneLabel, customerName, address } = args;

  const items = cart
    .map((i) => {
      const p = getProductByCode(i.code);
      const code = p ? displayCode(p) : i.code;

      const unit = p?.priceUYU ?? 0;
      const subtotal = unit * i.qty;

      return `- ${code} / ${i.size} x${i.qty} — ${formatPriceUYU(unit)} c/u — ${formatPriceUYU(subtotal)}`;
    })
    .join("\n");

  const productsTotal = cart.reduce((acc, i) => {
    const p = getProductByCode(i.code);
    return acc + (p?.priceUYU ?? 0) * i.qty;
  }, 0);

  const ship = shippingCost(shippingType, shippingZoneLabel);
  const finalTotal = productsTotal + ship;

  const envioBlock =
    shippingType === "retiro"
      ? ["ENTREGA:", "- Retiro"].join("\n")
      : [
          "ENTREGA:",
          `- Envío: ${shippingType === "mvdeo" ? "Montevideo" : "Interior"}`,
          `- Zona: ${shippingLabel(shippingType, shippingZoneLabel)}`,
          `- Dirección/Barrio: ${address || ""}`,
        ].join("\n");

  return [
    "INICIAR COMPRA",
    "",
    "PEDIDO:",
    items || "- (vacío)",
    "",
    `TOTAL PRODUCTOS: ${formatPriceUYU(productsTotal)} UYU`,
    `ENVIO: ${formatPriceUYU(ship)} UYU`,
    `TOTAL: ${formatPriceUYU(finalTotal)} UYU`,
    "",
    envioBlock,
    "",
    "DATOS:",
    `- Nombre: ${customerName || ""}`,
    "",
    "PLAZO: 1 semana.",
    "",
    TRANSFER_INFO,
    "",
    "Enviar comprobante por acá.",
  ].join("\n");
}

/** =========================
 *  PAGE
 * ========================= */
export default function Home() {
  // ✅ Fix hydration: renderizamos UI recién cuando montó en cliente
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Product | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [size, setSize] = useState<string>("");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // ✅ Checkout preselección (ANTES de WhatsApp)
  const [shippingTypeState, setShippingTypeState] = useState<ShippingType>("");
  const [shippingZoneLabel, setShippingZoneLabel] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("feiqui_cart");
      if (raw) setCart(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("feiqui_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((a, b) => a + b.qty, 0), [cart]);

  function qtyInCart(code: string, s: string) {
    return cart.find((x) => x.code === code && x.size === s)?.qty ?? 0;
  }

  function firstInStockSize(p: Product) {
    const entries = Object.entries(p.stockBySize ?? {});
    const found = entries.find(([, q]) => q > 0);
    return found?.[0] ?? "";
  }

  function openProduct(p: Product) {
    setActive(p);
    setImgIndex(0);
    setSize(firstInStockSize(p));
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setActive(null);
    setImgIndex(0);
    setSize("");
  }

  function addToCart(code: string, s: string) {
    if (!s) {
      toast("Elegí talle", { icon: "↳" });
      return;
    }
    const p = getProductByCode(code);
    if (!p) return;

    const stock = p.stockBySize?.[s] ?? 0;
    const already = qtyInCart(code, s);
    const remaining = stock - already;

    if (remaining <= 0) {
      toast("Sin stock", { icon: "∅" });
      return;
    }

    setCart((prev) => {
      const found = prev.find((x) => x.code === code && x.size === s);
      if (found) {
        return prev.map((x) => (x.code === code && x.size === s ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { code, size: s, qty: 1 }];
    });

    toast(`Agregado — ${displayCode(p)} ${s}`);
  }

  function removeOne(code: string, s: string) {
    setCart((prev) =>
      prev.map((x) => (x.code === code && x.size === s ? { ...x, qty: x.qty - 1 } : x)).filter((x) => x.qty > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  // ✅ Grid: 4:5 tipo IG y “llena” más la card
  const photoBox: React.CSSProperties = {
    width: "100%",
    aspectRatio: "4 / 5",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    background: "#fff",
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const btn: React.CSSProperties = {
    border: "1px solid #e5e5e5",
    background: "white",
    padding: "10px 12px",
    borderRadius: 10,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    cursor: "pointer",
    color: "black",
  };

  const input: React.CSSProperties = {
    border: "1px solid #e5e5e5",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 12,
    letterSpacing: 1,
    outline: "none",
    width: "100%",
  };

  const labelSmall: React.CSSProperties = {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#6f6f6f",
  };

  const visibleProducts = useMemo(() => {
    return [...PRODUCTS].filter((p) => p.active !== false).sort((a, b) => (a.sort ?? 9999) - (b.sort ?? 9999));
  }, []);

  const productsTotal = useMemo(() => {
    return cart.reduce((acc, i) => {
      const p = getProductByCode(i.code);
      return acc + (p?.priceUYU ?? 0) * i.qty;
    }, 0);
  }, [cart]);

  const ship = useMemo(() => shippingCost(shippingTypeState, shippingZoneLabel), [shippingTypeState, shippingZoneLabel]);
  const finalTotal = productsTotal + ship;

  function setShippingType(next: ShippingType) {
    setShippingTypeState(next);
    setShippingZoneLabel("");
    setAddress("");
    if (next === "interior") setShippingZoneLabel(INTERIOR.label);
  }

  const shippingReady =
    shippingTypeState === "retiro"
      ? true
      : shippingTypeState === "mvdeo"
      ? !!shippingZoneLabel && !!address
      : shippingTypeState === "interior"
      ? true && !!address
      : false;

  const checkoutReady = cart.length > 0 && !!customerName && shippingReady;

  // ✅ Si todavía no montó, devolvemos un contenedor estable (evita mismatch)
  if (!mounted) {
    return (
      <div style={{ background: "white", color: "black", minHeight: "100vh" }}>
        <div style={{ position: "sticky", top: 0, background: "white", zIndex: 5 }}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "12px 24px",
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
            }}
          >
            <div />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="/logo.svg"
                alt="Feiqui"
                style={{
                  height: 42,
                  objectFit: "contain",
                  filter:
                    "brightness(0) saturate(100%) invert(74%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(92%) contrast(88%)",
                }}
              />
            </div>
            <div />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "white", color: "black", minHeight: "100vh" }}>
      <Toaster position="bottom-center" />

      {/* Header sticky */}
      <div style={{ position: "sticky", top: 0, background: "white", zIndex: 5 }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "12px 24px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
          }}
        >
          <div />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/logo.svg"
              alt="Feiqui"
              style={{
                height: 42,
                objectFit: "contain",
                filter:
                  "brightness(0) saturate(100%) invert(74%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(92%) contrast(88%)",
              }}
            />
          </div>

          <button
            onClick={() => setCartOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              justifySelf: "end",
              position: "relative",
              padding: 6,
            }}
            aria-label="Carrito"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b6b6b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>

            {cartCount > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  right: -6,
                  background: "#b6b6b6",
                  color: "white",
                  borderRadius: 999,
                  fontSize: 10,
                  padding: "2px 5px",
                  lineHeight: 1,
                }}
              >
                {cartCount}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24,
          padding: 24,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {visibleProducts.map((p) => (
          <div key={p.code} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => openProduct(p)}>
            <div style={photoBox}>{p.images?.[0] ? <img src={p.images[0]} alt={displayCode(p)} style={imgStyle} /> : null}</div>

            <div style={{ marginTop: 10, fontSize: 12, letterSpacing: 1, color: "#6f6f6f" }}>{displayCode(p)}</div>

            {typeof p.priceUYU === "number" ? (
              <div style={{ marginTop: 4, fontSize: 12, letterSpacing: 1, color: "#9a9a9a" }}>{formatPriceUYU(p.priceUYU)}</div>
            ) : null}

            {p.drop ? (
              <div style={{ marginTop: 4, fontSize: 10, letterSpacing: 1, color: "#9a9a9a", textTransform: "uppercase" }}>{p.drop}</div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && active ? (
        <FullModal
          active={active}
          imgIndex={imgIndex}
          setImgIndex={setImgIndex}
          size={size}
          setSize={setSize}
          cart={cart}
          qtyInCart={qtyInCart}
          addToCart={addToCart}
          closeModal={closeModal}
          // checkout state (shared)
          shippingType={shippingTypeState}
          setShippingType={setShippingType}
          shippingZoneLabel={shippingZoneLabel}
          setShippingZoneLabel={setShippingZoneLabel}
          customerName={customerName}
          setCustomerName={setCustomerName}
          address={address}
          setAddress={setAddress}
        />
      ) : null}

      {/* Carrito panel */}
      {cartOpen ? (
        <div
          onClick={() => setCartOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.15)",
            display: "flex",
            justifyContent: "flex-end",
            zIndex: 30,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(420px, 92vw)",
              height: "100%",
              background: "white",
              borderLeft: "1px solid #e5e5e5",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#6f6f6f" }}>CART ({cartCount})</div>
              <button style={btn} onClick={() => setCartOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ borderTop: "1px solid #e5e5e5" }} />

            {cart.length === 0 ? (
              <div style={{ fontSize: 12, color: "#6f6f6f" }}>Carrito vacío.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {cart.map((i) => {
                  const p = getProductByCode(i.code);
                  const name = p ? displayCode(p) : i.code;

                  const stock = p?.stockBySize?.[i.size] ?? 0;
                  const remaining = Math.max(0, stock - qtyInCart(i.code, i.size));

                  return (
                    <div key={`${i.code}-${i.size}`} style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ fontSize: 12, letterSpacing: 1, color: "#6f6f6f" }}>
                        {name} / {i.size}
                        {p && remaining <= 3 ? <span style={{ marginLeft: 8, fontSize: 10, color: "#9a9a9a" }}>stock: {remaining}</span> : null}
                      </div>

                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button style={btn} onClick={() => removeOne(i.code, i.size)}>
                          -
                        </button>

                        <div style={{ width: 22, textAlign: "center", fontSize: 12 }}>{i.qty}</div>

                        <button
                          style={{
                            ...btn,
                            opacity: remaining > 0 ? 1 : 0.35,
                            cursor: remaining > 0 ? "pointer" : "not-allowed",
                          }}
                          onClick={() => addToCart(i.code, i.size)}
                          disabled={remaining <= 0}
                          title={remaining <= 0 ? "Sin stock" : ""}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Checkout fields */}
            <div style={{ borderTop: "1px solid #e5e5e5", marginTop: 8 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={labelSmall}>ENTREGA</div>

              <select
                style={input}
                value={shippingTypeState}
                onChange={(e) => setShippingType(e.target.value as ShippingType)}
              >
                <option value="">Tipo</option>
                <option value="retiro">Retiro</option>
                <option value="mvdeo">Envío Montevideo</option>
                <option value="interior">Envío Interior</option>
              </select>

              {shippingTypeState === "mvdeo" ? (
                <select
                  style={input}
                  value={shippingZoneLabel}
                  onChange={(e) => setShippingZoneLabel(e.target.value)}
                >
                  <option value="">Zona</option>
                  {MVDEO_ZONES.map((z) => (
                    <option key={z.label} value={z.label}>
                      {z.label} — {formatPriceUYU(z.cost)}
                    </option>
                  ))}
                </select>
              ) : null}

              {shippingTypeState === "interior" ? (
                <div style={{ fontSize: 12, letterSpacing: 1, color: "#6f6f6f" }}>
                  {INTERIOR.label} — {formatPriceUYU(INTERIOR.cost)}
                </div>
              ) : null}

              {shippingTypeState && shippingTypeState !== "retiro" ? (
                <input
                  style={input}
                  placeholder={shippingTypeState === "interior" ? "Dirección / Depto / Ciudad" : "Dirección / Barrio"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              ) : null}

              <div style={labelSmall}>DATOS</div>
              <input style={input} placeholder="Nombre" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

              {/* Totales */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 12, letterSpacing: 1, color: "#6f6f6f" }}>
                  PRODUCTOS: {formatPriceUYU(productsTotal)} UYU
                </div>
                <div style={{ fontSize: 12, letterSpacing: 1, color: "#6f6f6f" }}>
                  ENVÍO: {formatPriceUYU(ship)} UYU
                </div>
                <div style={{ fontSize: 12, letterSpacing: 1, color: "#6f6f6f" }}>
                  TOTAL: {formatPriceUYU(finalTotal)} UYU
                </div>
              </div>
            </div>

            <div style={{ marginTop: "auto", display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={btn} onClick={clearCart} disabled={cart.length === 0}>
                VACIAR
              </button>

              <a
                style={{
                  ...btn,
                  display: "inline-flex",
                  alignItems: "center",
                  opacity: checkoutReady ? 1 : 0.45,
                  pointerEvents: checkoutReady ? "auto" : "none",
                }}
                href={waLink(
                  formatCartMessage({
                    cart,
                    shippingType: shippingTypeState,
                    shippingZoneLabel,
                    customerName,
                    address,
                  })
                )}
                target="_blank"
                rel="noreferrer"
                title={!checkoutReady ? "Completar entrega + nombre" : ""}
              >
                INICIAR COMPRA →
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** =========================
 *  MODAL
 * ========================= */
function FullModal(props: {
  active: Product;
  imgIndex: number;
  setImgIndex: React.Dispatch<React.SetStateAction<number>>;
  size: string;
  setSize: (s: string) => void;
  cart: CartItem[];
  qtyInCart: (code: string, size: string) => number;
  addToCart: (code: string, size: string) => void;
  closeModal: () => void;

  shippingType: ShippingType;
  setShippingType: (t: ShippingType) => void;
  shippingZoneLabel: string;
  setShippingZoneLabel: (z: string) => void;
  customerName: string;
  setCustomerName: (n: string) => void;
  address: string;
  setAddress: (a: string) => void;
}) {
  const {
    active,
    imgIndex,
    setImgIndex,
    size,
    setSize,
    qtyInCart,
    addToCart,
    closeModal,
    shippingType,
    setShippingType,
    shippingZoneLabel,
    setShippingZoneLabel,
    customerName,
    setCustomerName,
    address,
    setAddress,
  } = props;

  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [mode, setMode] = useState<"none" | "h" | "v">("none");
  const [animating, setAnimating] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [vw, setVw] = useState(0);

  useEffect(() => {
    const measure = () => {
      const w = viewportRef.current?.getBoundingClientRect().width ?? window.innerWidth;
      setVw(w);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const len = active.images.length;
  const prevI = Math.max(0, imgIndex - 1);
  const nextI = Math.min(len - 1, imgIndex + 1);
  const atFirst = imgIndex === 0;
  const atLast = imgIndex === len - 1;

  function applyRubberBand(dx: number) {
    if (atFirst && dx > 0) return dx * 0.28;
    if (atLast && dx < 0) return dx * 0.28;
    return dx;
  }

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    setStartX(t.clientX);
    setStartY(t.clientY);
    setDragX(0);
    setDragY(0);
    setMode("none");
    setAnimating(false);
  }

  function onTouchMove(e: React.TouchEvent) {
    if (startX === null || startY === null) return;

    const t = e.touches[0];
    const rawDx = t.clientX - startX;
    const rawDy = t.clientY - startY;

    if (mode === "none") {
      if (Math.abs(rawDx) < 10 && Math.abs(rawDy) < 10) return;
      if (Math.abs(rawDx) > Math.abs(rawDy)) setMode("h");
      else setMode("v");
    }

    if (mode === "h") {
      setDragX(applyRubberBand(rawDx));
      setDragY(0);
    }

    if (mode === "v") {
      setDragY(rawDy > 0 ? rawDy : 0);
      setDragX(0);
    }
  }

  function onTouchEnd() {
    if (mode === "v") {
      if (dragY > 120) closeModal();
      setDragY(0);
      setStartX(null);
      setStartY(null);
      setMode("none");
      return;
    }

    if (mode === "h") {
      const width = vw || window.innerWidth;
      const threshold = Math.max(60, width * 0.18);
      const dx = dragX;

      setAnimating(true);

      if (dx < -threshold && !atLast) {
        setDragX(-width);
        window.setTimeout(() => {
          setImgIndex((i) => Math.min(len - 1, i + 1));
          setAnimating(false);
          setDragX(0);
        }, 180);
      } else if (dx > threshold && !atFirst) {
        setDragX(width);
        window.setTimeout(() => {
          setImgIndex((i) => Math.max(0, i - 1));
          setAnimating(false);
          setDragX(0);
        }, 180);
      } else {
        setDragX(0);
        window.setTimeout(() => setAnimating(false), 180);
      }

      setStartX(null);
      setStartY(null);
      setMode("none");
      return;
    }

    setStartX(null);
    setStartY(null);
    setMode("none");
    setDragX(0);
    setDragY(0);
  }

  const btnStyle: React.CSSProperties = {
    border: "1px solid #e5e5e5",
    background: "white",
    color: "black",
    padding: "10px 12px",
    borderRadius: 999,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    cursor: "pointer",
  };

  const field: React.CSSProperties = {
    border: "1px solid #e5e5e5",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 12,
    letterSpacing: 1,
    outline: "none",
    width: "100%",
  };

  const dotStyle = (activeDot: boolean): React.CSSProperties => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    border: "1px solid #b6b6b6",
    background: activeDot ? "#b6b6b6" : "white",
    padding: 0,
    cursor: "pointer",
  });

  const stock = active.stockBySize?.[size] ?? 0;
  const already = qtyInCart(active.code, size);
  const remaining = stock - already;
  const inStock = size && remaining > 0;

  function setType(t: ShippingType) {
    setShippingType(t);
    setShippingZoneLabel("");
    setAddress("");
    if (t === "interior") setShippingZoneLabel(INTERIOR.label);
  }

  const shippingReady =
    shippingType === "retiro"
      ? true
      : shippingType === "mvdeo"
      ? !!shippingZoneLabel && !!address
      : shippingType === "interior"
      ? true && !!address
      : false;

  const readyOneItem = !!customerName && !!shippingType && shippingReady;

  const productsTotal = typeof active.priceUYU === "number" ? active.priceUYU : 0;
  const ship = shippingCost(shippingType, shippingZoneLabel);
  const finalTotal = productsTotal + ship;

  const wpp = waLink(
    [
      "INICIAR COMPRA",
      "",
      "PEDIDO:",
      `- ${displayCode(active)} / ${size} x1 — ${formatPriceUYU(productsTotal)} UYU`,
      "",
      `TOTAL PRODUCTOS: ${formatPriceUYU(productsTotal)} UYU`,
      `ENVIO: ${formatPriceUYU(ship)} UYU`,
      `TOTAL: ${formatPriceUYU(finalTotal)} UYU`,
      "",
      shippingType === "retiro"
        ? ["ENTREGA:", "- Retiro"].join("\n")
        : [
            "ENTREGA:",
            `- Envío: ${shippingType === "mvdeo" ? "Montevideo" : "Interior"}`,
            `- Zona: ${shippingLabel(shippingType, shippingZoneLabel)}`,
            `- Dirección/Barrio: ${address || ""}`,
          ].join("\n"),
      "",
      "DATOS:",
      `- Nombre: ${customerName || ""}`,
      "",
      "PLAZO: 1 semana.",
      "",
      TRANSFER_INFO,
      "",
      "Enviar comprobante por acá.",
    ].join("\n")
  );

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "white",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${dragY}px)`,
          transition: mode === "v" ? "none" : "transform 180ms ease",
          display: "flex",
          flexDirection: "column",
          touchAction: "none",
        }}
      >
        <div ref={viewportRef} style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              height: "100%",
              transform: `translateX(calc(-100% + ${dragX}px))`,
              transition: animating ? "transform 180ms ease" : "none",
            }}
          >
            <div style={{ flex: "0 0 100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={active.images[prevI]}
                alt={`${displayCode(active)} prev`}
                style={{ width: "100%", height: "100%", objectFit: "contain", opacity: atFirst ? 0.7 : 1 }}
                draggable={false}
              />
            </div>

            <div style={{ flex: "0 0 100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={active.images[imgIndex]}
                alt={`${displayCode(active)} ${imgIndex + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                draggable={false}
              />
            </div>

            <div style={{ flex: "0 0 100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={active.images[nextI]}
                alt={`${displayCode(active)} next`}
                style={{ width: "100%", height: "100%", objectFit: "contain", opacity: atLast ? 0.7 : 1 }}
                draggable={false}
              />
            </div>
          </div>

          <div
            onClick={() => !atFirst && setImgIndex((i) => Math.max(0, i - 1))}
            style={{ position: "absolute", left: 0, top: 64, bottom: 0, width: "35%", cursor: atFirst ? "default" : "w-resize", zIndex: 1 }}
          />
          <div
            onClick={() => !atLast && setImgIndex((i) => Math.min(active.images.length - 1, i + 1))}
            style={{ position: "absolute", right: 0, top: 64, bottom: 0, width: "35%", cursor: atLast ? "default" : "e-resize", zIndex: 1 }}
          />

          <button onClick={closeModal} style={{ position: "absolute", right: 12, top: 12, zIndex: 10, ...btnStyle }}>
            ✕
          </button>

          <div style={{ position: "absolute", left: 0, right: 0, bottom: 14, display: "flex", justifyContent: "center", gap: 10, zIndex: 10 }}>
            {active.images.map((_, i) => (
              <button key={i} onClick={() => setImgIndex(i)} aria-label={`imagen ${i + 1}`} style={dotStyle(i === imgIndex)} />
            ))}
          </div>
        </div>

        <div style={{ padding: 14, borderTop: "1px solid #e5e5e5", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ color: "#6f6f6f", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>
            {displayCode(active)}
            {active.drop ? ` — ${active.drop}` : ""}
            {typeof active.priceUYU === "number" ? ` — ${formatPriceUYU(active.priceUYU)}` : ""}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.keys(active.stockBySize).map((s) => {
              const total = active.stockBySize[s] ?? 0;
              const used = qtyInCart(active.code, s);
              const left = total - used;

              const disabled = left <= 0;
              const selected = s === size;

              return (
                <button
                  key={s}
                  onClick={() => !disabled && setSize(s)}
                  disabled={disabled}
                  style={{
                    ...btnStyle,
                    opacity: disabled ? 0.35 : 1,
                    cursor: disabled ? "not-allowed" : "pointer",
                    borderColor: selected ? "#b6b6b6" : "#e5e5e5",
                    background: selected ? "#f2f2f2" : "white",
                    color: "black",
                  }}
                  title={disabled ? "Agotado" : ""}
                >
                  {s}
                </button>
              );
            })}
          </div>

          {/* Checkout minimal dentro del modal */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <select style={field} value={shippingType} onChange={(e) => setType(e.target.value as ShippingType)}>
              <option value="">Entrega</option>
              <option value="retiro">Retiro</option>
              <option value="mvdeo">Envío Montevideo</option>
              <option value="interior">Envío Interior</option>
            </select>

            {shippingType === "mvdeo" ? (
              <select style={field} value={shippingZoneLabel} onChange={(e) => setShippingZoneLabel(e.target.value)}>
                <option value="">Zona</option>
                {MVDEO_ZONES.map((z) => (
                  <option key={z.label} value={z.label}>
                    {z.label} — {formatPriceUYU(z.cost)}
                  </option>
                ))}
              </select>
            ) : null}

            {shippingType === "interior" ? (
              <div style={{ fontSize: 12, letterSpacing: 1, color: "#6f6f6f" }}>
                {INTERIOR.label} — {formatPriceUYU(INTERIOR.cost)}
              </div>
            ) : null}

            {shippingType && shippingType !== "retiro" ? (
              <input
                style={field}
                placeholder={shippingType === "interior" ? "Dirección / Depto / Ciudad" : "Dirección / Barrio"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            ) : null}

            <input style={field} placeholder="Nombre" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

            <div style={{ fontSize: 12, letterSpacing: 1, color: "#6f6f6f" }}>
              TOTAL: {formatPriceUYU(finalTotal)} UYU
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => addToCart(active.code, size)}
              style={{ ...btnStyle, opacity: inStock ? 1 : 0.5, cursor: inStock ? "pointer" : "not-allowed" }}
              disabled={!inStock}
              title={!size ? "Elegí talle" : !inStock ? "Agotado" : ""}
            >
              AGREGAR AL CARRITO
            </button>

            <a
              href={wpp}
              target="_blank"
              rel="noreferrer"
              style={{
                ...btnStyle,
                display: "inline-flex",
                alignItems: "center",
                opacity: readyOneItem ? 1 : 0.45,
                pointerEvents: readyOneItem ? "auto" : "none",
              }}
              title={!readyOneItem ? "Completar entrega + nombre" : ""}
            >
              INICIAR COMPRA →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
