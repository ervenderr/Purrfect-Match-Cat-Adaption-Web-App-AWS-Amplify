import { useEffect, useState, useCallback } from "react";
import { Layout, Typography, Button, Card, message } from 'antd'
import Lists from '../../../components/admin/manage-cats/Lists';
import CreateModal from '../../../components/admin/manage-cats/CreateModal';
import { generateClient } from 'aws-amplify/api';
import { listCats } from "../../../graphql/queries";
import { deleteCat } from '../../../graphql/mutations';

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

  const handleUpdate = async (id) => {
    console.log("Updating record:", id);
  }

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
        <Button onClick={showModal}>Add New Cat</Button>
        <CreateModal open={open} setOpen={setOpen} fetchCats={fetchCats}/>
    </Typography>
      </Content>
    
    <Card>
      <Lists cat={cat} handleDelete={handleDelete} handleUpdate={handleUpdate} />
      </Card>
    </Content>
  );
};

export default ManageCats