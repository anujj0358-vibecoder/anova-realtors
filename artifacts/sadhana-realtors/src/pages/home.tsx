import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, ChevronRight, X, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const properties = {
  buy: [
    { id: 1, title: "Luxury 4BHK in Greater Kailash", price: "₹5.2 Cr", location: "South Delhi", specs: "4 Beds • 4 Baths • 3,200 sq.ft", image: "/images/gk.png" },
    { id: 2, title: "Modern Builder Floor in Defence Colony", price: "₹3.8 Cr", location: "South Delhi", specs: "3 Beds • 3 Baths • 2,400 sq.ft", image: "/images/defcol.png" },
    { id: 3, title: "Premium Villa in Vasant Vihar", price: "₹8.5 Cr", location: "South Delhi", specs: "5 Beds • 6 Baths • 6,500 sq.ft", image: "/images/vasant.png" }
  ],
  rent: [
    { id: 4, title: "Furnished 3BHK in Safdarjung Enclave", price: "₹1.2L/month", location: "South Delhi", specs: "3 Beds • 3 Baths • 2,100 sq.ft", image: "/images/safdarjung.png" },
    { id: 5, title: "Penthouse in Golf Links", price: "₹2.5L/month", location: "Central Delhi", specs: "4 Beds • 5 Baths • 4,800 sq.ft", image: "/images/golflinks.png" },
    { id: 6, title: "Garden Villa in Anand Niketan", price: "₹95K/month", location: "South Delhi", specs: "3 Beds • 3 Baths • 2,800 sq.ft", image: "/images/anandniketan.png" }
  ]
};

const locations = [
  "Aradhana Enclave",
  "Anand Lok",
  "Anand Niketan",
  "Alaknanda",
  "Chanakyapuri",
  "Chittaranjan Park",
  "Chhatarpur",
  "Defence Colony",
  "East of Kailash",
  "New Friends Colony",
  "Friends Colony",
  "Golf Links",
  "Geetanjali Enclave",
  "Greater Kailash I (GK 1)",
  "Greater Kailash II (GK 2)",
  "Greater Kailash III (GK 3)",
  "Green Park",
  "Jor Bagh",
  "Jungpura",
  "Link Road",
  "Jasola",
  "Kailash Colony",
  "Niti Bagh",
  "Panchsheel Park",
  "Pamposh Enclave",
  "Safdarjung Enclave",
  "Saket",
  "South Extension I",
  "South Extension II",
  "Shanti Niketan",
  "Sukhdev Vihar",
  "Uday Park",
  "Vasant Kunj",
  "Vasant Vihar",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export default function Home() {
  const [listingMode, setListingMode] = useState<"buy" | "rent">("buy");
  const [scrolled, setScrolled] = useState(false);
  const [proModalOpen, setProModalOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    propertyType: "",
    transactionType: "",
    location: "",
    requirement: "",
    company: "",
    designation: ""
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.requirement) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    const message = `Hello, I am interested in a property.

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || "N/A"}
Budget: ${formData.budget || "Not specified"}
Type: ${formData.transactionType || "Not specified"}
Location: ${formData.location || "Not specified"}
Company: ${formData.company || "N/A"}
Designation: ${formData.designation || "N/A"}
Requirement: ${formData.requirement}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/9667451381?text=${encodedMessage}`, "_blank");

    toast({
      title: "Opening WhatsApp",
      description: "You are being redirected to WhatsApp to complete your inquiry.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="font-serif text-2xl font-bold tracking-widest text-white flex items-center gap-2">
            <span className="text-primary">A</span>NOVA
            <span className="font-sans font-light tracking-[0.3em] text-xs uppercase opacity-80 mt-1 ml-2">Realtors</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            <a href="#properties" className="text-white/70 hover:text-primary transition-colors">Properties</a>
            <a href="#about" className="text-white/70 hover:text-primary transition-colors">Heritage</a>
            <a href="#contact" className="text-white/70 hover:text-primary transition-colors">Private Advisory</a>
          </div>
          <Button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 h-12 uppercase tracking-widest text-xs font-semibold"
          >
            Inquire Now
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            src="/images/hero.png"
            alt="Luxury Residence"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="container relative z-10 px-6 md:px-12 text-center mt-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="mb-4 flex items-center justify-center gap-4 text-primary uppercase tracking-[0.3em] text-xs font-semibold">
              <div className="w-12 h-[1px] bg-primary" />
              ANOVA Realtors
              <div className="w-12 h-[1px] bg-primary" />
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] mb-4 tracking-tight">
              Quiet Luxury.<br />
              <span className="text-white/70 italic font-light">Loud Addresses.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-lg text-white/60 mb-12 max-w-xl mx-auto font-light leading-relaxed">
              Exclusive off-market properties across South Delhi's most prestigious addresses.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                onClick={() => document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-12 h-14 uppercase tracking-widest text-sm font-semibold group"
                data-testid="button-view-collection"
              >
                View Collection
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 hover:text-white rounded-none px-12 h-14 uppercase tracking-widest text-sm font-semibold"
                data-testid="button-consultation"
              >
                Request Private Consultation
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">Scroll</span>
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 64] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* Philosophy */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-primary uppercase tracking-[0.2em] text-sm font-semibold mb-6 flex items-center gap-4">
                The Philosophy <div className="w-8 h-[1px] bg-primary" />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                Not just square footage.<br />
                <span className="text-white/60 italic">Generational assets.</span>
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
                <p>
                  At ANOVA Realtors, we understand that real estate at the highest level is not merely a transaction — it is the transfer of heritage. Our portfolio comprises exclusively of South Delhi's most significant private residences.
                </p>
                <p>
                  We operate with absolute discretion, ensuring privacy for both our sellers and our distinguished buyers. Many of our most remarkable properties never reach the public market.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 grid grid-cols-2 gap-10 border-t border-white/10 pt-10">
                <div>
                  <div className="text-4xl font-serif text-primary mb-2">25+</div>
                  <div className="text-sm uppercase tracking-widest text-white/50">Years of Legacy</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-primary mb-2">₹10K+ Cr</div>
                  <div className="text-sm uppercase tracking-widest text-white/50">Volume Handled</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[600px]"
            >
              <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4" />
              <img src="/images/gk.png" alt="Luxury Interior" className="w-full h-full object-cover relative z-10 grayscale-[0.2] contrast-125" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-32 bg-card relative z-10 border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="text-primary uppercase tracking-[0.2em] text-sm font-semibold mb-4 flex items-center gap-4">
                The Collection <div className="w-8 h-[1px] bg-primary" />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif text-white leading-tight">
                Curated Residences
              </motion.h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="flex bg-background p-1 border border-white/10 w-full md:w-auto"
            >
              <button
                onClick={() => setListingMode("buy")}
                data-testid="toggle-buy"
                className={`flex-1 md:w-32 py-3 text-sm uppercase tracking-widest font-semibold transition-all ${listingMode === "buy" ? "bg-primary text-primary-foreground" : "text-white/50 hover:text-white"}`}
              >
                Buy
              </button>
              <button
                onClick={() => setListingMode("rent")}
                data-testid="toggle-rent"
                className={`flex-1 md:w-32 py-3 text-sm uppercase tracking-widest font-semibold transition-all ${listingMode === "rent" ? "bg-primary text-primary-foreground" : "text-white/50 hover:text-white"}`}
              >
                Rent
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {properties[listingMode].map((property, idx) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card
                    className="bg-background border-none rounded-none overflow-hidden group cursor-pointer h-full flex flex-col hover:-translate-y-2 transition-transform duration-500"
                    data-testid={`card-property-${property.id}`}
                  >
                    <div className="relative h-72 overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                      />
                      <div className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur-md px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-white/10 text-white">
                        {property.location}
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col flex-grow border border-t-0 border-white/5 group-hover:border-primary/30 transition-colors duration-500">
                      <div className="text-primary text-2xl font-serif mb-4 font-medium">{property.price}</div>
                      <h3 className="text-xl text-white font-medium mb-4 leading-snug">{property.title}</h3>
                      <div className="text-white/50 text-sm mb-8 font-light tracking-wide">{property.specs}</div>
                      <div className="mt-auto flex items-center text-primary text-sm uppercase tracking-widest font-semibold group-hover:gap-4 transition-all gap-2">
                        View Details <ChevronRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Focus Locations */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-primary uppercase tracking-[0.2em] text-sm font-semibold mb-4 flex items-center justify-center gap-4">
              <div className="w-8 h-[1px] bg-primary" /> Prime Localities <div className="w-8 h-[1px] bg-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              The Epicenters of Power
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {locations.map((loc) => (
              <motion.div
                key={loc}
                variants={fadeInUp}
                className="border border-white/10 px-4 py-5 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-primary/40 transition-all duration-400 group"
                data-testid={`location-${loc.replace(/[\s()]/g, "-").toLowerCase()}`}
              >
                <MapPin className="w-4 h-4 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <span className="text-sm font-light text-white/80 group-hover:text-white transition-colors leading-snug">{loc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact / Private Advisory */}
      <section id="contact" className="py-32 bg-card relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Left — Advisory Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-primary uppercase tracking-[0.2em] text-sm font-semibold mb-6 flex items-center gap-4">
                Private Advisory <div className="w-8 h-[1px] bg-primary" />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif text-white mb-3 leading-tight">
                Initiate a Conversation
              </motion.h2>
              <motion.div variants={fadeInUp} className="mb-8">
                <p className="text-xl font-serif text-primary">Mrs Sadhna</p>
                <p className="text-sm uppercase tracking-widest text-white/50 mt-1">Your Advisory</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="space-y-5 text-white/60 font-light leading-relaxed text-base mb-12">
                <p>
                  Whether acquiring an asset, divesting a property, or seeking bespoke real estate counsel, our partners are at your disposal.
                </p>
                <p>
                  At ANOVA Realtors, we are recognized among Delhi's top property advisors, built on a foundation of trust, integrity, and results. Every transaction is handled with complete transparency and a commitment to excellence.
                </p>
                <p>
                  We don't just facilitate buying or renting — we build long-term relationships that extend far beyond the deal. Thousands of families have trusted us with their dream homes, and our reputation continues to grow through consistent delivery and client satisfaction.
                </p>
                <p className="text-white/80 font-light italic border-l-2 border-primary pl-4">
                  Leading in sales, excelling in service, and standing strong on trust — leading with trust, closing with smiles.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Direct Line</div>
                    <div className="text-xl text-white font-serif">+91 9667451381</div>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Electronic Mail</div>
                    <div className="text-lg text-white font-light">anovai.magency@gmail.com</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Lead Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-background border border-white/10 p-10 md:p-14"
            >
              <h3 className="text-2xl font-serif text-white mb-8">Request Private Consultation</h3>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs uppercase tracking-widest text-white/50">Full Name *</Label>
                    <Input
                      id="name" name="name" value={formData.name} onChange={handleInputChange}
                      className="bg-transparent border-white/10 rounded-none h-12 text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20"
                      placeholder="Jane Doe" required data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-white/50">Phone Number *</Label>
                    <Input
                      id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange}
                      className="bg-transparent border-white/10 rounded-none h-12 text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20"
                      placeholder="+91 98765 43210" required data-testid="input-phone"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-white/50">Email Address</Label>
                    <Input
                      id="email" name="email" type="email" value={formData.email} onChange={handleInputChange}
                      className="bg-transparent border-white/10 rounded-none h-12 text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20"
                      placeholder="jane@example.com" data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-xs uppercase tracking-widest text-white/50">Budget</Label>
                    <Input
                      id="budget" name="budget" value={formData.budget} onChange={handleInputChange}
                      className="bg-transparent border-white/10 rounded-none h-12 text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20"
                      placeholder="e.g. ₹5 Cr or ₹1.5L/month" data-testid="input-budget"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-white/50">Property Type</Label>
                    <Select value={formData.propertyType} onValueChange={(val) => handleSelectChange(val, "propertyType")}>
                      <SelectTrigger className="bg-transparent border-white/10 rounded-none h-12 text-white focus:ring-primary focus:border-primary" data-testid="select-property-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10 text-white rounded-none">
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-white/50">Buy or Rent</Label>
                    <Select value={formData.transactionType} onValueChange={(val) => handleSelectChange(val, "transactionType")}>
                      <SelectTrigger className="bg-transparent border-white/10 rounded-none h-12 text-white focus:ring-primary focus:border-primary" data-testid="select-transaction-type">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10 text-white rounded-none">
                        <SelectItem value="Buy">Buy</SelectItem>
                        <SelectItem value="Rent">Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs uppercase tracking-widest text-white/50">Preferred Location</Label>
                  <Input
                    id="location" name="location" value={formData.location} onChange={handleInputChange}
                    className="bg-transparent border-white/10 rounded-none h-12 text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20"
                    placeholder="e.g. Greater Kailash, Vasant Vihar..." data-testid="input-location"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirement" className="text-xs uppercase tracking-widest text-white/50">Message / Requirement *</Label>
                  <Textarea
                    id="requirement" name="requirement" value={formData.requirement} onChange={handleInputChange}
                    className="bg-transparent border-white/10 rounded-none min-h-[120px] text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20 resize-none"
                    placeholder="Tell us what you are looking for..." required data-testid="textarea-requirement"
                  />
                </div>

                {/* Professional details indicator */}
                {(formData.company || formData.designation) && (
                  <div className="border border-primary/30 p-4 text-xs text-white/60 space-y-1">
                    {formData.company && <p>Company: <span className="text-white">{formData.company}</span></p>}
                    {formData.designation && <p>Designation: <span className="text-white">{formData.designation}</span></p>}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setProModalOpen(true)}
                    className="flex-1 border-white/20 text-white/70 hover:bg-white/5 hover:text-white rounded-none h-12 uppercase tracking-widest text-xs font-semibold"
                    data-testid="button-add-professional"
                  >
                    <Briefcase className="mr-2 w-4 h-4" />
                    Add Professional Details
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 uppercase tracking-widest text-sm font-semibold group"
                    data-testid="button-submit"
                  >
                    Request Private Consultation
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-white/10 py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-serif text-2xl font-bold tracking-widest text-white flex items-center gap-2">
              <span className="text-primary">A</span>NOVA
            </div>
            <p className="text-white/30 text-xs font-light uppercase tracking-widest">
              © 2026 ANOVA Realtors. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-white/30 text-xs uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Professional Details Modal */}
      <Dialog open={proModalOpen} onOpenChange={setProModalOpen}>
        <DialogContent className="bg-card border border-white/10 rounded-none max-w-md p-8 text-white">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="font-serif text-xl text-white">Professional Details</DialogTitle>
              <button
                onClick={() => setProModalOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
                data-testid="button-close-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/50 text-sm font-light mt-2">Optional — add your professional information for a tailored advisory.</p>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-xs uppercase tracking-widest text-white/50">Company Name</Label>
              <Input
                id="company" name="company" value={formData.company} onChange={handleInputChange}
                className="bg-transparent border-white/10 rounded-none h-12 text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20"
                placeholder="e.g. Tata Group" data-testid="input-company"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation" className="text-xs uppercase tracking-widest text-white/50">Your Designation</Label>
              <Input
                id="designation" name="designation" value={formData.designation} onChange={handleInputChange}
                className="bg-transparent border-white/10 rounded-none h-12 text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20"
                placeholder="e.g. Managing Director" data-testid="input-designation"
              />
            </div>
            <Button
              onClick={() => setProModalOpen(false)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 uppercase tracking-widest text-xs font-semibold"
              data-testid="button-save-professional"
            >
              Save Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
