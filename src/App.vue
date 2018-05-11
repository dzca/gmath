<template>
  <div id="app" class="layout">
    <!--
    <p>
      <router-link to="/">Home</router-link>
      <router-link to="/settings">Settings</router-link>
      <router-link to="/questions">Questions</router-link>
    </p>

    <Layout>
        <Header>Header</Header>
        <Content></Content>
        <Footer>Footer</Footer>
    </Layout>

    <Row>
    <Col span="8"><br></Col>
    <Col span="8"></Col>
    <Col span="8"><br></Col>
    </Row>
    -->
    <el-row :gutter="20">
      <el-col :span="2"><br></el-col>
      <el-col :span="20"><router-view/></el-col>
      <el-col :span="2"><br></el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
