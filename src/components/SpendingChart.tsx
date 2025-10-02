import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { month: 'Jan', income: 4500, expenses: 3200, savings: 1300 },
  { month: 'Feb', income: 4500, expenses: 3500, savings: 1000 },
  { month: 'Mar', income: 5000, expenses: 3100, savings: 1900 },
  { month: 'Apr', income: 4500, expenses: 3400, savings: 1100 },
  { month: 'May', income: 4800, expenses: 3300, savings: 1500 },
  { month: 'Jun', income: 5200, expenses: 3600, savings: 1600 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-xl border border-border/50 p-4 rounded-xl shadow-lg">
        <p className="text-sm font-semibold text-foreground mb-2">{payload[0].payload.month}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: ₹{entry.value.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SpendingChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-border/50 bg-gradient-card backdrop-blur-xl overflow-hidden">
        <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          Financial Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="month" stroke="#ffffff60" fontSize={12} />
            <YAxis stroke="#ffffff60" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#incomeGradient)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#expensesGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
