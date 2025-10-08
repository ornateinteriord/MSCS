import { useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { cn } from '../../../lib/utils';
import '../../Dashboard/dashboard.scss';
import DashboardTable from '../../Dashboard/DashboardTable';
import { MuiDatePicker } from '../../../components/common/DateFilterComponent';
import DashboardCard from '../../../components/common/DashboardCard';
import { getUserDashboardTableColumns } from '../../../utils/DataTableColumnsProvider';
import TokenService from '../../../api/token/tokenService';
import { useCheckSponsorReward } from '../../../api/Memeber';

const UserDashboard = () => { 
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const memberId = TokenService.getMemberId();

  const { data: rewardData, isLoading,  } = useCheckSponsorReward(memberId);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleClaimReward = () => {
    alert("🎉 Reward claimed successfully!");
  };

  const data = [
    {
      title: "Today's Registration",
      direct: 0,
      indirect: 0,
      total: 0,
    },
    {
      title: "Today's Activation",
      direct: 0,
      indirect: 0,
      total: 0,
    },
    {
      title: 'Total Registration',
      direct: 2,
      indirect: 7,
      total: 9,
    },
    {
      title: 'Total Activation',
      direct: 1,
      indirect: 0,
      total: 1,
    },
    {
      title: 'Current Month Activation',
      direct: 0,
      indirect: 0,
      total: 0,
    },
  ];

  const showClaimButton = rewardData?.isEligible && rewardData?.sponsorCount >= 2;

  return (
    <>
      <div className="h-auto md:h-40 relative w-full overflow-hidden bg-[#6b21a8] flex flex-col items-center justify-center mt-10 py-6 md:py-0">
        <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-evenly items-center w-full px-4 md:px-8 relative z-20 gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h1 className={cn("text-xl md:text-4xl text-white")}>
              Welcome to Dashboard
            </h1>
            <p className="mt-2 text-neutral-300 text-sm md:text-base">
              Manage your network and track your success
            </p>
          </div>

          <div className="flex items-center gap-6 md:gap-12 text-white">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">1/1</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                <span className="material-icons text-base md:text-lg">person</span>
                Direct
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold mb-2">1/1</div>
              <div className="text-xs md:text-sm flex items-center justify-center gap-1">
                <span className="material-icons text-base md:text-lg">groups</span>
                Team
              </div>
            </div>
          </div>
        </div>

        {showClaimButton && (
          <div className="flex flex-col items-center justify-center mt-4">
            <Button
              variant="contained"
              color="success"
              onClick={handleClaimReward}
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              🎁 Claim Reward ({rewardData?.sponsorCount} referrals)
            </Button>
          </div>
        )}
        {!isLoading && rewardData && !rewardData.isEligible && (
          <div className="flex flex-col items-center justify-center mt-4">
            <Typography variant="body2" color="white">
              Need {2 - (rewardData?.sponsorCount || 0)} more referrals to claim reward
            </Typography>
          </div>
        )}
      </div>

      <Grid 
        container 
        spacing={{ xs: 2, sm: 3 }} 
        sx={{ 
          mx: { xs: 1, sm: 2 }, 
          my: 2,
          pt: 5,
          pr: 7,
          width: 'auto',
          '& .MuiGrid-item': {
            display: 'flex',
          }
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard amount={0} title="Level Benefits" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard amount={180.0} title="Direct Benefits" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard amount={180.0} title="Total Earnings" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard amount={0.0} title="Total Withdraws" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard amount={180.0} title="Wallet Balance" />
        </Grid>
      </Grid>

      <div className='mt-10 p-4 rounded shadow'>    
        <Card className='bg-gray-300'>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" style={{ fontWeight: 'bold', color: '#7e22ce' }}>Member Statistics</Typography>
              <MuiDatePicker
                date={selectedDate}
                setDate={handleDateChange}
                label="Filter by Date"
              />
            </div>
            <DashboardTable data={data} columns={getUserDashboardTableColumns()} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default UserDashboard;