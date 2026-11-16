'use client';

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";
import type { Job } from '@/lib/directus';
import { 
  ArrowRight, 
  Users, 
  Trophy, 
  Target,
  MapPin,
  Clock,
  Briefcase,
  GraduationCap,
  Heart,
  Coffee,
  TrendingUp,
  Mail,
  Sparkles,
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
      staggerChildren: 0.15
    }
  }
};

// Jobs are fetched on the server (page.tsx) so openings are in the initial HTML.
export default function CareersClient({ jobs }: { jobs: Job[] }) {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-amber-50/30 to-orange-50/30" />
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 glass rounded-full"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-32 right-32 w-24 h-24 glass-primary organic-blob"
          animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
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
            >
              <Users className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium tracking-wide">Visionaries Wanted</span>
            </motion.div>
            
            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] mb-8">
              <span className="kinetic-text">
                Don&apos;t Just Work.
              </span>
              <br />
              <span className="text-neutral-800">
                Create Excellence.
              </span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 font-body max-w-4xl mx-auto text-neutral-600 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Ordinary careers create ordinary outcomes. At White Massif, we don&apos;t hire employees—we forge visionaries. 
              Join the team that turns impossible visions into inevitable realities. Your journey to excellence begins here.
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
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
            {[
              { number: "1000+", label: "Events", icon: Trophy, color: "text-amber-400" },
              { number: "175+", label: "Clients", icon: Users, color: "text-emerald-400" },
              { number: "35+", label: "Team Size", icon: TrendingUp, color: "text-rose-400" },
              { number: "2M+", label: "Audience Engaged", icon: Heart, color: "text-blue-400" }
            ].map((stat, index) => (
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


      {/* Open Positions */}
      <section className="section-padding">
        <div className="container-fluid mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass px-6 py-2 text-amber-600 border-amber-200">
                Career Opportunities
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-8 text-neutral-900">
                Your <span className="kinetic-text">Exceptional Role</span> Awaits
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-body mb-12">
                These aren&apos;t just jobs—they&apos;re invitations to join an elite team of visionaries. Find your perfect match and begin your journey to excellence.
              </p>
            </motion.div>
          </motion.div>

          {jobs.length > 0 ? (
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {jobs.map((job, index) => (
              <motion.div
                key={job.id || index}
                variants={fadeInUp}
                className="group"
              >
                <div className="glass rounded-3xl p-8 h-full flex flex-col hover:shadow-xl transition-all duration-500 micro-bounce">
                  {/* Job Header */}
                  <div className="mb-6">
                    {(job.department || job.type) && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.department && (
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                            {job.department}
                          </Badge>
                        )}
                        {job.type && (
                          <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200">
                            {job.type}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <h3 className="text-xl font-heading text-neutral-900 group-hover:text-amber-600 transition-colors mb-2">
                      {job.title}
                    </h3>
                    {job.subtitle && (
                      <p className="text-sm text-neutral-500">{job.subtitle}</p>
                    )}
                  </div>
                  
                  {/* Job Details */}
                  <div className="flex-1 mb-6">
                    <p className="text-neutral-600 font-body leading-relaxed mb-4 text-sm line-clamp-3">
                      {job.description}
                    </p>
                    
                    {/* CMS fields are optional, so skip rows the editor left blank */}
                    <div className="space-y-2 text-sm text-neutral-500 mb-4">
                      {job.experience && (
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{job.experience}</span>
                        </div>
                      )}
                      {job.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{job.location}</span>
                        </div>
                      )}
                      {job.salary && (
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                    </div>
                    
                    {job.impact && (
                      <div className="glass bg-amber-50 border-amber-200 rounded-xl p-3 mb-4">
                        <div className="flex items-start">
                          <Trophy className="w-4 h-4 mr-2 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="text-xs font-medium text-amber-700 leading-relaxed">{job.impact}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={() => window.location.href = ('mailto:work@whitemassif.com?subject=' + encodeURIComponent('Application for ' + job.title) + '&body=' + encodeURIComponent('Dear White Massif Team,\n\nI am writing to express my interest in the ' + job.title + ' position.\n\nPlease find my CV attached. I would be happy to discuss how my experience aligns with your requirements.\n\nBest regards'))}
                      className="btn-primary group w-full"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    <Button 
                      onClick={() => window.location.href = 'mailto:work@whitemassif.com?subject=' + encodeURIComponent('Inquiry about ' + job.title + ' role')}
                      className="btn-outline group w-full"
                    >
                      <span>Ask Questions</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          ) : (
          /* No openings published in the CMS */
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="glass rounded-3xl p-10 md:p-14 max-w-2xl mx-auto text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-100 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-3xl md:text-4xl font-display text-neutral-900 mb-4">
                No Open Roles Right Now
              </h3>
              <p className="text-neutral-600 font-body leading-relaxed mb-8">
                We&apos;re not hiring for any specific positions at the moment, but we&apos;re always glad to hear from
                talented people. Send your CV to{" "}
                <a href="mailto:work@whitemassif.com" className="text-amber-600 font-medium hover:underline">
                  work@whitemassif.com
                </a>{" "}
                and we&apos;ll get in touch when a role that fits you opens up.
              </p>
              <Button
                onClick={() => window.location.href = ('mailto:work@whitemassif.com?subject=' + encodeURIComponent('General Application') + '&body=' + encodeURIComponent('Dear White Massif Team,\n\nI would love to be considered for future openings at White Massif.\n\nPlease find my CV attached.\n\nBest regards'))}
                className="btn-primary group"
              >
                <Mail className="mr-2 w-5 h-5" />
                <span>Send Your CV</span>
              </Button>
            </motion.div>
          </motion.div>
          )}
        </div>
      </section>

      {/* Application CTA */}
      <section className="section-padding bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="container-fluid mx-auto text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 glass-dark px-6 py-2 text-amber-400 border-amber-400/20">
                Create Your Own Path
              </Badge>
              <h2 className="text-5xl md:text-6xl font-display mb-6 text-white leading-tight">
                Don&apos;t See Your <span className="kinetic-text text-amber-400">Ideal Role?</span>
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto font-body">
                Exceptional professionals aren&apos;t defined by job descriptions—they define their own paths. If you&apos;re a visionary who doesn&apos;t fit in boxes, 
                let&apos;s create a role as unique as your talent.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  onClick={() => window.location.href = ('mailto:work@whitemassif.com?subject=' + encodeURIComponent('Creating My Own Exceptional Role') + '&body=' + encodeURIComponent('Dear White Massif Team,\n\nI am a visionary professional interested in creating a unique role that aligns with my skills and your company\'s mission.\n\nPlease find my CV and cover letter attached outlining my vision for contributing to White Massif.\n\nBest regards'))}
                  className="btn-primary group"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  <span>Create Custom Role</span>
                </Button>
                <Button 
                  onClick={() => window.location.href = '/team'}
                  variant="outline"
                  className="border-2 border-[#F9A625] text-[#F9A625] hover:bg-[#F9A625] hover:text-black font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 group"
                >
                  <span>Meet Our Team</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm mb-2">
                  Email your application to: <span className="text-amber-400">work@whitemassif.com</span>
                </p>
                <p className="text-white/50 text-xs">
                  Include your cover letter and attach your CV to make your application complete
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
