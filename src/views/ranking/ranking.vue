<template>
  <div>
    <main class="rank">
      <div class="r-wrap">
        <div class="m-rank">
          <div class="l-r-wrap">
            <h2>云音乐特色榜</h2>
            <ul>
              <!-- item.id==songDetail.id?'l-r-active':'' -->
              <li
                v-for="(item, index) in topListAll"
                v-if="index < 4"
                :key="item.id"
                :class="
                  item.id == songDetail.id ? 'l-r-active clearFix' : 'clearFix'
                "
                @click="changePlayList(item.id)"
              >
                <div class="l-r-spelist">
                  <a href="#" class="l-r-left"
                    ><img :src="item.coverImgUrl + '?param=40y40'"
                  /></a>
                  <div class="l-r-right">
                    <p>
                      <a href="#">{{ item.name }}</a>
                    </p>
                    <span>{{ item.updateFrequency }}</span>
                  </div>
                </div>
              </li>
            </ul>
            <h2 class="h-height">全球媒体榜</h2>
            <ul>
              <li
                :class="
                  item1.id == songDetail.id ? 'l-r-active clearFix' : 'clearFix'
                "
                v-for="(item1, index1) in topListAll"
                v-if="index1 > 4"
                :key="item1.id"
                @click="changePlayList(item1.id)"
              >
                <div class="l-r-spelist">
                  <a href="#" class="l-r-left"
                    ><img :src="item1.coverImgUrl + '?param=40y40'"
                  /></a>
                  <div class="l-r-right">
                    <p>
                      <a href="#">{{ item1.name }}</a>
                    </p>
                    <span>{{ item1.updateFrequency }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="r-rank clearFix">
          <div class="r-t-wrap">
            <div class="icloud">
              <img :src="songDetail.coverImgUrl" />
            </div>
            <div class="r-icloud">
              <h2>{{ songDetail.name }}</h2>
              <p>
                <i></i
                ><span
                  >最近更新：{{
                    $moment(songDetail.updateTime).format("MM")
                  }}月{{ $moment(songDetail.updateTime).format("DD") }}日</span
                ><span class="i-color">（每天更新）</span>
              </p>
            </div>
            <div class="icloud-play clearFix">
              <a href="javascript:;" @click="playSongList()" class="i-play">
                <span><i></i>播放</span>
              </a>
              <a href="#" class="i-add"></a>
              <a href="#" class="i-add2">
                <span>({{ songDetail.subscribedCount }})</span>
              </a>
              <a href="#" class="i-share">
                <span>({{ songDetail.shareCount }})</span>
              </a>
              <a href="#" class="i-download">
                <span>下载</span>
              </a>
              <a href="#" class="i-mess">
                <span>({{ songDetail.commentCount }})</span>
              </a>
            </div>
          </div>
          <section class="song-list">
            <div class="song-list-title">
              <h3>
                <p>歌曲列表</p>
                <span>{{ songDetail.trackCount }}首歌</span>
              </h3>
            </div>
            <table>
              <tr>
                <th class="first1"></th>
                <th class="secend2">标题</th>
                <th class="third3">时长</th>
                <th class="T-singer">歌手</th>
              </tr>
              <tr v-for="(item3, index) in songTable" :key="item3.id">
                <td>
                  <span class="number">{{ index + 1 }}</span>
                  <span class="t-icon"><i></i></span>
                </td>
                <td>
                  <div class="music">
                    <div class="musicWrap">
                      <a class="playicon" @click="playMusic(item3.id)"></a>
                      <a href="#" class="m-song">{{ item3.name }}</a>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="time">{{ item3.dt | dataFormMatch }}</span>
                  <nav class="play-nav">
                    <a href="javascript:;" class="m-add"></a>
                    <a href="javascript:;" class="m-collection"></a>
                    <a href="javascript:;" class="m-share"></a>
                    <a href="javascript:;" class="m-download"></a>
                  </nav>
                </td>
                <td>
                  <a href="#" class="music-singer">{{ item3.al }}</a>
                </td>
              </tr>
            </table>
          </section>
          <section class="comment">
            <header class="com-title clearFix">
              <h3>评论</h3>
              <p>共{{ totalCount }}条评论</p>
            </header>
            <div class="comarea clearFix">
              <div class="com-img">
                <!-- ./img/comimg.jpg -->
                <img
                  :src="
                    Object.keys(user).length != 0
                      ? user.imgUrl
                      : require('./img/comimg.jpg')
                  "
                />
                <!-- <img src="@/views/ranking/img/comimg.jpg" /> -->
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
                    <a href="#">
                      <img :src="item5.avatarUrl" />
                    </a>
                  </div>
                  <div class="com-content">
                    <p class="com-top">
                      <a href="#">{{ item5.name }}</a
                      >:{{ item5.content }}
                    </p>
                    <p class="com-bottom">
                      <time>{{ item5.timeStr }}</time>
                      <a href="#" class="finger"
                        ><i></i>({{ item5.likedCount }})</a
                      >
                      <span>|</span>
                      <a href="#">回复</a>
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
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      //请求榜单发送参数
      topListInfo: {
        id: "19723756",
      },
      //请求评论发送参数
      commentInfo: {
        id: "19723756",
        // 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
        type: 2,
        pageNo: 1,
        pageSize: 20,
        //  排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
        sortType: 1,
      },
      //歌单的详情
      songDetail: {
        id: "",
        //歌单名字
        name: "",
        coverImgUrl: "",
        //歌曲数量
        trackCount: 0,
        //歌单播放次数
        playCount: 0,
        //歌单收藏数量
        subscribedCount: 0,
        //分享数量
        shareCount: 0,
        //留言数量
        commentCount: 0,
        updateTime: 0,
      },
      //歌单table数据
      songTable: [],
      //评论的总数
      totalCount: 0,
      commentArr: [],
      user: {},
      //发表评论的info数据
      sendCommentInfo: {
        t: 1,
        type: 2,
        id: 0,
        // 要发送的内容
        content: "",
        cookie: "",
      },
    };
  },
  mounted() {
    this.$store.dispatch("getTopList");
    this.$store.dispatch("getPlayListDetail", this.topListInfo.id);
    this.$store.dispatch("getComments", this.commentInfo);
    //判断locatio是否存在
    if (localStorage.getItem("userName")) {
      let user = JSON.parse(localStorage.getItem("userName"));
      this.user = user;
    }
  },
  methods: {
    //点击切换榜单
    changePlayList(id) {
      this.$store.dispatch("getPlayListDetail", id);
      this.commentInfo.id = id;
      //评论
      this.$store.dispatch("getComments", this.commentInfo);
    },
    //点击播放音乐
    playMusic(id) {
      this.$store.dispatch("getSongAsg", id);
    },
    //点击播放，播放歌单列表
    playSongList() {
      this.$store.dispatch("getPlayListSong", this.songDetail.id);
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
        this.sendCommentInfo.id = this.songDetail.id;
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
    ...mapState({
      topList: (state) => state.topList.list,
      playList: (state) => state.playList.playlist,
      comments: (state) => state.comments.data,
    }),
    topListAll: function () {
      if (this.topList) {
        let res = this.topList.map((item, index) => {
          return Object.assign(
            {},
            {
              id: item.id,
              name: item.name,
              updateFrequency: item.updateFrequency,
              coverImgUrl: item.coverImgUrl,
            }
          );
        });
        return res;
      }
    },
    //处理v-if和v-for一起使用的问题
    activeSongTable1: function () {
      return this.topListAll.filter((item, index) => {
        if (index < 4) {
          return item;
        }
      });
    },
    activeSongTable2: function () {
      return this.topListAll.filter((item, index) => {
        if (index > 4) {
          return item;
        }
      });
    },
  },
  watch: {
    playList(newVal, oldVal) {
      //整理数据
      this.songDetail.name = newVal.name;
      this.songDetail.coverImgUrl = newVal.coverImgUrl + "?param=150y150";
      this.songDetail.trackCount = newVal.trackCount;
      this.songDetail.playCount = newVal.playCount;
      this.songDetail.subscribedCount = newVal.subscribedCount;
      this.songDetail.shareCount = newVal.shareCount;
      this.songDetail.commentCount = newVal.commentCount;
      this.songDetail.id = newVal.id;
      this.songDetail.updateTime = newVal.updateTime;

      this.songTable = newVal.tracks;
      let res = this.songTable.map((item, index) => {
        return Object.assign(
          {},
          {
            name: item.name,
            dt: item.dt,
            id: item.id,
            ar: item.ar[0].name,
            al: item.al.name,
          }
        );
      });
      this.songTable = res;
    },
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
  //过滤器
  filters: {
    dataFormMatch: (time) => {
      let m = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
      let s = parseInt((time % (1000 * 60)) / 1000);
      //补零
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return m + ":" + s;
    },
  },
};
</script>

<style scoped lang='less'>
body {
  font-size: 12px;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
}
ul {
  margin: 0;

  padding: 0;
  list-style: none;
}
.rank {
  overflow: hidden;
  background: #f5f5f5;
}
.r-wrap {
  overflow: hidden;
  zoom: 1;
  width: 980px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-bottom: none;
  background: #fff;
}
.m-rank {
  float: left;
  width: 240px;
}
.l-r-wrap {
  margin-top: 40px;
}
.l-r-wrap h2 {
  padding: 0 10px 12px 15px;
  font-size: 14px;
  color: #000;
}
.l-r-wrap li {
  padding: 10px 0 10px 20px;
  height: 42px;
}
.l-r-wrap li:hover {
  background: #f4f2f2;
}
.l-r-active {
  background: #e6e6e6;
}
.l-r-left {
  float: left;
  overflow: hidden;
  width: 40px;
  margin-right: 6px;
}
.l-r-right {
  float: left;
}
.l-r-right p {
  width: 150px;
  overflow: hidden;
  margin-top: 2px;
  margin-bottom: 8px;
}
.l-r-right p a {
  color: #000;
}
.l-r-right span {
  color: #999;
}
.h-height {
  margin-top: 20px;
}
.r-rank {
  float: left;
  width: 739px;
  padding-bottom: 50px;
  border-left: 1px solid #d3d3d3;
}
.r-t-wrap {
  overflow: hidden;
  padding: 40px;
}
.icloud {
  float: left;
}
.icloud img {
  width: 150px;
  height: 150px;
  padding: 3px;
  border: 1px solid #ccc;
}
.r-icloud {
  float: left;
  width: 470px;
  margin-left: 30px;
}
.r-icloud h2 {
  margin: 16px 0 4px;
  font-size: 20px;
  line-height: 24px;
}
.r-icloud p {
  margin: 0 0 20px;
  line-height: 35px;
  color: #666;
}
.r-icloud i {
  float: left;
  margin: 9px 0 0 3px;
  width: 13px;
  height: 13px;
  background: url(./img/icon.png) no-repeat -18px -682px;
}
.r-icloud span {
  margin-left: 5px;
}
.i-color {
  color: #999;
}
.icloud-play {
  float: left;
  margin-bottom: 25px;
  margin-left: 30px;
  height: 31px;
}
.icloud-play a {
  float: left;
}
.i-play {
  padding-right: 5px;
  background: url(./img/button2.png) no-repeat right -428px;
}
.i-play span {
  float: left;
  padding: 0 7px 0 8px;
  height: 31px;
  line-height: 31px;
  color: #fff;
  background: url(./img/button2.png) no-repeat 0 -387px;
}
.i-play span i {
  float: left;
  width: 20px;
  height: 18px;
  margin: 6px 2px 2px 0;
  background: url(./img/button2.png) no-repeat 0 -1622px;
}
.i-add {
  width: 31px;
  height: 31px;
  margin-left: -3px;
  margin-right: 5px;
  background: url(./img/button2.png) no-repeat 0 -1588px;
}
.i-add2 {
  padding-right: 5px;
  margin-right: 6px;
  background: url(./img/button2.png) no-repeat right -1020px;
}
.i-add2 span {
  float: left;
  padding: 0 7px 0 28px;
  width: 48px;
  height: 31px;
  line-height: 31px;
  color: #333;
  background: url(./img/button2.png) no-repeat 0 -977px;
}
.i-share {
  padding-right: 5px;
  margin-right: 6px;
  background: url(./img/button2.png) no-repeat right -1020px;
}
.i-share span {
  float: left;
  padding: 0 2px 0 28px;
  width: 36px;
  height: 31px;
  line-height: 31px;
  color: #333;
  background: url(./img/button2.png) no-repeat 0 -1225px;
}
.i-download {
  padding-right: 5px;
  margin-right: 6px;
  background: url(./img/button2.png) no-repeat right -1020px;
}
.i-download span {
  float: left;
  padding: 0 2px 0 28px;
  width: 24px;
  height: 31px;
  line-height: 31px;
  color: #333;
  background: url(./img/button2.png) no-repeat 0 -2761px;
}
.i-mess {
  padding-right: 5px;
  margin-right: 6px;
  background: url(./img/button2.png) no-repeat right -1020px;
}
.i-mess span {
  float: left;
  padding: 0 2px 0 28px;
  height: 31px;
  line-height: 31px;
  color: #333;
  background: url(./img/button2.png) no-repeat 0 -1465px;
}
.song-list {
  padding: 0 30px 40px 40px;
}
.song-list-title {
  width: 670px;
  height: 33px;
  border-bottom: 2px solid #c20c0c;
}
.song-list-title h3 {
  float: left;
}
.song-list-title h3 p {
  float: left;
  font-size: 20px;
}
.song-list-title h3 span {
  float: left;
  margin: 9px 0 0 20px;
  font-size: 12px;
  color: #666;
}
.song-list table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 670px;
  border: 1px solid #d9d9d9;
}
.song-list table th {
  vertical-align: top;
  text-align: left;
  font-weight: normal;
  color: #666;
  border: 1px solid #ccc;
}
.first1 {
  width: 77px;
  height: 38px;
}
.secend2 {
  height: 18px;
  line-height: 18px;
  padding: 8px 10px;
}
.third3 {
  width: 91px;
  height: 18px;
  line-height: 18px;
  padding: 8px 10px;
}
.T-singer {
  width: 94px;
  height: 18px;
  line-height: 18px;
  padding: 8px 10px;
}
.song-list table td {
  padding: 6px 10px;
  line-height: 18px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
.song-list table td:hover .time {
  display: none;
}
.song-list table td:hover .play-nav {
  display: block;
}
.number {
  float: left;
  width: 25px;
  margin-left: 0;
  text-align: center;
}
.t-icon {
  float: right;
  width: 32px;
  margin-right: -5px;
  text-align: center;
}
.t-icon i {
  display: block;
  overflow: hidden;
  vertical-align: middle;
  width: 16px;
  height: 17px;
  background: url(./img/icon.png) no-repeat -67px -283px;
}
.music {
  float: left;
}
.music .playicon {
  float: left;
  width: 17px;
  height: 17px;
  margin-right: 8px;
  background: url(./img/table.png) no-repeat 0 -103px;
}
.m-song {
  float: left;
  color: #666;
}
.mv {
  float: left;
  width: 23px;
  height: 17px;
  margin: 0 0 0 3px;
  background: url(./img/table.png) no-repeat 0 -151px;
}
.time {
  color: #666;
}
.play-nav {
  float: left;
  display: none;
}
.m-add {
  float: left;
  margin-top: 2px;
  width: 13px;
  height: 13px;
  background: url(./img/icon.png) no-repeat 0 -700px;
}
.m-collection {
  float: left;
  width: 18px;
  height: 16px;
  margin: 2px 0 0 4px;
  background: url(./img/table.png) no-repeat 0 -174px;
}
.m-share {
  float: left;
  width: 18px;
  height: 16px;
  margin: 2px 0 0 4px;
  background: url(./img/table.png) no-repeat 0 -195px;
}
.m-download {
  float: left;
  width: 18px;
  height: 16px;
  margin: 2px 0 0 4px;
  background: url(./img/table.png) no-repeat -81px -174px;
}
.music-singer {
  max-width: 175px;
  display: inline-block;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.comment {
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