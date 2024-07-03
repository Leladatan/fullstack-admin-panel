import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import Title from "antd/lib/typography/Title";
import { getNavItems } from "@/components/ui/sidebar/nav.ts";
import "@/components/ui/sidebar/sidebar.scss";

const Sidebar = () => {
  const { Sider } = Layout;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMenuItemClick = (link: string): void => {
    navigate(link);
  };

  return (
    <Sider width={450} className="sidebar">
      <div className="sidebar-box-header">
        <Title>Панель адиминистрирования</Title>
      </div>

      <div className="sidebar-box">
        <Menu
          defaultSelectedKeys={["1"]}
          items={getNavItems().map((nav) => ({
            key: nav.key,
            className: pathname.includes(nav.url) ? "sidebar-link_active" : "",
            onClick: () => handleMenuItemClick(nav.url),
            icon: <nav.icon />,
            label: <span className="menu-label">{nav.label}</span>,
          }))}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
