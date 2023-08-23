export interface IHostData {
  hostname: string;
}

declare global {
  interface Window {
    host: IHostData;
  }
}
