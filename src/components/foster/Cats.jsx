import { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Button, Image, Card, Flex } from "antd";
import Cat1 from "../../assets/balinese-cat.jpeg";
import { listCats } from "../../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { getUrl } from "aws-amplify/storage";


const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;
const client = generateClient();

const Cats = () => {
  const [loading, setLoading] = useState(true);
  const [updatedCatData, setUpdatedCatData] = useState([]);
  const onChange = (checked) => {
    setLoading(!checked);
  };

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const catsData = await client.graphql({ query: listCats });
        const catData = catsData.data.listCats.items.filter(
          (cat) => cat.status === "Available"
        );
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

        setUpdatedCatData(updatedCatData);
        console.log("updatedCatData", updatedCatData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cats:", error);
      }
    };
    fetchCats();
  }, []);

  return (
    <Flex
      style={{
        width: "100%",
        minHeight: "100vh",
        // minHeight: '80vh',
        margin: "0 auto",
        background: "#fff",
        flexDirection: "column",
      }}
    >
      <Row
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title
          level={1}
          style={{
            color: "#00152a",
            fontSize: "36px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            marginTop: "54px",
            marginBottom: "54px",
          }}
        >
          Our Cats
        </Title>
      </Row>
      <Row align={"middle"} justify={"space-between"}
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          maxWidth: "1200px",
          width: "100%",
          padding: "0px 24px",
          gap: "24px",
        }}
      >
        {updatedCatData.map((cat) => (
        <Col sm={12} md={8} lg={6} key={cat.id}
        style={{
            padding: "12px 0px",
        }}
        >
          <Card
            size="small"
            style={{
              minWidth: 220,
              padding: "14px",
              borderColor: "rgb(0, 185, 107, 0.2),",
              boxShadow: "0 2px 8px rgba(0, 185, 107, 0.2)",
            }}
            cover={
              <Image
                preview={false}
                height={210}
                width={'100%'}
                alt={cat.name}
                src={cat.image}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    objectFit: "cover",
                }}
              />
            }
          >
            <div>
              <div style={{ marginBottom: "10px" }}>
                <Title
                  level={1}
                  style={{
                    color: "#00b96b",
                    fontSize: "16px",
                    fontWeight: "bold",
                    margin: "0px",
                  }}
                >
                  {cat.name}
                </Title>
              </div>
              <Row align={"middle"} justify={"space-between"}>
                <Col>
                  <Meta
                    description="Breed"
                    style={{
                      color: "#00152a",
                      margin: "0px 0px",
                      fontSize: "10px",
                    }}
                  />
                  <Title
                    level={1}
                    style={{
                      color: "",
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "0px",
                    }}
                  >
                    {cat.breed}
                  </Title>
                </Col>
                <Col>
                  <Meta
                    description={'Gender'}
                    style={{
                      color: "#00152a",
                      margin: "0px 0px",
                      fontSize: "10px",
                    }}
                  />
                  <Title
                    level={1}
                    style={{
                      color: "",
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "0px",
                      textAlign: "left",
                    }}
                  >
                    {cat.gender}
                  </Title>
                </Col>
              </Row>
              <div
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Button
                  type="primary"
                  style={{ marginTop: "10px", width: "100%" }}
                >
                  Learn more
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        ))}
        
      </Row>
    </Flex>
  );
};

export default Cats;
