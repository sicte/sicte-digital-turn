export interface BaseResponse {
  message: string;
  ok: boolean;
}

export interface InsertResponse {
  affectedRows: number;
  changedRows: number;
  fieldCount: number;
  insertId: number;
  message: string;
  protocol41: boolean;
  serverStatus: number;
  warningCount: number;
}
