import DataTable from 'react-data-table-component';
import { Card, CardContent, Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DASHBOARD_CUTSOM_STYLE, getLevelBenifitsColumns } from '../../../utils/DataTableColumnsProvider';

const LevelBenifits = () => {
  

  const data: any[] = [
    {
      date: '21-Jan-2025',
      payoutLevel: 'Level 1',
      members: '2',
      amount: '₹200'
    },
    {
      date: '20-Jan-2025', 
      payoutLevel: 'Level 2',
      members: '4',
      amount: '₹400'
    },
    {
      date: '19-Jan-2025',
      payoutLevel: 'Level 3', 
      members: '8',
      amount: '₹800'
    },
    {
      date: '18-Jan-2025',
      payoutLevel: 'Level 4',
      members: '16', 
      amount: '₹1600'
    },
    {
      date: '17-Jan-2025',
      payoutLevel: 'Level 5',
      members: '32',
      amount: '₹3200'
    }
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
            List of Level Benefits
          </AccordionSummary>
          <AccordionDetails>
            <DataTable
              columns={getLevelBenifitsColumns()}
              data={data}
              pagination
              customStyles={DASHBOARD_CUTSOM_STYLE}
              paginationPerPage={25}
              paginationRowsPerPageOptions={[25, 50, 100]}
              noDataComponent={noDataComponent}
              highlightOnHover
              subHeader
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

export default LevelBenifits;