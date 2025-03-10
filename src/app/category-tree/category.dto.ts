export interface CategoryDto {
  readonly id: number;
  parentId: number | null;
  name: string;
  readonly subCategories: CategoryDto[];
}
