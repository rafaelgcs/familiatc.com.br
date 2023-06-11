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
import EditProductDialog from './EditTestimonialDialog';
import { useSnackbar } from 'notistack';
import { TestimonialModel } from '@/models/testimonial';
import ConfirmDeleteTestimonialDialog from './ConfirmDeleteTestimonialDialog';

interface TestimonialsTableProps {
  className?: string;
  testimonials: TestimonialModel[];
  reloadTestimonials?: Function;
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
  testimonials: TestimonialModel[],
  filters: Filters
): TestimonialModel[] => {
  return testimonials.filter((testimonial) => {
    let matches = true;

    if (filters.status && (testimonial.show == true) !== getValueStatusByFilter(filters.status)) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  products: TestimonialModel[],
  page: number,
  limit: number
): TestimonialModel[] => {
  return products.slice(page * limit, page * limit + limit);
};

const TestimonialsTable: FC<TestimonialsTableProps> = ({ testimonials, reloadTestimonials }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [selectedTestimonials, setSelectedTestimonials] = useState<number[]>([]);
  const [openEditTestimonialDialog, setOpenEditTestimonialDialog] = useState<boolean>(false)
  const [openDialogRemoveConfirmation, setOpenDialogRemoveConfirmation] = useState<boolean>(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<ProductModel>()
  const selectedBulkActions = selectedTestimonials.length > 0;
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

  const handleSelectAllTestimonials = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedTestimonials(
      event.target.checked
        ? testimonials.map((testimonial) => testimonial.id)
        : []
    );
  };

  const handleSelectOneTestimonial = (
    _event: ChangeEvent<HTMLInputElement>,
    testimonialId: number
  ): void => {
    if (!selectedTestimonials.includes(testimonialId)) {
      setSelectedTestimonials((prevSelected) => [
        ...prevSelected,
        testimonialId
      ]);
    } else {
      setSelectedTestimonials((prevSelected) =>
        prevSelected.filter((id) => id !== testimonialId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredTestimonials = applyFilters(testimonials, filters);
  const paginatedTestimonials = applyPagination(
    filteredTestimonials,
    page,
    limit
  );
  const selectedSomeTestimonials =
    selectedTestimonials.length > 0 &&
    selectedTestimonials.length < testimonials.length;
  const selectedAllTestimonials =
    selectedTestimonials.length === testimonials.length;
  const theme = useTheme();

  return (<>
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions
            goToDelete={() => {
              if (selectedTestimonials.length == 1) {
                setOpenDialogRemoveConfirmation(true)
              } else {
                enqueueSnackbar("Só é possível deletar 1 depoimento selecionado por vez, selecione apenas 1 e tente novamente...", { variant: "warning", autoHideDuration: 10000 })
              }
            }}

            goToEdit={() => {
              if (selectedTestimonials.length == 1) {
                setSelectedTestimonial(testimonials.filter((p) => p.id == selectedTestimonials[0])[0])
                setOpenEditTestimonialDialog(true)
              } else {
                enqueueSnackbar("Só é possível editar 1 depoimento selecionado por vez, selecione apenas 1 e tente novamente...", { variant: "warning", autoHideDuration: 10000 })
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
          title="Lista de Depoimentos"
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
                  checked={selectedAllTestimonials}
                  indeterminate={selectedSomeTestimonials}
                  onChange={handleSelectAllTestimonials}
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
            {paginatedTestimonials.map((testimonial) => {
              const isTestimonialSelected = selectedTestimonials.includes(
                testimonial.id
              );
              return (
                <TableRow
                  hover
                  key={testimonial.id}
                  selected={isTestimonialSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isTestimonialSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneTestimonial(event, testimonial.id)
                      }
                      value={isTestimonialSelected}
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
                      {testimonial.id}
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
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {testimonial.full_name}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(new Date(testimonial.created_at), 'dd/MM/yyyy - HH:mm:ss')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {getStatusLabel(testimonial.show == true ? "active" : "inactive")}
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
                          setSelectedTestimonial(testimonial)
                          setOpenEditTestimonialDialog(true)
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
                          setSelectedTestimonials([testimonial.id])
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
          count={filteredTestimonials.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          labelDisplayedRows={({ from, to, count }) => { return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`; }}
          labelRowsPerPage={"Depoimentos por página"}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
    <EditProductDialog
      open={openEditTestimonialDialog}
      onClose={() => {
        setOpenEditTestimonialDialog(false)
      }}
      onSuccess={() => {
        reloadTestimonials()
      }}
      onError={() => {

      }}
      testimonial={selectedTestimonial}
    />
    <ConfirmDeleteTestimonialDialog
      open={openDialogRemoveConfirmation}
      handleClose={() => {
        setOpenDialogRemoveConfirmation(false)
      }}
      handleSuccess={() => {
        setOpenDialogRemoveConfirmation(false)
        setPage(0);
        setSelectedTestimonials([])
        setFilters({
          status: null
        });

        reloadTestimonials()
      }}
      testimonialsToDelete={testimonials.filter((p) => selectedTestimonials.includes(p.id))}
      handleStartSubmit={() => {
        // setLoading(true);
      }}
    />
  </>
  );
};

TestimonialsTable.propTypes = {
  testimonials: PropTypes.array.isRequired
};

TestimonialsTable.defaultProps = {
  testimonials: []
};

export default TestimonialsTable;
