import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/ui/sidebar";
import { usePathname } from "@/hooks/use-pathname.ts";
import { useEffect } from "react";

const MainLayout = () => {
  const { Content } = Layout;
  const pathname = usePathname();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== "/users" && pathname !== "/posts") {
      navigate("/users");
    }
  }, [pathname]);

  return (
    <div className="main-wrapper">
      <Layout>
        <Content>
          <Layout hasSider>
            <Sidebar />
            <Content className="content-wrapper">
              <Outlet />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
};

export default MainLayout;
