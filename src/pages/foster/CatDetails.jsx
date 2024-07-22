import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { generateClient } from "aws-amplify/api";
import { getCat } from '../../graphql/queries'
import { getUrl } from "aws-amplify/storage";
import { Layout, Spin, Typography, Image, Button, Row, Col, Divider, Space, Tag } from 'antd'
import LandingPageFooter from '../../components/foster/global/LandingPageFooter';
import TopNav from '../../components/foster/global/TopNav';
import Logo from '../../assets/logo-icon.png';
import { useNavigate } from 'react-router-dom';


const { Text, Title } = Typography;
const { Content, Header } = Layout;


const CatDetails = () => {
    const catId  = useParams();
    const client = generateClient();
    const [catData, setCatData] = useState([]);
    const [catImg, setCatImg] = useState('')
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCat = async () =>{
            try {
                const catData = await client.graphql({ query: getCat, variables: catId });
                const cat = catData.data.getCat;

                const img = await getUrl({
                    path: `public/cats/${cat.image}.jpeg`,
                    options: {
                      validateObjectExistence: true,
                    },
                  }); 
                setCatImg(img.url.href)
                setCatData(cat);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cats:", error)
                setLoading(false);
            }
        }
        fetchCat();
    }, [catId, client]);

    if (loading) {
        return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin />
        </div>
    )}
    
      if (!catData) {
        return <Text>Cat not found</Text>;
      }

      if (catData.status === 'Adopted') {
        return <Text>This Cat has been adopted</Text>;
      }

  return (
    <>  
        <Header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      >
        <div className="demo-logo" style={{ color: "white", display: 'flex', gap: '5px' }}>
          <Image src={Logo} alt="Logo" width={30}/>
            <span style={{fontSize: '20px'}} >PurrfectMatch</span>
        </div>

        <Button onClick={() => {navigate(-1)}} type="primary">Back</Button>   
      </Header>

      <Content 
            style={{ 
                width: '100%',
                padding: '20px', 
                backgroundColor: '#fff',
            }}>
            <Row 
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
                gutter={[16, 16]}
            >
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Image 
                        src={catImg} 
                        alt="Cat" 
                        width='100%'
                        style={{
                            maxWidth: '80%',
                            borderRadius: '8px',
                        }}
                    />
                </Col>
                <Col 
                    xs={24} 
                    sm={24} 
                    md={12} 
                    lg={12} 
                    xl={12}
                    style={{
                        padding: '12px',
                    }}
                >
                    <Title style={{fontWeight: 'bold', fontSize: 'px'}} level={2}>{catData.name}</Title>
                    <Divider />
                    <Space direction="vertical" size="middle">
                        <Text><strong>Breed:</strong> {catData.breed}</Text>
                        <Text><strong>Age:</strong> {catData.age}</Text>
                        <Text><strong>Gender:</strong> {catData.gender}</Text>
                        <Text><strong>Description:</strong> {catData.description}</Text>
                    </Space>
                    <Divider />
                    <Button type="primary" style={{ marginTop: '16px' }}>
                        Adopt {catData.name}
                    </Button>
                </Col>
            </Row>
        </Content>
      
      <LandingPageFooter />
      </>
  )
}

export default CatDetails
