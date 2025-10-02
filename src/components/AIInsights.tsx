import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Sparkles, TrendingUp, AlertCircle, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const insights = [
  {
    id: 1,
    type: 'success',
    icon: TrendingUp,
    title: 'Great Savings Progress',
    description: 'You saved 15% more this month compared to last month. Keep it up!',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    id: 2,
    type: 'warning',
    icon: AlertCircle,
    title: 'Spending Alert',
    description: 'Your dining expenses are 30% higher than average. Consider meal planning.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    id: 3,
    type: 'info',
    icon: Target,
    title: 'Goal Update',
    description: "You're 67% towards your vacation fund goal. $1,500 more to go!",
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
];

export default function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="border-border/50 bg-gradient-card backdrop-blur-xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Insights
            </h2>
          </div>
          
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`p-4 rounded-xl border border-border/30 ${insight.bg} backdrop-blur-sm transition-all`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-background/50 ${insight.color}`}>
                    <insight.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-6 p-4 rounded-xl bg-gradient-accent"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white mb-1">Predicted Savings</p>
                <p className="text-2xl font-bold text-white">$1,850</p>
                <p className="text-xs text-white/80 mt-1">Expected by end of next month</p>
              </div>
              <div className="text-right">
                <Badge className="bg-white/20 text-white border-white/30">
                  +22% from avg
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
