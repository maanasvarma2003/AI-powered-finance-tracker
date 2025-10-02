import { motion } from 'framer-motion';
import { ShoppingBag, Utensils, Car, Home, Tv, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const transactions = [
  { id: 1, name: 'Amazon Purchase', category: 'Shopping', amount: -125.50, icon: ShoppingBag, color: 'text-purple-400' },
  { id: 2, name: 'Restaurant Dinner', category: 'Food', amount: -67.30, icon: Utensils, color: 'text-orange-400' },
  { id: 3, name: 'Salary Deposit', category: 'Income', amount: 4500.00, icon: Zap, color: 'text-emerald-400' },
  { id: 4, name: 'Gas Station', category: 'Transport', amount: -45.00, icon: Car, color: 'text-blue-400' },
  { id: 5, name: 'Rent Payment', category: 'Housing', amount: -1200.00, icon: Home, color: 'text-red-400' },
  { id: 6, name: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, icon: Tv, color: 'text-pink-400' },
];

export default function TransactionList() {
  return (
    <Card className="border-border/50 bg-gradient-card backdrop-blur-xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
          Recent Transactions
        </h2>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all border border-border/30"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-background/50 ${transaction.color}`}>
                  <transaction.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{transaction.name}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {transaction.category}
                  </Badge>
                </div>
              </div>
              <span className={`text-lg font-bold ${
                transaction.amount > 0 ? 'text-emerald-400' : 'text-foreground'
              }`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
