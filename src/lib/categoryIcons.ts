import {
  UtensilsCrossed,
  Car,
  Zap,
  ShoppingBag,
  Film,
  HeartPulse,
  GraduationCap,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import type { ExpenseCategory } from "../types/expense";

export const categoryIcons: Record<ExpenseCategory, LucideIcon> = {
  "Food & Dining": UtensilsCrossed,
  Transportation: Car,
  Utilities: Zap,
  Shopping: ShoppingBag,
  Entertainment: Film,
  Health: HeartPulse,
  Education: GraduationCap,
  Other: MoreHorizontal,
};
