import CardTitle from "components/CardTitle";
import Container from "components/Container";
import TitlePage from "components/TitlePage";
import Header from "components/Header";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import * as S from "./style";

const Dashboard = () => {
  const chartData = [
    { month: "Jan", value: 51 },
    { month: "Fev", value: 65 },
    { month: "Mar", value: 65 },
    { month: "Abr", value: 65 },
    { month: "Mai", value: 65 },
    { month: "Jun", value: 80 },
    { month: "Jul", value: 67 },
    { month: "Ago", value: 87 },
    { month: "Set", value: 53 },
    { month: "Out", value: 60 },
    { month: "Nov", value: 63 },
    { month: "Dez", value: 61 },
  ];


  return (
    <Container>
      <Header />
      <TitlePage title="Estatísticas" icon="fa-solid fa-chart-line" />
      <S.Container>
        <S.MetricsContainer>
          <CardTitle title="Usuários" text="100" icon="fa-solid fa-users" color="#4A2975" />
          <CardTitle title="MRR" text="600,00" icon="fa-solid fa-money-bill-wave" color="#4A2975" />
          <CardTitle title="CR" text="12%" icon="fa-solid fa-chart-line" color="#4A2975" />
          <CardTitle title="Churn Rate" text="30%" icon="fa-solid fa-user-minus" color="#4A2975"/>
        </S.MetricsContainer>

        <S.ChartTitle>Taxa de Retenção - SaaS (Lista de Pedidos)</S.ChartTitle>

        <S.ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4b0082" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4b0082" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#4b0082" fill="url(#colorRetention)" strokeWidth={3} dot={{ fill: "orange", r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </S.ChartContainer>
      </S.Container>
    </Container>
  );
};

export default Dashboard;
