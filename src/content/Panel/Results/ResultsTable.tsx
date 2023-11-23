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
import { useSnackbar } from 'notistack';
import { ResultModel } from '@/models/result';
import EditResultDialog from './EditResultDialog';
import ConfirmDeleteResultDialog from './ConfirmDeleteResultDialog';

interface ResultsTableProps {
  className?: string;
  results: ResultModel[];
  reloadResults?: Function;
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
  results: ResultModel[],
  filters: Filters
): ResultModel[] => {
  return results.filter((result) => {
    let matches = true;

    if (filters.status && (result.show == true) !== getValueStatusByFilter(filters.status)) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  products: ResultModel[],
  page: number,
  limit: number
): ResultModel[] => {
  return products.slice(page * limit, page * limit + limit);
};

const ResultsTable: FC<ResultsTableProps> = ({ results, reloadResults }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [selectedResults, setSelectedResults] = useState<number[]>([]);
  const [openEditResultDialog, setOpenEditResultDialog] = useState<boolean>(false)
  const [openDialogRemoveConfirmation, setOpenDialogRemoveConfirmation] = useState<boolean>(false)
  const [selectedResult, setSelectedResult] = useState<ProductModel>()
  const selectedBulkActions = selectedResults.length > 0;
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

  const handleSelectAllResults = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedResults(
      event.target.checked
        ? results.map((result) => result.id)
        : []
    );
  };

  const handleSelectOneResult = (
    _event: ChangeEvent<HTMLInputElement>,
    resultId: number
  ): void => {
    if (!selectedResults.includes(resultId)) {
      setSelectedResults((prevSelected) => [
        ...prevSelected,
        resultId
      ]);
    } else {
      setSelectedResults((prevSelected) =>
        prevSelected.filter((id) => id !== resultId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredResults = applyFilters(results, filters);
  const paginatedResults = applyPagination(
    filteredResults,
    page,
    limit
  );
  const selectedSomeResults =
    selectedResults.length > 0 &&
    selectedResults.length < results.length;
  const selectedAllResults =
    selectedResults.length === results.length;
  const theme = useTheme();

  return (<>
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions
            goToDelete={() => {
              if (selectedResults.length == 1) {
                setOpenDialogRemoveConfirmation(true)
              } else {
                enqueueSnackbar("Só é possível deletar 1 resultado selecionado por vez, selecione apenas 1 e tente novamente...", { variant: "warning", autoHideDuration: 10000 })
              }
            }}

            goToEdit={() => {
              if (selectedResults.length == 1) {
                setSelectedResult(results.filter((p) => p.id == selectedResults[0])[0])
                setOpenEditResultDialog(true)
              } else {
                enqueueSnackbar("Só é possível editar 1 resultado selecionado por vez, selecione apenas 1 e tente novamente...", { variant: "warning", autoHideDuration: 10000 })
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
          title="Lista de Resultados"
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
                  checked={selectedAllResults}
                  indeterminate={selectedSomeResults}
                  onChange={handleSelectAllResults}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Data</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResults.map((result) => {
              const isResultSelected = selectedResults.includes(
                result.id
              );
              return (
                <TableRow
                  hover
                  key={result.id}
                  selected={isResultSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isResultSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneResult(event, result.id)
                      }
                      value={isResultSelected}
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
                      {result.id}
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
                      {result.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {result.full_name}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(new Date(result.created_at), 'dd/MM/yyyy - HH:mm:ss')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {getStatusLabel(result.show == true ? "active" : "inactive")}
                    </Typography>
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
                        onClick={() => {
                          setSelectedResult(result)
                          setOpenEditResultDialog(true)
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
                          setSelectedResults([result.id])
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
          count={filteredResults.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          labelDisplayedRows={({ from, to, count }) => { return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`; }}
          labelRowsPerPage={"Resultados por página"}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
    <EditResultDialog
      open={openEditResultDialog}
      onClose={() => {
        setOpenEditResultDialog(false)
      }}
      onSuccess={() => {
        reloadResults()
      }}
      onError={() => {

      }}
      result={selectedResult}
    />
    <ConfirmDeleteResultDialog
      open={openDialogRemoveConfirmation}
      handleClose={() => {
        setOpenDialogRemoveConfirmation(false)
      }}
      handleSuccess={() => {
        setOpenDialogRemoveConfirmation(false)
        setPage(0);
        setSelectedResults([])
        setFilters({
          status: null
        });

        reloadResults()
      }}
      resultsToDelete={results.filter((p) => selectedResults.includes(p.id))}
      handleStartSubmit={() => {
        // setLoading(true);
      }}
    />
  </>
  );
};

ResultsTable.propTypes = {
  results: PropTypes.array.isRequired
};

ResultsTable.defaultProps = {
  results: []
};

export default ResultsTable;
