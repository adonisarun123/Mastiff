'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  Trophy,
  Target,
  CheckCircle,
  MessageCircle,
  Star,
  Globe,
  Award,
  Sparkles,
  Heart,
  Shield,
  MapPin
} from "lucide-react";
import { useRef, type ReactNode } from "react";
import { usePopup } from "@/components/popup-provider";
import { HomepageMediaService } from "@/lib/homepage-media";
import ProgressiveVideo from "@/components/ui/progressive-video";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

// `reviews` is the server-rendered Google reviews section (see page.tsx).
export default function HomeClient({ reviews }: { reviews?: ReactNode }) {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const { openPopup } = usePopup();

  // Get dynamic media URLs
  const serviceImages = HomepageMediaService.getServiceImages();
  const heroVideo = HomepageMediaService.getHeroVideo();
  const portfolioImages = HomepageMediaService.getPortfolioImages();

  // Event services data with local event photos
  const services = [
    {
      id: "01",
      title: "Business Events",
      href: "/corporate-event-management-company-bangalore",
      description: "As business event management we are specialized in crafting extraordinary business conferences that inspire, educate, and propel organizations to new heights.",
      icon: Target,
      gradient: "from-[#F9A625] to-[#2A3959]",
      features: ["Conferences", "All Hands", "Annual Kick Offs", "Summits", "Leadership Meets", "Launches – Product, Brand, Facility", "Customer Meets", "Dealer Meets", "Hybrid Events"],
      stats: { events: "300+", clients: "Fortune 500" },
      image: serviceImages.businessEvents
    },
    {
      id: "02",
      title: "Celebration Galore",
      href: "/services/employee-engagement-activities",
      description: "Celebrate your success with style and distinction. At White Massif Corporate event management, we understand that corporate celebrations go beyond just marking a date on the calendar.",
      icon: Sparkles,
      gradient: "from-[#2A3959] to-[#F9A625]",
      features: ["Annual Day Celebration", "Themed Celebrations", "Employee Engagement", "Rewards & Recognition", "Team Offsites", "Gala Nights", "Family Days"],
      stats: { events: "400+", clients: "Corporates" },
      image: serviceImages.celebrationGalore
    },
    {
      id: "03",
      title: "Inauguration",
      href: "/product-launch-event-management-in-bangalore",
      description: "We specialize in end-to-end execution of inaugurations tailored to your brand identity.From thematic décor and entry arch setups to floral arrangements and ribbon-cutting stations, we cover it all.",
      icon: Award,
      gradient: "from-[#F9A625] to-[#2A3959]",
      features: ["Office Launches", "Plant Inaugurations", "Facility Tours & Walkthroughs", "Brand Showcases", "CEO / Leadership Addresses", "Media & Press Briefings", "VIP Guest Management", "Customized Stage & Tech Setups", "Cultural & Entertainment Segments"],
      stats: { events: "200+", clients: "Industry Leaders" },
      image: serviceImages.inauguration
    },
    {
      id: "04",
      title: "Industry Convention, Customer & Dealers Meet",
      href: "/services/dealer-and-customer-meet-events",
      description: "In an ever-evolving business landscape staying at the forefront of innovation, collaboration, and knowledge exchange is paramount.",
      icon: Users,
      gradient: "from-[#2A3959] to-[#F9A625]",
      features: ["Industry Conventions", "Customer Connect Programs", "Dealer & Distributor Meets", "Product Launches", "Business Networking Events", "Panel Discussions & Fireside Chats", "Partner Appreciation Events"],
      stats: { events: "200+", clients: "Global Brands" },
      image: serviceImages.dealersMeet
    },
    {
      id: "05",
      title: "Hybrid Events",
      href: "/virtual-and-hybrid-events-in-bangalore",
      description: "Tailor made services to seamlessly execute hybrid events, combining the best of in person and virtual components for a dynamic and engaging experience.",
      icon: Globe,
      gradient: "from-[#F9A625] to-[#2A3959]",
      features: ["Hybrid Townhalls", "Virtual + In-Person Summits", "Online Product Launches", "Hybrid Conferences & Panels", "Remote Team Engagement"],
      stats: { events: "250+", clients: "Global Teams" },
      image: serviceImages.hybridEvents
    },
    {
      id: "06",
      title: "Special Projects",
      href: "/services/industry-convention-project-events",
      description: "In a world where one-size-fits-all doesn't suffice, We design tailor-made experiences, where every detail is meticulously crafted to align with the unique vision, preferences, and objectives of our clients.",
      icon: Star,
      gradient: "from-[#2A3959] to-[#F9A625]",
      features: ["Government & Public Sector Events", "International Delegation Visits", "Investor Meets", "CSR Impact Showcases"],
      stats: { events: "300+", clients: "Institutions" },
      image: serviceImages.specialProjects
    }
  ];

  const whyChooseUs = [
    {
      icon: Heart,
      title: "Aligned with Your Vision",
      description: "We don't just take briefs we tune into your ambitions. Your goals shape every choice, every detail, every moment."
    },
    {
      icon: Shield,
      title: "Built on Real Outcomes",
      description: "Not just promises, but a proven track record. Years of consistent delivery and 1000+ events have taught us what truly works."
    },
    {
      icon: Sparkles,
      title: "Driven by Creative Impact",
      description: "From striking ideas to seamless execution, we design events that resonate. Fresh concepts, thoughtful storytelling and lasting Impression"
    },
    {
      icon: Users,
      title: "A Partner from Start to Finish",
      description: "We work as your internal team, not outsiders. With shared ownership and transparent collaboration, you'll always know we've got your back."
    }
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Pure Video Section */}
      <section className="relative h-[56.25vw] max-h-screen md:h-screen overflow-hidden">
        {/* Full Video Background */}
        <div className="absolute inset-0 z-0 bg-[#2A3959]">
          <ProgressiveVideo
            src={heroVideo.src}
            mobileSrc={heroVideo.mobileSrc}
            poster={heroVideo.poster}
            fallbackImage={heroVideo.poster}
            priority
            preload="metadata"
            label="White Massif showreel"
            className="absolute inset-0 w-full h-full"

            onError={(error) => console.error('Video playback error:', error)}
          />

          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/10 z-10" />
        </div>

        {/* Minimal Top Badge. Offset clears the fixed header (h-16, lg:h-20), which hid it.
            Centred with auto margins: framer-motion's inline transform overrode -translate-x-1/2. */}
        <motion.div
          className="absolute top-24 lg:top-28 inset-x-0 mx-auto w-fit z-20"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-sm px-4 py-2">
            <MapPin className="w-4 h-4 mr-2" />
            Bangalore's Premier Event Management
          </Badge>
        </motion.div>

        {/* Scroll Indicator. Only where the hero is full-screen (md+); below that the hero is a
            short 16:9 strip, the next section is already in view, and it would hit the badge. */}
        <motion.div
          className="hidden md:block absolute bottom-8 inset-x-0 mx-auto w-fit text-white z-20"
          initial={false}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
            </div>
            <span className="text-xs mt-2 text-white/80">Scroll</span>
          </div>
        </motion.div>
      </section>

      {/* Hero Content Section */}
      <section ref={heroRef} className="relative py-16 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Premium Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full mb-8 micro-glow"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide">Award-Winning Event Creators</span>
            </motion.div>

            {/* Main Headline */}
            {/* Static (not fade-in) so the largest text renders immediately for LCP, and the
                heading names the service and city it should rank for. */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display leading-[0.9] mb-8 text-[#2A3959]">
              <span className="block text-sm md:text-base font-body font-semibold tracking-[0.2em] uppercase text-[#F9A625] mb-5 leading-normal">
                Corporate Event Management Company in Bangalore
              </span>
              <span className="block">Crafting Corporate Gatherings</span>
              <span className="block">into <span className="text-[#F9A625]">Remarkable</span> Experiences</span>
            </h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl mb-12 font-body max-w-5xl mx-auto text-neutral-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              We Are Creators. Writers. Producers. Experiential Designers. Idea Generators. Visionaries. Technical Directors. Logistic Masters. Entertainment Directors. Architects of Memories. Dreamers. Doers.
            </motion.p>

            {/* CTA Section */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button
                onClick={() => openPopup('hero-cta')}
                className="btn-primary group px-8 py-4 text-lg"
              >
                <span>Start Your Event Journey</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="border-2 border-[#2A3959] text-[#2A3959] hover:bg-[#2A3959] hover:text-white hover:border-[#2A3959] font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">View our work</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                </Button>
              </Link>
            </motion.div>

            {/* Key Highlights */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-8 text-sm font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="flex items-center gap-2 text-[#2A3959]">
                <Trophy className="w-4 h-4 text-[#F9A625]" />
                <span>12+ Years of Excellence</span>
              </div>
              <div className="flex items-center gap-2 text-[#2A3959]">
                <Users className="w-4 h-4 text-[#F9A625]" />
                <span>1000+ Events Delivered</span>
              </div>
              <div className="flex items-center gap-2 text-[#2A3959]">
                <Star className="w-4 h-4 text-[#F9A625]" />
                <span>2M+ Audience Engaged</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Events in Action Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 text-[#2A3959] leading-tight max-w-4xl mx-auto">
                Every Event Is A <span className="text-[#F9A625]">Masterpiece</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                With over a decade of experience in Bangalore's corporate event space, we transform gatherings into landmark experiences. From bold ideas to seamless execution we make it happen.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={fadeInUp}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group max-w-md mx-auto w-full"
                  whileHover={{ y: -8 }}
                >
                  {/* Event Image */}
                  <div className="relative h-64 overflow-hidden bg-[#2A3959]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={85}
                      priority={false}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-40`} />

                    {/* Floating Icon */}
                    <div className="absolute top-6 left-6">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    </div>

                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-bold mb-4 text-[#2A3959] group-hover:text-[#F9A625] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed text-sm lg:text-base">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#F9A625] rounded-full flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Crawlable link to the service page (the cards used to link nowhere). */}
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 font-semibold text-[#2A3959] hover:text-[#F9A625] transition-colors"
                    >
                      Explore {service.title}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-12 lg:mt-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Link href="/services">
              <Button
                size="lg"
                className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-semibold px-8 py-4 rounded-full text-lg"
              >
                Explore All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Events Gallery Showcase */}
      <section className="py-16 lg:py-20 bg-[#2A3959]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 text-white leading-tight max-w-4xl mx-auto">
                Where Vision Meets <span className="text-[#F9A625]">Precision</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Transforming corporate events with flawless planning and strategic impact.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {portfolioImages.slice(0, 6).map((image, index) => {
              const portfolioItems = [
                { title: "Corporate Conference", category: "Business" },
                { title: "Cultural Celebration", category: "Cultural" },
                { title: "Hybrid Event", category: "Technology" },
                { title: "Team Building", category: "Corporate" },
                { title: "Annual Year Celebration", category: "Corporate" },
                { title: "Award Ceremony", category: "Recognition" }
              ];
              const item = { image, ...portfolioItems[index] };
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative group overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer max-w-md mx-auto w-full bg-gray-800"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-lg font-semibold">{item.title}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="text-center mt-12 lg:mt-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Link href="/portfolio">
              <Button
                variant="outline"
                size="lg"
                className="border-[#F9A625] text-[#F9A625] hover:bg-[#F9A625] hover:text-black px-8 py-4 rounded-full text-lg"
              >
                View Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 text-[#2A3959] leading-tight max-w-4xl mx-auto">
                The <span className="text-[#F9A625]">White Massif</span> Difference
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto text-center font-body">
                Why Brands Trust White Massif - Our proven approach to creating exceptional corporate experiences.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center group max-w-sm mx-auto w-full"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#F9A625] to-[#2A3959] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-4 text-[#2A3959] group-hover:text-[#F9A625] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#2A3959] to-[#1E2A3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6 leading-tight">
                Four Steps to <span className="text-[#F9A625]">Extraordinary</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Proven process. Predictable excellence. Every single time.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Dream Discovery",
                description: "We don't just take briefs. We uncover dreams. Deep dive into your vision, values, and victory metrics.",
                color: "from-[#F9A625] to-[#2A3959]"
              },
              {
                step: "02",
                title: "Strategic Sculpting",
                description: "Your vision meets our expertise. Strategies carved with precision. Concepts crafted with care.",
                color: "from-[#2A3959] to-[#F9A625]"
              },
              {
                step: "03",
                title: "Flawless Execution",
                description: "Show time. Every element orchestrated. Every moment choreographed. Perfection, delivered.",
                color: "from-[#F9A625] to-[#2A3959]"
              },
              {
                step: "04",
                title: "Legacy Creation",
                description: "The event ends. The impact begins. Relationships deepened. Success stories written.",
                color: "from-[#2A3959] to-[#F9A625]"
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group"
              >
                {/* Connection Line - Only Desktop */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-[#F9A625] to-transparent z-10"></div>
                )}

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#F9A625]/50 transition-all duration-300 hover:bg-white/15 group-hover:scale-105 h-full">
                  <div className="text-center">
                    {/* Step Number */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${process.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl font-bold text-white">{process.step}</span>
                    </div>


                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#F9A625] transition-colors duration-300">
                      {process.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Rating & Reviews */}
      {reviews}

      {/* Call to Action */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#2A3959] to-[#1E2A3A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A3959]/90 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="text-white">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 leading-tight">
                Ready to <span className="text-[#F9A625]">Contact Us?</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Get a free consultation and quote for your corporate event. Professional planning guaranteed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Users, title: "1000+ Events", desc: "Executed with precision" },
                  { icon: Star, title: "2M+ Audience Engaged", desc: "Memorable experiences" },
                  { icon: Trophy, title: "175+ Corporate Clients", desc: "Trusted partnerships" },
                  { icon: Target, title: "60+ Destinations", desc: "Across India & Beyond" }
                ].map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <FeatureIcon className="w-6 h-6 text-[#F9A625] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-white/80 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    className="bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-heading px-8 py-4 rounded-full text-lg"
                  >
                    View our work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://wa.me/917411272227?text=Hello%20White%20Massif!%20I%20would%20like%20to%20inquire%20about%20your%20event%20management%20services." target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-[#2A3959] px-8 py-4 rounded-full text-lg flex items-center"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp us
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              {/* Enhanced visual elements for better balance */}
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#F9A625]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-[#F9A625]" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-display text-white mb-4">
                    Meet Our Expert Team
                  </h3>
                  <p className="text-white/80 mb-8 max-w-md mx-auto">
                    Our experienced professionals are ready to bring your vision to life with strategic planning and creative excellence.
                  </p>
                  <Link href="/team">
                    <Button
                      variant="outline"
                      className="border-[#F9A625] text-[#F9A625] hover:bg-[#F9A625] hover:text-black px-8 py-4 rounded-full transition-all duration-300"
                    >
                      Discover Our Team
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F9A625]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}