<template>
  <main class="radio">
    <div class="radio-body">
      <div class="radio-wrap">
        <div class="top-wrap">
          <div class="radio-station clearFix">
            <ul class="radio-01">
              <li
                v-for="(item, index) in audioCatList"
                :key="item.id"
                @click="selectAudio(item.id)"
              >
                <a href="javascript:;" class="radio-icon">
                  <div
                    :class="item.id == djInfo.id ? 'r-bg active_bg' : 'r-bg'"
                    :style="{
                      background: 'url(' + item.picWebUrl + ') ',
                    }"
                  ></div>
                  <span :class="item.id == djInfo.id ? 'active_font' : ''">{{
                    item.name
                  }}</span>
                </a>
              </li>
            </ul>
            <ul class="radio-02 clearFix">
              <li>
                <a href="javascript:;" class="radio-icon2">
                  <div class="r-bg2"></div>
                  <span>做个毛主播</span>
                </a>
              </li>
            </ul>
            <span class="left-icon"></span>
            <span class="right-icon"></span>
          </div>
          <div class="radio-page">
            <span id="one"></span>
            <span id="two"></span>
          </div>
        </div>
        <div class="radio-sec clearFix" v-if="djRadioInfo.cateId == 0">
          <section class="l-radio">
            <header class="l-r-title clearFix">
              <h3>
                <a href="javascript:;">推荐节目</a>
              </h3>
              <a href="javascript:;" class="l-more">更多&gt;</a>
            </header>
            <ul>
              <li
                class="station clearFix"
                v-for="(item2, index2) in audioProgram"
                :key="item2.id"
              >
                <a href="javascript:;" class="radio-media">
                  <img :src="item2.coverUrl" />
                  <i
                    class="radio-play"
                    @click="playMainSong(item2.mainSongId)"
                  ></i>
                </a>
                <div class="radio-info">
                  <h3>
                    <a href="javascript:;" @click="goDjSumit(item2.id)">{{
                      item2.name
                    }}</a>
                  </h3>
                  <p>
                    <a href="javascript:;" @click="goDetail(item2.radioId)">{{
                      item2.radioName
                    }}</a>
                  </p>
                </div>
                <a href="javascript:;" class="radio-tab">{{
                  item2.category
                }}</a>
              </li>
            </ul>
          </section>
          <section class="r-radio">
            <header class="l-r-title clearFix">
              <h3>
                <a href="javascript:;">节目排行榜</a>
              </h3>
              <a href="javascript:;" class="l-more">更多&gt;</a>
            </header>
            <ul>
              <li
                class="station clearFix"
                v-for="(item3, index3) in audioProgramToplist"
                :key="item3.id"
              >
                <div class="radio-rank">
                  <span class="NO1">01</span>
                  <span class="up-down"><i></i>1</span>
                </div>
                <a href="javascript:;" class="radio-media2">
                  <img :src="item3.coverUrl" />
                  <i
                    class="radio-play"
                    @click="playMainSong(item3.mainSongId)"
                  ></i>
                </a>
                <div class="radio-info2">
                  <h3>
                    <a href="javascript:;" @click="goDjSumit(item3.id)">{{
                      item3.name
                    }}</a>
                  </h3>
                  <p>
                    <a href="javascript:;" @click="goDetail(item3.radioId)">{{
                      item3.audioName
                    }}</a>
                  </p>
                </div>
                <div class="PregressBar">
                  <span>
                    <i></i>
                  </span>
                </div>
              </li>
            </ul>
          </section>
        </div>
        <div class="conter_audio" v-if="djRadioInfo.cateId !== 0">
          <div class="conter_header">
            <h3>电台排行榜</h3>
            <span>热门</span>
          </div>
          <div class="conter_center">
            <ul>
              <li v-for="(item4, index4) in audioRadio" :key="item4.id">
                <div class="left">
                  <img :src="item4.picUrl" alt="" @click="goDetail(item4.id)" />
                </div>
                <div class="right">
                  <h3>
                    <a href="javascript:;" @click="goDetail(item4.id)">{{
                      item4.name
                    }}</a>
                  </h3>
                  <p class="left_user">
                    <a href="javascript:;">{{ item4.nickname }}</a>
                  </p>
                  <p class="left_num">
                    共{{ item4.programCount }}期 订阅{{ item4.subCount }}次
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <nav class="page">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="djRadioById.count"
              @prev-click="lastPage"
              @next-click="nextPage"
              @current-change="clickPage"
            >
              <!-- @prev-click="lastPage"
                @next-click="nextPage"
                @current-change="clickPage" -->
            </el-pagination>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      //电台请求参数
      djInfo: {
        id: 0,
      },
      //电台节目榜请求参数
      djProgramInfo: {
        limit: 10,
        offset: 0,
      },
      //电台类别推荐请求参数
      djRadioInfo: {
        cateId: 0,
        limit: 30,
        offset: 0,
      },
    };
  },
  mounted() {
    //获取电台分类列表
    this.$store.dispatch("getDjCateList");
    //获取推荐节目
    this.$store.dispatch("getDjRecommend");
    //获取电台节目榜单
    this.$store.dispatch("GetDjProgramToplist", this.djProgramInfo);
  },
  methods: {
    selectAudio(id) {
      this.djInfo.id = id;
      this.djRadioInfo.cateId = id;
      this.$store.dispatch("getDjRadioById", this.djRadioInfo);
    },
    //点击播放主曲
    playMainSong(id) {
      console.log(id);
      this.$store.dispatch("getSongAsg", id);
    },
    //上一页
    lastPage(num) {
      this.djRadioInfo.offset = (num - 1) * 30;
      this.$store.dispatch("getDjRadioById", this.djRadioInfo);
    },
    // 下一页
    nextPage(num) {
      this.djRadioInfo.offset = (num - 1) * 30;
      this.$store.dispatch("getDjRadioById", this.djRadioInfo);
    },
    // 当前页
    clickPage(num) {
      this.djRadioInfo.offset = (num - 1) * 30;
      this.$store.dispatch("getDjRadioById", this.djRadioInfo);
    },
    //点击跳转详情页
    goDetail(id) {
      this.$router.push({
        path: `/djlist/${id}`,
      });
      this.$store.dispatch("getDjDetail", id);
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
    ...mapState(["djCatList", "djProgram", "djProgramToplist", "djRadioById"]),
    audioCatList: function () {
      let arr;
      if (Object.keys(this.djCatList).length > 0) {
        //整理数据
        arr = this.djCatList.categories.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let picWebUrl = item.picWebUrl;
          return { id, name, picWebUrl };
        });
        return arr;
      }
    },
    audioProgram: function () {
      let arr;
      if (Object.keys(this.djProgram).length > 0) {
        //整理数据
        console.log(this.djProgram);
        arr = this.djProgram.programs.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let coverUrl = item.coverUrl + "?param=40x40";
          let radioName = item.radio.name;
          let radioId = item.radio.id;
          let category = item.radio.category;
          let mainSongId = item.mainSong.id;
          return {
            id,
            name,
            coverUrl,
            radioName,
            radioId,
            category,
            mainSongId,
          };
        });
        return arr;
      }
    },
    audioProgramToplist: function () {
      let arr;
      if (Object.keys(this.djProgramToplist).length > 0) {
        //整理数据
        arr = this.djProgramToplist.toplist.map((item, index) => {
          let id = item.program.id;
          let name = item.program.name;
          let coverUrl = item.program.coverUrl + "?param=40x40";
          let audioName = item.program.radio.name;
          let mainSongId = item.program.mainSong.id;
          let radioId = item.program.radio.id;
          return { id, name, audioName, coverUrl, mainSongId, radioId };
        });
        return arr;
      }
    },
    audioRadio: function () {
      let arr;
      if (Object.keys(this.djRadioById).length > 0) {
        //整理数据
        arr = this.djRadioById.djRadios.map((item, index) => {
          let id = item.id;
          let name = item.name;
          let nickname = item.dj.nickname;
          let programCount = item.programCount;
          let subCount = item.subCount;
          let picUrl = item.picUrl + "?param=120x120";
          let category = item.category;
          return {
            id,
            name,
            picUrl,
            category,
            nickname,
            programCount,
            subCount,
          };
        });
        return arr;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.radio {
  background: #f5f5f5;
}
.radio-body {
  width: 980px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-bottom: none;
  background: #fff;
}
.radio-wrap {
  padding: 40px;
}
.top-wrap {
  position: relative;
}
.radio-station {
  height: 194px;
  overflow: hidden;
}
.radio-station ul {
  margin-left: -33px;
}
.radio-station ul li {
  float: left;
  margin: 0px 0px 25px 33px;
}
.radio-icon {
  display: block;
  width: 70px;
  height: 70px;
  text-align: center;
  color: #c0c0c0;
}
.radio-icon2 {
  display: block;
  width: 70px;
  height: 70px;
  text-align: center;
  color: rgb(90, 181, 231);
}
.r-bg {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/radio01.png) no-repeat 0 0;
}
.r-bg02 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/02.jpg) no-repeat -48px 0;
}
.r-bg03 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/03.jpg) no-repeat -48px 0;
}
.r-bg04 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/04.jpg) no-repeat 0 0;
}
.r-bg05 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/05.jpg) no-repeat 0 0;
}
.r-bg06 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/06.jpg) no-repeat 0 0;
}
.r-bg07 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/07.jpg) no-repeat 0 0;
}
.r-bg08 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/08.jpg) no-repeat 0 0;
}
.r-bg09 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/09.jpg) no-repeat 0 0;
}
.r-bg10 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/10.jpg) no-repeat 0 0;
}
.r-bg11 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/11.jpg) no-repeat 0 0;
}
.r-bg12 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/12.jpg) no-repeat 0 0;
}
.r-bg13 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/13.jpg) no-repeat 0 0;
}
.r-bg14 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/14.jpg) no-repeat 0 0;
}
.r-bg15 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/15.jpg) no-repeat 0 0;
}
.r-bg16 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/16.jpg) no-repeat 0 0;
}
.r-bg17 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/17.jpg) no-repeat 0 0;
}
.r-bg18 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/18.jpg) no-repeat 0 0;
}
.r-bg2 {
  width: 48px;
  height: 48px;
  margin: 2px auto 0px;
  background: url(./img/radio_apply.png) no-repeat 0 0;
}
.active_bg {
  background-position-x: -48px !important;
}
.active_font {
  color: #ff3a3a;
}
.left-icon {
  position: absolute;
  left: -26px;
  top: 50%;
  width: 20px;
  height: 30px;
  margin-top: -15px;
  opacity: 0.5;
  background: url(./img/radio_slide.png) no-repeat 0 -30px;
}
.right-icon {
  position: absolute;
  right: -26px;
  top: 50%;
  width: 20px;
  height: 30px;
  margin-top: -15px;
  opacity: 0.5;
  background: url(./img/radio_slide.png) no-repeat -30px -30px;
}
.radio-page {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 20px;
  font-size: 0;
  text-align: center;
}
#one {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  background: url(./img/radio_slide.png) no-repeat -30px 0px;
}
#two {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  background: url(./img/radio_slide.png) no-repeat 0px 0px;
}
.radio-sec {
  margin-top: 10px;
}
.l-radio {
  float: left;
  width: 426px;
}
.l-r-title {
  height: 40px;
  border-bottom: 2px solid #c20c0c;
}
.l-r-title h3 {
  float: left;
  font-size: 24px;
}
.l-r-title h3 a {
  color: #333;
}
.l-more {
  float: right;
  margin-top: 14px;
  color: #666;
}
.radio-sec ul {
  border: 1px solid #e2e2e2;
  border-top: none;
}
.station {
  height: 40px;
  line-height: 40px;
  padding: 10px 0px;
}
.radio-media {
  float: left;
  position: relative;
  width: 40px;
  height: 40px;
  margin-left: 20px;
}
.radio-media i {
  display: none;
  position: absolute;
  width: 22px;
  height: 22px;
  top: 50%;
  left: 50%;
  margin: -11px 0 0 -11px;
  background: url(./img/index02.png) no-repeat 0 -85px;
}
.station:hover .radio-play {
  display: block;
}
.radio-info {
  float: left;
  width: 254px;
  margin: 1px 0 0 10px;
  line-height: 20px;
}
.radio-info h3 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.radio-info h3 a {
  color: #333;
}
.radio-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.radio-info p a {
  color: #999;
}
.radio-tab {
  float: left;
  margin: 8px 0 0 10px;
  height: 16px;
  overflow: hidden;
  padding: 0 6px;
  border: 1px solid #999;
  line-height: 16px;
  color: #999;
}
.radio-tab:hover {
  border-color: #666;
  color: #666;
  text-decoration: none;
}
.r-radio {
  float: right;
  width: 426px;
}
.radio-rank {
  float: left;
  width: 47px;
  margin: 6px 0 0 0;
  text-align: center;
}
.NO1 {
  display: block;
  font: 14px/1 arial;
  text-align: center;
  color: #da4545;
}
.up-down {
  display: block;
  color: #ba2226;
  line-height: normal;
  font: 10px/1 arial;
}
.up-down i {
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  width: 6px;
  height: 6px;
  margin: -1px 2px 0 0;
  background: url(./img/icon.png) no-repeat -74px -304px;
}
.radio-media2 {
  float: left;
  position: relative;
  width: 40px;
  height: 40px;
  margin-left: 0;
}
.radio-media2 i {
  display: none;
  position: absolute;
  width: 22px;
  height: 22px;
  top: 50%;
  left: 50%;
  margin: -11px 0 0 -11px;
  background: url(./img/index02.png) no-repeat 0 -85px;
}
.radio-info2 {
  float: left;
  width: 208px;
  margin: 1px 0 0 10px;
  line-height: 20px;
}
.radio-info2 h3 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.radio-info2 h3 a {
  color: #333;
}
.radio-info2 p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.radio-info2 p a {
  color: #999;
}
.PregressBar {
  float: left;
  position: relative;
  width: 100px;
  height: 8px;
  margin-top: 16px;
  background: url(./img/table.png) no-repeat 0 -240px;
}
.PregressBar span {
  display: block;
  width: 37%;
  padding: 0 4px;
  background: url(./img/table.png) no-repeat right -318px;
  height: 8px;
}
.PregressBar span i {
  display: block;
  margin-left: -4px;
  padding-left: 4px;
  height: 8px;
  background: url(./img/table.png) no-repeat 0 -304px;
}

//排行榜
.conter_audio {
  .conter_header {
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid #c20c0c;
    margin-top: 10px;
    h3 {
      color: #333333;
      font-size: 24px;
      margin-bottom: 10px;
    }
    span {
      color: #c20c0c;
      font-size: 12px;
      margin-top: 5px;
    }
  }

  .conter_center {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-top: 20px;
        width: 435px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e2e2e2;
        padding-bottom: 20px;
        margin-left: 15px;
        .right {
          margin-left: 20px;
          h3 {
            font-size: 18px;

            a {
              font-weight: 600;
              color: #333333;
            }
          }

          .left_user {
            margin: 20px 0px 10px 0;
            a {
              color: #333333;
            }
          }
          .left_num {
            color: #999999;
          }
        }
      }
    }
  }
  .page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>