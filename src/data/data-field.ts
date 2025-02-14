export interface DataField {
  key: string;
  label: string;
  description?: string;

  options: Array<{
    value: string;
    label: string;
    imageUrl: string;
  }>;
}

export function DataField<T extends DataField>(data: T) {
  return data;
}
