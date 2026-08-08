export type ViewState = 'dashboard' | 'programs' | 'customers' | 'rules' | 'campaigns' | 'rewards' | 'analytics' | 'ai-insight' | 'simulation' | 'redemptions';

export interface GiftCardTier {
  id: string;
  value: number;
  pointsCost: number;
}

export interface RedemptionRule {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
  modality: 'Branch-Based' | 'Product Cap/Threshold' | 'Digital Gift Card' | 'Cross-Merchant';
  tierEligibility: string[];

  // Branch & Threshold Controls
  applicableBranches?: string[];
  maxCashDiscount?: number;
  maxPointsRedeemable?: number;
  productEligibilityScope?: string;
  minimumPoints?: number;
  frequencyLimits?: string;

  // Gift Card Config
  giftCardTiers?: GiftCardTier[];
  giftCardValidity?: string;
  brandingMessage?: string;

  // Partner Network Config
  partnerMerchant?: string;
  voucherGenerationType?: string;
  voucherUsageLimit?: number;
  voucherExpiry?: string;
  validationApiEndpoint?: string;
}

export interface KPI {
  id: string;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

export interface Rule {
  id: string;
  name: string;
  description?: string;
  ruleClass: 'Accumulation' | 'Redemption';
  status: 'Active' | 'Inactive' | 'Scheduled';
  
  earningMethod?: string;
  earningValue?: number;
  bonusType?: string;
  
  minSpend?: number;
  applicableScope?: string[];
  tierEligibility?: string[];
  
  timeTrigger?: string;
  maxPointsCap?: number;
  stackable?: boolean;
  
  redemptionType?: string;
  pointsCostPerUnit?: number;
  monetaryValuePerUnit?: number;
  
  minPointsToRedeem?: number;
  
  maxDiscountCap?: number;
  redemptionFrequencyLimit?: number;
  voucherExpiry?: boolean;
  allowCouponCombine?: boolean;
}

export type RulesState = Rule[];

export interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Draft' | 'Scheduled';
  stackable: boolean;
  linkedRules: string[];
  type: 'Seasonal' | 'Product' | 'Customer Category' | 'Tier-Upgrade' | 'Flash Sale';
  
  // Seasonal
  seasonTag?: string;
  seasonalMultiplier?: number;
  seasonalScope?: string;
  
  // Product
  targetSKUs?: string[];
  productDiscount?: number;
  productFlatBonus?: number;
  
  // Customer Category
  targetSegment?: string;
  segmentAwardType?: string;
  segmentAwardValue?: number;
  
  // Tier-Upgrade
  targetTier?: string;
  challengeMetric?: string;
  challengeGoal?: number;
  challengeDuration?: number;
  completionReward?: number;
  
  // Flash Sale
  saleDurationHours?: number;
  maxRedemptions?: number;
  pointOverride?: number;
  discountOverride?: number;
}

export interface Customer {
  id: string;
  avatarUrl: string;
  fullName: string;
  email: string;
  phone: string;
  tier: 'Gold' | 'Silver' | 'Bronze' | string;
  pointsBalance: number;
  visits: number;
  totalSpent: number; // LTV
  status: 'Active' | 'Inactive' | 'Lapsed';
  lastVisitDate: string;
  enrolledProgram?: string;
}

export interface Reward {
  id: string;
  name: string;
  category: 'Food' | 'Merch' | 'Discount';
  pointsCost: number;
  cashValue: number;
  totalRedeemed: number;
  status: 'Active' | 'Inactive';
}

export interface ProgramTier {
  id: string;
  name: string;
  spendThreshold: number;
  visitFrequency: number;
  overrideBaseRule: boolean;
  accumulationRuleId?: string;
}

export interface CardLinkedOverride {
  id: string;
  network: string;
  accumulationRuleId: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Draft';
  type: 'Tier-Based' | 'Card-Linked' | 'Custom Engine' | 'Points-Based' | 'Cashback' | 'Hybrid' | 'Subscription';
  
  // Global Rules
  globalAccumulationRule?: string;
  globalRedemptionRule?: string;
  
  // Tier-Based
  programTiers?: ProgramTier[];
  
  // Card-Linked
  cardNetworks?: string[];
  bankIssuers?: string[];
  cardOverrides?: CardLinkedOverride[];
  
  // Custom Engine
  triggerEvent?: string;
  actionType?: string;
  actionRuleId?: string;
  flatBonusValue?: number;
  
  // Enrollment & Branding
  urlSlug?: string;
  allowPublicEnrollment?: boolean;
  autoEnroll?: boolean;
  accentColor?: string;
  
  pointsValuation?: number;
  expiryLogic?: 'No Expiry' | 'Fixed Date' | 'Rolling Timeframe';
  expiryValue?: string;
}

