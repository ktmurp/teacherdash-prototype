import { Card, Space, Statistic, Typography, Table } from "antd";
import { ThunderboltOutlined, CheckCircleOutlined, UserOutlined, ClockCircleOutlined } from "@ant-design/icons"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { getRevenue, getOrders, getInventory, getCustomers } from "../../API";
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function Dashboards() {
    const [orders, setOrders] = useState(0)
    const [inventory, setInventory] = useState(0)
    const [customers, setCustomers] = useState(0)
    const [revenue, setRevenue] = useState(0)

    useEffect(() =>{
      getOrders().then((res)=>{
        setOrders(res.total);
        setRevenue(res.discountedTotal)
      });
      getInventory().then((res)=>{
        setInventory(res.total);
      });
      getCustomers().then((res)=>{
        setCustomers(res.total);
      });
    }, [])

    return (<div>
        <Typography.Title level={4}>OVERVIEW</Typography.Title>
        <Typography>Basic summary statistics of this game.</Typography>
        <Space>
        <Card>
          CCSS 3.G.1 Classifying quadrilaterals
        </Card>
        <DashboardCard icon={<UserOutlined />} title={"Total Users"} value={orders} />
        <DashboardCard icon={<ClockCircleOutlined />} title={"Total Minutes Spent"} value={customers} />
        <DashboardCard icon={<ThunderboltOutlined />} title={"Total Events"} value={inventory} />
        <DashboardCard icon={<CheckCircleOutlined />} title={"Overall Accuracy"} value={revenue} />
        </Space>
        <Typography.Title level={4}>EVENTS COUNTER</Typography.Title>
        <Typography>The number of actions taken by each student.</Typography>
        <Space>
        <DashboardChart />
        </Space>
        <Typography.Title level={4}>TIME SPENT</Typography.Title>
        <Typography>The average time per puzzle attempt.</Typography>
        <Space>
        <TimeChart />
        </Space>
        <Typography.Title level={4}>ATTEMPTS TRACKER</Typography.Title>
        <Typography>The number of attempted and completed puzzles. This metric is linked to persistence.</Typography>
        <Space>
        <DashboardChart />
        </Space>
        <Typography.Title level={4}>PERFECT COUNTER</Typography.Title>
        <Space>
        <RecentOrders />
        </Space>
    </div>
    );
}

function DashboardCard({title, value, icon}) {
    return (
            <Card>
                {icon}
                <Statistic title={title} value={value}/>
            </Card>
    )
}

function DashboardChart() {

    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets:[],
    });

    useEffect (() => {
        getRevenue().then((res) => {
            const labels = res.carts.map((cart) => {
              return `User-${cart.userId}`;
            });
            const data = res.carts.map((cart) => {
              return cart.discountedTotal;
            });
            
            const dataSource = {
                labels,
                datasets: [
                  {
                    label: 'Correct Events',
                    data: data,
                    backgroundColor: "rgba(38, 34, 97, 255)",
                  },
                  {
                    label: 'Incorrect Events',
                    data: data,
                    backgroundColor: "rgba(40, 173, 203, 255)",
                  },
                ],
              };

            setRevenueData(dataSource);
        });
    }, []);
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
        },
      };

    return (<Card style={{width: 500, height: 275}}><Bar options={options} data={revenueData} /></Card>);

}

function RecentOrders(){
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
      setloading(true);
      getOrders().then((res)=>{
      setdataSource(res.products);
      setloading(false);
      });
  }, [])

  return (
  <>
    <Table
  columns={[
      {
      title: "Name",
      dataIndex: "title",
      width: 420,
      },
      {
          title: "Quantity",
          dataIndex: "quantity",
      },
  ]}
  loading={loading}
  dataSource={dataSource}
  pagination={false}
  ></Table>
  </>
  );
}

function TimeChart() {

  const [revenueData, setRevenueData] = useState({
      labels: [],
      datasets:[],
  });

  useEffect (() => {
      getRevenue().then((res) => {
          const labels = res.carts.map((cart) => {
            return `User-${cart.userId}`;
          });
          const data = res.carts.map((cart) => {
            return cart.discountedTotal;
          });
          
          const dataSource = {
              labels,
              datasets: [
                {
                  label: 'Minutes',
                  data: data,
                  backgroundColor: "rgba(38, 34, 97, 255)",
                },
              ],
            };

          setRevenueData(dataSource);
      });
  }, []);
  
  const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
      },
    };

  return (<Card style={{width: 500, height: 275}}><Bar options={options} data={revenueData} /></Card>);

}

function PersistenceChart() {

  const [revenueData, setRevenueData] = useState({
      labels: [],
      datasets:[],
  });

  useEffect (() => {
      getRevenue().then((res) => {
          const labels = res.carts.map((cart) => {
            return `User-${cart.userId}`;
          });
          const data = res.carts.map((cart) => {
            return cart.discountedTotal;
          });
          
          const dataSource = {
              labels,
              datasets: [
                {
                  label: 'Total Attempts',
                  data: data,
                  backgroundColor: "rgba(38, 34, 97, 255)",
                },
                {
                  label: 'Completed Puzzles',
                  data: data,
                  backgroundColor: "rgba(40, 173, 203, 255)",
                },
              ],
            };

          setRevenueData(dataSource);
      });
  }, []);
  
  const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
      },
    };

  return (<Card style={{width: 500, height: 275}}><Bar options={options} data={revenueData} /></Card>);

}

export default Dashboards;