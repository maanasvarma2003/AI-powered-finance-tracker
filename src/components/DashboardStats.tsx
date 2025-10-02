import { motion } from 'framer-motion';
import { Wallet, TrendingUp, PiggyBank, CreditCard } from 'lucide-react';
import StatsCard from './StatsCard';

interface DashboardStatsProps {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
}

export default function DashboardStats({ 
  totalBalance, 
  monthlyIncome, 
  monthlyExpenses, 
  savings 
}: DashboardStatsProps) {
  const incomeChange = '+8.2%';
  const expensesChange = '+5.3%';
  const savingsChange = '+15.8%';
  const balanceChange = '+12.5%';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Balance"
        value={`₹${totalBalance.toLocaleString('en-IN')}`}
        change={balanceChange}
        changeType="positive"
        icon={Wallet}
        delay={0.1}
      />
      <StatsCard
        title="Monthly Income"
        value={`₹${monthlyIncome.toLocaleString('en-IN')}`}
        change={incomeChange}
        changeType="positive"
        icon={TrendingUp}
        delay={0.2}
      />
      <StatsCard
        title="Monthly Expenses"
        value={`₹${monthlyExpenses.toLocaleString('en-IN')}`}
        change={expensesChange}
        changeType="negative"
        icon={CreditCard}
        delay={0.3}
      />
      <StatsCard
        title="Savings"
        value={`₹${savings.toLocaleString('en-IN')}`}
        change={savingsChange}
        changeType="positive"
        icon={PiggyBank}
        delay={0.4}
      />
    </div>
  );
}
