<template>
  <div>
    <main class="main" v-if="songDetail">
      <div class="m-wrap">
        <div class="m-left">
          <div class="playDetail">
            <div class="img">
              <img :src="songDetail.coverImgUrl" alt="" />
            </div>
            <h2>{{ songDetail.name }}</h2>
            <div class="sing">
              <img :src="songDetail.avatarUrl" alt="" />
              <span>{{ songDetail.nickname }}</span>
              <p>{{ $moment(songDetail.createTime).format("YYYY-MM-DD") }}</p>
            </div>
            <div class="btn">
              <a href="javascript:;" @click="PlaySongList">
                <i></i>
                <span>播放</span>
              </a>
              <a href="javascript:;">
                <i></i>
                <span>({{ songDetail.subscribedCount }})</span>
              </a>
              <a href="javascript:;">
                <i></i>
                <span>({{ songDetail.shareCount }})</span>
              </a>
              <a href="javascript:;">
                <i></i>
                <span>下载</span>
              </a>
              <a href="javascript:;">
                <i></i>
                <span>({{ songDetail.commentCount }})</span>
              </a>
            </div>
            <div class="tag">
              <p>标签：</p>
              <a
                href="javascript:;"
                v-for="(item, index) in songDetail.tags"
                :key="index"
                >{{ item }}</a
              >
            </div>
            <div class="description">
              <span>介绍：</span>
              <div class="title" ref="titleMore">
                {{ songDetail.description }}
              </div>
            </div>
            <div class="more">
              <a href="javascript:;" @click="clickMore">{{ more }}...</a>
            </div>
          </div>
          <div class="songTable">
            <div class="songHeard">
              <h4>歌曲列表</h4>
              <span>{{ songDetail.trackCount }}首歌</span>
              <p>
                播放:<span>{{ songDetail.playCount }}</span
                >次
              </p>
            </div>

            <el-table :data="songTable" border stripe>
              <el-table-column label="操作" width="70">
                <template slot-scope="scope">
                  <i>{{ scope.$index + 1 }}</i>
                  <span
                    class="playClick"
                    @click="playMusic(scope.row)"
                    ref="spanRef"
                  ></span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="歌曲标题" width="236">
                <template slot-scope="scope">
                  <span @click="goSongAsg(scope.row.id)">{{
                    scope.row.name
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="dt" label="时长" width="width">
                <template slot-scope="scope">
                  {{ scope.row.dt | dataFormMatch }}
                </template>
              </el-table-column>
              <el-table-column prop="ar" label="歌手" width="width">
                <template slot-scope="scope">
                  <span @click="goSingerAsg(scope.row.arId)">
                    {{ scope.row.ar }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="al" label="专辑" width="width">
                <template slot-scope="scope">
                  <span @click="goAlbumAsg(scope.row.alId)">
                    {{ scope.row.al }}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <Comment :send="type"></Comment>
        </div>
        <div class="m-right">
          <div class="right_background"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Comment from "../comment/comment.vue";
export default {
  data() {
    return {
      type: "playList",
      text: "———·The Victoria's Secret Fashion Show·———\n\n维多利亚的秘密时尚内衣秀 首次举办是1995年情人节前夕 01年开始每年11月举行 并慢慢与电视台、网络等媒体合作推出电视时尚盛宴 维秘表演嘉宾由此产生\n\n每年最受瞩目的Fantasy Bra最早出现在1996年维密秀场上 另一标志性“天使“面孔——翅膀 则始于1998年\n\n歌单为2001—2018受邀表演嘉宾秀单曲 可云音乐搜索现场Live show\n封面选取\n首次选用06年贾婷婷开场《Sexy Back》\n\n二次选用13年FOB联手old霉现场\n《My Songs Know What You Did In The Dark》\n\n最终选用12年超模日现场《Diamonds》\n\n心中最佳｜12年《Phresh Out The Runaway》现场 \n\n歌单按表演嘉宾出场排序原曲\n18年纽约站：Kelsea Ballerini、The Chainsmokers\nHalsey、Bebe Rexha、Shawn Mendes、Rita Ora、The Struts\n\n17年上海站：Harry Styles、Miguel (李云迪助阵) Leslie Odom Jr、张靓颖\n\n16年巴黎站：Lady Gaga、Bruno Mars、The Weeknd\n\n15年纽约站：The Weeknd、Ellie Goulding、Selena Gomez\n\n14年伦敦站：Taylor Swift、Ed Sheeran、Ariana Grande、Hozier\n\n以下年份均在美国本土举办\n13年：Fall Out Boy、Taylor Swift、A Great Big World、Neon Jungle\n\n12年：Rihanna、Bruno Mars、Justin Bieber\n\n11年：Kanye West、Maroon 5、Jay-Z、Nicki Minaj\n\n10年：Akon、Katy Perry\n\n09年：Black Eyed Peas\n\n08年：Usher、Jorge Moreno\n\n07年：Will.I.Am、Seal、Spice Girls\n\n06年：Justin Timberlake\n\n05年：Chris Botti、Seal、Ricky Martin\n\n03/02/01..",
      flag: true,
      more: "详情",
      //歌单的详情
      songDetail: {
        id: 0,
        //歌单名字
        name: "",
        coverImgUrl: "",
        //小头像
        avatarUrl: "",
        //歌单作者名字
        nickname: "",
        //歌单介绍
        description: "",
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
        //标签
        tags: [],
        //创建时间
        createTime: 0,
      },
      //歌单table数据
      songTable: [],
      user: {},
      //请求评论发送参数
      commentInfo: {
        id: 0,
        // 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
        type: 2,
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
        type: 2,
        id: 0,
        // 要发送的内容
        content: "",
        cookie: "",
      },
    };
  },
  mounted() {
    this.getPlayList();
    //判断locatio是否存在
    if (localStorage.getItem("userName")) {
      let user = JSON.parse(localStorage.getItem("userName"));
      this.user = user;
    }
    //获取当前的歌单id
    this.commentInfo.id = this.$route.params.id;
    this.$store.dispatch("getComments", this.commentInfo);
  },
  components: {
    Comment,
  },
  methods: {
    //获取歌单详情
    getPlayList() {
      this.$store.dispatch("getPlayListDetail", this.$route.params.id);
    },
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
    //点击播放音乐
    playMusic(row) {
      this.$store.dispatch("getSongAsg", row.id);
    },
    //点击歌单播放前20首音乐
    PlaySongList() {
      this.$store.dispatch("getPlayListSong", this.$route.params.id);
    },

    //跳转歌曲详情页面
    goSongAsg(id) {
      this.$router.push({ path: `/songasg/${id}`, query: { type: "song" } });
    },
    //点击跳转歌星详情
    goSingerAsg(id) {
      this.$router.push({ path: `/singerasg/${id}` });
    },
    //点击跳转专辑详情
    goAlbumAsg(id) {
      this.$router.push({ path: `/albumasg/${id}` });
    },
  },
  computed: {
    ...mapState({
      playList: (state) => state.playList,
      comments: (state) => state.comments.data,
    }),
  },
  watch: {
    playList(newVal, oldVal) {
      //整理数据
      this.songDetail.id = newVal.playlist.id;
      this.songDetail.name = newVal.playlist.name;
      this.songDetail.coverImgUrl =
        newVal.playlist.coverImgUrl + "?param=200y200";
      this.songDetail.avatarUrl =
        newVal.playlist.creator.avatarUrl + "?param=35y35";
      this.songDetail.nickname = newVal.playlist.creator.nickname;
      this.songDetail.description = newVal.playlist.description;
      this.songDetail.trackCount = newVal.playlist.trackCount;
      this.songDetail.playCount = newVal.playlist.playCount;
      this.songDetail.subscribedCount = newVal.playlist.subscribedCount;
      this.songDetail.shareCount = newVal.playlist.shareCount;
      this.songDetail.commentCount = newVal.playlist.commentCount;
      this.songDetail.tags = newVal.playlist.tags;
      this.songDetail.createTime = newVal.playlist.createTime;
      console.log(this.songDetail);

      this.songTable = newVal.playlist.tracks;
      let res = this.songTable.map((item, index) => {
        return Object.assign(
          {},
          {
            name: item.name,
            dt: item.dt,
            id: item.id,
            ar: item.ar[0].name,
            arId: item.ar[0].id,
            al: item.al.name,
            alId: item.al.id,
          }
        );
      });
      this.songTable = res;
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
.main {
  overflow: hidden;
  background: #f2f2f2;
  .m-wrap {
    overflow: hidden;
    margin: 0 auto;
    width: 980px;
    border: 1px solid #d3d3d3;
    border-bottom: none;
    background: #fff;
    padding-top: 40px;
    .m-left {
      float: left;
      zoom: 1;
      width: 689px;
      padding: 20px 20px 40px;
      border-right: 1px solid #d3d3d3;

      //歌单头部详情
      .playDetail {
        width: 410px;
        // height: 283px;
        margin: 0 0 0 230px;
        display: flex;
        flex-direction: column;
        position: relative;
        .img {
          position: absolute;
          left: -220px;
        }

        h2 {
          font-size: 20px;
          color: #333333;
        }
        .sing {
          display: flex;
          align-items: center;
          font-size: 12px;
          span {
            color: #0c73c2;
            margin-left: 15px;
          }
          p {
            color: #999999;
            margin-left: 15px;
          }
        }

        .btn {
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
              background: url("./img/button2.png") 0 -633px;
            }
            &:nth-child(2) {
              background: url("./img/button2.png") 0 -977px;
            }
            &:nth-child(3) {
              background: url("./img/button2.png") 0 -1225px;
            }
            &:nth-child(4) {
              background: url("./img/button2.png") 0 -2761px;
            }
            &:nth-child(5) {
              background: url("./img/button2.png") 0 -1465px;
            }
            i {
              display: inline-block;
              width: 26px;
            }
            span {
              margin-left: 6px;
              margin-right: 4px;
            }
          }
        }

        .tag {
          display: flex;
          align-items: center;
          margin: 25px 0 5px;
          p {
            color: #666666;
          }
          a {
            height: 22px;
            min-width: 40px;
            border-top-right-radius: 35%;
            border-bottom-right-radius: 35%;
            border-right: 1px solid #d1d1d1;
            line-height: 22px;
            text-align: center;
            color: #77777777;
            margin-left: 6px;
            background: url("./img/button2.png");
          }
        }

        .description {
          color: #666666;
          .title {
            white-space: pre-wrap;
            overflow: hidden;
            word-break: break-all;
            word-wrap: break-word;
            text-overflow: ellipsis;
            height: 98px;
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

      //歌曲table
      .songTable {
        margin-top: 50px;
        .songHeard {
          display: flex;
          align-items: center;
          justify-content: space-between;
          h4 {
            color: #333333;
            font-size: 20px;
          }
          p {
            span {
              color: #c20c0c;
            }
          }
        }
      }
    }

    .m-right {
      float: right;
      .right_background {
        width: 250px;
        height: 780px;
        background: url("./img/background.png") no-repeat;
      }
    }
  }
}

//table样式
.playClick {
  display: inline-block;
  float: right;
  width: 23px;
  height: 23px;
  background: url("./img/index.png") -267px -205px;
  cursor: pointer;
  &:hover {
    background: url("./img/index.png") -267px -235px;
  }
}

//留言样式
.comment {
  float: left;
  width: 100%;
  // padding: 0 30px 40px 40px;
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
.clearFix {
  zoom: 1;
}
.clearFix:after {
  content: "";
  display: block;
  clear: both;
}
</style>