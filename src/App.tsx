import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Car, Palette, Eye, DollarSign, Settings, Brain, Shield, Mail, Linkedin, Instagram, Github, Heart, ArrowRight, CheckCircle, User, Lock, Sparkles, LogOut, BarChart3, Settings as SettingsIcon, Plus, Eye as EyeIcon, Edit, Trash2, Download, Share2, Bell, Search, Filter, AlertCircle, CheckCircle2 } from 'lucide-react';
import logoImage from './assets/1.png';
import carImage from './assets/car.avif';
import DashboardLayout from './dashboard/DashboardLayout';
import AdminDashboard from './admin/AdminDashboard';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // home, login-selector, customer-login, admin-login, customer-dashboard, admin-dashboard
  const [user, setUser] = useState<{ id: number; name: string; email: string; password?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Kushagra', email: 'kushagra@example.com', password: 'password123' }
  ]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [showSignup, setShowSignup] = useState(false);
  const [adminForm, setAdminForm] = useState({ email: '', password: '' });
  const [carDesign, setCarDesign] = useState({
    budget: '',
    engineType: '',
    transmission: '',
    tyres: '',
    wheels: '',
    exhaustType: '',
    bodyStyle: '',
    exteriorColor: '#007BFF',
    interiorLayout: '',
    features: [] as string[]
  });
  const [allDesigns, setAllDesigns] = useState([]);
  const [currentDesign, setCurrentDesign] = useState(null);

  // Typing animation effect
  useEffect(() => {
    const text = "Your dream car, your way.";
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Scroll animation for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroContent = document.getElementById('hero-content');
      const heroCar = document.getElementById('hero-car');
      const redLight = document.getElementById('red-light');
      const tealLight = document.getElementById('teal-light');
      const headlight = document.getElementById('headlight');
      
      if (scrollY > 50) {
        // Move text up
        if (heroContent) {
          heroContent.style.transform = 'translateY(-100px)';
          heroContent.style.opacity = '0.3';
        }
        
        // Show car with enlarging transition
        if (heroCar) {
          heroCar.style.opacity = '1';
          heroCar.style.transform = 'scale(1)';
        }
        
        // Show lighting effects
        if (redLight) redLight.style.opacity = '1';
        if (tealLight) tealLight.style.opacity = '1';
        if (headlight) headlight.style.opacity = '1';
      } else {
        // Reset to initial state
        if (heroContent) {
          heroContent.style.transform = 'translateY(0)';
          heroContent.style.opacity = '1';
        }
        
        if (heroCar) {
          heroCar.style.opacity = '0';
          heroCar.style.transform = 'scale(0.75)';
        }
        
        if (redLight) redLight.style.opacity = '0';
        if (tealLight) tealLight.style.opacity = '0';
        if (headlight) headlight.style.opacity = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('motomorph_user');
    const savedIsAdmin = localStorage.getItem('motomorph_isAdmin');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAdmin(savedIsAdmin === 'true');
      setCurrentPage(savedIsAdmin === 'true' ? 'admin-dashboard' : 'customer-dashboard');
    }
  }, []);

  // Toast notification function
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Customer signup function
  const handleCustomerSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    
    if (signupForm.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    
    if (!signupForm.email.includes('@')) {
      showToast('Please enter a valid email', 'error');
      return;
    }
    
    // Check if email already exists
    if (customers.find(c => c.email === signupForm.email)) {
      showToast('Email already registered', 'error');
      return;
    }
    
    // Add new customer
    const newCustomer = {
      id: customers.length + 1,
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password
    };
    
    setCustomers([...customers, newCustomer]);
    setSignupForm({ name: '', email: '', password: '' });
    setShowSignup(false);
    showToast('Signup successful! Please log in.');
  };

  // Customer login function
  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const customer = customers.find(c => c.email === loginForm.email && c.password === loginForm.password);
    
    if (customer) {
      setUser(customer);
      setIsAdmin(false);
      localStorage.setItem('motomorph_user', JSON.stringify(customer));
      localStorage.setItem('motomorph_isAdmin', 'false');
      setCurrentPage('customer-dashboard');
      showToast(`Welcome back, ${customer.name}! 👋`);
    } else {
      showToast('Invalid email or password', 'error');
    }
  };

  // Admin login function
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminForm.email === 'admin@motomorph.com' && adminForm.password === 'admin123') {
      const adminUser = { id: 0, name: 'Admin', email: adminForm.email };
      setUser(adminUser);
      setIsAdmin(true);
      localStorage.setItem('motomorph_user', JSON.stringify(adminUser));
      localStorage.setItem('motomorph_isAdmin', 'true');
      setCurrentPage('admin-dashboard');
      showToast('Welcome, Admin! 👋');
    } else {
      showToast('Invalid admin credentials', 'error');
    }
  };

  // Logout function
  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('motomorph_user');
    localStorage.removeItem('motomorph_isAdmin');
    setCurrentPage('home');
    showToast('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-black font-['Poppins'] overflow-x-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src={logoImage} alt="Motomorph Logo" className="w-10 h-10 mr-3" />
              <h1 className="text-2xl font-bold text-white font-motomorph">Motomorph</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-white/80 hover:text-white transition-colors font-medium">Home</a>
              <a href="#vehicles" className="text-white/80 hover:text-white transition-colors font-medium">Vehicles</a>
              <a href="#technology" className="text-white/80 hover:text-white transition-colors font-medium">Technology</a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors font-medium">About</a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors font-medium">Contact</a>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#007BFF] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white/80 text-sm">{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setCurrentPage('login-selector')}
                  className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block text-white/80 hover:text-white transition-colors">Home</a>
              <a href="#vehicles" className="block text-white/80 hover:text-white transition-colors">Vehicles</a>
              <a href="#technology" className="block text-white/80 hover:text-white transition-colors">Technology</a>
              <a href="#about" className="block text-white/80 hover:text-white transition-colors">About</a>
              <a href="#contact" className="block text-white/80 hover:text-white transition-colors">Contact</a>
              <button className="w-full bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Car Image with Scroll Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-6xl h-screen transform transition-all duration-1000 ease-out" id="car-container">
            <div className="relative w-full h-full">
              <img 
                src={carImage}
                alt="Motomorph Car"
                className="w-full h-full object-cover opacity-0 transform scale-75 transition-all duration-1000 ease-out"
                id="hero-car"
              />
              
              {/* Red Light Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/40 via-transparent to-transparent opacity-0 transition-opacity duration-1000" id="red-light"></div>
              
              {/* Teal Light Effect */}
              <div className="absolute inset-0 bg-gradient-to-l from-cyan-400/40 via-transparent to-transparent opacity-0 transition-opacity duration-1000" id="teal-light"></div>
              
              {/* Headlight Glow */}
              <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-white rounded-full shadow-[0_0_30px_15px_rgba(255,255,255,0.8)] animate-pulse opacity-0 transition-opacity duration-1000" id="headlight"></div>
              
              {/* Additional Lighting Effects */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto transition-all duration-1000 ease-out" id="hero-content">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-wider">
              <span className="block animate-fade-in-up" style={{animationDelay: '0.2s'}}>WHERE ENGINEERING</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 animate-fade-in-up" style={{animationDelay: '0.4s'}}>MEETS</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white animate-fade-in-up" style={{animationDelay: '0.6s'}}>EXCELLENCE</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            Drive Into the Future with Us
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '1s'}}>
            <button 
              onClick={() => setCurrentPage('login-selector')}
              className="bg-[#F5F5DC] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 animate-bounce-subtle"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Login Selector Page */}
      {currentPage === 'login-selector' && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-black/80 border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 backdrop-blur-xl">
            <div className="text-center mb-8">
              <img src={logoImage} alt="Motomorph Logo" className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white font-motomorph mb-2">Welcome to Motomorph</h2>
              <p className="text-white/70">Choose your login type to continue</p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => setCurrentPage('customer-login')}
                className="w-full bg-gradient-to-r from-[#007BFF] to-[#00D4FF] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-[#0056CC] hover:to-[#00B8E6] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <User className="w-5 h-5" />
                <span>Login as Customer</span>
              </button>
              
              <button 
                onClick={() => setCurrentPage('admin-login')}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 border border-white/20"
              >
                <Lock className="w-5 h-5" />
                <span>Login as Admin</span>
              </button>
            </div>
            
            <button 
              onClick={() => setCurrentPage('home')}
              className="w-full mt-6 text-white/60 hover:text-white transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      )}

      {/* Customer Login Page */}
      {currentPage === 'customer-login' && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-black/80 border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 backdrop-blur-xl">
            <div className="text-center mb-8">
              <img src={logoImage} alt="Motomorph Logo" className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white font-motomorph mb-2">
                {showSignup ? 'Create Account' : 'Customer Login'}
              </h2>
              <p className="text-white/70">
                {showSignup ? 'Join Motomorph and design your dream car' : 'Access your car design dashboard'}
              </p>
            </div>
            
            {showSignup ? (
              <form onSubmit={handleCustomerSignup} className="space-y-6">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Full Name</label>
                  <input 
                    type="text" 
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#007BFF] transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#007BFF] transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Password</label>
                  <input 
                    type="password" 
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#007BFF] transition-colors"
                    placeholder="Enter your password (min 6 characters)"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#007BFF] to-[#00D4FF] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#0056CC] hover:to-[#00B8E6] transition-all duration-300 transform hover:scale-105"
                >
                  Create Account
                </button>
              </form>
            ) : (
              <form onSubmit={handleCustomerLogin} className="space-y-6">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#007BFF] transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Password</label>
                  <input 
                    type="password" 
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#007BFF] transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#007BFF] to-[#00D4FF] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#0056CC] hover:to-[#00B8E6] transition-all duration-300 transform hover:scale-105"
                >
                  Login
                </button>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                {showSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button 
                  onClick={() => setShowSignup(!showSignup)}
                  className="text-[#007BFF] hover:text-[#00D4FF] transition-colors"
                >
                  {showSignup ? 'Log in' : 'Sign up'}
                </button>
              </p>
            </div>
            
            <button 
              onClick={() => setCurrentPage('login-selector')}
              className="w-full mt-4 text-white/60 hover:text-white transition-colors text-sm"
            >
              ← Back to Login Selection
            </button>
          </div>
        </div>
      )}

      {/* Admin Login Page */}
      {currentPage === 'admin-login' && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-black/80 border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 backdrop-blur-xl">
            <div className="text-center mb-8">
              <img src={logoImage} alt="Motomorph Logo" className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white font-motomorph mb-2">Admin Login</h2>
              <p className="text-white/70">Access admin dashboard</p>
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-sm font-medium">Demo Credentials:</p>
                <p className="text-blue-300 text-xs">Email: admin@motomorph.com</p>
                <p className="text-blue-300 text-xs">Password: admin123</p>
              </div>
            </div>
            
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Admin Email</label>
                <input 
                  type="email" 
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({...adminForm, email: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#007BFF] transition-colors"
                  placeholder="Enter admin email"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Password</label>
                <input 
                  type="password" 
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({...adminForm, password: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#007BFF] transition-colors"
                  placeholder="Enter admin password"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#007BFF] to-[#00D4FF] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#0056CC] hover:to-[#00B8E6] transition-all duration-300 transform hover:scale-105"
              >
                Login as Admin
              </button>
            </form>
            
            <button 
              onClick={() => setCurrentPage('login-selector')}
              className="w-full mt-6 text-white/60 hover:text-white transition-colors text-sm"
            >
              ← Back to Login Selection
            </button>
          </div>
        </div>
      )}

      {/* Customer Dashboard */}
      {currentPage === 'customer-dashboard' && (
        <DashboardLayout user={user} onLogout={handleLogout} />
      )}

      {/* Admin Dashboard */}
      {currentPage === 'admin-dashboard' && (
        <AdminDashboard user={user} onLogout={handleLogout} />
      )}

      {/* Vehicles Section */}
      <section id="vehicles" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-motomorph">Our Vehicle Lineup</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover our range of innovative vehicles designed for the future
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Motomorph GT",
                type: "Sports Car",
                image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Ultimate performance meets cutting-edge technology"
              },
              {
                name: "Motomorph EV",
                type: "Electric Vehicle",
                image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Zero emissions, maximum innovation"
              },
              {
                name: "Motomorph SUV",
                type: "Luxury SUV",
                image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Luxury and versatility redefined"
              }
            ].map((vehicle, index) => (
              <div key={index} className="group bg-black rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Red Light Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-transparent to-transparent group-hover:from-red-500/50 transition-all duration-500"></div>
                  {/* Teal Light Effect */}
                  <div className="absolute inset-0 bg-gradient-to-l from-cyan-400/30 via-transparent to-transparent group-hover:from-cyan-400/50 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-white/60 mb-2">{vehicle.type}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-motomorph">{vehicle.name}</h3>
                  <p className="text-white/70 mb-4">{vehicle.description}</p>
                  <button className="text-white border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-motomorph">Cutting-Edge Technology</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Experience the latest innovations in automotive technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: "AI Design", desc: "Advanced artificial intelligence for personalized vehicle design" },
              { icon: Eye, title: "VR Experience", desc: "Immersive virtual reality for vehicle customization" },
              { icon: Settings, title: "Smart Systems", desc: "Intelligent systems for enhanced performance" },
              { icon: Shield, title: "Safety First", desc: "State-of-the-art safety technology and features" }
            ].map((tech, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-white to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <tech.icon className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{tech.title}</h3>
                <p className="text-white/70 leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-motomorph">About Motomorph</h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                We are pioneers in the automotive industry, combining cutting-edge technology with timeless design to create vehicles that define the future of transportation.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">10+</div>
                  <div className="text-white/70">Years of Innovation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">50K+</div>
                  <div className="text-white/70">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Motomorph Factory"
                className="rounded-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-motomorph">Get In Touch</h2>
            <p className="text-xl text-white/70">Ready to experience the future of automotive design?</p>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                />
              </div>
              <textarea 
                placeholder="Your Message" 
                rows={4}
                className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-white text-black py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src={logoImage} alt="Motomorph Logo" className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold text-white font-motomorph">Motomorph</h3>
              </div>
              <p className="text-white/70">
                Pioneering the future of automotive design and technology.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Vehicles</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Sports Cars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Electric Vehicles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SUVs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
            <p>&copy; 2024 Motomorph. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg backdrop-blur-xl border transition-all duration-300 transform ${
          toast.type === 'success' 
            ? 'bg-green-500/20 border-green-500/30 text-green-400' 
            : 'bg-red-500/20 border-red-500/30 text-red-400'
        }`}>
          <div className="flex items-center space-x-3">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
