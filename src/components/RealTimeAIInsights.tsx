import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Sparkles, TrendingUp, AlertCircle, Target, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Insight {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
}

const iconMap = {
  success: TrendingUp,
  warning: AlertCircle,
  info: Target
};

const colorMap = {
  success: { text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  warning: { text: 'text-amber-400', bg: 'bg-amber-500/10' },
  info: { text: 'text-blue-400', bg: 'bg-blue-500/10' }
};

interface RealTimeAIInsightsProps {
  transactions: any[];
}

export default function RealTimeAIInsights({ transactions }: RealTimeAIInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transactions.length > 0) {
      generateInsights();
    }
  }, [transactions]);

  const generateInsights = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-insights', {
        body: { transactions: transactions.slice(0, 20) }
      });

      if (error) {
        if (error.message?.includes('429')) {
          toast.error('AI rate limit reached. Please try again later.');
        } else if (error.message?.includes('402')) {
          toast.error('AI credits exhausted. Please add credits to continue.');
        } else {
          throw error;
        }
        return;
      }

      setInsights(data?.insights || []);
    } catch (error) {
      console.error('Error generating insights:', error);
      toast.error('Failed to generate AI insights');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-border/50 bg-gradient-card backdrop-blur-xl p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Card>
    );
  }

  if (insights.length === 0 && transactions.length === 0) {
    return (
      <Card className="border-border/50 bg-gradient-card backdrop-blur-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Insights
          </h2>
        </div>
        <p className="text-muted-foreground text-center py-8">
          Add transactions to get AI-powered insights
        </p>
      </Card>
    );
  }

  return (
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
          {insights.map((insight, index) => {
            const Icon = iconMap[insight.type];
            const colors = colorMap[insight.type];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`p-4 rounded-xl border border-border/30 ${colors.bg} backdrop-blur-sm transition-all`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-background/50 ${colors.text}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
