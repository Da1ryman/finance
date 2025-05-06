import mongoose, { Schema } from 'mongoose';
import { IFinance } from '../dto/finance.dto';

const financeSchema = new Schema<IFinance>({
  type: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
});

export const Finance = mongoose.model('finance', financeSchema);
