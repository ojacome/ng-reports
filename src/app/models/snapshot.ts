export interface Breakdown {
  used_social_bytes: number;
  used_entertainment_bytes: number;
  used_system_updates_bytes: number;
  used_navigation_search_bytes: number;
}

export interface Snapshot {
  type: 'snapshot';
  phone_number: string;
  client_full_name: string;
  plan_id: number;
  limit_bytes: number;
  expiration_at: string;
  breakdown: Breakdown;
  total_bytes: number;
  percent: number;
  expired: boolean;
}
