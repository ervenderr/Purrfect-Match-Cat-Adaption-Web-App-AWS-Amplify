import { Layout, Button, Input, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const { Header } = Layout;

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        2nd menu item
      </a>
    ),
  },
];

const Topbar = ({ setCollapsed, collapsed, colorBgContainer }) => {
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "none",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <Dropdown
          placement="bottom"
          menu={{
            items,
          }}
        >
          <Button
            onClick={(e) => e.preventDefault()}
            shape="circle"
            icon={<UserOutlined style={{ fontSize: "16px" }} />}
          />
        </Dropdown>
        <Dropdown
          placement="bottom"
          menu={{
            items,
          }}
        >
          <Button
            onClick={(e) => e.preventDefault()}
            shape="circle"
            icon={<BellOutlined style={{ fontSize: "16px" }} />}
          />
        </Dropdown>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          style={{ width: 200, marginRight: 16 }}
        />
      </div>
    </Header>
  );
};

Topbar.propTypes = {
  setCollapsed: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  colorBgContainer: PropTypes.string.isRequired,
};

export default Topbar;
