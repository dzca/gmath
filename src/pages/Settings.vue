<template>
<div>
	<h1>{{ title }}</h1>

	<el-form :model="settingForm" status-icon :rules="settingRules" ref="settingForm" label-width="120px">
	  <el-form-item label="Min" prop="min">
	    <el-input v-model.number="settingForm.min"></el-input>
	  </el-form-item>
	  <el-form-item label="max" prop="max">
	    <el-input v-model.number="settingForm.max"></el-input>
	  </el-form-item>
	  <el-form-item label="Size" prop="size">
	    <el-input v-model.number="settingForm.size"></el-input>
	  </el-form-item>

	<el-form-item v-if="settingForm.type === 'mix'" label="Test type" prop="type">
    <el-checkbox-group v-model="settingForm.computes">
      <el-checkbox label="Add" name="computes"></el-checkbox>
      <el-checkbox label="Substract" name="computes"></el-checkbox>
      <el-checkbox label="Multiply" name="computes"></el-checkbox>
      <el-checkbox label="Divide" name="computes"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>

	  <el-form-item>
	    <el-button type="primary" @click="submitForm('settingForm')">Submit</el-button>
	    <el-button @click="resetForm('settingForm')">Reset</el-button>
	  </el-form-item>
	</el-form>

</div>
</template>

<script>
import { mapActions } from "vuex";
import compute from "@/components/service/compute";

export default {
  data() {
    var checkMin = (rule, value, callback) => {
      console.log("v=" + value);
      if (!value && value !== 0) {
        return callback(new Error("Please input the min"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value < 0) {
            callback(new Error("Min must be no less than 0"));
          } else {
            callback();
          }
        }
      }, 30);
    };
    var checkMax = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error("Please input the Max"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value < this.settingForm.min) {
            callback(new Error("Max must be no less than Min"));
          } else {
            callback();
          }
        }
      }, 30);
    };

    var checkSize = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error("Please input the Size"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("Please input digits"));
      } else {
        let v = this.settingForm.max - this.settingForm.min + 1;
        let max_size = v * v;
        // compute the question matrix
        if (this.settingForm.type == "divide") {
          let multiply_list = compute.initAdds(
            this.settingForm.min,
            this.settingForm.max
          );
          let divide_list = compute.initDivides(multiply_list);
          max_size = divide_list.length;
        }

        if (value > max_size) {
          callback(new Error("Size must be no less than " + max_size));
        } else if (value < 1) {
          callback(new Error("Size must be greater that 0"));
        } else {
          callback();
        }
      }
    };

    return {
      title: "Settings",
      settingForm: {
        min: 0,
        max: 12,
        size: 5,
        type: "",
        computes: []
      },
      settingRules: {
        min: [{ validator: checkMin, trigger: "blur" }],
        max: [{ validator: checkMax, trigger: "blur" }],
        size: [{ validator: checkSize, trigger: "blur" }]
      }
    };
  },
  created() {
    // console.log("init settings page " + this.$route.params.type);
    this.settingForm.type = this.$route.params.type;
  },
  methods: {
    ...mapActions(["setSettings"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("call generate = %j", this.settingForm);
          this.setSettings(this.settingForm);
          this.$router.push({ path: "/questions" });
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
