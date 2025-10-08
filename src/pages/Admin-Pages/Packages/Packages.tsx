import  { useContext, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  CircularProgress,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaidIcon from '@mui/icons-material/Paid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable from 'react-data-table-component';
import { Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DASHBOARD_CUTSOM_STYLE, getAdminPackageHistoryColumns, getusedandUnUsedColumns } from '../../../utils/DataTableColumnsProvider';
import { getEpinsSummary, useGeneratePackage } from '../../../api/Admin';
import { toast } from 'react-toastify';
import useSearch from '../../../hooks/SearchQuery';
import UserContext from '../../../context/user/userContext';
import { LoadingComponent } from '../../../App';

interface PackageTableProps {
  title: string;
  summaryTitle: string;
  data: any[];
  loading ?: boolean
  columns: any[];
}

const useGetEpins = (status : "used" | "unUsed" | "total") => {
  const { data: epinsData, isLoading, isError, error } = getEpinsSummary();
  useEffect(() => {
      if (isError) {
        const err = error as any;
        toast.error(
          err?.response.data.message || "Failed to fetch Transaction details"
        );
      }
    }, [isError, error]);
    let result = {isLoading}

    if(status === "used"){
      return {...result , epinsData : epinsData?.usedEpins || []}
    } else if(status === "unUsed") {
      return {...result , epinsData : epinsData?.activeEpins || []}
    } else {
      return {...result, epinsData : epinsData?.totalEpins || []}
    }
}

export const PackageRequests = () => {
  const columns = [
    {
      name: 'Date',
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: 'Member',
      selector: (row: any) => row.member,
      sortable: true,
    },
    {
      name: 'Package Amount',
      selector: (row: any) => row.packageAmount,
      sortable: true,
    },
    {
      name: 'Action',
      cell: () => (
        <IconButton
          onClick={() => {}}
          size="medium"
          sx={{
            color: '#7e22ce',
            '&:hover': {
              backgroundColor: 'rgba(4, 17, 47, 0.04)'
            }
          }}
        >
          <VisibilityIcon color='primary' fontSize="medium"/>
        </IconButton>
      ),
    },
  ];

  const data = [
    { date: '2024-01-01', member: 'Rajesh Kumar', packageAmount: 2000 },
    { date: '2024-01-02', member: 'Priya Sharma', packageAmount: 5000 },
    { date: '2024-01-03', member: 'Amit Patel', packageAmount: 10000 },
  ];

  return (
    <>
      {/* <Typography variant="h4" sx={{ margin: '2rem', mt: 10 }}>
        Package Requests
      </Typography>
      <Card sx={{ margin: '2rem', mt: 2 }}>
        <CardContent>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#7e22ce',
                color: '#fff',
                '& .MuiSvgIcon-root': { color: '#fff' }
              }}
            >
              List of Package Request
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <TextField
                  size="small"
                  placeholder="Search..."
                  sx={{ minWidth: 200 }}
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: '#7e22ce',
                    '&:hover': { backgroundColor: '#581c87' }
                  }}
                >
                  Search
                </Button>
              </div>
              <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={DASHBOARD_CUTSOM_STYLE}
                paginationPerPage={25}
                paginationRowsPerPageOptions={[25, 50, 100]}
                highlightOnHover
              />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card> */}
      <PackageTable 
        title="Package Requests" 
        summaryTitle="List of Package Request" 
        data={data}
        columns={columns}
      />
    </>
  );
};


export const UnusedPackages = () => {
  const {isLoading , epinsData} = useGetEpins("unUsed")
  return (
    <>
      <PackageTable 
        title="Unused Package" 
        summaryTitle="List of Unused Package" 
        data={epinsData}
        loading={isLoading}
        columns={getusedandUnUsedColumns()}
      />
    </>
  );
};

export const UsedPackages = () => {
  const {isLoading , epinsData} = useGetEpins("used")
  return (
    <>
      <PackageTable 
        title="Used Package" 
        summaryTitle="List of Used Package" 
        data={epinsData}
        loading={isLoading}
        columns={getusedandUnUsedColumns()}
      />
    </>
  );
};

export const PackageHistory = () => {
  const {isLoading , epinsData} = useGetEpins("total")
  return (
    <PackageTable 
        title="Package History" 
        summaryTitle="List of Package History" 
        data={epinsData}
        loading={isLoading}
        columns={getAdminPackageHistoryColumns()}
      />
  )
}

const PackageTable: React.FC<PackageTableProps> = ({ title, summaryTitle, data , columns  , loading}) => {

  const { searchQuery, setSearchQuery, filteredData } = useSearch(data)
  return (
    <>
      <Typography variant="h4" sx={{ margin: '2rem', mt: 10 }}>
        {title}
      </Typography>
      <Card sx={{ margin: '2rem', mt: 2 }}>
        <CardContent>
          <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#7e22ce',
              color: '#fff',
              '& .MuiSvgIcon-root': { color: '#fff' }
            }}
          >
            {summaryTitle}
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <TextField
                size="small"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                sx={{ minWidth: 200 }}
              />
            </div>
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              progressPending={loading}
              progressComponent={<CircularProgress />}
              paginationPerPage={25}
              paginationRowsPerPageOptions={[25, 50, 100]}
              customStyles={DASHBOARD_CUTSOM_STYLE}
            />
          </AccordionDetails>
        </Accordion>
        </CardContent>
      </Card>
    </>
  );
};

export const GeneratePackages = () => {
  const {user}= useContext(UserContext)
  const [formData, setFormData] = useState({
    spackage: '',
    purchasedby: '',
    quantity: 1,
    amount: 0,
  });

  const packages = [
    { name: 'Package 1', value: 2000 },
    { name: 'Package 2', value: 5000 },
    { name: 'Package 3', value: 10000 },
  ];

  const handlePackageChange = (event: any) => {
    const selectedValue = event.target.value;
    const selectedPackage = packages.find(p => p.name === selectedValue);
    setFormData(prev => ({
      ...prev,
      spackage: selectedValue,
      amount: selectedPackage ? selectedPackage.value : 0
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const totalAmount = formData.amount * formData.quantity;

  const {mutate,isPending} = useGeneratePackage()
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    try {
      mutate({...formData,generated_by:user.username})
    } catch (error) {
      console.error("Generate package failed:", error);
    } finally{
      setFormData({
        spackage: '',
        purchasedby: '',
        quantity: 1,
        amount: 0,
      });
    }
  }

  return (
    <Card sx={{ margin: '2rem', mt: 10, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <CardContent>
        <Accordion 
          defaultExpanded
          sx={{
            boxShadow: 'none',
            '&.MuiAccordion-root': {
              backgroundColor: '#fff'
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="package-content"
            id="package-header"
            sx={{
              backgroundColor: '#7e22ce',
              color: '#fff',
              '& .MuiSvgIcon-root': {
                color: '#fff'
              }
            }}
          >
            Generate Package
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '2rem' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <FormControl fullWidth>
                <InputLabel id="package-label">Package</InputLabel>
                <Select
                  labelId="package-label"
                  value={formData.spackage}
                  onChange={handlePackageChange}
                  displayEmpty
                  label="Package"
                  startAdornment={
                    <InputAdornment position="start">
                      <LocalOfferIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  }
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      '&:hover': {
                        borderColor: '#7e22ce',
                      }
                    }
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Package
                  </MenuItem>
                  {packages.map((pkg) => (
                    <MenuItem key={pkg.name} value={pkg.name}>
                      {`${pkg.name}(${pkg.value})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Send To"
                name="purchasedby"
                value={formData.purchasedby}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="Enter recipient"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#7e22ce',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7e22ce',
                    }
                  }
                }}
              />

              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InventoryIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#7e22ce',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7e22ce',
                    }
                  }
                }}
              />

              <TextField
                label="Amount"
                value={formData.amount}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaidIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Total Amount"
                value={totalAmount}
                disabled
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaidIcon sx={{ color: '#7e22ce' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
              onClick={handleSubmit}
                variant="contained"
                sx={{
                  backgroundColor: '#7e22ce',
                  alignSelf: 'flex-end',
                  '&:hover': {
                    backgroundColor: '#581c87'
                  }
                }}
              >
                Submit
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
      </CardContent>
      {isPending && <LoadingComponent/>}
    </Card>
  );
};