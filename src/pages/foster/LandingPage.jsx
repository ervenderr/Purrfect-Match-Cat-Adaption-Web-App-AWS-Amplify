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


const { Content } = Layout;

const client = generateClient();

const LandingPage = () => {

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
        <Cats id="cats" />
        <LandingPageFooter />
      </Content>
    </Layout>
  );
};

export default LandingPage;
