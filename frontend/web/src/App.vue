<style scoped>
.layout-con {
  height: 100%;
  width: 100%;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
<template>
  <div>
    <div class="layout" v-if="isLogin">
      <Layout :style="{minHeight: '100vh'}">
        <Sider>
          <SideBar/>
        </Sider>
        <Layout>
          <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
            <Nav/>
          </Header>
          <Content :style="{padding: '0 16px 16px'}">
            <Breadcrumb :style="{margin: '16px 0'}">
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Card>
              <div style="height: 600px">
                <router-view></router-view>
              </div>
            </Card>
          </Content>
        </Layout>
      </Layout>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Login from '@/login';
import { SideBar, Nav } from "./component/App";
export default {
  data() {
    return {
      isLogin: true
    };
  },
  created: function() {
    if (window.location.hash === "#/login" || window.location.hash === "#/register") {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
    if (this.isLogin) {
      Login.checkLogin();
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === "/login" || to.path === "/register") {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
      if (this.isLogin) {
        Login.checkLogin();
      }
    }
  },
  components: {
    SideBar,
    Nav
  },
  computed: {}
};
</script>
