import { useEffect, useState, useCallback } from "react";
import { Button, Card, Image, Typography, Layout, Row, Col, Menu, Drawer, Space } from "antd";
import { list, getUrl } from "aws-amplify/storage";
import { listCats } from "../../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import HeroBg from "../../assets/hero-bg.jpg";
import { MenuOutlined } from "@ant-design/icons";
import TopNav from "../../components/foster/global/TopNav";
import LandingPageFooter from "../../components/foster/global/LandingPageFooter";
import { deleteCat } from "../../../src/graphql/mutations";
import Hero from "../../components/foster/Hero";
import About from "../../components/foster/About";
import Cats from "../../components/foster/Cats";


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
        // height: "100vh",
      }}>
      <TopNav />

      <Content style={{
        height: '100vh',
        width: '100%',
      }}>
        <Hero />
        <About />
        <Cats />
        <LandingPageFooter />
      </Content>
    </Layout>
  );
};

export default LandingPage;
