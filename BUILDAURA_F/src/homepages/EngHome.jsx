import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Hammer,
  HardHat,
  TrendingUp,
  CheckCircle2,
  Zap,
  Star,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  Play,
  Shield,
  Globe,
  Cpu,
  Workflow
} from 'lucide-react';

const EngHome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState("Alex Johnson");
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Project Management",
      description: "Streamline your construction projects with advanced planning and tracking tools",
      icon: Building2,
      gradient: "from-blue-400 via-purple-500 to-indigo-600"
    },
    {
      title: "Team Collaboration",
      description: "Connect with your team members and manage resources efficiently",
      icon: Users,
      gradient: "from-emerald-400 via-cyan-500 to-blue-500"
    },
    {
      title: "Real-time Analytics",
      description: "Get insights into project progress with detailed reports and analytics",
      icon: BarChart3,
      gradient: "from-amber-400 via-orange-500 to-red-500"
    },
    {
      title: "Document Management",
      description: "Store, organize and share project documents securely in the cloud",
      icon: FileText,
      gradient: "from-pink-400 via-rose-500 to-purple-500"
    }
  ];

  const stats = [
    { value: "500+", label: "Projects Completed", icon: CheckCircle2 },
    { value: "50+", label: "Active Engineers", icon: HardHat },
    { value: "98%", label: "Success Rate", icon: TrendingUp },
    { value: "24/7", label: "Support Available", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-pink-600/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        
        <section className="text-center mb-20">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Engineer
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Excellence
              </span>
            </h1>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Revolutionize your construction projects with BuildAura's cutting-edge management platform. 
            <span className="text-cyan-300 font-semibold"> Built by engineers, for engineers.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl text-white font-semibold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center">
                Start Building
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative p-8 rounded-3xl border border-white/20 backdrop-blur-xl transition-all duration-500 cursor-pointer ${
                  activeFeature === index ? 'bg-white/20 scale-105' : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl ${
                  activeFeature === index ? 'animate-pulse' : ''
                }`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-blue-100 text-lg leading-relaxed">{feature.description}</p>
                <div className="absolute top-4 right-4">
                  <Sparkles className={`w-6 h-6 ${activeFeature === index ? 'text-cyan-400 animate-spin' : 'text-white/50'}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ready to Transform Your Projects?
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of engineers who trust BuildAura to manage their construction projects efficiently and effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl text-white font-bold text-xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300">
                Get Started Now
              </button>
              
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default EngHome;