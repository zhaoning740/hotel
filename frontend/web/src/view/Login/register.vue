<template>
  <div class="login">
    <div class="name">海舍民宿后台管理系统</div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="passwd">
        <Input type="password" v-model="formInline.passwd" placeholder="请输入密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="passwdCheck">
        <Input type="password" v-model="formInline.passwdCheck" placeholder="请再次输入密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">确定</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formInline.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formInline.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formInline.passwd) {
        callback(new Error("两次密码不匹配!"));
      } else {
        callback();
      }
    };
    return {
      formInline: {
        user: "",
        password: "",
         passwd: '',
        passwdCheck: '',
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名(手机号)",
            trigger: "change"
          }
        ],
        passwd: [{ validator: validatePass, trigger: "change" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style>
.login {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 200px auto 0;
  padding: 35px 20px 0;
}
.name {
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
