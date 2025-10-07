import DataTable from 'react-data-table-component';
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DASHBOARD_CUTSOM_STYLE, getDailyPayoutColumns } from '../../../utils/DataTableColumnsProvider';

const DailyPayout = () => {
  

  const data = [
    {
      date: '18-Nov-2024',
      levelEarnings: '0.0',
      directBenefits: '180.0',
      grossEarnings: '180.0',
    },
  ];

  const noDataComponent = <div style={{ padding: '24px' }}>No data available in table</div>;

  return (
    <Card sx={{ margin: '2rem', mt: 10 }}>
      <CardContent>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: '#04112f',
              color: '#fff',
              '& .MuiSvgIcon-root': { color: '#fff' }
            }}
          >
            Daily Payout Details
          </AccordionSummary>
          <AccordionDetails>
            <DataTable
              columns={getDailyPayoutColumns()}
              data={data}
              pagination
              customStyles={DASHBOARD_CUTSOM_STYLE}
              paginationPerPage={25}
              paginationRowsPerPageOptions={[25, 50, 100]}
              noDataComponent={noDataComponent}
              subHeader
              highlightOnHover
              subHeaderComponent={
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', padding: '0.5rem' }}>
                  <TextField
                    placeholder="Search"
                    variant="outlined"
                    size="small"
                  />
                </div>
              }
            />
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default DailyPayout;
