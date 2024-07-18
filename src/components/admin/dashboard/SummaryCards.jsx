import { Card, Col, Avatar, Row } from "antd";
import { useState, useEffect } from "react";
import { listCats } from "../../../graphql/queries";
import { generateClient } from "aws-amplify/api";

const { Meta } = Card;



const SummaryCards = () => {
  const client = generateClient();

  const [catsCount, setCatsCount] = useState(0);

  useEffect(() => {
    const fetchCatsCount = async () => {
      try {
        const response = await client.graphql({ query: listCats, authMode: 'userPool' });
        const { data } = response;
        const count = data.listCats.items.filter(cat => cat.status === 'Available').length;
        setCatsCount(count);
      } catch (error) {
        console.error("Error fetching cats count:", error);
      }
    };

    fetchCatsCount();
  }, []);
    


  return (
    <Row gutter={[16, 16]} style={{ width: "100%", display: "flex" }}>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card
          style={{
            width: "100%",
            marginTop: 16,
          }}
          hoverable
        >
          <Meta
            avatar={
              <Avatar src="https://www.svgrepo.com/show/454286/cat-halloween-kitty-2.svg" />
            }
            title={catsCount || '0'}
            description="Total Available Cats"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card
          hoverable
          style={{
            width: "100%",
            marginTop: 16,
          }}
        >
          <Meta
            avatar={
              <Avatar src="https://www.svgrepo.com/show/513532/file-2.svg" />
            }
            title="5"
            description="Total Adoption Requests"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card
          hoverable
          style={{
            width: "100%",
            marginTop: 16,
          }}
        >
          <Meta
            avatar={
              <Avatar src="https://www.svgrepo.com/show/226235/wait-hourglass.svg" />
            }
            title="3"
            description="Pending Requests"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card
          hoverable
          style={{
            width: "100%",
            marginTop: 16,
          }}
        >
          <Meta
            avatar={
              <Avatar src="https://www.svgrepo.com/show/270143/charity-donation.svg" />
            }
            title="3"
            description="Donations Received"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default SummaryCards;
