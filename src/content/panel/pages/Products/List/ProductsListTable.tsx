import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
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

import Label from 'src/components/Label';
// import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import { Product, ProductActive } from 'src/models/product';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface ProductsListTableProps {
    className?: string;
    products: Product[];
    reloadFunction?: Function;
}

interface Filters {
    active?: Boolean;
}

const getStatusLabel = (isActive): JSX.Element => {
    const map = {
        inativo: {
            text: 'Inativo',
            color: 'error'
        },
        ativo: {
            text: 'Ativo',
            color: 'success'
        },
        pending: {
            text: 'Pending',
            color: 'warning'
        }
    };

    const { text, color }: any = map[isActive];

    return <Label color={color}>{text}</Label>;
};

const applyFilters = (
    products: Product[],
    filters: Filters
): Product[] => {
    return products.filter((p) => {
        let matches = true;

        if (filters.active && p.active !== filters.active) {
            matches = false;
        }

        return matches;
    });
};

const applyPagination = (
    products: Product[],
    page: number,
    limit: number
): Product[] => {
    return products.slice(page * limit, page * limit + limit);
};

const ProductsListTable: FC<ProductsListTableProps> = ({ products }) => {

    const [selectedProducts, setSelectedProducts] = useState<string[]>(
        []
    );
    const selectedBulkActions = selectedProducts.length > 0;
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [filters, setFilters] = useState<Filters>({
        active: null
    });

    const statusOptions = [
        {
            id: 'todos',
            name: 'Todos'
        },
        {
            id: 'ativo',
            name: 'Ativo'
        },
        {
            id: 'inativo',
            name: 'Inativo'
        }
    ];

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
        let value = null;

        if (e.target.value !== 'todos') {
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
                ? products.map((p) => p.id)
                : []
        );
    };

    const handleSelectOneCryptoOrder = (
        event: ChangeEvent<HTMLInputElement>,
        produtoId: string
    ): void => {
        if (!selectedProducts.includes(produtoId)) {
            setSelectedProducts((prevSelected) => [
                ...prevSelected,
                produtoId
            ]);
        } else {
            setSelectedProducts((prevSelected) =>
                prevSelected.filter((id) => id !== produtoId)
            );
        }
    };

    const handlePageChange = (event: any, newPage: number): void => {
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

    const getCurrencyBRA = (number) => {
        let str_number = numeral(number).format(
            `0,0.00`
        ).replace(',', '.');

        str_number = str_number.slice(0, str_number.length - 3) + ',' + str_number.slice(-2)

        return (str_number)
    }

    return (
        <Card>
            {selectedBulkActions && (
                <Box flex={1} p={2}>
                    <BulkActions />
                </Box>
            )}
            {!selectedBulkActions && (
                <CardHeader
                    action={
                        <Box width={150}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={filters.active || 'todos'}
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
                    title="Produtos"
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
                            <TableCell>Título</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell align="right">Preço Promocional</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedProducts.map((p) => {
                            const isProductselected = selectedProducts.includes(
                                p.id
                            );
                            return (
                                <TableRow
                                    hover
                                    key={p.id}
                                    selected={isProductselected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isProductselected}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                handleSelectOneCryptoOrder(event, p.id)
                                            }
                                            value={isProductselected}
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
                                            {p.id}
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
                                            {p.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {format(new Date(p.created_at), 'dd/MMM/yyyy')}
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
                                            R$ {getCurrencyBRA(p.price)}
                                        </Typography>
                                        {/* <Typography variant="body2" color="text.secondary" noWrap>
                                            {p.sourceDesc}
                                        </Typography> */}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            R$ {getCurrencyBRA(p.promotion_price)}
                                        </Typography>
                                        {/* <Typography variant="body2" color="text.secondary" noWrap>
                                            {numeral(cryptoOrder.amount).format(
                                                `${cryptoOrder.currency}0,0.00`
                                            )}
                                        </Typography> */}
                                    </TableCell>
                                    <TableCell align="right">
                                        {getStatusLabel(p.active ? 'ativo' : 'inativo')}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit Order" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background: theme.colors.primary.lighter
                                                    },
                                                    color: theme.palette.primary.main
                                                }}
                                                color="inherit"
                                                size="small"
                                            >
                                                <EditTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Order" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': { background: theme.colors.error.lighter },
                                                    color: theme.palette.error.main
                                                }}
                                                color="inherit"
                                                size="small"
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
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                />
            </Box>
        </Card>
    );
};

ProductsListTable.propTypes = {
    products: PropTypes.array.isRequired
};

ProductsListTable.defaultProps = {
    products: []
};

export default ProductsListTable;
