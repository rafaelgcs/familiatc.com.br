import { Card } from '@mui/material';
import { Product } from 'src/models/product';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import ProductsListTable from './ProductsListTable';
import { getAllProducts } from 'src/repositories/panel/products';

const ProductList = () => {

  const defaultValue: Product[] = [];
  const [products, setProducts] = useState(defaultValue);

  const getProducts = async () => {
    console.log("called")
    let res = await getAllProducts();
    console.log("after called", res)
    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <Card>
      <ProductsListTable products={products} reloadFunction={() => getProducts()} />
    </Card>
  );
}

export default ProductList;
