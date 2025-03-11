export interface CategoryDto {
  readonly id: number;
  readonly parentId: number | null;
  readonly name: string;
  readonly subCategories: readonly CategoryDto[];
}

export interface NewCategoryDto {
  readonly name: string;
  readonly parentId: number;
}
