export class responseDto<T> {
  error: boolean;
  data: T;
  message: string;
  code?: number;
}
