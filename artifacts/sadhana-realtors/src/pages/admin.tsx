import { useState } from "react";
import { Link } from "wouter";
import {
  useListProperties,
  useCreateProperty,
  useDeleteProperty,
} from "@workspace/api-client-react";
import type { CreatePropertyBody } from "@workspace/api-client-react";

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

const emptyForm: Omit<CreatePropertyBody, "type"> & { type: "buy" | "rent" } = {
  title: "",
  price: "",
  priceValue: 0,
  location: LOCATIONS[0],
  type: "buy",
  propertyType: "Apartment",
  description: "",
  imageUrl: "",
  beds: null,
  baths: null,
  area: "",
};

export default function AdminPage() {
  const [form, setForm] = useState({ ...emptyForm });
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { data: properties, isLoading, refetch } = useListProperties({});

  const createMutation = useCreateProperty({
    mutation: {
      onSuccess: () => {
        setForm({ ...emptyForm });
        setSuccessMsg("Property added successfully.");
        setErrorMsg("");
        void refetch();
        setTimeout(() => setSuccessMsg(""), 4000);
      },
      onError: () => {
        setErrorMsg("Failed to add property. Please check all required fields.");
      },
    },
  });

  const deleteMutation = useDeleteProperty({
    mutation: {
      onSuccess: () => {
        setDeletingId(null);
        void refetch();
      },
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    const payload: CreatePropertyBody = {
      ...form,
      priceValue: Number(form.priceValue),
      beds: form.beds ? Number(form.beds) : null,
      baths: form.baths ? Number(form.baths) : null,
      description: form.description || null,
      imageUrl: form.imageUrl || null,
      area: form.area || null,
    };
    createMutation.mutate({ data: payload });
  }

  function handleDelete(id: number) {
    if (!window.confirm("Delete this property? This cannot be undone.")) return;
    setDeletingId(id);
    deleteMutation.mutate({ id });
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#0a0a0a", border: "1px solid #2a2a2a",
    color: "#fff", padding: "10px 14px", fontSize: 13, borderRadius: 2,
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 11, letterSpacing: "0.2em",
    color: "#888", textTransform: "uppercase", marginBottom: 8,
  };

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
            <Link href="/properties" style={{ color: "#aaa", textDecoration: "none", fontSize: 13, letterSpacing: "0.1em" }}>Properties</Link>
            <Link href="/admin" style={{ color: "#C9A84C", textDecoration: "none", fontSize: 13, letterSpacing: "0.1em", borderBottom: "1px solid #C9A84C", paddingBottom: 2 }}>Admin</Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 40px" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: "#C9A84C", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>Management</p>
          <h1 style={{ fontSize: 36, fontWeight: 400, margin: 0 }}>Admin Panel</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {/* Add property form */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 28 }}>Add New Listing</h2>

            {successMsg && (
              <div style={{ background: "#0d2b1a", border: "1px solid #1a5e36", color: "#4ade80", padding: "12px 16px", borderRadius: 4, marginBottom: 20, fontSize: 13 }}>
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div style={{ background: "#2b0d0d", border: "1px solid #5e1a1a", color: "#f87171", padding: "12px 16px", borderRadius: 4, marginBottom: 20, fontSize: 13 }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: 18 }}>
                {/* Type toggle */}
                <div>
                  <label style={labelStyle}>Listing Type</label>
                  <div style={{ display: "flex", border: "1px solid #2a2a2a", borderRadius: 4, width: "fit-content" }}>
                    {(["buy", "rent"] as const).map((t) => (
                      <button
                        key={t} type="button"
                        onClick={() => setForm((f) => ({ ...f, type: t }))}
                        style={{
                          padding: "9px 28px",
                          background: form.type === t ? "#C9A84C" : "transparent",
                          color: form.type === t ? "#0a0a0a" : "#888",
                          border: "none", cursor: "pointer", fontSize: 13,
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          fontWeight: form.type === t ? 700 : 400,
                        }}
                      >
                        {t === "buy" ? "Buy" : "Rent"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label style={labelStyle}>Title *</label>
                  <input
                    required value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Luxury 4BHK in Golf Links"
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {/* Price display */}
                  <div>
                    <label style={labelStyle}>Price Label *</label>
                    <input
                      required value={form.price}
                      onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                      placeholder="e.g. ₹8.5 Cr or ₹1.2L/mo"
                      style={inputStyle}
                    />
                  </div>
                  {/* Price value for filtering */}
                  <div>
                    <label style={labelStyle}>Price Value (₹) *</label>
                    <input
                      required type="number" min={0}
                      value={form.priceValue || ""}
                      onChange={(e) => setForm((f) => ({ ...f, priceValue: Number(e.target.value) }))}
                      placeholder="e.g. 85000000"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {/* Location */}
                  <div>
                    <label style={labelStyle}>Location *</label>
                    <select
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      style={inputStyle}
                    >
                      {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  {/* Property type */}
                  <div>
                    <label style={labelStyle}>Property Type *</label>
                    <select
                      value={form.propertyType}
                      onChange={(e) => setForm((f) => ({ ...f, propertyType: e.target.value }))}
                      style={inputStyle}
                    >
                      {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Beds</label>
                    <input
                      type="number" min={0}
                      value={form.beds ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, beds: e.target.value ? Number(e.target.value) : null }))}
                      placeholder="e.g. 4"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Baths</label>
                    <input
                      type="number" min={0}
                      value={form.baths ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, baths: e.target.value ? Number(e.target.value) : null }))}
                      placeholder="e.g. 3"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Area</label>
                    <input
                      value={form.area ?? ""}
                      onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
                      placeholder="e.g. 4,200 sq.ft"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label style={labelStyle}>Image URL</label>
                  <input
                    value={form.imageUrl ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                    placeholder="https://..."
                    style={inputStyle}
                  />
                </div>

                {/* Description */}
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    rows={4}
                    value={form.description ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Brief description of the property..."
                    style={{ ...inputStyle, resize: "vertical", fontFamily: "Georgia, serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  style={{
                    background: "#C9A84C", color: "#0a0a0a",
                    border: "none", padding: "14px 28px",
                    fontSize: 13, letterSpacing: "0.15em",
                    textTransform: "uppercase", fontWeight: 700,
                    cursor: createMutation.isPending ? "not-allowed" : "pointer",
                    borderRadius: 4, opacity: createMutation.isPending ? 0.7 : 1,
                  }}
                >
                  {createMutation.isPending ? "Adding…" : "Add Property"}
                </button>
              </div>
            </form>
          </div>

          {/* Existing listings */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 28 }}>
              Existing Listings {properties ? `(${properties.length})` : ""}
            </h2>

            {isLoading ? (
              <div style={{ color: "#666", fontSize: 13, letterSpacing: "0.1em" }}>Loading…</div>
            ) : !properties || properties.length === 0 ? (
              <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 4, padding: "40px 24px", textAlign: "center" }}>
                <p style={{ color: "#555", fontSize: 13 }}>No properties yet. Add your first listing.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: "70vh", overflowY: "auto", paddingRight: 4 }}>
                {properties.map((p) => (
                  <div
                    key={p.id}
                    style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 4, padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 16 }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{
                          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600,
                          padding: "2px 8px", borderRadius: 2,
                          background: p.type === "buy" ? "#C9A84C" : "transparent",
                          border: p.type === "rent" ? "1px solid #C9A84C" : "none",
                          color: p.type === "buy" ? "#0a0a0a" : "#C9A84C",
                        }}>
                          {p.type === "buy" ? "Sale" : "Rent"}
                        </span>
                        <span style={{ fontSize: 10, color: "#555" }}>{p.propertyType}</span>
                      </div>
                      <p style={{ fontWeight: 400, fontSize: 14, margin: "0 0 2px", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</p>
                      <p style={{ color: "#888", fontSize: 12, margin: "0 0 2px" }}>{p.location}</p>
                      <p style={{ color: "#C9A84C", fontSize: 13, margin: 0 }}>{p.price}</p>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      <Link
                        href={`/properties/${p.id}`}
                        style={{ fontSize: 11, color: "#666", textDecoration: "none", padding: "6px 12px", border: "1px solid #2a2a2a", borderRadius: 2, letterSpacing: "0.1em" }}
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                        style={{
                          fontSize: 11, color: "#ef4444", background: "transparent",
                          padding: "6px 12px", border: "1px solid #3a1a1a", borderRadius: 2,
                          cursor: deletingId === p.id ? "not-allowed" : "pointer",
                          letterSpacing: "0.1em", opacity: deletingId === p.id ? 0.5 : 1,
                        }}
                      >
                        {deletingId === p.id ? "…" : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
