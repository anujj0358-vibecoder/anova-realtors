import { useState } from "react";
import { Link } from "wouter";
import { useListProperties } from "@workspace/api-client-react";
import type { ListPropertiesParams } from "@workspace/api-client-react";

const LOCATIONS = [
  "Aerocity", "Andrews Ganj", "Anand Niketan", "Chanakyapuri", "Defence Colony",
  "DLF Cyber City", "East of Kailash", "Friendship Colony", "Golf Links",
  "Greater Kailash I", "Greater Kailash II", "Green Park", "Gulmohar Park",
  "Hauz Khas", "Jangpura", "Jor Bagh", "Kailash Colony", "Lodhi Colony",
  "Lodi Road", "Malcha Marg", "Malviya Nagar", "Mehrauli", "Munirka",
  "Nehru Place", "New Friends Colony", "Nizamuddin", "Panchsheel Enclave",
  "Panchsheel Park", "Punjabi Bagh", "RK Puram", "Saket", "Safdarjung",
  "Shanti Niketan", "Siri Fort", "Vasant Kunj",
];

const PROPERTY_TYPES = ["Apartment", "Villa", "Penthouse", "Commercial", "Plot"];

const BUDGET_OPTIONS_BUY = [
  { label: "Any", value: undefined },
  { label: "Under ₹1 Cr", max: 10000000 },
  { label: "₹1–3 Cr", min: 10000000, max: 30000000 },
  { label: "₹3–5 Cr", min: 30000000, max: 50000000 },
  { label: "₹5–10 Cr", min: 50000000, max: 100000000 },
  { label: "Above ₹10 Cr", min: 100000000 },
];

const BUDGET_OPTIONS_RENT = [
  { label: "Any", value: undefined },
  { label: "Under ₹50K/mo", max: 50000 },
  { label: "₹50K–1L/mo", min: 50000, max: 100000 },
  { label: "₹1L–2L/mo", min: 100000, max: 200000 },
  { label: "Above ₹2L/mo", min: 200000 },
];

export default function PropertiesPage() {
  const [listingType, setListingType] = useState<"buy" | "rent">("buy");
  const [location, setLocation] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [budgetIdx, setBudgetIdx] = useState(0);

  const budgetOptions = listingType === "buy" ? BUDGET_OPTIONS_BUY : BUDGET_OPTIONS_RENT;
  const selectedBudget = budgetOptions[budgetIdx];

  const params: ListPropertiesParams = {
    type: listingType,
    location: location || undefined,
    propertyType: propertyType || undefined,
    minBudget: selectedBudget && "min" in selectedBudget ? selectedBudget.min : undefined,
    maxBudget: selectedBudget && "max" in selectedBudget ? selectedBudget.max : undefined,
  };

  const { data: properties, isLoading } = useListProperties(params);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "Georgia, serif" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #2a2a2a", padding: "0 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.12em", color: "#C9A84C" }}>ANOVA</span>
            <span style={{ fontSize: 12, color: "#888", letterSpacing: "0.2em", marginLeft: 8, textTransform: "uppercase" }}>Realtors</span>
          </Link>
          <nav style={{ display: "flex", gap: 32 }}>
            <Link href="/" style={{ color: "#aaa", textDecoration: "none", fontSize: 13, letterSpacing: "0.1em" }}>Home</Link>
            <Link href="/properties" style={{ color: "#C9A84C", textDecoration: "none", fontSize: 13, letterSpacing: "0.1em", borderBottom: "1px solid #C9A84C", paddingBottom: 2 }}>Properties</Link>
            <Link href="/admin" style={{ color: "#aaa", textDecoration: "none", fontSize: 13, letterSpacing: "0.1em" }}>Admin</Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 40px" }}>
        {/* Page title */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: "#C9A84C", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>Curated Listings</p>
          <h1 style={{ fontSize: 36, fontWeight: 400, margin: 0 }}>Premium Properties</h1>
        </div>

        {/* Filters */}
        <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 4, padding: "28px 32px", marginBottom: 48 }}>
          {/* Buy / Rent toggle */}
          <div style={{ display: "flex", gap: 0, marginBottom: 28, border: "1px solid #2a2a2a", borderRadius: 4, width: "fit-content" }}>
            {(["buy", "rent"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setListingType(t); setBudgetIdx(0); }}
                style={{
                  padding: "10px 32px",
                  background: listingType === t ? "#C9A84C" : "transparent",
                  color: listingType === t ? "#0a0a0a" : "#888",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: listingType === t ? 700 : 400,
                  transition: "all 0.2s",
                }}
              >
                {t === "buy" ? "Buy" : "Rent"}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {/* Location */}
            <div>
              <label style={{ display: "block", fontSize: 11, letterSpacing: "0.2em", color: "#888", textTransform: "uppercase", marginBottom: 8 }}>Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#fff", padding: "10px 14px", fontSize: 13, borderRadius: 2, outline: "none" }}
              >
                <option value="">All Locations</option>
                {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* Property type */}
            <div>
              <label style={{ display: "block", fontSize: 11, letterSpacing: "0.2em", color: "#888", textTransform: "uppercase", marginBottom: 8 }}>Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#fff", padding: "10px 14px", fontSize: 13, borderRadius: 2, outline: "none" }}
              >
                <option value="">All Types</option>
                {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label style={{ display: "block", fontSize: 11, letterSpacing: "0.2em", color: "#888", textTransform: "uppercase", marginBottom: 8 }}>Budget</label>
              <select
                value={budgetIdx}
                onChange={(e) => setBudgetIdx(Number(e.target.value))}
                style={{ width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a", color: "#fff", padding: "10px 14px", fontSize: 13, borderRadius: 2, outline: "none" }}
              >
                {budgetOptions.map((b, i) => <option key={i} value={i}>{b.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#666" }}>
            <div style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase" }}>Loading properties…</div>
          </div>
        ) : !properties || properties.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>◇</div>
            <p style={{ color: "#666", fontSize: 14, letterSpacing: "0.1em" }}>No properties found matching your criteria.</p>
            <p style={{ color: "#444", fontSize: 12, marginTop: 8 }}>Try adjusting your filters or browse all listings.</p>
          </div>
        ) : (
          <>
            <p style={{ color: "#666", fontSize: 12, letterSpacing: "0.1em", marginBottom: 28 }}>
              {properties.length} {properties.length === 1 ? "property" : "properties"} found
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function PropertyCard({ property }: { property: { id: number; title: string; price: string; location: string; type: string; propertyType: string; imageUrl?: string | null; beds?: number | null; baths?: number | null; area?: string | null } }) {
  return (
    <Link href={`/properties/${property.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#111",
          border: "1px solid #2a2a2a",
          borderRadius: 4,
          overflow: "hidden",
          cursor: "pointer",
          transition: "border-color 0.2s, transform 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "#C9A84C";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
      >
        {/* Image */}
        <div style={{ aspectRatio: "16/10", background: "#1a1a1a", position: "relative", overflow: "hidden" }}>
          {property.imageUrl ? (
            <img src={property.imageUrl} alt={property.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 32, color: "#333" }}>◇</span>
              <span style={{ fontSize: 11, color: "#444", letterSpacing: "0.1em" }}>{property.propertyType}</span>
            </div>
          )}
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: property.type === "buy" ? "#C9A84C" : "#1a1a1a",
            border: property.type === "rent" ? "1px solid #C9A84C" : "none",
            color: property.type === "buy" ? "#0a0a0a" : "#C9A84C",
            fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "4px 10px", borderRadius: 2, fontWeight: 600,
          }}>
            {property.type === "buy" ? "For Sale" : "For Rent"}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 22px" }}>
          <p style={{ fontSize: 11, color: "#C9A84C", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 6px" }}>
            {property.location}
          </p>
          <h3 style={{ fontSize: 16, fontWeight: 400, margin: "0 0 12px", color: "#fff", lineHeight: 1.4 }}>
            {property.title}
          </h3>
          <p style={{ fontSize: 20, color: "#C9A84C", fontWeight: 600, margin: "0 0 14px" }}>
            {property.price}
          </p>
          {(property.beds || property.baths || property.area) && (
            <div style={{ display: "flex", gap: 16, borderTop: "1px solid #1a1a1a", paddingTop: 14 }}>
              {property.beds && (
                <span style={{ fontSize: 12, color: "#888" }}>
                  <span style={{ color: "#fff" }}>{property.beds}</span> Beds
                </span>
              )}
              {property.baths && (
                <span style={{ fontSize: 12, color: "#888" }}>
                  <span style={{ color: "#fff" }}>{property.baths}</span> Baths
                </span>
              )}
              {property.area && (
                <span style={{ fontSize: 12, color: "#888" }}>
                  <span style={{ color: "#fff" }}>{property.area}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
