import {useCallback, useEffect} from 'react'
import { Layout, Typography, Button, Card } from 'antd'
import Requests from '../../../components/admin/adoption-request/Requests'
import { listRequests } from '../../../graphql/queries'
import { deleteRequest } from '../../../graphql/mutations'
import { generateClient } from 'aws-amplify/api'

const { Content } = Layout;

const AdoptionRequest = () => {
  const client = generateClient();

  const fetchRequests = useCallback(async () => {
    try {
      const catsData = await client.graphql({ 
        query: listRequests,  
        authMode: 'userPool'
      });
      const requestData = catsData.data.listRequests.items;

    } catch (error) {
      console.error(error);
    }
  }
  , []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <Content
      style={{
        padding: 24,
        background: "#f5f5f5",
        minHeight: '100%',
        minWidth: 0,
        overflow: "hidden",
      }}>
        <Content style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        
      <Typography.Text
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        level={2} >
        Adoption Requests
      </Typography.Text>

      <Typography>
        {/* <Button onClick={() => deleteRequests()}>Add New Cat</Button> */}
        {/* <CreateModal open={open} setOpen={setOpen} /> */}
    </Typography>
      </Content>

      <Card>
        <Requests />
      </Card>
    </Content>
  )
}

export default AdoptionRequest