import { Link, useParams } from "wouter";
import { useGetProperty } from "@workspace/api-client-react";

const WA_NUMBER = "919667451381";

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data: property, isLoading, isError } = useGetProperty(id);

  if (isLoading) {
    return (
      <PageShell>
        <div style={{ textAlign: "center", padding: "120px 0", color: "#666" }}>
          <div style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase" }}>Loading…</div>
        </div>
      </PageShell>
    );
  }

  if (isError || !property) {
    return (
      <PageShell>
        <div style={{ textAlign: "center", padding: "120px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>◇</div>
          <p style={{ color: "#888", fontSize: 16 }}>Property not found.</p>
          <Link href="/properties" style={{ color: "#C9A84C", fontSize: 13, letterSpacing: "0.1em" }}>← Back to listings</Link>
        </div>
      </PageShell>
    );
  }

  const waMessage = encodeURIComponent(
    `Hello, I am interested in the property "${property.title}" listed at ${property.price} in ${property.location}. Please share more details.`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <PageShell>
      {/* Breadcrumb */}
      <div style={{ marginBottom: 40, display: "flex", alignItems: "center", gap: 8 }}>
        <Link href="/properties" style={{ color: "#666", fontSize: 12, letterSpacing: "0.1em", textDecoration: "none" }}>Properties</Link>
        <span style={{ color: "#333" }}>›</span>
        <span style={{ color: "#888", fontSize: 12 }}>{property.title}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 48 }}>
        {/* Left column */}
        <div>
          {/* Image */}
          <div style={{ aspectRatio: "16/9", background: "#1a1a1a", borderRadius: 4, overflow: "hidden", marginBottom: 36, position: "relative" }}>
            {property.imageUrl ? (
              <img src={property.imageUrl} alt={property.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 56, color: "#2a2a2a" }}>◇</span>
                <span style={{ fontSize: 12, color: "#444", letterSpacing: "0.15em", textTransform: "uppercase" }}>{property.propertyType}</span>
              </div>
            )}
            <div style={{
              position: "absolute", top: 16, left: 16,
              background: property.type === "buy" ? "#C9A84C" : "transparent",
              border: property.type === "rent" ? "1px solid #C9A84C" : "none",
              color: property.type === "buy" ? "#0a0a0a" : "#C9A84C",
              fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "5px 14px", borderRadius: 2, fontWeight: 600,
            }}>
              {property.type === "buy" ? "For Sale" : "For Rent"}
            </div>
          </div>

          {/* Title & price */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, color: "#C9A84C", letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 8px" }}>
              {property.location} · {property.propertyType}
            </p>
            <h1 style={{ fontSize: 32, fontWeight: 400, margin: "0 0 16px", lineHeight: 1.3 }}>
              {property.title}
            </h1>
            <p style={{ fontSize: 30, color: "#C9A84C", fontWeight: 600, margin: 0 }}>
              {property.price}
            </p>
          </div>

          {/* Specs */}
          {(property.beds || property.baths || property.area) && (
            <div style={{ display: "flex", gap: 28, background: "#111", border: "1px solid #2a2a2a", borderRadius: 4, padding: "20px 24px", marginBottom: 32 }}>
              {property.beds && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{property.beds}</div>
                  <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.15em", textTransform: "uppercase" }}>Bedrooms</div>
                </div>
              )}
              {property.baths && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{property.baths}</div>
                  <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.15em", textTransform: "uppercase" }}>Bathrooms</div>
                </div>
              )}
              {property.area && (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{property.area}</div>
                  <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.15em", textTransform: "uppercase" }}>Area</div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {property.description && (
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 16 }}>About this property</h2>
              <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.8, margin: 0 }}>{property.description}</p>
            </div>
          )}
        </div>

        {/* Right column — contact card */}
        <div>
          <div style={{ position: "sticky", top: 32, background: "#111", border: "1px solid #2a2a2a", borderRadius: 4, padding: "32px 28px" }}>
            <div style={{ textAlign: "center", marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#1a1a1a", border: "2px solid #C9A84C", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 24, color: "#C9A84C" }}>S</span>
              </div>
              <p style={{ color: "#C9A84C", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 4px" }}>Private Advisory</p>
              <p style={{ color: "#fff", fontSize: 16, margin: 0 }}>Mrs Sadhna</p>
              <p style={{ color: "#666", fontSize: 12, margin: "4px 0 0" }}>Senior Real Estate Advisor</p>
            </div>

            <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, marginBottom: 28, textAlign: "center" }}>
              Interested in this property? Connect directly with Mrs Sadhna for a private consultation.
            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                width: "100%", padding: "14px 0",
                background: "#25D366", color: "#fff",
                textDecoration: "none", borderRadius: 4,
                fontSize: 14, fontWeight: 600, letterSpacing: "0.05em",
                marginBottom: 12,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enquire on WhatsApp
            </a>

            <a
              href="mailto:anovai.magency@gmail.com"
              style={{
                display: "block", textAlign: "center", padding: "12px 0",
                border: "1px solid #2a2a2a", color: "#888",
                textDecoration: "none", borderRadius: 4,
                fontSize: 13, letterSpacing: "0.05em",
              }}
            >
              anovai.magency@gmail.com
            </a>

            <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #1a1a1a", textAlign: "center" }}>
              <p style={{ color: "#555", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
                Listed {new Date(property.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "Georgia, serif" }}>
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
        {children}
      </main>
    </div>
  );
}
