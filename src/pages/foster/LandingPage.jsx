import { useEffect, useState, useCallback } from "react";
import { Button, Card, Image, Typography, Layout, Row, Col, Menu, Drawer } from "antd";
import { list, getUrl } from "aws-amplify/storage";
import { listCats } from "../../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import HeroBg from "../../assets/hero-bg.jpg";
import { MenuOutlined } from "@ant-design/icons";
import TopNav from "../../components/foster/global/TopNav";
import LandingPageFooter from "../../components/foster/global/LandingPageFooter";

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
    
    <TopNav />
      
      <Content
        style={{
          padding: "0 8px",
        //   minHeight: "100svh",
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
              Welcome to <span style={{color: '#00b96c'}}>PurrfectMatch</span> Cat Adoption!
            </Title>
            <Paragraph
              style={{
                color: "#00152a",
                marginBottom: "24px",
                fontSize: "16px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                
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


      <LandingPageFooter />
    </Layout>
  );
};

export default LandingPage;
