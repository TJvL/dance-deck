export interface CategoryDto {
  readonly id: number;
  readonly parentId: number | null;
  readonly name: string;
  readonly childCategories: readonly CategoryDto[];
}

export interface NewCategoryDto {
  readonly parentId: number;
  readonly name: string;
}
