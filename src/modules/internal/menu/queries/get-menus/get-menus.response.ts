export class GetMenusResponse {
  data: GetMenusData[] = [];
}

export class GetMenusData {
  id: string;
  name: string;
  path?: string;
  children: GetMenusData[];
}
