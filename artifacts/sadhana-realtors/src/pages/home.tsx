import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Home() {
  const [listingMode, setListingMode] = useState<"buy" | "rent">("buy");
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    location: "",
    requirement: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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

    const message = `*New Inquiry from Sadhana Realtors Website*
    
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}
*Budget:* ${formData.budget || 'Not specified'}
*Preferred Location:* ${formData.location || 'Not specified'}

*Requirement:*
${formData.requirement}
`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/9667451381?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: "You are being redirected to WhatsApp to complete your inquiry.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="font-serif text-2xl font-bold tracking-widest text-white flex items-center gap-2">
            <span className="text-primary">S</span>ADHANA <span className="font-sans font-light tracking-[0.3em] text-xs uppercase opacity-80 mt-1 ml-2">Realtors</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            <a href="#properties" className="text-white/70 hover:text-primary transition-colors">Properties</a>
            <a href="#about" className="text-white/70 hover:text-primary transition-colors">Heritage</a>
            <a href="#contact" className="text-white/70 hover:text-primary transition-colors">Private Advisory</a>
          </div>
          <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 h-12 uppercase tracking-widest text-xs font-semibold">
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
            alt="Luxury Mansion" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container relative z-10 px-6 md:px-12 text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6 flex items-center justify-center gap-4 text-primary uppercase tracking-[0.3em] text-sm font-semibold">
              <div className="w-12 h-[1px] bg-primary"></div>
              South Delhi's Finest
              <div className="w-12 h-[1px] bg-primary"></div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] mb-8 tracking-tight">
              Quiet Luxury. <br />
              <span className="text-white/70 italic font-light">Loud Addresses.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Curating exclusive off-market properties for discerning clientele in Greater Kailash, Defence Colony, and Vasant Vihar.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-12 h-14 uppercase tracking-widest text-sm font-semibold group">
                View Collection
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 hover:text-white rounded-none px-12 h-14 uppercase tracking-widest text-sm font-semibold">
                Speak to a Broker
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
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

      {/* Intro / Philosophy */}
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
                The Philosophy <div className="w-8 h-[1px] bg-primary"></div>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                Not just square footage. <br/>
                <span className="text-white/60 italic">Generational assets.</span>
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
                <p>
                  At Sadhana Realtors, we understand that real estate at the highest level is not merely a transaction—it is the transfer of heritage. Our portfolio comprises exclusively of South Delhi's most significant private residences.
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
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-primary uppercase tracking-[0.2em] text-sm font-semibold mb-4 flex items-center gap-4">
                The Collection <div className="w-8 h-[1px] bg-primary"></div>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif text-white leading-tight">
                Curated Residences
              </motion.h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex bg-background p-1 border border-white/10 w-full md:w-auto"
            >
              <button 
                onClick={() => setListingMode("buy")}
                className={`flex-1 md:w-32 py-3 text-sm uppercase tracking-widest font-semibold transition-all ${listingMode === "buy" ? "bg-primary text-primary-foreground" : "text-white/50 hover:text-white"}`}
              >
                Purchase
              </button>
              <button 
                onClick={() => setListingMode("rent")}
                className={`flex-1 md:w-32 py-3 text-sm uppercase tracking-widest font-semibold transition-all ${listingMode === "rent" ? "bg-primary text-primary-foreground" : "text-white/50 hover:text-white"}`}
              >
                Lease
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {properties[listingMode].map((property, idx) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="bg-background border-none rounded-none overflow-hidden group cursor-pointer h-full flex flex-col">
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

      {/* Services / Localities */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="text-primary uppercase tracking-[0.2em] text-sm font-semibold mb-4 flex items-center justify-center gap-4">
              <div className="w-8 h-[1px] bg-primary"></div> Prime Localities <div className="w-8 h-[1px] bg-primary"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              The Epicenters of Power
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Greater Kailash', 'Defence Colony', 'Vasant Vihar', 'Golf Links'].map((loc, i) => (
              <div key={loc} className="border border-white/10 p-10 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors duration-500 group">
                <MapPin className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                <h3 className="text-xl font-serif text-white mb-2">{loc}</h3>
                <div className="w-0 h-[1px] bg-primary group-hover:w-12 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-card relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-primary uppercase tracking-[0.2em] text-sm font-semibold mb-6 flex items-center gap-4">
                Private Advisory <div className="w-8 h-[1px] bg-primary"></div>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                Initiate a Conversation
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/60 font-light leading-relaxed text-lg mb-12">
                Whether acquiring an asset, divesting a property, or seeking bespoke real estate counsel, our partners are at your disposal. Connect with us directly or request a callback.
              </motion.p>
              
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
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-background border border-white/10 p-10 md:p-14"
            >
              <h3 className="text-2xl font-serif text-white mb-8">Request a Callback</h3>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs uppercase tracking-widest text-white/50">Full Name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-transparent border-white/10 rounded-none h-12 text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20" 
                      placeholder="Jane Doe" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-white/50">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-transparent border-white/10 rounded-none h-12 text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20" 
                      placeholder="+91 98765 43210" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-white/50">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-transparent border-white/10 rounded-none h-12 text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20" 
                      placeholder="jane@example.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-xs uppercase tracking-widest text-white/50">Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(val) => handleSelectChange(val, 'budget')}>
                      <SelectTrigger className="bg-transparent border-white/10 rounded-none h-12 text-white focus:ring-primary focus:border-primary">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/10 text-white rounded-none">
                        <SelectItem value="2-5cr">₹2 Cr - ₹5 Cr</SelectItem>
                        <SelectItem value="5-10cr">₹5 Cr - ₹10 Cr</SelectItem>
                        <SelectItem value="10-20cr">₹10 Cr - ₹20 Cr</SelectItem>
                        <SelectItem value="20cr+">Above ₹20 Cr</SelectItem>
                        <SelectItem value="rent-under-1l">Rent: Under ₹1L/mo</SelectItem>
                        <SelectItem value="rent-1l-3l">Rent: ₹1L - ₹3L/mo</SelectItem>
                        <SelectItem value="rent-3l+">Rent: Above ₹3L/mo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-xs uppercase tracking-widest text-white/50">Preferred Location</Label>
                  <Select value={formData.location} onValueChange={(val) => handleSelectChange(val, 'location')}>
                    <SelectTrigger className="bg-transparent border-white/10 rounded-none h-12 text-white focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Select locality" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10 text-white rounded-none">
                      <SelectItem value="Greater Kailash">Greater Kailash</SelectItem>
                      <SelectItem value="Defence Colony">Defence Colony</SelectItem>
                      <SelectItem value="Vasant Vihar">Vasant Vihar</SelectItem>
                      <SelectItem value="Safdarjung Enclave">Safdarjung Enclave</SelectItem>
                      <SelectItem value="Golf Links">Golf Links</SelectItem>
                      <SelectItem value="Anand Niketan">Anand Niketan</SelectItem>
                      <SelectItem value="Other South Delhi">Other South Delhi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirement" className="text-xs uppercase tracking-widest text-white/50">Your Requirement *</Label>
                  <Textarea 
                    id="requirement" 
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleInputChange}
                    className="bg-transparent border-white/10 rounded-none min-h-[120px] text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-white/20 resize-none" 
                    placeholder="Tell us what you are looking for..." 
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 uppercase tracking-widest text-sm font-semibold group mt-4">
                  Send via WhatsApp
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-white/10 pt-20 pb-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="font-serif text-3xl font-bold tracking-widest text-white flex items-center gap-2">
              <span className="text-primary">S</span>ADHANA
            </div>
            <div className="flex gap-8 text-sm uppercase tracking-widest text-white/50 font-medium">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-white/30 text-xs font-light uppercase tracking-widest gap-4">
            <p>© 2026 Sadhana Realtors. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
