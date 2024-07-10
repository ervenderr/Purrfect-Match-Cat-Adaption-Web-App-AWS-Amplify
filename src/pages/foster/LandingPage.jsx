import React, { useEffect, useState } from 'react';
import { Button, Card, Image, Typography, Switch } from 'antd';
import { list, getUrl } from 'aws-amplify/storage';

const { Title } = Typography;

const LandingPage = () => {
    const [imagePath, setImagePath] = useState([]);
    const [catImages, setCatImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const onChange = (checked) => {
        setLoading(!checked);
      };
    


    useEffect(() => {
        const handleGetPath = async () => {
            setLoading(true);
            try {
                const paths = await list({
                    path: 'public/cats/',
                    options: {
                        listAll: true,
                        validateObjectExistence: true
                    },
                });
                const pathsArray = paths.items.map((item) => item.path);
                setImagePath(pathsArray);
            } catch (error) {
                console.error('Error fetching Path:', error);
            }
        };

        handleGetPath();
    }, []);

    useEffect(() => {
        const handleGetUrl = async () => {
            try {
                const urls = await Promise.all(
                    imagePath.map(async (path) => {
                        const url = await getUrl({
                            path,
                            options: {
                                validateObjectExistence: true
                            },
                        });
                        return url.url;
                    })
                );
                setCatImages(urls);
            } catch (error) {
                console.error('Error fetching URLs:', error);
            }finally {
                setLoading(false);
            }
        };

        if (imagePath.length > 0) {
            handleGetUrl();
        }
    }, [imagePath]);

    console.log('catImages:', catImages);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Title level={2}>Welcome to Purrfect Match Cat Adoption Web App</Title>
            <Button type="primary" size="large">Get Started</Button>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                {!loading ? 
                catImages.map((image, index) => (
                    <Card key={index} loading={loading} style={{
                        width: 300,
                        marginTop: 16,
                    }}>
                        <Image src={image} width={200} height={200} />
                    </Card>
                ))
                :  <Card loading={loading} style={{
                    width: 300,
                    height: 300,
                    marginTop: 16,
                }}></Card>}
            </div>
        </div>
    );
};

export default LandingPage;
