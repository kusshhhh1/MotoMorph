import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Car, User, Settings as SettingsIcon, LogOut, Plus, 
  Eye as EyeIcon, CheckCircle, Clock, AlertCircle, Trash2, Download,
  Search, Filter, X, ChevronDown, ChevronUp, ToggleLeft, ToggleRight, Menu
} from 'lucide-react';

interface CarDesign {
  id: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  budget: string;
  engineType: string;
  transmission: string;
  tyres: string;
  wheels: string;
  exhaustType: string;
  bodyStyle: string;
  exteriorColor: string;
  interiorLayout: string;
  features: string[];
  status: 'Under Review' | 'In Progress' | 'Approved';
  submittedAt: Date;
  totalPrice: number;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  totalDesigns: number;
  lastActive: Date;
}

interface AdminDashboardProps {
  user: { id: number; name: string; email: string } | null;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [carDesigns, setCarDesigns] = useState<CarDesign[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<CarDesign | null>(null);
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [budgetFilter, setBudgetFilter] = useState<string>('all');
  const [acceptingNewDesigns, setAcceptingNewDesigns] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load data on component mount
  useEffect(() => {
    // Load designs from service
    import('../services/DesignService').then(({ designService }) => {
      const designs = designService.getAllDesigns();
      setCarDesigns(designs);
      
      // Generate customers from designs
      const customerMap = new Map();
      designs.forEach(design => {
        if (!customerMap.has(design.customerId)) {
          customerMap.set(design.customerId, {
            id: design.customerId,
            name: design.customerName,
            email: design.customerEmail,
            totalDesigns: 1,
            lastActive: design.submittedAt
          });
        } else {
          const customer = customerMap.get(design.customerId);
          customer.totalDesigns++;
          if (design.submittedAt > customer.lastActive) {
            customer.lastActive = design.submittedAt;
          }
        }
      });
      
      setCustomers(Array.from(customerMap.values()));
    });
  }, []);

  // Filter designs based on search and filters
  const filteredDesigns = carDesigns.filter(design => {
    const matchesSearch = design.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.engineType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.bodyStyle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || design.status === statusFilter;
    const matchesBudget = budgetFilter === 'all' || design.budget === budgetFilter;
    
    return matchesSearch && matchesStatus && matchesBudget;
  });

  // Update design status
  const updateDesignStatus = (designId: number, newStatus: CarDesign['status']) => {
    import('../services/DesignService').then(({ designService }) => {
      designService.updateDesignStatus(designId, newStatus);
      setCarDesigns(prev => prev.map(design => 
        design.id === designId ? { ...design, status: newStatus } : design
      ));
    });
  };

  // Delete design
  const deleteDesign = (designId: number) => {
    import('../services/DesignService').then(({ designService }) => {
      designService.deleteDesign(designId);
      setCarDesigns(prev => prev.filter(design => design.id !== designId));
    });
  };

  // Export designs as CSV
  const exportDesignsCSV = () => {
    const csvContent = [
      ['ID', 'Customer', 'Email', 'Budget', 'Engine', 'Body Style', 'Status', 'Total Price', 'Submitted Date'],
      ...filteredDesigns.map(design => [
        design.id,
        design.customerName,
        design.customerEmail,
        design.budget,
        design.engineType,
        design.bodyStyle,
        design.status,
        `$${design.totalPrice.toLocaleString()}`,
        design.submittedAt.toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'car-designs.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Get status badge color
  const getStatusBadgeColor = (status: CarDesign['status']) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Under Review':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Get status icon
  const getStatusIcon = (status: CarDesign['status']) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Under Review':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Dashboard Header */}
      <div className="bg-black/90 border-b border-white/10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#007BFF] rounded-full flex items-center justify-center font-bold text-lg md:text-xl">M</div>
            <h1 className="text-lg md:text-2xl font-bold font-motomorph">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-white/70 text-sm md:text-base hidden sm:block">Welcome, {user?.name}! 👋</span>
            <button 
              onClick={onLogout}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm md:text-base"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-black/95 lg:bg-black/50 border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-4">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'all-designs', label: 'All Designs', icon: Car },
                { id: 'user-list', label: 'User List', icon: User },
                { id: 'settings', label: 'Settings', icon: SettingsIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center space-x-3 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#007BFF]/20 text-[#007BFF] shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 min-h-screen">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold font-motomorph mb-2">Dashboard Overview</h2>
                <p className="text-white/70 text-sm md:text-base">Monitor and manage car design submissions</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-black/50 border border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs md:text-sm">Total Designs</p>
                      <p className="text-xl md:text-3xl font-bold text-white">{carDesigns.length}</p>
                    </div>
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-[#007BFF]/20 rounded-lg flex items-center justify-center">
                      <Car className="w-4 h-4 md:w-6 md:h-6 text-[#007BFF]" />
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs md:text-sm">Under Review</p>
                      <p className="text-xl md:text-3xl font-bold text-white">
                        {carDesigns.filter(d => d.status === 'Under Review').length}
                      </p>
                    </div>
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 md:w-6 md:h-6 text-yellow-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs md:text-sm">In Progress</p>
                      <p className="text-xl md:text-3xl font-bold text-white">
                        {carDesigns.filter(d => d.status === 'In Progress').length}
                      </p>
                    </div>
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs md:text-sm">Approved</p>
                      <p className="text-xl md:text-3xl font-bold text-white">
                        {carDesigns.filter(d => d.status === 'Approved').length}
                      </p>
                    </div>
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Designs */}
              <div className="bg-black/50 border border-white/20 rounded-xl backdrop-blur-xl overflow-hidden">
                <div className="p-4 md:p-6 border-b border-white/10">
                  <h3 className="text-lg md:text-xl font-bold text-white">Recent Car Designs</h3>
                </div>
                <div className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {carDesigns.slice(0, 5).map((design) => (
                      <div key={design.id} className="flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#007BFF]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Car className="w-4 h-4 md:w-5 md:h-5 text-[#007BFF]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-white font-medium text-sm md:text-base truncate">{design.customerName}</p>
                            <p className="text-white/60 text-xs md:text-sm truncate">{design.budget} • {design.engineType}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
                          <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(design.status)}`}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(design.status)}
                              <span className="hidden sm:inline">{design.status}</span>
                            </div>
                          </span>
                          <button 
                            onClick={() => {
                              setSelectedDesign(design);
                              setShowDesignModal(true);
                            }}
                            className="text-white/60 hover:text-white transition-colors p-1 md:p-2 hover:bg-white/10 rounded-lg"
                          >
                            <EyeIcon className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                          <button 
                            onClick={() => updateDesignStatus(design.id, 'Approved')}
                            className="text-green-400 hover:text-green-300 transition-colors p-1 md:p-2 hover:bg-green-500/10 rounded-lg"
                            title="Approve"
                          >
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                          <button 
                            onClick={() => updateDesignStatus(design.id, 'In Progress')}
                            className="text-blue-400 hover:text-blue-300 transition-colors p-1 md:p-2 hover:bg-blue-500/10 rounded-lg"
                            title="Mark In Progress"
                          >
                            <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                          <button 
                            onClick={() => deleteDesign(design.id)}
                            className="text-red-400 hover:text-red-300 transition-colors p-1 md:p-2 hover:bg-red-500/10 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Designs Tab */}
          {activeTab === 'all-designs' && (
            <div>
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold font-motomorph mb-2">All Car Designs</h2>
                <p className="text-white/70 text-sm md:text-base">Manage and review all submitted car designs</p>
              </div>

              {/* Filters */}
              <div className="bg-black/50 border border-white/20 rounded-xl p-4 md:p-6 mb-6 backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                      <input
                        type="text"
                        placeholder="Search designs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-[#007BFF] transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#007BFF] transition-colors text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="Under Review">Under Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">Budget</label>
                    <select
                      value={budgetFilter}
                      onChange={(e) => setBudgetFilter(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#007BFF] transition-colors text-sm"
                    >
                      <option value="all">All Budgets</option>
                      <option value="$50k-75k">$50k-75k</option>
                      <option value="$75k-100k">$75k-100k</option>
                      <option value="$100k+">$100k+</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={exportDesignsCSV}
                      className="w-full bg-[#007BFF] hover:bg-[#0056CC] text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Designs Table - Mobile Cards */}
              <div className="lg:hidden space-y-4">
                {filteredDesigns.map((design) => (
                  <div key={design.id} className="bg-black/50 border border-white/20 rounded-xl p-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{design.customerName}</p>
                        <p className="text-white/60 text-xs">{design.customerEmail}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(design.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(design.status)}
                          <span>{design.status}</span>
                        </div>
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div><span className="text-white/60">Budget:</span> <span className="text-white">{design.budget}</span></div>
                      <div><span className="text-white/60">Engine:</span> <span className="text-white">{design.engineType}</span></div>
                      <div><span className="text-white/60">Body:</span> <span className="text-white">{design.bodyStyle}</span></div>
                      <div><span className="text-white/60">Price:</span> <span className="text-white">${design.totalPrice.toLocaleString()}</span></div>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedDesign(design);
                          setShowDesignModal(true);
                        }}
                        className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => updateDesignStatus(design.id, 'Approved')}
                        className="text-green-400 hover:text-green-300 transition-colors p-2 hover:bg-green-500/10 rounded-lg"
                        title="Approve"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => updateDesignStatus(design.id, 'In Progress')}
                        className="text-blue-400 hover:text-blue-300 transition-colors p-2 hover:bg-blue-500/10 rounded-lg"
                        title="Mark In Progress"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteDesign(design.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Designs Table - Desktop */}
              <div className="hidden lg:block bg-black/50 border border-white/20 rounded-xl backdrop-blur-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 text-white/80 font-medium">Customer</th>
                        <th className="text-left p-4 text-white/80 font-medium">Budget</th>
                        <th className="text-left p-4 text-white/80 font-medium">Engine</th>
                        <th className="text-left p-4 text-white/80 font-medium">Body Style</th>
                        <th className="text-left p-4 text-white/80 font-medium">Status</th>
                        <th className="text-left p-4 text-white/80 font-medium">Total Price</th>
                        <th className="text-left p-4 text-white/80 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDesigns.map((design) => (
                        <tr key={design.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div>
                              <p className="text-white font-medium">{design.customerName}</p>
                              <p className="text-white/60 text-sm">{design.customerEmail}</p>
                            </div>
                          </td>
                          <td className="p-4 text-white">{design.budget}</td>
                          <td className="p-4 text-white">{design.engineType}</td>
                          <td className="p-4 text-white">{design.bodyStyle}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(design.status)}`}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(design.status)}
                                <span>{design.status}</span>
                              </div>
                            </span>
                          </td>
                          <td className="p-4 text-white">${design.totalPrice.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => {
                                  setSelectedDesign(design);
                                  setShowDesignModal(true);
                                }}
                                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                                title="View Details"
                              >
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => updateDesignStatus(design.id, 'Approved')}
                                className="text-green-400 hover:text-green-300 transition-colors p-2 hover:bg-green-500/10 rounded-lg"
                                title="Approve"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => updateDesignStatus(design.id, 'In Progress')}
                                className="text-blue-400 hover:text-blue-300 transition-colors p-2 hover:bg-blue-500/10 rounded-lg"
                                title="Mark In Progress"
                              >
                                <Clock className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteDesign(design.id)}
                                className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* User List Tab */}
          {activeTab === 'user-list' && (
            <div>
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold font-motomorph mb-2">User List</h2>
                <p className="text-white/70 text-sm md:text-base">Manage registered customers and their activity</p>
              </div>

              {/* Mobile User Cards */}
              <div className="lg:hidden space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="bg-black/50 border border-white/20 rounded-xl p-4 backdrop-blur-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-[#007BFF]/20 rounded-full flex items-center justify-center">
                        <span className="text-[#007BFF] font-semibold">{customer.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{customer.name}</p>
                        <p className="text-white/60 text-sm">{customer.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div><span className="text-white/60">Designs:</span> <span className="text-white">{customer.totalDesigns}</span></div>
                      <div><span className="text-white/60">Last Active:</span> <span className="text-white">{customer.lastActive.toLocaleDateString()}</span></div>
                    </div>
                    <button 
                      onClick={() => {
                        const customerDesigns = carDesigns.filter(d => d.customerId === customer.id);
                        console.log(`Viewing designs for ${customer.name}:`, customerDesigns);
                      }}
                      className="w-full text-[#007BFF] hover:text-[#0056CC] transition-colors px-3 py-2 rounded-lg hover:bg-[#007BFF]/10 text-sm"
                    >
                      View Designs
                    </button>
                  </div>
                ))}
              </div>

              {/* Desktop User Table */}
              <div className="hidden lg:block bg-black/50 border border-white/20 rounded-xl backdrop-blur-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 text-white/80 font-medium">Customer</th>
                        <th className="text-left p-4 text-white/80 font-medium">Email</th>
                        <th className="text-left p-4 text-white/80 font-medium">Total Designs</th>
                        <th className="text-left p-4 text-white/80 font-medium">Last Active</th>
                        <th className="text-left p-4 text-white/80 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-[#007BFF]/20 rounded-full flex items-center justify-center">
                                <span className="text-[#007BFF] font-semibold">{customer.name.charAt(0)}</span>
                              </div>
                              <span className="text-white font-medium">{customer.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-white">{customer.email}</td>
                          <td className="p-4 text-white">{customer.totalDesigns}</td>
                          <td className="p-4 text-white">{customer.lastActive.toLocaleDateString()}</td>
                          <td className="p-4">
                            <button 
                              onClick={() => {
                                const customerDesigns = carDesigns.filter(d => d.customerId === customer.id);
                                console.log(`Viewing designs for ${customer.name}:`, customerDesigns);
                              }}
                              className="text-[#007BFF] hover:text-[#0056CC] transition-colors px-3 py-1 rounded-lg hover:bg-[#007BFF]/10"
                            >
                              View Designs
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold font-motomorph mb-2">Settings</h2>
                <p className="text-white/70 text-sm md:text-base">Configure admin dashboard preferences</p>
              </div>

              <div className="space-y-6">
                {/* Build Phase Settings */}
                <div className="bg-black/50 border border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4">Build Phase Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium text-sm md:text-base">Accepting New Designs</p>
                        <p className="text-white/60 text-xs md:text-sm">Allow customers to submit new car designs</p>
                      </div>
                      <button
                        onClick={() => setAcceptingNewDesigns(!acceptingNewDesigns)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          acceptingNewDesigns ? 'bg-[#007BFF]' : 'bg-white/20'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            acceptingNewDesigns ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Theme Settings */}
                <div className="bg-black/50 border border-white/20 rounded-xl p-4 md:p-6 backdrop-blur-xl">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4">Theme Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium text-sm md:text-base">Dark Mode</p>
                        <p className="text-white/60 text-xs md:text-sm">Use dark theme for the admin dashboard</p>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          darkMode ? 'bg-[#007BFF]' : 'bg-white/20'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            darkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Design Detail Modal */}
      {showDesignModal && selectedDesign && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-white">Design Details</h3>
                <button
                  onClick={() => setShowDesignModal(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-3">Customer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Name</p>
                    <p className="text-white font-medium text-sm md:text-base">{selectedDesign.customerName}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Email</p>
                    <p className="text-white font-medium text-sm md:text-base">{selectedDesign.customerEmail}</p>
                  </div>
                </div>
              </div>

              {/* Car Specifications */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-3">Car Specifications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Budget</p>
                    <p className="text-white font-medium text-sm md:text-base">{selectedDesign.budget}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Engine Type</p>
                    <p className="text-white font-medium text-sm md:text-base">{selectedDesign.engineType}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Transmission</p>
                    <p className="text-white font-medium text-sm md:text-base">{selectedDesign.transmission}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Body Style</p>
                    <p className="text-white font-medium text-sm md:text-base">{selectedDesign.bodyStyle}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Exterior Color</p>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 md:w-6 md:h-6 rounded-full border border-white/20"
                        style={{ backgroundColor: selectedDesign.exteriorColor }}
                      />
                      <span className="text-white font-medium text-sm md:text-base">{selectedDesign.exteriorColor}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Total Price</p>
                    <p className="text-white font-medium text-sm md:text-base">${selectedDesign.totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-3">Selected Features</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDesign.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 md:px-3 md:py-1 bg-[#007BFF]/20 text-[#007BFF] rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex flex-col md:flex-row items-center justify-between pt-4 border-t border-white/10 space-y-4 md:space-y-0">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(selectedDesign.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(selectedDesign.status)}
                      <span>{selectedDesign.status}</span>
                    </div>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      updateDesignStatus(selectedDesign.id, 'Approved');
                      setShowDesignModal(false);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => {
                      updateDesignStatus(selectedDesign.id, 'In Progress');
                      setShowDesignModal(false);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Mark In Progress</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 