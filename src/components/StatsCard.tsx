import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  delay?: number;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  delay = 0 
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.03, 
        y: -5,
        transition: { duration: 0.2 } 
      }}
    >
      <Card className="relative overflow-hidden border-border/50 bg-gradient-card backdrop-blur-xl group">
        <div className="absolute inset-0 bg-gradient-glow opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.div 
              className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-6 h-6 text-primary" />
            </motion.div>
            <motion.span 
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                changeType === 'positive' 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-red-500/10 text-red-400'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.3, type: "spring" }}
            >
              {change}
            </motion.span>
          </div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <motion.p 
            className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.2 }}
          >
            {value}
          </motion.p>
        </div>
      </Card>
    </motion.div>
  );
}
