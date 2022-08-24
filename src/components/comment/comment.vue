<template>
  <section class="comment">
    <header class="com-title clearFix">
      <h3>评论</h3>
      <p>共{{ commentCount }}条评论</p>
    </header>
    <div class="comarea clearFix">
      <div class="com-img">
        <img
          :src="
            Object.keys(user).length != 0
              ? user.imgUrl
              : require('./img/comimg.jpg')
          "
        />
      </div>
      <div class="commentarea">
        <div class="area">
          <textarea v-model="sendCommentInfo.content"></textarea>
        </div>
        <div class="comicon">
          <i class="smile"></i>
          <i class="art"></i>
          <a @click="sendCommentByid" class="comtxt">评论</a>
          <span>140</span>
        </div>
      </div>
    </div>
    <div class="comment-info">
      <h3>最新评论</h3>
      <ul>
        <li
          class="com-info clearFix"
          v-for="(item, index) in commentArr"
          :key="item.index"
        >
          <div class="head">
            <a href="javascript:;">
              <img :src="item.avatarUrl" />
            </a>
          </div>
          <div class="com-content">
            <p class="com-top">
              <a href="javascript:;">{{ item.name }}</a
              >:{{ item.content }}
            </p>
            <p class="com-bottom">
              <time>{{ item.timeStr }}</time>
              <a href="javascript:;" class="finger"
                ><i></i>({{ item.likedCount }})</a
              >
              <span>|</span>
              <a href="javascript:;">回复</a>
            </p>
          </div>
        </li>
      </ul>
      <nav class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="commentCount"
          :page-size="20"
          @prev-click="lastPage"
          @next-click="nextPage"
          @current-change="clickPage"
        >
        </el-pagination>
      </nav>
    </div>
  </section>
</template>

<script>
import { reqGetComment, reqSendComment } from "@/api/index";
export default {
  props: ["send"],
  data() {
    return {
      //请求评论发送参数
      commentInfo: {
        id: 0,
        // 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
        type: 0,
        pageNo: 1,
        pageSize: 20,
        //  排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
        sortType: 1,
      },

      //发表评论的info数据
      sendCommentInfo: {
        t: 1,
        type: 0,
        id: 0,
        // 要发送的内容
        content: "",
        cookie: "",
      },
      user: {},
      type: "song",
      //评论数据
      comments: [],
      //评论的总数
      commentCount: 0,
      user: {},
    };
  },
  mounted() {
    //判断locatio是否存在
    if (localStorage.getItem("userName")) {
      let user = JSON.parse(localStorage.getItem("userName"));
      this.user = user;
    }
    //接收路由传递的参数
    // this.type = this.$route.query.type;
    this.type = this.send;
    this.typeJudge();
    //获取评论
    this.getComment();
  },
  methods: {
    async getComment() {
      this.commentInfo.id = this.$route.params.id;
      let result = await reqGetComment(this.commentInfo);
      this.comments = result.data.data.comments;

      this.commentCount = result.data.data.totalCount;
      //子传父组件
      this.$emit("commentCount", this.commentCount);
    },
    //点击分页器上一页
    async lastPage(val) {
      let lastElement = this.commentArr.slice(-1);
      this.commentInfo.pageNo = val;
      this.commentInfo.sortType = 3;
      this.commentInfo.cursor = lastElement[0].time;
      let result = await reqGetComment(this.commentInfo);
      this.comments = result.data.data.comments;
    },
    //点击分页器下一页
    async nextPage(val) {
      let lastElement = this.commentArr.slice(-1);
      this.commentInfo.pageNo = val;
      this.commentInfo.sortType = 3;
      this.commentInfo.cursor = lastElement[0].time;
      let result = await reqGetComment(this.commentInfo);
      this.comments = result.data.data.comments;
    },
    //点击分页器页码
    async clickPage(val) {
      let lastElement = this.commentArr.slice(-1);
      this.commentInfo.pageNo = val;
      this.commentInfo.sortType = 3;
      this.commentInfo.cursor = lastElement[0].time;
      let result = await reqGetComment(this.commentInfo);
      this.comments = result.data.data.comments;
    },
    //点击发表评论
    async sendCommentByid() {
      if (localStorage.getItem("userName")) {
        this.sendCommentInfo.id = this.$route.params.id;
        this.sendCommentInfo.cookie = this.user.cookie;
        let result = await reqSendComment(this.sendCommentInfo);
        this.sendCommentInfo.content = "";
        setTimeout(() => {
          if (result.data.code != 200) {
            return this.$message.error("发表评论失败");
          } else {
            this.$message.success("发表评论成功");
          }
        }, 500);
      } else {
        return this.$message.error("请先登录");
      }
    },
    //判断是什么类型
    typeJudge() {
      if (this.type == "song") {
        this.sendCommentInfo.type = 0;
        this.commentInfo.type = 0;
      }
      if (this.type == "playList") {
        this.sendCommentInfo.type = 2;
        this.commentInfo.type = 2;
      }
      if (this.type == "djShow") {
        this.sendCommentInfo.type = 4;
        this.commentInfo.type = 4;
      }
      if (this.type == "album") {
        this.sendCommentInfo.type = 3;
        this.commentInfo.type = 3;
      }
    },
  },
  computed: {
    //整理评论的数据
    commentArr() {
      if (this.comments.length > 0) {
        let arr = [];
        arr = this.comments.map((item, index) => {
          return Object.assign(
            {},
            {
              name: item.user.nickname,
              content: item.content,
              avatarUrl: item.user.avatarUrl,
              timeStr: item.timeStr,
              likedCount: item.likedCount,
              time: item.time,
            }
          );
        });
        return arr;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.comment {
  width: 100%;
  margin-left: -40px;
  padding: 0 30px 40px 40px;
}
.com-title {
  margin-top: 40px;
  height: 33px;
  border-bottom: 2px solid #c20c0c;
}
.com-title h3 {
  float: left;
  font-size: 20px;
  line-height: 28px;
}
.com-title p {
  float: left;
  margin: 9px 0 0 20px;
  color: #666;
}
.comarea {
  margin-top: 20px;
}
.com-img {
  float: left;
  width: 50px;
}
.com-img img {
  width: 50px;
  height: 50px;
}
.commentarea {
  float: right;
  width: 608px;
}
.area {
  float: left;
}
.area textarea {
  width: 592px;
  height: 50px;
  padding: 5px 6px 6px;
  border: 1px solid #cdcdcd;
  border-radius: 2px;
  line-height: 19px;
}
.comicon {
  float: left;
  width: 608px;
  padding-top: 10px;
}
.smile {
  float: left;
  margin: 0px 10px 0 0;
  width: 18px;
  height: 18px;
  background: url(./img/icon.png) no-repeat -40px -490px;
}
.art {
  float: left;
  margin: 0px 10px 0 0;
  width: 18px;
  height: 18px;
  background: url(./img/icon.png) no-repeat -60px -490px;
}
.comtxt {
  float: right;
  width: 46px;
  height: 25px;
  background: url(./img/button.png) no-repeat -84px -64px;
  color: #fff;
  text-align: center;
  line-height: 25px;
}
.comicon span {
  float: right;
  margin-right: 10px;
  line-height: 25px;
  color: #999;
}
.comment-info ul {
  padding-bottom: 40px;
}
.comment-info h3 {
  height: 20px;
  border-bottom: 1px solid #cfcfcf;
}
.com-info {
  padding: 15px 0;
  border-top: 1px dotted #ccc;
}
.head {
  float: left;
  width: 50px;
  height: 50px;
}
.head img {
  width: 50px;
  height: 50px;
}
.com-content {
  float: right;
  width: 610px;
}
.com-top {
  overflow: hidden;
  line-height: 20px;
}
.com-top a {
  color: #0c73c2;
}
.com-bottom {
  margin-top: 15px;
  text-align: right;
}
.com-bottom time {
  float: left;
  color: #999;
}
.finger {
  color: #333;
}
.finger i {
  display: inline-block;
  vertical-align: top;
  width: 15px;
  height: 14px;
  background: url(./img/icon2.png) no-repeat -150px 0;
}
.com-bottom a {
  color: #666;
}
.com-bottom span {
  margin: 0 2px;
  color: #999;
}
.page {
  margin: 20px 0;
  text-align: center;
  font-size: 0;
}
.page-change {
  display: inline-block;
  vertical-align: middle;
  margin: 0 1px 0 2px;
  padding: 0 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  height: 22px;
  font-size: 12px;
  line-height: 22px;
  color: #333;
}
.font {
  border: none;
  font-size: 12px;
}
.page-active {
  color: #fff;
  border-color: #a2161b;
  background: url(./img/button.png) no-repeat 0 -650px;
}
.pro-page {
  width: 47px;
  height: 24px;
  line-height: 24px;
  padding: 0 0 0 22px;
  text-align: left;
  background: url(./img/button.png) no-repeat 0 -620px;
}
.next-page {
  width: 57px;
  height: 24px;
  line-height: 24px;
  padding: 0 0 0 12px;
  text-align: left;
  background: url(./img/button.png) no-repeat -75px -560px;
}
.page-change:hover {
  text-decoration: none;
  border-color: #666;
}
.pro-page:hover,
.next-page:hover {
  text-decoration: none;
  border-color: #ccc;
}
.next-page:hover {
  background-position-y: -590px;
}
</style>