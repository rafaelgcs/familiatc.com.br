import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from '@/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { ProductModel } from '@/models/product';
import EditProductDialog from './EditProductDialog';
import { useSnackbar } from 'notistack';
import ConfirmdeleteProductDialog from './ConfirmDeleteProductDialog';

interface ProductsTableProps {
  className?: string;
  products: ProductModel[];
  reloadProducts?: Function;
}

interface Filters {
  status?: string;
}

const getStatusLabel = (statusLabel: string): JSX.Element => {
  const map = {
    active: {
      text: 'Ativo',
      color: 'success'
    },
    inactive: {
      text: 'Inativo',
      color: 'warning'
    }
  };

  const { text, color }: any = map[statusLabel];

  return <Label color={color}>{text}</Label>;
};

const getValueStatusByFilter = (filterValue: string): boolean => {
  const map = {
    active: {
      value: true
    },
    inactive: {
      value: false
    }
  };

  const { value }: any = map[filterValue];

  return value;
};

const applyFilters = (
  products: ProductModel[],
  filters: Filters
): ProductModel[] => {
  return products.filter((product) => {
    let matches = true;

    if (filters.status && (product.active == true) !== getValueStatusByFilter(filters.status)) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  products: ProductModel[],
  page: number,
  limit: number
): ProductModel[] => {
  return products.slice(page * limit, page * limit + limit);
};

const ProductsTable: FC<ProductsTableProps> = ({ products, reloadProducts }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [selectedProducts, setSelectedProducts] = useState<number[]>(
    []
  );
  const [openEditProductDialog, setOpenEditProductDialog] = useState<boolean>(false)
  const [openDialogRemoveConfirmation, setOpenDialogRemoveConfirmation] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductModel>()
  const selectedBulkActions = selectedProducts.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'Todos'
    },
    {
      id: 'active',
      name: 'Ativo'
    },
    {
      id: 'inactive',
      name: 'Inativo'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllProducts = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedProducts(
      event.target.checked
        ? products.map((product) => product.id)
        : []
    );
  };

  const handleSelectOneProduct = (
    _event: ChangeEvent<HTMLInputElement>,
    productId: number
  ): void => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts((prevSelected) => [
        ...prevSelected,
        productId
      ]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => id !== productId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredProducts = applyFilters(products, filters);
  const paginatedProducts = applyPagination(
    filteredProducts,
    page,
    limit
  );
  const selectedSomeProducts =
    selectedProducts.length > 0 &&
    selectedProducts.length < products.length;
  const selectedAllProducts =
    selectedProducts.length === products.length;
  const theme = useTheme();

  return (<>
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions
            goToDelete={() => {
              if (selectedProducts.length == 1) {
                setOpenDialogRemoveConfirmation(true)
              } else {
                enqueueSnackbar("Só é possível deletar 1 produto selecionado por vez, selecione apenas 1 e tente novamente...", { variant: "warning", autoHideDuration: 10000 })
              }
            }}

            goToEdit={() => {
              if (selectedProducts.length == 1) {
                setSelectedProduct(products.filter((p) => p.id == selectedProducts[0])[0])
                setOpenEditProductDialog(true)
              } else {
                enqueueSnackbar("Só é possível editar 1 produto selecionado por vez, selecione apenas 1 e tente novamente...", { variant: "warning", autoHideDuration: 10000 })
              }
            }}
          />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Lista de Produtos"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllProducts}
                  indeterminate={selectedSomeProducts}
                  onChange={handleSelectAllProducts}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product) => {
              const isProductSelected = selectedProducts.includes(
                product.id
              );
              return (
                <TableRow
                  hover
                  key={product.id}
                  selected={isProductSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isProductSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneProduct(event, product.id)
                      }
                      value={isProductSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {product.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(new Date(product.created_at), 'dd/MM/yyyy - HH:mm:ss')}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {
                        parseFloat(product?.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })
                      }
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {getStatusLabel(product.active == true ? "active" : "inactive")}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Editar Produto" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setSelectedProduct(product)
                          setOpenEditProductDialog(true)
                        }}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Deletar Produto" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setSelectedProducts([product.id])
                          setOpenDialogRemoveConfirmation(true)
                        }}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredProducts.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          labelDisplayedRows={({ from, to, count }) => { return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`; }}
          labelRowsPerPage={"Produtos por página"}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
    <EditProductDialog
      open={openEditProductDialog}
      onClose={() => {
        setOpenEditProductDialog(false)
      }}
      onSuccess={() => {
        reloadProducts()
      }}
      onError={() => {

      }}
      product={selectedProduct}
    />
    <ConfirmdeleteProductDialog
      open={openDialogRemoveConfirmation}
      handleClose={() => {
        setOpenDialogRemoveConfirmation(false)
      }}
      handleSuccess={() => {
        setOpenDialogRemoveConfirmation(false)
        setPage(0);
        setSelectedProducts([])
        setFilters({
          status: null
        });

        reloadProducts()
      }}
      productsToDelete={products.filter((p) => selectedProducts.includes(p.id))}
      handleStartSubmit={() => {
        // setLoading(true);
      }}
    />
  </>
  );
};

ProductsTable.propTypes = {
  products: PropTypes.array.isRequired
};

ProductsTable.defaultProps = {
  products: []
};

export default ProductsTable;
