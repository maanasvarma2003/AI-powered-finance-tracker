import { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, Bell, User, LogOut, Menu } from 'lucide-react';
import EnhancedParticleBackground from '@/components/EnhancedParticleBackground';
import DashboardStats from '@/components/DashboardStats';
import SpendingChart from '@/components/SpendingChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import RealTimeTransactionList from '@/components/RealTimeTransactionList';
import RealTimeAIInsights from '@/components/RealTimeAIInsights';
import AddTransactionModal from '@/components/AddTransactionModal';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate('/auth');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user, refreshKey]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Failed to logout');
    } else {
      toast.success('Logged out successfully');
      navigate('/auth');
    }
  };

  // Calculate stats from real data
  const income = transactions
    .filter(t => t.category === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const expenses = transactions
    .filter(t => t.category !== 'income' && t.category !== 'savings')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const savings = transactions
    .filter(t => t.category === 'savings')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const totalBalance = income - expenses + savings;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Suspense fallback={<div className="fixed inset-0 bg-background" />}>
        <EnhancedParticleBackground />
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
              <AddTransactionModal onSuccess={() => setRefreshKey(prev => prev + 1)} />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
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
              Welcome back, {user.user_metadata?.full_name || 'User'}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Here's your financial overview for October 2025
          </p>
        </motion.div>

        {/* Stats Grid */}
        <DashboardStats 
          totalBalance={totalBalance}
          monthlyIncome={income}
          monthlyExpenses={expenses}
          savings={savings}
        />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SpendingChart />
          <CategoryPieChart />
        </div>

        {/* Transactions and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RealTimeTransactionList />
          </div>
          <div>
            <RealTimeAIInsights transactions={transactions} />
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
}
