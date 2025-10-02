import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Utensils, Car, Home, Tv, Zap, Heart, GraduationCap, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const categoryIcons: Record<string, any> = {
  shopping: ShoppingBag,
  food: Utensils,
  transport: Car,
  housing: Home,
  entertainment: Tv,
  income: Zap,
  healthcare: Heart,
  education: GraduationCap,
  utilities: Wrench,
  savings: Zap,
  investment: Zap,
  other: ShoppingBag
};

const categoryColors: Record<string, string> = {
  shopping: 'text-purple-400',
  food: 'text-orange-400',
  transport: 'text-blue-400',
  housing: 'text-red-400',
  entertainment: 'text-pink-400',
  income: 'text-emerald-400',
  healthcare: 'text-rose-400',
  education: 'text-indigo-400',
  utilities: 'text-cyan-400',
  savings: 'text-green-400',
  investment: 'text-yellow-400',
  other: 'text-gray-400'
};

interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function RealTimeTransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();

    // Set up realtime subscription
    const channel = supabase
      .channel('transactions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions'
        },
        () => {
          fetchTransactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-border/50 bg-gradient-card backdrop-blur-xl p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-secondary/30 rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card className="border-border/50 bg-gradient-card backdrop-blur-xl p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No transactions yet</p>
          <p className="text-sm text-muted-foreground mt-2">Add your first transaction to get started</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-gradient-card backdrop-blur-xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
          Recent Transactions
        </h2>
        <div className="space-y-3">
          {transactions.map((transaction, index) => {
            const Icon = categoryIcons[transaction.category] || ShoppingBag;
            const color = categoryColors[transaction.category] || 'text-gray-400';
            
            return (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all border border-border/30"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-background/50 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{transaction.description}</p>
                    <Badge variant="outline" className="mt-1 text-xs capitalize">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
                <span className={`text-lg font-bold ${
                  transaction.amount > 0 ? 'text-emerald-400' : 'text-foreground'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
