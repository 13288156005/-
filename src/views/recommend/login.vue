<template>
  <div>
    <div class="login">
      <div class="f_cb">
        <a href="javascript:;">
          <img class="header" :src="loginMsg.imgUrl" alt="" />
        </a>
        <div class="info">
          <h4>
            <a href="javascript:;">{{ loginMsg.name }}</a>
            <span></span>
          </h4>
          <div class="leve">vip8</div>
          <!-- <div class="btn" @click="musicSign">签 到</div> -->
          <el-button
            :type="buttonType"
            :disabled="buttonType == 'info' ? true : false"
            class="btn"
            @click="musicSign"
            >签 到</el-button
          >
        </div>
      </div>
      <ul class="dny">
        <li>
          <strong>{{ loginMsg.eventCount }}</strong>
          <span>动态</span>
        </li>
        <li>
          <strong>{{ loginMsg.follows }}</strong>
          <span>关注</span>
        </li>
        <li>
          <strong>{{ loginMsg.followeds }}</strong>
          <span>粉丝</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reqMusicSign } from "@/api/index.js";
export default {
  data() {
    return {
      loginMsg: {},
      buttonType: "primary",
    };
  },
  mounted() {
    this.getUserMsg();
  },
  methods: {
    getUserMsg() {
      //本地存储localStrage
      if (localStorage.getItem("userName")) {
        let userName = localStorage.getItem("userName");
        userName = JSON.parse(userName);
        this.loginMsg = userName;
      }
    },
    //音乐签到
    async musicSign() {
      let userName = localStorage.getItem("userName");
      userName = JSON.parse(userName);
      this.buttonType = "info";
      try {
        let result = await reqMusicSign(userName.cookie);
        console.log(result.data);
        if (result.data.code == 200) {
          return this.$message.success("签到成功");
        } else {
          return this.$message.error("禁止重复签到");
        }
      } catch (err) {
        return this.$message.error("禁止重复签到");
      }
    },
  },
};
</script>

<style scoped lang='less'>
.login {
  width: 250px;
  height: 180px;
  background-color: #f2f2f2;
  padding: 20px 0px 0px;
  border-bottom: 1px solid #b2b2b2;

  .f_cb {
    width: 250px;
    height: 90px;
    background: #f7f7f7;
    display: flex;
    justify-content: space-evenly;

    a {
      color: #333333;
      overflow: hidden;
    }
    .header {
      width: 80px;
      height: 80px;
      padding: 2px;
      background: #fff;
      border: 1px solid #dadada;
    }

    .info {
      h4 {
        width: 115px;
        height: 19px;
        margin-top: 5px;
        display: flex;
        a {
          width: 60px;
          height: 19px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }
        span {
          width: 43px;
          height: 16px;
          background: url("./img/login/vip.png");
          background-size: 43px 16px;
        }
      }

      .btn {
        width: 100px;
        height: 31px;
        display: inline-block;
        zoom: 1;
        height: 31px;
        line-height: 31px;
        overflow: hidden;
        text-align: center;

        border: 1px solid #cccccc;
        border-radius: 4px;
        color: #ffff;
        cursor: pointer;
        padding: 0 5px 0 0;
        white-space: nowrap;
        margin-top: 10px;
      }
    }
  }
  .dny {
    display: inline-block;
    width: 250px;
    height: 40px;
    padding-top: 25px;
    padding-bottom: 25px;
    display: flex;
    justify-content: space-around;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      color: #666666;
      strong {
        padding-bottom: 10px;
        font-size: 20px;
      }
    }
  }
}
</style>