import React, { useEffect, useState } from 'react';
import { Button, Image, Typography } from 'antd';
import { list, getUrl } from 'aws-amplify/storage';

const { Title } = Typography;

const LandingPage = () => {
    const [imagePath, setImagePath] = useState([]);
    const [catImages, setCatImages] = useState([]);

    useEffect(() => {
        const handleGetPath = async () => {
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
                {catImages.map((image, index) => (
                    <Image key={index} src={image} width={200}/>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
