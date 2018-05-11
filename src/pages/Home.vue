<template>
<div>
	<h1>{{ title }}</h1>

	<el-row :gutter="20">
	  <el-col :span="12">
			<div class="group"><el-button type="primary" @click="nav('add')" round> Add</el-button></div>
		</el-col>
	  <el-col :span="12"><div class="group"><el-button type="primary" @click="nav('substract')" round> Substract </el-button></div></el-col>
	  <el-col :span="12"><div class="group"><el-button type="primary" @click="nav('multiply')" round> Multiply </el-button></div></el-col>
	  <el-col :span="12"><div class="group"><el-button type="primary" @click="nav('divide')" round> Divide </el-button></div></el-col>

		<!--
		<el-col :span="24"><div class="group"><el-button type="primary" @click="nav('mix')" round> Mixed </el-button></div></el-col>
	-->
	</el-row>

</div>
</template>

<script>
export default {
  data() {
    return {
      title: "Home"
    };
  },
  methods: {
    nav: function(path) {
      console.log("loading Substract Page," + path);
      this.$router.push({ path: "/settings/" + path });
      //this.$router.push({ name: "/settings", params: { path } });
    }

    // nav(path) {
    //   console.log("loading Substract Page");
    //   //this.$router.push({ name: "settings", params: { path } });
    //   this.$router.push({ path: "/settings/${path}" });
    // }
  }
};
</script>
<style lang="scss">
.group {
  border-radius: 4px;
  min-height: 36px;
  padding-bottom: 20px;
}
/*
.login-icon {
  width: 40px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
*/
</style>
