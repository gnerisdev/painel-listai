import { useContext, useEffect, useState } from 'react';
import { Box, Typography, CardHeader, CardContent } from '@mui/material';
import QRCode from 'react-qr-code';
import { Bar } from 'react-chartjs-2';
import { ApiService } from 'services/api.service';
import { HostsContext } from 'contexts/Hosts';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import * as S from './style';

const Home = () => {
  const { provider } = useContext(HostsContext);
  const apiService = new ApiService();
  const [barChartData, setBarChartData] = useState(null);
  const [doughnutChartData, setDoughnutChartData] = useState(null);


  useEffect(() => {
    // getOrdersDashboard();
    // getTopSellingProducts();
  }, []);

  return (
    <>

        <h1>hello</h1>
    </>
  );
};

export default Home;