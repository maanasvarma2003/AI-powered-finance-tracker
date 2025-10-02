import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const transactionSchema = z.object({
  amount: z.number().positive('Amount must be positive').max(10000000, 'Amount too large'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required').max(500, 'Description too long')
});

const categories = [
  { value: 'food', label: 'Food & Dining' },
  { value: 'transport', label: 'Transportation' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'housing', label: 'Housing' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'income', label: 'Income' },
  { value: 'savings', label: 'Savings' },
  { value: 'investment', label: 'Investment' },
  { value: 'other', label: 'Other' }
];

interface AddTransactionModalProps {
  onSuccess: () => void;
}

export default function AddTransactionModal({ onSuccess }: AddTransactionModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = transactionSchema.parse({
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description
      });

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to add transactions');
        return;
      }

      const { error } = await supabase
        .from('transactions')
        .insert([{
          user_id: user.id,
          amount: validated.amount,
          category: validated.category as any,
          description: validated.description
        }]);

      if (error) throw error;

      toast.success('Transaction added successfully!');
      setFormData({ amount: '', category: '', description: '' });
      setOpen(false);
      onSuccess();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error('Error adding transaction:', error);
        toast.error('Failed to add transaction');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-card backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="1000.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Grocery shopping"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding...' : 'Add Transaction'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
