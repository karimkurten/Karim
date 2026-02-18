import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Download, 
  Linkedin, 
  Mail, 
  CheckCircle2, 
  Award, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  Database, 
  ShieldCheck, 
  Target,
  BarChart,
  Calendar,
  FileText,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import headshot from "@/assets/Picture_1771276526065.jpg";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-heading font-bold text-xl tracking-tight text-primary">KC</div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollToSection('achievements')} className="text-sm font-medium hover:text-primary transition-colors">Achievements</button>
              <button onClick={() => scrollToSection('expertise')} className="text-sm font-medium hover:text-primary transition-colors">Expertise</button>
              <button onClick={() => scrollToSection('experience')} className="text-sm font-medium hover:text-primary transition-colors">Experience</button>
              <Button size="sm" onClick={() => scrollToSection('contact')}>Contact Me</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO/LANDING */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] opacity-[0.03] bg-cover bg-center mix-blend-multiply" />
        
        <div className="section-padding grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
              Available for New Opportunities
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground tracking-tight leading-tight">
              Karim Chaouki, <span className="text-primary text-2xl md:text-3xl lg:text-4xl align-middle font-medium block mt-2">MBA, PMP, RMP, CSM</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground font-light">
              Senior HCM Implementation Manager | ADP Workforce Now Expert
            </h2>
            <p className="text-lg text-foreground/80 max-w-lg leading-relaxed border-l-4 border-primary pl-4">
              Delivering enterprise HCM transformations with a <span className="font-bold text-primary">100% on-time delivery record</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20" onClick={() => scrollToSection('achievements')}>
                View My Work <ArrowRight className="h-4 w-4" />
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 bg-white/50 backdrop-blur-sm">
                <a href="/Karim_Chaouki_Resume.pdf" download="Karim_Chaouki_Resume.pdf">
                  Download Resume <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="flex gap-4 pt-4 text-muted-foreground">
              <a href="https://www.linkedin.com/in/karim-chaouki/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"><Linkedin className="h-6 w-6" /></a>
              <a href="mailto:karim.chaouki@gmail.com" className="hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"><Mail className="h-6 w-6" /></a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-200/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl ring-1 ring-black/5">
                <img 
                  src={headshot} 
                  alt="Karim Chaouki" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating stats */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-border/50 flex items-center gap-3"
              >
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Success Rate</p>
                  <p className="text-lg font-bold text-foreground">100% On-Time</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary/50"
        >
          <div className="w-1 h-12 rounded-full border-2 border-current flex justify-center p-1">
            <div className="w-1 h-3 bg-current rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: ABOUT/SUMMARY */}
      <section id="about" className="py-24 bg-white">
        <div className="section-padding">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-12 gap-12 items-start"
          >
            <motion.div variants={fadeInUp} className="md:col-span-7 space-y-6">
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">About Me</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">
                Turning HCM implementations into <span className="text-primary">strategic business advantages</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Award-winning Project Manager delivering enterprise HCM transformations for 50+ organizations across North America. I specialize in leading complex, multi-jurisdiction ADP Workforce Now implementations from discovery through post-go-live optimization.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a 100% on-time delivery record and 20% improvement in client satisfaction scores, I bring a rigorous project management methodology (PMP, Agile) combined with deep technical expertise in HCM systems.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="md:col-span-5 grid grid-cols-2 gap-4">
              <Card className="bg-slate-50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <Briefcase className="h-8 w-8 text-primary mb-2" />
                  <span className="text-3xl font-bold text-foreground">50+</span>
                  <span className="text-sm text-muted-foreground font-medium">Implementations</span>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <span className="text-3xl font-bold text-foreground">100%</span>
                  <span className="text-sm text-muted-foreground font-medium">On-Time Delivery</span>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <span className="text-3xl font-bold text-foreground">95%</span>
                  <span className="text-sm text-muted-foreground font-medium">Client Retention</span>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <span className="text-3xl font-bold text-foreground">7+</span>
                  <span className="text-sm text-muted-foreground font-medium">Years Experience</span>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: KEY ACHIEVEMENTS */}
      <section id="achievements" className="py-24 bg-slate-50">
        <div className="section-padding space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Impact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Key Achievements</h2>
            <p className="text-muted-foreground text-lg">Measurable results delivered across enterprise projects</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Briefcase, title: "50+ Implementations", desc: "Led enterprise HCM implementations across multiple industries" },
              { icon: CheckCircle2, title: "98% System Accuracy", desc: "Through optimized cross-border configuration strategies" },
              { icon: BarChart, title: "25% Faster Resolution", desc: "Reduced critical issue resolution time while maintaining quality" },
              { icon: Users, title: "95% Client Retention", desc: "Exceptional post-go-live satisfaction and support" },
              { icon: GraduationCap, title: "15+ Consultants Mentored", desc: "Accelerated ramp-up time by 25%" },
              { icon: Award, title: "Employee of the Year", desc: "300% target achievement at Société Générale (2007)" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors duration-300 group">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CORE EXPERTISE */}
      <section id="expertise" className="py-24 bg-white">
        <div className="section-padding space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Skills</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Core Expertise</h2>
            <p className="text-muted-foreground text-lg">Comprehensive skillset spanning technical implementation and strategic management</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "HCM & Implementation",
                skills: ["ADP Workforce Now", "HRIS Implementation", "Payroll Systems", "Multi-Jurisdiction Compliance", "Benefits Administration", "Time & Attendance", "Talent Management"]
              },
              {
                category: "Project Management",
                skills: ["PMP Certified", "Program Management", "Agile/Scrum (CSM)", "Risk Management (RMP)", "Stakeholder Management", "Change Management", "Budget & Resource Mgmt"]
              },
              {
                category: "Leadership",
                skills: ["Cross-Functional Leadership", "Executive Engagement", "Client Relationship Mgmt", "Training & Development", "Process Optimization", "Mentoring"]
              },
              {
                category: "Compliance & Systems",
                skills: ["US/Canada Tax Compliance", "AML/KYC", "PCMLTF", "SaaS/Cloud Platforms", "System Integration", "Data Migration"]
              }
            ].map((col, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-primary border-b border-primary/20 pb-2">{col.category}</h3>
                <ul className="space-y-3">
                  {col.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: EXPERIENCE TIMELINE */}
      <section id="experience" className="py-24 bg-slate-50">
        <div className="section-padding space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Career Path</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Professional Experience</h2>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {[
              {
                role: "Senior Project Implementation Consultant",
                company: "ADP",
                period: "June 2023 - Present",
                location: "Toronto, Ontario, Canada",
                achievements: [
                  "Manage 50+ enterprise HCM implementations with 100% on-time completion",
                  "Achieved 20% improvement in client satisfaction scores",
                  "Reduced setup errors by 30%, improved accuracy to 98%",
                  "Mentor 15+ consultants, reducing ramp-up time by 25%"
                ]
              },
              {
                role: "Analyst, Financial Intelligence Unit",
                company: "Laurentian Bank of Canada",
                period: "March 2022 - June 2023",
                location: "Toronto, Ontario, Canada",
                achievements: [
                  "Led AML/KYC compliance framework implementation",
                  "Increased high-risk transaction detection by 30%",
                  "Achieved 100% accuracy in compliance reporting",
                  "Reduced case review time by 20%"
                ]
              },
              {
                role: "Bilingual Senior Customer Service Officer",
                company: "Laurentian Bank of Canada",
                period: "March 2020 - March 2022",
                location: "Toronto, Ontario, Canada",
                achievements: [
                  "Contributed to 15% increase in customer retention",
                  "Maintained 95% client satisfaction score",
                  "Reduced wait times by 30%",
                  "Trained 12+ team members"
                ]
              },
              {
                role: "Bilingual Customer Service Officer",
                company: "Laurentian Bank of Canada",
                period: "Dec 2018 - March 2020",
                location: "Toronto, Ontario, Canada",
                achievements: [
                  "GTACC Contact Center Excellence Award",
                  "Top 10 Salesperson for RRSP (2019)"
                ]
              },
              {
                role: "Project Coordinator",
                company: "Akalee",
                period: "Sept 2017 - Nov 2018",
                location: "Casablanca, Morocco",
                achievements: [
                  "100% project deadline adherence rate",
                  "Increased new accounts by 30%",
                  "Reduced project delays by 20%"
                ]
              },
              {
                role: "Client Relationship Manager",
                company: "Société Générale",
                period: "Oct 2001 - Feb 2015",
                location: "Casablanca, Morocco",
                achievements: [
                  "Employee of the Year (2007) - 300% target achievement",
                  "Managed 500+ high-value accounts",
                  "Increased retention by 40%",
                  "Improved cross-selling by 35%"
                ]
              }
            ].map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${index % 2 === 0 ? 'md:text-right' : ''}`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                    <span className="text-sm text-primary font-bold tracking-wide">{exp.period}</span>
                    <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                    <p className="text-muted-foreground font-medium mb-4">{exp.company} • {exp.location}</p>
                    <ul className={`space-y-2 text-sm text-slate-600 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      {exp.achievements.map((item, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          {index % 2 !== 0 && <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0" />}
                          <span className="flex-1">{item}</span>
                          {index % 2 === 0 && <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0 hidden md:block" />}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CERTIFICATIONS & EDUCATION */}
      <section className="py-24 bg-white">
        <div className="section-padding grid md:grid-cols-2 gap-12">
          {/* Certifications */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
              <Award className="h-6 w-6 text-primary" />
              Certifications
            </h3>
            <div className="grid gap-4">
              {[
                { name: "Project Management Professional (PMP)", org: "PMI", year: "2020" },
                { name: "Risk Management Professional (RMP)", org: "PMI", year: "2023" },
                { name: "Certified Scrum Master (CSM)", org: "Scrum Alliance", year: "2023" },
                { name: "Financial Intelligence Specialist (FIS)", org: "ManchesterCF", year: "2023" }
              ].map((cert, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold shrink-0">
                    {cert.org.substring(0,2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.org} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              Education
            </h3>
            <div className="space-y-6">
              {[
                { degree: "MBA in Finance", school: "Cardiff Metropolitan University", period: "2015-2016" },
                { degree: "Master's in Management & Strategy", school: "Collège de Sherbrooke", period: "2009-2011" },
                { degree: "Bachelor's in Marketing", school: "Collège de Sherbrooke", period: "2007-2009" }
              ].map((edu, idx) => (
                <div key={idx} className="border-l-2 border-primary/20 pl-4 py-1">
                  <h4 className="font-bold text-foreground">{edu.degree}</h4>
                  <p className="text-primary font-medium text-sm">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: AWARDS & RECOGNITION */}
      <section className="py-24 bg-slate-50">
        <div className="section-padding space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Honors</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Awards & Recognition</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Employee of the Year 2007",
                org: "Société Générale",
                desc: "300% Target Achievement"
              },
              {
                title: "Excellence Award",
                org: "GTACC Contact Center",
                desc: "Recognized for exceptional service quality"
              },
              {
                title: "Top 10 Salesperson",
                org: "RRSP 2019",
                desc: "Outstanding sales performance"
              }
            ].map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-md transition-all border-none shadow-sm">
                  <CardContent className="p-8 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center mb-2">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{award.title}</h3>
                      <p className="text-primary font-medium">{award.org}</p>
                      <p className="text-muted-foreground mt-2">{award.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: LANGUAGES & ADDITIONAL SKILLS */}
      <section className="py-24 bg-white">
        <div className="section-padding grid md:grid-cols-2 gap-16">
          {/* Languages */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
              <Globe className="h-6 w-6 text-primary" />
              Languages
            </h3>
            <div className="space-y-6">
              {[
                { lang: "English", level: "Native/Bilingual", pct: 100 },
                { lang: "French", level: "Native/Bilingual", pct: 100 }
              ].map((l, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{l.lang}</span>
                    <span className="text-muted-foreground">{l.level}</span>
                  </div>
                  <Progress value={l.pct} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold font-heading flex items-center gap-3">
              <Database className="h-6 w-6 text-primary" />
              Technical Tools
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Microsoft Project", "Jira", "Asana", "Confluence", 
                "MS Office Suite", "Salesforce", "MS Dynamics 365",
                "Tableau", "PowerBI", "SharePoint"
              ].map((tool, idx) => (
                <Badge key={idx} variant="secondary" className="px-3 py-1.5 text-sm bg-white border border-slate-200 text-slate-700 hover:bg-white hover:text-primary hover:border-primary transition-colors">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: CALL TO ACTION */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        
        <div className="section-padding relative z-10 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold font-heading">Ready to Drive Your Next HCM Transformation?</h2>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto">
            Currently seeking Senior Project Manager, Program Manager, and Implementation Director roles.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100 border-2 border-white font-bold h-14 px-8 text-lg">
              <a href="mailto:karim.chaouki@gmail.com?subject=Inquiry to Schedule a Call">
                <Mail className="mr-2 h-5 w-5" /> Schedule a Call
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 hover:text-white h-14 px-8 text-lg bg-transparent">
              <a href="/Karim_Chaouki_Resume.pdf" download="Karim_Chaouki_Resume.pdf">
                <Download className="mr-2 h-5 w-5" /> Download Resume
              </a>
            </Button>
          </div>
          
          <div className="pt-12 border-t border-white/10 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} Karim Chaouki. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/karim-chaouki/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:karim.chaouki@gmail.com" className="hover:text-white transition-colors">karim.chaouki@gmail.com</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}