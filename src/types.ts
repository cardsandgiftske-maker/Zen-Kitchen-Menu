export interface CustomizationOption {
  id: string;
  title: string;
  options: string[];
  required?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number | Record<string, number>;
  tags?: string[];
  customizations?: CustomizationOption[];
}

export interface MenuSubCategory {
  title: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  title: string;
  items?: MenuItem[];
  subcategories?: MenuSubCategory[];
  description?: string;
}
