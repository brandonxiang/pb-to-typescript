export interface FieldContent {
  [key: string]: {
    [key: string]: string | number;
    type: string;
    id: number;
  };
}

export interface MethodContent {
  [key: string]: {
    [key: string]: string | number;
    requestType: string;
    responseType: string;
  };
}
