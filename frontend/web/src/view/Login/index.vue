<template>
  <div class="login">
    <div class="name">海舍民宿后台管理系统</div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
      </FormItem>
    </Form>
    <!-- <router-link to='/register'>去注册</router-link> -->
  </div>
</template>
<script>
import R from '@/request';
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名(手机号)",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码最少6位数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          R.post('/user/login', {
            login: this.formInline.user,
            password: this.formInline.password,
          }).then(res => {
            if (res.success && res.data.id) {
              window.localStorage.setItem('ID', res.data.id);
              this.$Message.success("login Success!");
              this.$router.replace('/');
            }
          })
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style>
.login{
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 200px auto 0;
  padding: 35px 20px 0;
}
.name{
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
