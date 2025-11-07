export class GetCountriesResponse {
  data: GetCountriesItemResponse[];
}
export class GetCountriesItemResponse {
  id: number;
  name: string;
  flagUrl: string;
  dialCode: string;
  alpha2Code: string;
  alpha3Code: string;

  constructor(partial?: Partial<GetCountriesItemResponse>) {
    Object.assign(this, partial);
  }
}
