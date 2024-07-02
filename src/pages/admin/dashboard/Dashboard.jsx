import { Layout, Typography, Row, Col, Card } from "antd";
import SummaryCards from "../../../components/admin/dashboard/SummaryCards";
import RecentTables from "../../../components/admin/dashboard/RecentTables";
import ReportChart from "../../../components/admin/dashboard/ReportChart";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const Dashboard = () => {

  return (
    <Content
      style={{
        padding: 24,
        background: "#f5f5f5",
        minHeight: '100%',
        minWidth: 0,
        overflow: "hidden",
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

      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 16,
        }}
      >
        <Col span={24}>
          <SummaryCards />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} sm={24} md={16} lg={16}>
          <Card title="Recents" style={{ height: '100%' }}>
            <RecentTables />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Card title="Cats Report" style={{ height: '100%' }}>
            <ReportChart />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;
