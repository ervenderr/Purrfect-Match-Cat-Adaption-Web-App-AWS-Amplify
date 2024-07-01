import React from 'react'
import { Layout, Typography, Button, Card } from 'antd'
import Lists from '../../../components/admin/manage-cats/Lists';
import CreateModal from '../../../components/admin/manage-cats/CreateModal';

const { Content } = Layout;

const ManageCats = () => {

  const [ open, setOpen ] = React.useState(false);

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
        <CreateModal open={open} setOpen={setOpen} />
    </Typography>
      </Content>
    
    <Card>
      <Lists />
      </Card>
    </Content>
  );
};

export default ManageCats