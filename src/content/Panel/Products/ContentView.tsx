import { Card } from '@mui/material';

import ProductsTable from './ProductsTable';
import { useEffect, useState } from 'react';
import { ProductModel } from '@/models/product';
import { getProductList } from '@/repositories/products';

function ContentView() {

  const [products, setProducts] = useState<ProductModel[]>([])

  const _getAllProducts = async () => {
    let resp = await getProductList()

    if (resp.success) {
      setProducts(resp.data)
    }
  }

  useEffect(() => {

    _getAllProducts()
  }, [])

  return (
    <Card>
      <ProductsTable reloadProducts={() => _getAllProducts()} products={products} />
    </Card>
  );
}

export default ContentView;
