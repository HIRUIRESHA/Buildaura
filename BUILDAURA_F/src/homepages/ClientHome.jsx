import { useState, useEffect } from 'react';
import { ArrowRight, Users, Award, Zap, Shield, Phone, Mail, MapPin, Globe, Star, Sparkles, CheckCircle, TrendingUp, Target, Rocket, Code, Palette, Database, ChevronDown, Play, Hammer, HardHat, Truck } from 'lucide-react';

export default function ClientHome() {
  const [clientName] = useState('John');
  const [currentHour] = useState(new Date().getHours());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 17) return 'Good Afternoon';
    if (currentHour < 21) return 'Good Evening';
    return 'Good Night';
  };

  const FloatingOrb = ({ size, color, delay, duration, initialX, initialY }) => (
    <div 
      className={`absolute rounded-full blur-sm ${color} animate-float-complex opacity-30`}
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
      }}
    />
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Advanced CSS Animations */}
      <style jsx>{`
        @keyframes float-complex {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          25% { transform: translate3d(30px, -40px, 0) rotate(90deg) scale(1.1); }
          50% { transform: translate3d(-20px, -80px, 0) rotate(180deg) scale(0.9); }
          75% { transform: translate3d(-40px, -40px, 0) rotate(270deg) scale(1.05); }
        }
        @keyframes pulse-glow {
          0%,100% { box-shadow:0 0 20px rgba(59,130,246,0.3); }
          50% { box-shadow:0 0 40px rgba(59,130,246,0.6),0 0 60px rgba(147,51,234,0.4); }
        }
        @keyframes text-shimmer {0%{background-position:-200% center;}100%{background-position:200% center;}}
        @keyframes particle-float {0%,100%{transform:translateY(0) rotate(0deg);}33%{transform:translateY(-100px) rotate(120deg);}66%{transform:translateY(-50px) rotate(240deg);}}
        .animate-float-complex{animation:float-complex 8s ease-in-out infinite;}
        .animate-pulse-glow{animation:pulse-glow 3s ease-in-out infinite;}
        .text-shimmer{background:linear-gradient(90deg,#60a5fa,#a78bfa,#f472b6,#60a5fa);background-size:200% auto;animation:text-shimmer 3s linear infinite;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
        .animate-particle-float{animation:particle-float 6s ease-in-out infinite;}
        .card-hover-3d{transform-style:preserve-3d;transition:all 0.6s cubic-bezier(0.23,1,0.32,1);}
        .card-hover-3d:hover{transform:rotateY(5deg) rotateX(5deg) translateZ(50px);}
        .morphing-bg{background:linear-gradient(-45deg,#0f0f23,#1a0d2e,#2d1b69,#0f0f23);background-size:400% 400%;animation:gradient-morph 15s ease infinite;}
        @keyframes gradient-morph{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
        .glass-morphism{background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);}
        .neon-border{position:relative;overflow:hidden;}
        .neon-border::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(59,130,246,0.4),transparent);transition:left 0.5s;}
        .neon-border:hover::before{left:100%;}
      `}</style>

      {/* Dynamic Background */}
      <div className="absolute inset-0 morphing-bg"></div>

      {/* Floating Orbs */}
      <FloatingOrb size="200px" color="bg-blue-500" delay={0} duration={12} initialX="10%" initialY="20%" />
      <FloatingOrb size="150px" color="bg-purple-500" delay={2} duration={15} initialX="80%" initialY="10%" />
      <FloatingOrb size="100px" color="bg-pink-500" delay={4} duration={10} initialX="70%" initialY="70%" />
      <FloatingOrb size="120px" color="bg-cyan-500" delay={6} duration={18} initialX="20%" initialY="80%" />
      <FloatingOrb size="80px" color="bg-yellow-500" delay={1} duration={14} initialX="50%" initialY="30%" />

      {/* Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-particle-float"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 6}s` }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" style={{ transform: `translateY(${scrollY * 0.5}px)` }} />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Animated Logo */}
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 blur-3xl animate-pulse-glow"></div>
            <h1 className="relative text-8xl md:text-9xl font-black text-shimmer mb-6 tracking-tighter">BuildAura</h1>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full blur-sm"></div>
              <div className="relative h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full mx-auto w-48"></div>
            </div>
            <p className="text-2xl md:text-3xl text-gray-300 font-light mt-6 animate-pulse">
              Your Construction Management Partner
            </p>
          </div>

          {/* 3D Welcome Card */}
          <div className="mb-16">
            <div className="glass-morphism rounded-3xl p-12 neon-border card-hover-3d max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 p-4 rounded-2xl animate-bounce">
                  <HardHat className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {getGreeting()}, <span className="text-shimmer">{clientName}</span>!
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Manage all your construction projects efficiently with BuildAura. Track tasks, teams, materials, and progress—all in one powerful platform.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                <span className="text-emerald-300 font-medium">System Online • Projects Ready</span>
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-4 gap-8 mb-20 max-w-7xl mx-auto">
            {[
              { icon: Hammer, title: "Project Management", desc: "Organize tasks & teams", color: "from-blue-500 to-cyan-500" },
              { icon: Truck, title: "Material Tracking", desc: "Monitor resources & deliveries", color: "from-purple-500 to-pink-500" },
              { icon: Users, title: "Team Collaboration", desc: "Assign & track workers", color: "from-emerald-500 to-teal-500" },
              { icon: Shield, title: "Safety Compliance", desc: "Ensure construction safety", color: "from-orange-500 to-red-500" }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="glass-morphism rounded-3xl p-8 card-hover-3d neon-border h-full transform group-hover:scale-110 transition-all duration-500">
                  <div className={`bg-gradient-to-br ${feature.color} p-4 rounded-2xl mb-6 mx-auto w-fit group-hover:rotate-12 transition-transform duration-500`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Trusted by <span className="text-shimmer">Construction Leaders</span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "120+", label: "Active Projects", icon: Target },
              { number: "99%", label: "Safety Compliance", icon: Shield },
              { number: "24/7", label: "On-Site Support", icon: Users },
              { number: "15+", label: "Awards Won", icon: Award }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="glass-morphism rounded-3xl p-8 card-hover-3d neon-border">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 text-shimmer">{stat.number}</div>
                  <div className="text-gray-400 group-hover:text-white transition-colors">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
