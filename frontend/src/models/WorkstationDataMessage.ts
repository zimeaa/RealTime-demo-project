
export interface WorkstationDataMessage {
  wsName: string;        
  payload: WorkstationDataPayload; 
  timestamp: number;     
}

export interface WorkstationDataPayload {
  action: string;
  postion: postionData;
  user: string;
}

export interface postionData {
  x: number;
  y: number;
  z: number;
}