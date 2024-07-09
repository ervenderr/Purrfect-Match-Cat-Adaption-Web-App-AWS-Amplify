import { useEffect, useState, useCallback } from "react";
import { Layout, Typography, Button, Card, message } from 'antd'
import Lists from '../../../components/admin/manage-cats/Lists';
import CreateModal from '../../../components/admin/manage-cats/CreateModal';
import { generateClient } from 'aws-amplify/api';
import { listCats } from "../../../graphql/queries";
import { deleteCat } from '../../../graphql/mutations';
import { onCreateCat, onDeleteCat, onUpdateCat } from '../../../graphql/subscriptions';

const { Content } = Layout;

const ManageCats = () => {
  const client = generateClient();
  const [ cat, setCat ] = useState([]);
  const [ open, setOpen ] = useState(false);

  const fetchCats = useCallback(async () => {
    try {
      const catsData = await client.graphql({ query: listCats });
      const cat = catsData.data.listCats.items;
      console.log("Cats data:", cat);
      setCat(cat);
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

  const handleDelete = async (id) => {
    console.log("Deleting key:", id);

    const result = await client.graphql({
      query: deleteCat,
      variables: {
        input: {
          id: id
        }
      }
    });
    fetchCats();
    message.success("Cat deleted successfully");
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
      <Lists cat={cat} handleDelete={handleDelete} fetchCats={fetchCats} />
      </Card>
    </Content>
  );
};

export default ManageCats