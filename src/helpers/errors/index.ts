interface ResponseErrorParams {
  code?: string | number;
  title?: string;
  description?: string;
}

export class ResponseError {
  public code?: string | number;
  public title?: string;
  public description?: string;

  constructor({ code = 400, title, description }: ResponseErrorParams) {
    Object.assign(this, {
      code,
      title,
      description,
    });
  }
}
