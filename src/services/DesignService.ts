// Service to handle car design submissions and data flow
export interface CarDesign {
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

class DesignService {
  private designs: CarDesign[] = [];
  private nextId = 1;

  // Submit a new car design from customer
  submitDesign(customerData: any, configData: any): CarDesign {
    const design: CarDesign = {
      id: this.nextId++,
      customerId: customerData.id,
      customerName: customerData.name,
      customerEmail: customerData.email,
      budget: configData.budget || '$50k-75k',
      engineType: configData.engineType || 'Petrol',
      transmission: configData.transmission || 'Automatic',
      tyres: configData.tyres || 'Normal',
      wheels: configData.rims || 'Classic',
      exhaustType: configData.exhaustStyle || 'Single',
      bodyStyle: configData.bodyStyle || 'Sedan',
      exteriorColor: configData.exteriorColor || '#007BFF',
      interiorLayout: configData.dashboardLayout || 'Classic',
      features: configData.smartTech || [],
      status: 'Under Review',
      submittedAt: new Date(),
      totalPrice: this.calculatePrice(configData)
    };

    this.designs.push(design);
    this.saveToLocalStorage();
    return design;
  }

  // Get all designs for admin dashboard
  getAllDesigns(): CarDesign[] {
    this.loadFromLocalStorage();
    return this.designs;
  }

  // Update design status
  updateDesignStatus(designId: number, newStatus: CarDesign['status']): void {
    const design = this.designs.find(d => d.id === designId);
    if (design) {
      design.status = newStatus;
      this.saveToLocalStorage();
    }
  }

  // Delete design
  deleteDesign(designId: number): void {
    this.designs = this.designs.filter(d => d.id !== designId);
    this.saveToLocalStorage();
  }

  // Calculate total price based on configuration
  private calculatePrice(config: any): number {
    let basePrice = 500000; // ₹5L base price
    
    // Add budget range
    if (config.budget) {
      const budgetValue = parseInt(config.budget.replace(/[^\d]/g, ''));
      basePrice += budgetValue * 1000;
    }

    // Add features
    if (config.smartTech && Array.isArray(config.smartTech)) {
      basePrice += config.smartTech.length * 20000;
    }

    // Add rim size
    if (config.rimSize) {
      basePrice += config.rimSize * 10000;
    }

    // Add airbags
    if (config.airbags) {
      basePrice += config.airbags * 5000;
    }

    // Add add-ons
    if (config.towHitch) basePrice += 15000;
    if (config.roofRack) basePrice += 10000;

    return basePrice;
  }

  // Save to localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem('motomorph_designs', JSON.stringify(this.designs));
  }

  // Load from localStorage
  private loadFromLocalStorage(): void {
    const saved = localStorage.getItem('motomorph_designs');
    if (saved) {
      this.designs = JSON.parse(saved).map((design: any) => ({
        ...design,
        submittedAt: new Date(design.submittedAt)
      }));
      this.nextId = Math.max(...this.designs.map(d => d.id), 0) + 1;
    }
  }

  // Get designs by customer
  getDesignsByCustomer(customerId: number): CarDesign[] {
    return this.designs.filter(d => d.customerId === customerId);
  }

  // Get designs by status
  getDesignsByStatus(status: CarDesign['status']): CarDesign[] {
    return this.designs.filter(d => d.status === status);
  }

  // Get statistics
  getStats() {
    return {
      total: this.designs.length,
      underReview: this.designs.filter(d => d.status === 'Under Review').length,
      inProgress: this.designs.filter(d => d.status === 'In Progress').length,
      approved: this.designs.filter(d => d.status === 'Approved').length
    };
  }
}

export const designService = new DesignService(); 