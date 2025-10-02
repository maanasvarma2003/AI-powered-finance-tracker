import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, PiggyBank, CreditCard, Menu, Bell, User } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import StatsCard from '@/components/StatsCard';
import SpendingChart from '@/components/SpendingChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import TransactionList from '@/components/TransactionList';
import AIInsights from '@/components/AIInsights';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Suspense fallback={<div className="fixed inset-0 bg-background" />}>
        <ParticleBackground />
      </Suspense>

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-primary">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FinanceAI
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Welcome back, Alex
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Here's your financial overview for October 2025
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Balance"
            value="$12,450"
            change="+12.5%"
            changeType="positive"
            icon={Wallet}
            delay={0.1}
          />
          <StatsCard
            title="Monthly Income"
            value="$5,200"
            change="+8.2%"
            changeType="positive"
            icon={TrendingUp}
            delay={0.2}
          />
          <StatsCard
            title="Monthly Expenses"
            value="$3,600"
            change="+5.3%"
            changeType="negative"
            icon={CreditCard}
            delay={0.3}
          />
          <StatsCard
            title="Savings"
            value="$1,600"
            change="+15.8%"
            changeType="positive"
            icon={PiggyBank}
            delay={0.4}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SpendingChart />
          <CategoryPieChart />
        </div>

        {/* Transactions and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionList />
          </div>
          <div>
            <AIInsights />
          </div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Powered by advanced AI algorithms • Data encrypted with AES-256
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
