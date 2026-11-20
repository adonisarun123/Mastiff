'use client';

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { usePopup } from "@/components/popup-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Sparkles,
  Users, 
  Calendar,
  Trophy,
  Star,
  Target,
  Award,
  Lightbulb,
  Heart,
  Shield,
  Rocket,
  Eye,
  TrendingUp,
  Zap,
  Phone,
  Mail,
  CheckCircle
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutClient() {
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const { openPopup } = usePopup();
  
  // Advanced parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const stats = [
    { number: "12+", label: "Years of Excellence", icon: Calendar, color: "text-blue-500" },
    { number: "1000+", label: "Dreams Realized", icon: Trophy, color: "text-amber-500" },
    { number: "2M+", label: "Lives Touched", icon: Users, color: "text-emerald-500" },
    { number: "35+", label: "Creative Minds", icon: Star, color: "text-purple-500" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Relentless Excellence",
      description: "Good enough never is. We obsess over details others overlook. Excellence isn't a goal—it's our minimum standard.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Heart,
      title: "Emotional Intelligence",
      description: "We don't just plan events. We read rooms, understand hearts, and create moments that resonate on a human level.",
      gradient: "from-rose-500 to-pink-600"
    },
    {
      icon: Rocket,
      title: "Fearless Innovation",
      description: "Status quo is our kryptonite. We push boundaries, embrace the unconventional, and turn 'what if' into 'wow.'",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      icon: Eye,
      title: "Visionary Thinking",
      description: "We see what others miss. Possibilities where others see problems. Magic where others see mundane.",
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  const team = [
    {
      name: "Prakash A Vaswani",
      position: "Director – Client Relations & Strategic Initiatives",
      expertise: "Strategic Planning & Client Relations",
      experience: "15+ Years",
      specialization: "Corporate Events & Business Development",
      achievements: ["Fortune 500 Partnerships", "Industry Recognition", "Strategic Growth"]
    },
    {
      name: "Vinay Kukreja",
      position: "Director – Production, Finance & Operations",
      expertise: "Operations Excellence & Financial Management",
      experience: "12+ Years",
      specialization: "Production Management & Financial Planning",
      achievements: ["Operational Efficiency", "Cost Optimization", "Quality Assurance"]
    }
  ];

  const milestones = [
    {
      year: "2013",
      title: "The Spark",
      description: "Two friends. One dream. Zero clients. Infinite ambition. White Massif is born in a tiny Bangalore office.",
      icon: Rocket
    },
    {
      year: "2016",
      title: "The Breakthrough",
      description: "First Fortune 500 client. First standing ovation. First time we knew—this is bigger than us.",
      icon: TrendingUp
    },
    {
      year: "2019",
      title: "The Revolution",
      description: "Pioneered hybrid events before the world knew it needed them. Always ahead of the curve.",
      icon: Lightbulb
    },
    {
      year: "2022",
      title: "The Recognition",
      description: "1000th event. Industry leadership. The moment we stopped following trends and started setting them.",
      icon: Award
    },
    {
      year: "2025",
      title: "The Future",
      description: "AI-powered experiences. Sustainable solutions. The best is yet to come.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      {/* Ultra-Modern Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div 
          className="absolute inset-0 gradient-mesh"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        />
        
        {/* Floating Geometric Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 glass rounded-full"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-32 right-32 w-24 h-24 glass-primary organic-blob"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -180, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl floating"
          style={{ rotate: 45 }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={false}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Premium Badge */}
            <motion.div 
              className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-full mb-8 micro-glow"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide">Est. 2013</span>
            </motion.div>
            
            {/* Main Headline with Kinetic Typography */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] mb-8">
              <span className="block text-sm md:text-base font-body font-semibold tracking-[0.2em] uppercase text-[#F9A625] mb-5 leading-normal">
                About White Massif, Corporate Event Management in Bangalore since 2013
              </span>
              <span className="kinetic-text">
                We Are
              </span>
              <br />
              <span className="text-neutral-800">
                The Architects of Extraordinary
              </span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 font-body max-w-4xl mx-auto text-neutral-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Creators. Writers. Producers. Experiential Designers. Idea Generators. Visionaries. 
              We don't just manage events. We craft moments that move mountains, build bridges, and leave legacies.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button asChild className="btn-primary group">
                <Link href="/portfolio">
                  <span>Discover Our Journey</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild className="btn-secondary group">
                <Link href="/team">
                  <span>Meet The Visionaries</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 font-body text-neutral-500">The story continues</span>
            <motion.div 
              className="w-px h-16 bg-gradient-to-b from-amber-500 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Premium Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900" />
        <div className="relative z-10 container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center group">
                <div className="glass-dark rounded-3xl p-8 micro-bounce">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl md:text-5xl font-display text-white mb-2 kinetic-text">
                    {stat.number}
                  </div>
                  <div className="text-white/70 font-body text-sm md:text-base">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding">
        <div className="container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                The Beginning
              </Badge>
              <h2 className="text-4xl md:text-6xl font-display mb-6 text-neutral-900 leading-tight">
                Born From <span className="kinetic-text">Obsession</span>
              </h2>
              <div className="space-y-6 text-lg text-neutral-600 font-body leading-relaxed">
                <p>
                  In 2013, two dreamers sat in a small Bangalore office with an audacious idea: 
                  What if events could be more than logistics? What if they could be transformative experiences 
                  that change how people feel, think, and connect?
                </p>
                <p>
                  That question became our obsession. And that obsession built White Massif.
                </p>
                <p>
                  We didn't just want to manage events. We wanted to architect emotions. Engineer memories. 
                  Design moments so powerful they'd echo through time. From day one, mediocrity was our enemy. 
                  Excellence, our only acceptable standard.
                </p>
                <p>
                  Today, 1000+ events later, we&apos;re still those same dreamers. Just with more grey hair, 
                  deeper expertise, and an even fiercer commitment to turning the impossible into the unforgettable. 
                  Every event is our canvas. Every client, our inspiration. Every experience, our masterpiece.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <div className="glass rounded-3xl p-8">
                <h3 className="text-2xl font-heading text-neutral-900 mb-8">Why We Exist</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading text-neutral-900 mb-2">To Transform</h4>
                      <p className="text-neutral-600 font-body">
                        Ideas into experiences. Visions into reality. Dreams into memories that last forever.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading text-neutral-900 mb-2">To Innovate</h4>
                      <p className="text-neutral-600 font-body">
                        Challenge conventions. Break boundaries. Set new standards for what events can be.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading text-neutral-900 mb-2">To Impact</h4>
                      <p className="text-neutral-600 font-body">
                        Touch hearts. Change minds. Create ripples that become waves of transformation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section with Neumorphism */}
      <section className="section-padding bg-neutral-100">
        <div className="container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                Core Beliefs
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-neutral-900">
                The <span className="kinetic-text">DNA</span> of Excellence
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body">
                Four principles. Zero compromise. This is what makes us, us.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="neomorphism rounded-3xl p-8 text-center group hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-heading mb-4 text-neutral-900">{value.title}</h3>
                <p className="text-neutral-600 font-body leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Liquid Glass */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        <div className="relative z-10 container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass-dark px-6 py-2 text-amber-400 border-amber-400/20">
                The Founders
              </Badge>
              <h2 className="text-4xl md:text-6xl font-display mb-6 text-white leading-tight">
                Two Minds. <span className="kinetic-text">One Vision.</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-body leading-relaxed">
                Meet the dreamers who dared to reimagine what events could be. 
                Each a master of their craft. Together, unstoppable.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass-dark rounded-3xl p-8 group hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-xl">{member.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading text-white group-hover:text-amber-400 transition-colors mb-2">
                      {member.name}
                    </h3>
                    <p className="text-amber-400 font-medium mb-3">{member.position}</p>
                    <p className="text-white/70 text-sm mb-4">{member.expertise}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-white font-semibold text-sm">Experience</div>
                        <div className="text-white/60 text-xs">{member.experience}</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Specialization</div>
                        <div className="text-white/60 text-xs">{member.specialization}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {member.achievements.map((achievement, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                Timeline
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-neutral-900">
                The Journey <span className="kinetic-text">Continues</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body">
                Every milestone a stepping stone. Every year, bolder than the last.
              </p>
            </motion.div>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="glass rounded-3xl p-8">
                      <div className="text-4xl font-display text-amber-600 mb-4">{milestone.year}</div>
                      <h3 className="text-2xl font-heading text-neutral-900 mb-4">{milestone.title}</h3>
                      <p className="text-neutral-600 font-body leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <milestone.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container-fluid mx-auto text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-5xl md:text-7xl font-display mb-8 text-neutral-900">
                Your Story <span className="kinetic-text">Starts Here</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-12 font-body leading-relaxed">
                Every exceptional event begins with a conversation. Every transformation starts with trust. 
                Let's write your next chapter together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Button onClick={() => openPopup('about-final-cta')} className="btn-primary text-lg px-12 py-6">
                  <span>Begin The Conversation</span>
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
                
                <div className="flex items-center space-x-6">
                  <Button 
                    onClick={() => openPopup('about-contact')}
                    className="group flex items-center space-x-3 text-neutral-600 hover:text-amber-600 transition-colors bg-transparent border-0 p-0 hover:bg-transparent"
                  >
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Get Quote</span>
                  </Button>
                  
                  <a href="mailto:info@whitemassif.com" className="group flex items-center space-x-3 text-neutral-600 hover:text-amber-600 transition-colors">
                    <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Get in Touch</span>
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center items-center space-x-8 text-sm text-neutral-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Custom Solutions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Expert Guidance</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 