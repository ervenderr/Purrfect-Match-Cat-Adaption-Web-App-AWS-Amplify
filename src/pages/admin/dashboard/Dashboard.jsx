import { Layout, Typography, Divider, Row, Card, Col } from "antd";
import SummaryCards from "./SummaryCards";
import ReportChart from "./ReportChart";
import RecentTables from "./RecentTables";

const { Content } = Layout;

const Dashboard = () => {
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: "#f5f5f5",
        minHeight: 280,
      }}
    >
      <Typography.Text
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        level={2}
      >
        Dashboard
      </Typography.Text>

      <Divider orientation="left"></Divider>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <SummaryCards />
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Card title="Cats Report">
            <ReportChart />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Card title='Recents' style={{height: '100%'}}>
            <RecentTables />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;
