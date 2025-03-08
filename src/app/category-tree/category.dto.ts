export interface CategoryDto {
  readonly id: number;
  parentId?: number;
  name: string;
  readonly subCategories: CategoryDto[];
}
