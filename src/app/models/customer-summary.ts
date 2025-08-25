export interface CustomerSummary {
  customer_id: number;
  dni: string;
  name: string;
  product_type: 'FIJO' | 'MOVIL';
  phone_number: string;
  balance_usd: number;
  balance_limit_usd: number;
  minutes_remaining: number;
  minutes_limit: number;
}
