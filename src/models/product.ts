export type ProductActive = 'visível' | 'invisível';

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    promotion: Boolean;
    promotion_price: number;
    link: string;
    image: string;
    active: Boolean;
    created_at: Date;
    updated_at: Date;
}