import { FC, ChangeEvent, useState } from 'react';
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
import { useSnackbar } from 'notistack';
import { FAQModel } from '@/models/faq';
import ConfirmDeleteFAQDialog from './ConfirmDeleteFAQDialog';
import EditFAQDialog from './EditFAQDialog';

interface FAQsTableProps {
  className?: string;
  faqs: FAQModel[];
  reloadFAQs?: Function;
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
  faqs: FAQModel[],
  filters: Filters
): FAQModel[] => {
  return faqs.filter((faq) => {
    let matches = true;

    if (filters.status && (faq.active == true) !== getValueStatusByFilter(filters.status)) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  faqs: FAQModel[],
  page: number,
  limit: number
): FAQModel[] => {
  return faqs.slice(page * limit, page * limit + limit);
};

const FAQsTable: FC<FAQsTableProps> = ({ faqs, reloadFAQs }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [selectedFAQs, setSelectedFAQs] = useState<number[]>(
    []
  );
  const [openEditFAQDialog, setOpenEditFAQDialog] = useState<boolean>(false)
  const [openDialogRemoveConfirmation, setOpenDialogRemoveConfirmation] = useState<boolean>(false)
  const [selectedFAQ, setSelectedFAQ] = useState<FAQModel>()
  const selectedBulkActions = selectedFAQs.length > 0;
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

  const handleSelectAllFAQs = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedFAQs(
      event.target.checked
        ? faqs.map((faq) => faq.id)
        : []
    );
  };

  const handleSelectOneFAQ = (
    _event: ChangeEvent<HTMLInputElement>,
    faqId: number
  ): void => {
    if (!selectedFAQs.includes(faqId)) {
      setSelectedFAQs((prevSelected) => [
        ...prevSelected,
        faqId
      ]);
    } else {
      setSelectedFAQs((prevSelected) =>
        prevSelected.filter((id) => id !== faqId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredFAQs = applyFilters(faqs, filters);
  const paginatedFAQs = applyPagination(
    filteredFAQs,
    page,
    limit
  );
  const selectedSomeFAQs =
    selectedFAQs.length > 0 &&
    selectedFAQs.length < faqs.length;
  const selectedAllFAQs =
    selectedFAQs.length === faqs.length;
  const theme = useTheme();

  return (<>
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions
            goToDelete={() => {
              if (selectedFAQs.length == 1) {
                setOpenDialogRemoveConfirmation(true)
              } else {
                enqueueSnackbar("Só é possível deletar 1 pergunta selecionada por vez, selecione apenas 1 e tente novamente...", { variant: "warning", autoHideDuration: 10000 })
              }
            }}

            goToEdit={() => {
              if (selectedFAQs.length == 1) {
                setSelectedFAQ(faqs.filter((p) => p.id == selectedFAQs[0])[0])
                setOpenEditFAQDialog(true)
              } else {
                enqueueSnackbar("Só é possível editar 1 pergunta selecionada por vez, selecione apenas 1 e tente novamente...", { variant: "warning", autoHideDuration: 10000 })
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
          title="Lista de Perguntas Frequentes"
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
                  checked={selectedAllFAQs}
                  indeterminate={selectedSomeFAQs}
                  onChange={handleSelectAllFAQs}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Pergunta</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFAQs.map((faq) => {
              const isFAQSelected = selectedFAQs.includes(
                faq.id
              );
              return (
                <TableRow
                  hover
                  key={faq.id}
                  selected={isFAQSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isFAQSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneFAQ(event, faq.id)
                      }
                      value={isFAQSelected}
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
                      {faq.id}
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
                      {faq.question}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {getStatusLabel(faq.active == true ? "active" : "inactive")}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Editar Pergunta" arrow>
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
                          setSelectedFAQ(faq)
                          setOpenEditFAQDialog(true)
                        }}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Deletar Pergunta" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setSelectedFAQs([faq.id])
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
          count={filteredFAQs.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          labelDisplayedRows={({ from, to, count }) => { return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`; }}
          labelRowsPerPage={"Perguntas por página"}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
    <EditFAQDialog
      open={openEditFAQDialog}
      onClose={() => {
        setOpenEditFAQDialog(false)
      }}
      onSuccess={() => {
        reloadFAQs()
      }}
      onError={() => {

      }}
      faq={selectedFAQ}
    />
    <ConfirmDeleteFAQDialog
      open={openDialogRemoveConfirmation}
      handleClose={() => {
        setOpenDialogRemoveConfirmation(false)
      }}
      handleSuccess={() => {
        setOpenDialogRemoveConfirmation(false)
        setPage(0);
        setSelectedFAQs([])
        setFilters({
          status: null
        });

        reloadFAQs()
      }}
      faqsToDelete={faqs.filter((p) => selectedFAQs.includes(p.id))}
      handleStartSubmit={() => { }}
    />
  </>
  );
};

FAQsTable.propTypes = {
  faqs: PropTypes.array.isRequired
};

FAQsTable.defaultProps = {
  faqs: []
};

export default FAQsTable;
