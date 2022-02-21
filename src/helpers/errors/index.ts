export class ResponseError {
  constructor(
    public code?: string | number,
    public title?: string,
    public description?: string,
  ) {}
}
