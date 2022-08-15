<template>
  <div class="main">
    <div class="m-wrap">
      <div class="m-left">
        <div class="playDetail">
          <div class="playDetail-top">
            <div class="img">
              <img :src="audioSubmit.coverUrl + '?param=200y200'" />
            </div>
            <div class="headerAndcon">
              <h2><i></i>{{ audioSubmit.name }}</h2>
              <div class="djCome">
                <i></i>
                <span>{{ audioSubmit.radioName }}</span>
                <a href="javascript:;">
                  <i>
                    <span>订阅（{{ audioSubmit.radioSubCount }}）</span>
                  </i>
                </a>
              </div>
            </div>
          </div>
          <div class="playDetail-btn">
            <a href="javascript:;" @click="playSong(audioSubmit.mainSongId)">
              <i></i>
              <span class="btn-font"
                >播放（{{
                  $moment(audioSubmit.duration).format("mm分ss秒")
                }}）</span
              >
            </a>
            <a href="javascript:;">
              <i></i>
              <span>({{ audioSubmit.likedCount }})</span>
            </a>
            <a href="javascript:;">
              <i></i>
              <span>分享({{ audioSubmit.commentCount }})</span>
            </a>
            <a href="javascript:;">
              <i></i>
              <span>({{ audioSubmit.shareCount }})</span>
            </a>
            <a href="javascript">
              <i></i>
              <span>下载</span>
            </a>
          </div>
          <div class="playDetail-dec">
            <div class="detail">
              <span>{{ audioSubmit.radioName }}</span>
              <span>第{{ audioSubmit.serialNum }}期</span>
              <p>
                {{ $moment(audioSubmit.createTime).format("YYYY-MM-DD") }}创建
              </p>
              <p>
                播放：<strong>{{ audioSubmit.listenerCount }}</strong
                >次
              </p>
            </div>
            <div class="description">
              <span>介绍：</span>
              <div class="title" ref="titleMore">
                {{ audioSubmit.description }}
              </div>
            </div>
            <div class="more">
              <a href="javascript:" @click="clickMore">{{ more }}...></a>
            </div>
          </div>
        </div>
        <div class="djSonglist" v-if="aduioSongList.length == 0 ? false : true">
          <div class="djSonglist-herader">
            <h4>节目包含歌曲列表</h4>
            <span>({{ aduioSongList.length }}首歌)</span>
          </div>
          <div class="djSonglist-body">
            <ul>
              <li v-for="(item, index) in aduioSongList" :key="item.id">
                <span>{{ index + 1 }}</span>
                <i @click="playSong(item.id)"></i>
                <div class="songName">{{ item.name }}</div>
                <p>{{ $moment(item.duration).format("MM:SS") }}</p>
                <div class="songActive">{{ item.nickName }}</div>
                <div class="zhuanji">{{ item.albumName }}</div>
              </li>
            </ul>
          </div>
        </div>
        <section class="comment">
          <header class="com-title clearFix">
            <h3>评论</h3>
            <p>共{{ totalCount }}条评论</p>
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
            <h3>精彩评论</h3>
            <ul>
              <li
                class="com-info clearFix"
                v-for="(item5, index) in commentArr"
                :key="index"
              >
                <div class="head">
                  <a href="javascript:;">
                    <img :src="item5.avatarUrl" />
                  </a>
                </div>
                <div class="com-content">
                  <p class="com-top">
                    <a href="javascript:;">{{ item5.name }}</a
                    >:{{ item5.content }}
                  </p>
                  <p class="com-bottom">
                    <time>{{ item5.timeStr }}</time>
                    <a href="javascript:;" class="finger"
                      ><i></i>({{ item5.likedCount }})</a
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
                :total="this.totalCount"
                @prev-click="lastPage"
                @next-click="nextPage"
                @current-change="clickPage"
              >
              </el-pagination>
            </nav>
          </div>
        </section>
      </div>
      <div class="m-right">
        <div class="right_background"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      flag: true,
      more: "详情",
      //请求评论发送参数
      commentInfo: {
        id: 0,
        // 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
        type: 4,
        pageNo: 1,
        pageSize: 20,
        //  排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
        sortType: 1,
      },
      //评论的总数
      totalCount: 0,
      commentArr: [],
      //发表评论的info数据
      sendCommentInfo: {
        t: 1,
        type: 4,
        id: 0,
        // 要发送的内容
        content: "",
        cookie: "",
      },
      user: {},
    };
  },
  mounted() {
    //判断locatio是否存在
    if (localStorage.getItem("userName")) {
      let user = JSON.parse(localStorage.getItem("userName"));
      this.user = user;
    }
    //获取当前的电台id
    this.commentInfo.id = this.$route.params.id;
    this.$store.dispatch("getComments", this.commentInfo);
  },
  methods: {
    //点击详情
    clickMore() {
      if (this.flag) {
        this.$refs.titleMore.className = "title1";
        this.flag = false;
        this.more = "收起";
      } else {
        this.$refs.titleMore.className = "title";
        this.flag = true;
        this.more = "详情";
      }
    },
    //点击播放歌曲
    playSong(id) {
      console.log(id);
      this.$store.dispatch("getSongAsg", id);
    },
    //点击分页器上一页
    lastPage(val) {
      let lastElement = this.commentArr.slice(-1);
      this.commentInfo.pageNo = val;
      this.commentInfo.sortType = 3;
      this.commentInfo.cursor = lastElement[0].time;
      this.$store.dispatch("getComments", this.commentInfo);
    },
    //点击分页器下一页
    nextPage(val) {
      let lastElement = this.commentArr.slice(-1);
      this.commentInfo.pageNo = val;
      this.commentInfo.sortType = 3;
      this.commentInfo.cursor = lastElement[0].time;
      this.$store.dispatch("getComments", this.commentInfo);
    },
    //点击分页器页码
    clickPage(val) {
      let lastElement = this.commentArr.slice(-1);
      this.commentInfo.pageNo = val;
      this.commentInfo.sortType = 3;
      this.commentInfo.cursor = lastElement[0].time;
      this.$store.dispatch("getComments", this.commentInfo);
    },
    //点击发表评论
    sendCommentByid() {
      if (localStorage.getItem("userName")) {
        this.sendCommentInfo.id = this.$route.params.id;
        this.sendCommentInfo.cookie = this.user.cookie;
        this.$store.dispatch("sendComment", this.sendCommentInfo);
        this.sendCommentInfo.content = "";

        setTimeout(() => {
          if (this.$store.state.sendCommentAsg.code != 200) {
            return this.$message.error("发表评论失败");
          } else {
            this.$message.success("发表评论成功");
          }
        }, 500);
      } else {
        return this.$message.error("请先登录");
      }
    },
  },
  computed: {
    ...mapState(["djSubmit"]),

    ...mapState({
      comments: (state) => state.comments.data,
    }),
    audioSubmit: function () {
      let object = {};
      if (Object.keys(this.djSubmit).length > 0) {
        object.name = this.djSubmit.program.name;
        object.id = this.djSubmit.program.id;
        object.mainSongId = this.djSubmit.program.mainSong.id;
        object.radioName = this.djSubmit.program.radio.name;
        object.coverUrl = this.djSubmit.program.coverUrl;
        object.radioSubCount = this.djSubmit.program.radio.subCount;
        object.duration = this.djSubmit.program.mainSong.duration;
        object.likedCount = this.djSubmit.program.likedCount;
        object.shareCount = this.djSubmit.program.shareCount;
        object.commentCount = this.djSubmit.program.commentCount;
        object.serialNum = this.djSubmit.program.serialNum;
        object.listenerCount = this.djSubmit.program.listenerCount;
        object.description = this.djSubmit.program.description;
        object.createTime = this.djSubmit.program.createTime;
        return object;
      }
    },
    aduioSongList: function () {
      let arr = [];
      if (Object.keys(this.djSubmit).length > 0) {
        if (this.djSubmit.program.songs.length > 0) {
          arr = this.djSubmit.program.songs.map((item, index) => {
            if (item.name == null) {
              return false;
            }
            let id = item.id;
            let name = item.name;
            let duration = item.duration;
            let albumName = item.album.name;
            let albumId = item.album.id;
            let nickName = item.artists[0].name;
            let artistId = item.artists[0].id;

            return {
              id,
              name,
              duration,
              nickName,
              artistId,
              albumName,
              albumId,
            };
          });
        }
      }
      arr.forEach((item, index) => {
        if (item == false) {
          arr.splice(index, 1);
        }
      });
      console.log(arr);
      return arr;
    },
  },
  watch: {
    //评论整理数据
    comments(newVal, oldVal) {
      this.totalCount = newVal.totalCount;
      let res = newVal.comments.map((item, index) => {
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
      this.commentArr = res;
    },
  },
};
</script>

<style scoped lang='less'>
.playDetail {
  .playDetail-top {
    display: flex;
    .img {
      margin-right: 20px;
    }
    .headerAndcon {
      margin-bottom: 10px;
      h2 {
        display: flex;
        font-size: 20px;
        color: #333333;
        margin-top: 15px;

        i {
          display: inline-block;
          width: 80px;
          height: 24px;
          background: url("./img/icon.png") 0 -1050px;
          margin-right: 10px;
        }
      }
      .djCome {
        margin-top: 18px;
        display: flex;
        align-items: center;
        i {
          display: inline-block;
          width: 15px;
          height: 15px;
          background: url("./img/icon.png") -36px -301px;
        }
        span {
          font-size: 16px;
          color: #666666;
        }
        a {
          display: flex;
          margin-left: 20px;
          i {
            display: inline-block;
            height: 29px;
            width: 100%;
            border: 1px solid #c7c6c6;
            border-radius: 5px;
            background: url("./img/button2.png") 0 -2600px;
            span {
              height: 29px;
              line-height: 29px;
              font-size: 12px;
              color: #333333;
              padding-left: 30px;
            }
          }
        }
      }
    }
  }

  .playDetail-btn {
    margin: 20px 0px;
    a {
      display: inline-block;
      height: 30px;
      // width: 66px;
      line-height: 31px;
      color: #333333;
      border: 1px solid #c4c4c4;
      border-radius: 5px;
      margin-left: 2px;
      background: #fcfcfc;
      // text-align: right;
      &:nth-child(1) {
        background: url("./img/button2.png") 0 -634px;
      }
      &:nth-child(2) {
        background: url("./img/button2.png") 0 -3080px;
      }
      &:nth-child(3) {
        background: url("./img/button2.png") 0 -1465px;
      }
      &:nth-child(4) {
        background: url("./img/button2.png") 0 -1225px;
      }
      &:nth-child(5) {
        background: url("./img/button2.png") 0 -2761px;
      }
      i {
        display: inline-block;
        width: 26px;
      }
      .btn-font {
        color: #ffffff;
      }
      span {
        margin-left: 6px;
        margin-right: 4px;
      }
    }
  }

  .playDetail-dec {
    .detail {
      display: flex;
      align-items: center;
      span {
        font-size: 13px;
        color: #333333;
        font-weight: bold;
        margin: 10px;
      }
      p {
        padding: 0 7px;
        color: #999999;
        strong {
          color: #c20c0c;
        }
      }
    }
    .description {
      color: #666666;
      // margin-top: 20px;
      color: #666666;
      .title {
        white-space: pre-wrap;
        overflow: hidden;
        word-break: break-all;
        word-wrap: break-word;
        text-overflow: ellipsis;
        height: 80px;
      }
      //点击详情
      .title1 {
        white-space: pre-wrap;
        overflow: hidden;
        word-break: break-all;
        word-wrap: break-word;
        text-overflow: ellipsis;
      }
    }
    .more {
      width: 100%;

      a {
        color: #0c73c2;
        float: right;
      }
    }
  }
}

.djSonglist {
  width: 680px;
  .djSonglist-herader {
    width: 680px;
    height: 33px;
    background: #f7f7f7;
    border: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    h4 {
      width: 120px;
      color: #333333;
    }
  }
  .djSonglist-body {
    ul {
      width: 100%;
      border: 1px solid #d9d9d9;
      border-top: none;
      li {
        display: flex;
        align-items: center;
        width: 680px;
        height: 30px;
        background: #ffffff;
        color: #333333;
        &:nth-child(even) {
          background: #f7f7f7;
        }
        span {
          width: 48px;
          color: #333333;
          text-align: center;
        }
        i {
          display: inline-block;
          width: 19px;
          height: 19px;
          background: url("./img/index.png") -266px -266px;
          padding: 0 6px;
        }
        .songName {
          width: 260px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        p {
          padding: 6px 10px;
        }
        .songActive {
          width: 90px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          padding-left: 40px;
        }
        .zhuanji {
          width: 107px;
          padding-left: 40px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}

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
.m-right {
  float: right;
  .right_background {
    width: 250px;
    height: 780px;
    background: url("./img/background.png") no-repeat;
  }
}
</style>