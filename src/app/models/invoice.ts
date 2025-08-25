export type PaymentMethod =
  | 'TRANSFERENCIA'
  | 'TARJETA'
  | 'EFECTIVO'
  | 'MONEDEROS DIGITALES';

export interface InvoiceDto {
  id: number;
  customer_dni: string;
  customer_name: string;
  phone_number: string;
  period: string;                // 'YYYY-MM'
  total: number;
  tax: number;
  discount: number;
  payment_method: PaymentMethod;
  payment_date: string;          // ISO
}
