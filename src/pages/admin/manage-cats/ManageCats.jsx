import { useEffect, useState, useCallback } from "react";
import { Layout, Typography, Button, Card, message, Image } from 'antd'
import Lists from '../../../components/admin/manage-cats/Lists';
import CreateModal from '../../../components/admin/manage-cats/CreateModal';
import { generateClient } from 'aws-amplify/api';
import { listCats } from "../../../graphql/queries";
import { deleteCat } from '../../../graphql/mutations';
import { onCreateCat, onDeleteCat, onUpdateCat } from '../../../graphql/subscriptions';
import { getUrl, remove } from 'aws-amplify/storage';

const { Content } = Layout;

const ManageCats = () => {

  const client = generateClient();
  const [ catData, setCatData ] = useState([]);
  const [ catUid, setCatUid ] = useState([]);
  const [ urls, setUrls ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ updatedCatData, setUpdatedCatData ] = useState([]);


  const fetchCats = useCallback(async () => {
    try {
      const catsData = await client.graphql({ query: listCats , authMode: 'userPool'});
      const catData = catsData.data.listCats.items;
      const catUid = catData.map(cat => cat.image);

      const urls = await Promise.all(
        catUid.map(async (uid) => {
          const url = await getUrl({
            // path: ({identityId}) => `protected/${identityId}/cats/${uid}.jpeg`,
            path: `public/cats/${uid}.jpeg`, 
            options: {
              level: 'protected',
            },
          });
          return url.url.href;
        })
      );

      const updatedCatData = catData.map((cat, index) => ({
        ...cat,
        image: urls[index]
      }));

      // console.log("Updated Cats data:", urls)

      setCatData(catData);
      setCatUid(catUid);
      setUrls(urls);
      setUpdatedCatData(updatedCatData);
    } catch (error) {
      console.error("Error fetching cats:", error);
    }
  }, []);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);


  useEffect(() => {
    const subscriptions = [];

    const createSub = client.graphql({ query: onCreateCat }).subscribe({
      next: ({ data }) => {
        console.log('Create Subscription data:', data);
        fetchCats();
      },
      error: (error) => console.warn('Create Subscription error:', error),
    });

    const deleteSub = client.graphql({ query: onDeleteCat }).subscribe({
      next: ({ data }) => {
        console.log('Delete Subscription data:', data);
        fetchCats();
      },
      error: (error) => console.warn('Delete Subscription error:', error),
    });

    const updateSub = client.graphql({ query: onUpdateCat }).subscribe({
      next: ({ data }) => {
        console.log('Update Subscription data:', data);
        fetchCats();
      },
      error: (error) => console.warn('Update Subscription error:', error),
    });

    subscriptions.push(createSub, deleteSub, updateSub);

    // Clean up subscriptions on unmount
    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, [client, fetchCats]);

  const handleDelete = async (id, image) => {
    const path = new URL(image).pathname;
    const segments = path.split('/');
    const fileName = segments[segments.length - 1];

    try {
      await remove({ 
        path: ({identityId}) => `protected/${identityId}/cats/${fileName}`,
        options: {
          level: 'protected',
        },
      });
  
      await client.graphql({
        query: deleteCat,
        variables: {input: {id: id}},
        authMode: 'userPool'
      });
      fetchCats();
      setTimeout(() => {
        message.success("Cat deleted successfully");
      }, 0);
    } catch (error) {
      // console.error("Error deleting cat:", error.message);
      setTimeout(() => {
        message.error(error.message);
      }, 0);
    }

    
  }

  const showModal = () => {
    setOpen(true);
  }

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
      <Content style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
      <Typography.Text
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        level={2}
      >
        List of Cats
      </Typography.Text>

      <Typography>
        <Button type="primary" onClick={showModal}>Add New Cat</Button>
        <CreateModal open={open} setOpen={setOpen} fetchCats={fetchCats}/>
    </Typography>
      </Content>
    
    <Card>
      <Lists updatedCatData={updatedCatData} handleDelete={handleDelete} fetchCats={fetchCats} />
      </Card>
    </Content>
  );
};

export default ManageCats