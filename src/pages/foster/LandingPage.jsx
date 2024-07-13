import { useEffect, useState, useCallback } from "react";
import { Button, Card, Image, Typography, Layout, Row, Col, Menu, Drawer } from "antd";
import { list, getUrl } from "aws-amplify/storage";
import { listCats } from "../../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import HeroBg from "../../assets/hero-bg.jpg";
import { MenuOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const { Header, Content, Footer } = Layout;

const client = generateClient();

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [catData, setCatData] = useState([]);
  const [updatedCatData, setUpdatedCatData] = useState([]);
  const onChange = (checked) => {
    setLoading(!checked);
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const fetchCats = useCallback(async () => {
    try {
      const catsData = await client.graphql({ query: listCats });
      const catData = catsData.data.listCats.items;
      const catUid = catData.map((cat) => cat.image);

      const urls = await Promise.all(
        catUid.map(async (uid) => {
          const url = await getUrl({
            path: `public/cats/${uid}.jpeg`,
            options: {
              validateObjectExistence: true,
            },
          });
          return url.url.href;
        })
      );

      const updatedCatData = catData.map((cat, index) => ({
        ...cat,
        image: urls[index],
      }));

      setCatData(catData);
      setUpdatedCatData(updatedCatData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cats:", error);
    }
  }, []);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  return (
    <Layout
      style={{
        height: "100vh",
        background: "rgba(255, 255, 255, 0.8)",
      }}
    >
        
      <Header collapsible
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      >
        <div className="demo-logo" style={{ color: "white" }}>
            PurrfectMatch
        </div>

        <Menu theme="dark" mode="horizontal"  defaultSelectedKeys={["1"]} style={{ lineHeight: '34px' }} breakpoint="lg" collapsedWidth="0"
>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Contact</Menu.Item>
        </Menu>
        
      </Header>
      
      <Content
        style={{
          padding: "0 24px",
          minHeight: "100vh",
          backgroundImage: `url(${HeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            maxWidth: "1200px",
            width: "100%",
            padding: "24px",
            borderRadius: "8px",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col
            xs={24}
            sm={18}
            md={14}
            style={{
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <Title
              style={{
                color: "#00152a",
                marginBottom: "24px",
                fontSize: "36px",
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              level={1}
            >
              Welcome to Purrfect Match Cat Adoption!
            </Title>
            <Paragraph
              style={{
                color: "#00152a",
                marginBottom: "24px",
                fontSize: "16px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              Find your perfect feline companion and give a cat a loving home.
              Browse through our list of adorable cats ready for adoption.
            </Paragraph>
            <Button
              type="primary"
              style={{
                color: "#fff",
                borderRadius: "8px",
                padding: "22px 24px",
                fontSize: "16px",
                fontWeight: "bold",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              Adopt Now
            </Button>
          </Col>
        </Row>
      </Content>
      <Footer>c</Footer>
    </Layout>
  );
};

export default LandingPage;
