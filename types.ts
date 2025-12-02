
export type Status = 'completed' | 'pending' | 'not-started';

export interface Unit {
  id: string;
  name: string;
  inventoryProgress: number;
  inventoryStatus: Status;
  auditStatus: Status;
}

export interface DrugItem {
  id: string;
  category: string;
  code: string;
  name: string;
  systemStock: number;
  actualStock: number | ''; // Empty string for initial empty input
  expiryWarning: 'none' | '6-12m' | '<6m';
  checkStatus: 'ok' | 'issue' | 'pending';
  conditionFlags: string[]; // Stores selected checkbox values
  notes: string;
}

export interface AuditItem {
  id: string;
  category: string; // e.g., "Nursing Cart", "Stock Drugs"
  text: string;
  result: 'pass' | 'fail' | 'na' | null;
  failReason: string;
}

export interface SignatureData {
  pharmacistName: string;
  headNurseName: string;
  date: string;
  pharmacistComments: string;
  unitComments: string;
}
