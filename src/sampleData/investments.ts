export interface Investment {
  id: number;
  category: string;
  recipient_name: string;
  amount: number;
  description: string;
  date: string;
}

export interface InvestmentSummary {
  total_invested: number;
  category_breakdown: {
    HBCU: number;
    Startup: number;
    Bank: number;
  };
  recent_investments: Investment[];
  hbcu_count: number;
  startup_count: number;
  bank_count: number;
}

export const sampleInvestmentSummary: InvestmentSummary = {
  total_invested: 45000.00,
  category_breakdown: {
    HBCU: 22500.00,
    Startup: 15000.00,
    Bank: 7500.00
  },
  hbcu_count: 5,
  startup_count: 8,
  bank_count: 3,
  recent_investments: [
    {
      id: 1,
      category: "HBCU",
      recipient_name: "Howard University STEM Program",
      amount: 5000.00,
      description: "Supporting computer science scholarships and lab equipment for underrepresented students in technology.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      category: "Startup",
      recipient_name: "TechBridge Solutions",
      amount: 3500.00,
      description: "Black-owned fintech startup providing banking solutions for underserved communities.",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      category: "Bank",
      recipient_name: "Unity National Bank",
      amount: 2500.00,
      description: "Supporting Black-owned bank's small business lending program for minority entrepreneurs.",
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      category: "HBCU",
      recipient_name: "Spelman College Scholarship Fund",
      amount: 4000.00,
      description: "Merit-based scholarships for women in STEM pursuing careers in technology and engineering.",
      date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};

export const sampleCategoryInvestments: Record<string, Investment[]> = {
  HBCU: [
    {
      id: 1,
      category: "HBCU",
      recipient_name: "Howard University STEM Program",
      amount: 5000.00,
      description: "Supporting computer science scholarships and lab equipment for underrepresented students in technology.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      category: "HBCU",
      recipient_name: "Spelman College Scholarship Fund",
      amount: 4000.00,
      description: "Merit-based scholarships for women in STEM pursuing careers in technology and engineering.",
      date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      category: "HBCU",
      recipient_name: "Morehouse College Business Incubator",
      amount: 3500.00,
      description: "Funding entrepreneurship programs and startup resources for business students.",
      date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  Startup: [
    {
      id: 2,
      category: "Startup",
      recipient_name: "TechBridge Solutions",
      amount: 3500.00,
      description: "Black-owned fintech startup providing banking solutions for underserved communities.",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 6,
      category: "Startup",
      recipient_name: "EcoGreen Innovations",
      amount: 2800.00,
      description: "Sustainable energy startup developing affordable solar solutions for urban communities.",
      date: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 7,
      category: "Startup",
      recipient_name: "HealthFirst Mobile Clinics",
      amount: 3200.00,
      description: "Healthcare startup bringing medical services to underserved neighborhoods via mobile clinics.",
      date: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  Bank: [
    {
      id: 3,
      category: "Bank",
      recipient_name: "Unity National Bank",
      amount: 2500.00,
      description: "Supporting Black-owned bank's small business lending program for minority entrepreneurs.",
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 8,
      category: "Bank",
      recipient_name: "Liberty Bank Community Fund",
      amount: 2000.00,
      description: "Funding affordable housing loans and financial literacy programs in Black communities.",
      date: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};
