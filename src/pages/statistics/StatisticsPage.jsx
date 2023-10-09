import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { useUsersContext } from '../../context/usersContext';
import LinearProgress from '@mui/material/LinearProgress';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

function StatisticsPage() {
  const { usersData, loading } = useUsersContext();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!loading && usersData && usersData.length > 0) {
      const countryCounts = {};

      usersData.forEach((user) => {
        if (countryCounts[user.country]) {
          countryCounts[user.country] += 1;
        } else {
          countryCounts[user.country] = 1;
        }
      });

      // Sort data by number of users in descending order
      const sortedData = Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      const chartData = {
        labels: Object.keys(sortedData),
        datasets: [
          {
            data: Object.values(sortedData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
          },
        ],
      };

      setChartData(chartData);
    }
  }, [usersData, loading]);

  return (
    <Box p={2}>
      <Typography variant="h4">Statistics Page</Typography>
      {loading ? (
        <Box sx={{ width: '100%', p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Loading...
            <LinearProgress />
          </Typography>
        </Box>
      ) : (
        <>
          {chartData ? (
            <Box mt={2} display="flex" justifyContent="space-between">
              <Paper elevation={3} sx={{ flex: 1, padding: 2 }}>
                <Typography variant="h6">
                  Countries and User Count{chartData.labels.length === 1 ? '' : 's'}{' '}
                  (Descending):
                </Typography>
                <List>
                  {chartData.labels.map((country, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <div
                          style={{
                            backgroundColor:
                              chartData.datasets[0].backgroundColor[
                                index % chartData.datasets[0].backgroundColor.length
                              ],
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            marginRight: '8px',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${country}: ${chartData.datasets[0].data[index]} user${
                          chartData.datasets[0].data[index] === 1 ? '' : 's'
                        }`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <Box flex={1} ml={2}>
                <Pie data={chartData} />
              </Box>
            </Box>
          ) : (
            <Box sx={{ width: '100%', p: 2 }}>
              <Typography variant="h5" gutterBottom>
                No user data available.{' '}
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default StatisticsPage;
