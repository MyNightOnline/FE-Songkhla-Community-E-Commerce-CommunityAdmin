export interface Order {
  order_id: number;
  date: string;
  full_name: string;
  mobile: string;
  address: string;
  order_status: string;
  total_price: number;
  delivery_price: number;
  total: number;
  users_id: string;
  users_commu_id: string;
  payment_id: string;
}
  