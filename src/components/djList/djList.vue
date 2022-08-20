<template>
  <div class="main" v-if="djDetailTop">
    <div class="m-wrap">
      <div class="m-left">
        <div class="playDetail">
          <div class="img">
            <img :src="djDetailTop.picUrl + '?param=200y200'" alt="" />
          </div>
          <h2>{{ djDetailTop.name }}</h2>
          <div class="sing">
            <img :src="djDetailTop.avatarUrl + '?param=30y30'" alt="" />
            <span>{{ djDetailTop.nickname }}</span>
          </div>
          <div class="btn">
            <a href="javascript:;">
              <i></i>
              <span>订阅（{{ djDetailTop.subCount }}）</span>
            </a>
            <a href="javascript:;">
              <i></i>
              <span>(播放全部)</span>
            </a>
            <a href="javascript:;">
              <i></i>
              <span>分享({{ djDetailTop.shareCount }})</span>
            </a>
          </div>
          <div class="description">
            <span>介绍：</span>
            <div class="title" ref="titleMore">
              {{ djDetailTop.desc }}
            </div>
          </div>
          <div class="more">
            <a href="javascript:;" @click="clickMore">{{ more }}...</a>
          </div>
        </div>

        <div class="songTable">
          <div class="songHeard">
            <h4>节目列表</h4>
            <span>共{{ djDet.count }}期 </span>
          </div>
          <div class="songTableBody">
            <ul>
              <li v-for="(item, index) in djDetList" :key="item.id">
                <span class="number">{{ item.serialNum }}</span>
                <a href="javascript:;">
                  <i @click="playDjSong(item.id)"></i>
                </a>
                <p class="name" @click="goDjSumit(item.audioId)">
                  {{ item.name }}
                </p>
                <span class="playCount">播放{{ item.listenerCount }}</span>
                <span class="goodCount">赞{{ item.likedCount }}</span>
                <p class="songTime">
                  {{ $moment(item.createTime).format("YYYY-MM-DD") }}
                </p>
                <span class="songDt">{{
                  $moment(item.duration).format("mm:ss")
                }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            @next-click="nextPage"
            @prev-click="prevPage"
            @current-change="currentPage"
            :total="djDet.count"
            :page-size="30"
          >
          </el-pagination>
        </div>
      </div>
      <div class="m-right">
        <div class="right_background"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Comment from "../comment/comment.vue";
export default {
  data() {
    return {
      flag: true,
      more: "详情",
      //请求电台节目参数
      djDetInfo: {
        rid: 0,
        offset: 0,
      },
      //user
      user: {},
    };
  },
  mounted() {
    // 获取电台详情
    // this.$store.dispatch("getDjDetail", this.$route.params.id);
    //获取电台节目列表
    this.djDetInfo.rid = this.$route.params.id;
    this.$store.dispatch("getDjDet", this.djDetInfo);
  },
  components: {
    Comment,
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
    //点击播放电台节目
    playDjSong(id) {
      this.$store.dispatch("getSongAsg", id);
      // this.$store.dispatch("getDjDet", this.djDetInfo);
    },
    //下一页
    nextPage(num) {
      this.djDetInfo.offset = (num - 1) * 30;
      this.$store.dispatch("getDjDet", this.djDetInfo);
    },
    //上一页
    prevPage(num) {
      this.djDetInfo.offset = (num - 1) * 30;
      this.$store.dispatch("getDjDet", this.djDetInfo);
    },
    //点击当前页
    currentPage(num) {
      this.djDetInfo.offset = (num - 1) * 30;
      this.$store.dispatch("getDjDet", this.djDetInfo);
    },
    //点击跳转电台节目详情
    goDjSumit(id) {
      this.$router.push({
        path: `/djshow/${id}`,
      });
      this.$store.dispatch("getDjSubmit", id);
    },
  },
  computed: {
    ...mapState(["djDetail", "djDet"]),
    djDetailTop: function () {
      let object = {};
      if (Object.keys(this.djDetail).length > 0) {
        object.name = this.djDetail.data.name;
        object.id = this.djDetail.data.id;
        object.picUrl = this.djDetail.data.picUrl;
        object.desc = this.djDetail.data.desc;
        object.subCount = this.djDetail.data.subCount;
        object.shareCount = this.djDetail.data.shareCount;
        object.nickname = this.djDetail.data.dj.nickname;
        object.avatarUrl = this.djDetail.data.dj.avatarUrl;
        return object;
      }
    },
    djDetList: function () {
      let arr;
      if (Object.keys(this.djDet).length > 0) {
        arr = this.djDet.programs.map((item, index) => {
          let audioId = item.id;
          let id = item.mainSong.id;
          let name = item.mainSong.name;
          let listenerCount = item.listenerCount;
          let likedCount = item.likedCount;
          let createTime = item.createTime;
          let duration = item.duration;
          let serialNum = item.serialNum;
          return {
            id,
            name,
            listenerCount,
            likedCount,
            createTime,
            duration,
            serialNum,
            audioId,
          };
        });
        return arr;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.m-left {
  float: left;
  zoom: 1;
  width: 689px;
  padding: 20px 20px 40px;
  border-right: 1px solid #d3d3d3;

  .playDetail {
    width: 410px;

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
      margin-top: 10px;
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

        line-height: 31px;
        color: #333333;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        margin-left: 2px;
        background: #fcfcfc;

        &:nth-child(1) {
          background: url("./img/button2.png") 0 -2516px;
        }
        &:nth-child(2) {
          background: url("./img/button2.png") 0 -2680px;
        }
        &:nth-child(3) {
          background: url("./img/button2.png") 0 -1225px;
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

    .description {
      margin-top: 20px;
      color: #666666;
      .title {
        white-space: pre-wrap;
        overflow: hidden;
        word-break: break-all;
        word-wrap: break-word;
        text-overflow: ellipsis;
        height: 98px;
      }

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

    .songTableBody {
      ul {
        border-top: 2px solid #c20c0c;
        li {
          height: 55px;
          display: flex;
          background: #ffffff;
          align-items: center;
          color: #999999;
          &:nth-child(even) {
            background: #f7f7f7;
          }
          &:hover {
            background: #e6e6e6;
          }

          .number {
            width: 28px;
            margin-left: 20px;
            font-size: 12px;
            font-weight: 600;
          }
          a {
            i {
              display: inline-block;
              width: 19px;
              height: 19px;
              background: url("./img/index.png") -266px -266px;
              padding-right: 10px;
              &:hover {
                background: url("./img/index.png") -266px -286px;
              }
            }
          }

          .name {
            color: #333333;
            width: 240px;
            margin-left: 20px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding: 0 10px;
          }
          .playCount {
            width: 100px;
          }
          .goodCount {
            width: 80px;
            padding: 0 10px;
          }
          .songTime {
            width: 86px;
            padding: 0 10px;
          }
        }
      }
    }
  }
}

.m-right {
  .right_background {
    width: 250px;
    height: 780px;
    background: url("./img/Snipaste_2022-08-11_16-30-05.png") no-repeat;
  }
}
.page {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}
</style>