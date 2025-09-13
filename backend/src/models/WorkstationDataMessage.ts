
export interface WorkstationDataMessage {
  wsName: string;        
  payload: Record<string, any>; 
  timestamp: number;     
}