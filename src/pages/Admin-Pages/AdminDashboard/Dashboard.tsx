import {  Card, CardContent, Grid, Typography } from '@mui/material';
import { cn } from '../../../lib/utils';
import '../../Dashboard/dashboard.scss';
import DashboardTable from '../../Dashboard/DashboardTable';
import DashboardCard from '../../../components/common/DashboardCard';
import { getAdminDashboardTableColumns } from '../../../utils/DataTableColumnsProvider';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const AdminDashboard = () => { 

  const data = [
    {
      date: "2023-10-01",
      member: "Arjun Patel",
      packageAmount: 100,
    },
    {
      date: "2023-10-02", 
      member: "Priya Sharma",
      packageAmount: 150,
    },
    {
      date: "2023-10-03",
      member: "Rahul Kumar",
      packageAmount: 200,
    },
  ];

  return (
    <>
      <div className="h-auto md:h-40 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center mt-10 py-6 md:py-0">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-evenly items-center w-full px-4 md:px-8 relative z-20 gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h1 className={cn("text-xl md:text-4xl text-white")}>
              Welcome to Admin Dashboard
            </h1>
            <p className="mt-2 text-neutral-300 text-sm md:text-base">
              Manage your network and track your success
            </p>
          </div>

          <div className="grid grid-cols-2 md:flex items-center gap-6 md:gap-12 text-white">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">97.3k</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                <ThumbUpIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                Great
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">197k</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                <FavoriteIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                Likes
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">211</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                <EventIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                Events
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">28°C</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                <LocationOnIcon sx={{ fontSize: { xs: 14, md: 16 } }} />
                Bangalore
              </div>
            </div>
          </div>
        </div>
      </div>
      <Grid 
        container 
        spacing={{ xs: 2, sm: 3 }} 
        sx={{ 
          mx: { xs: 1, sm: 2 }, 
          my: 2,
          pt : 5,
          pr : 7,
          width: 'auto',
          '& .MuiGrid-item': {
            display: 'flex',
          }
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard amount={2} title="Total Members" subTitle="12 More members added" IconComponent={PersonIcon} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard amount={2} title="Active Members" subTitle="5 More members activated" IconComponent={PersonIcon} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard amount={0} title="Pending Members" IconComponent={PersonIcon} />
        </Grid>
      </Grid>
      <div className='mt-10 p-4 rounded shadow'>    
        <Card className='bg-gray-300'>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" style={{ fontWeight: 'bold', color: '#7e22ce' }}>Member Statistics</Typography>
            </div>
            <DashboardTable data={data} columns={getAdminDashboardTableColumns()} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default AdminDashboard