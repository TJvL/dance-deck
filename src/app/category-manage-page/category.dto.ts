export interface CategoryNodeDto {
  readonly id: number;
  readonly parentId: number | null;
  readonly name: string;
  readonly childCategories: readonly CategoryNodeDto[];
}

export interface CategoryEntryDto {
  readonly id: number;
  readonly name: string;
}

export interface NewCategoryDto {
  readonly parentId: number;
  readonly name: string;
}
