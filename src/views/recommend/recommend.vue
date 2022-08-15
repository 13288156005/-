<template>
  <div>
    <Banner></Banner>
    <main class="main">
      <div class="m-wrap">
        <div class="m-left">
          <section>
            <header class="h-title">
              <h2><a href="javascript:;">热门推荐</a></h2>
              <nav class="h-list">
                <a href="javascript:;">华语</a>
                <span class="line">|</span>
                <a href="javascript:;">流行</a>
                <span class="line">|</span>
                <a href="javascript:;">摇滚</a>
                <span class="line">|</span>
                <a href="javascript:;">民谣</a>
                <span class="line">|</span>
                <a href="javascript:;">电子</a>
              </nav>
              <span class="more"
                ><router-link to="/sheet" href="javascript:;">更多</router-link
                ><i>&nbsp;</i></span
              >
            </header>
            <ul class="h-music clearFix">
              <li
                v-for="(item, index) in hotList"
                :key="item.id"
                @click="goPlayList(item.id)"
              >
                <div class="h-img">
                  <a href="javascript:;">
                    <img :src="item.picUrl" />
                    <span class="bg"></span>
                    <span class="icon"></span>
                    <span class="txt">{{ item.playCount }}</span>
                  </a>
                  <a href="javascript:;" class="play" title="播放"></a>
                </div>
                <p>
                  <a href="javascript:;">{{ item.name }}</a>
                </p>
              </li>
            </ul>
          </section>
          <div id="m-banner">
            <a href="javascript:;">
              <img src="./img/m-banner.jpg" />
            </a>
          </div>

          <!-- 精品推荐 -->
          <section>
            <header class="h-title">
              <h2><a href="javascript:;">精品推荐</a></h2>
              <span class="more"
                ><a href="javascript:;">更多</a><i>&nbsp;</i></span
              >
            </header>
            <div class="disk clearFix">
              <div class="dd-list">
                <!-- 轮播图 -->
                <div class="swiper">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <ul class="clearFix">
                        <!-- 歌单 -->
                        <li
                          class="d-disk"
                          v-for="(goodlist, index) in page1GoodSingList"
                          :key="goodlist.id"
                          @click="goPlayList(goodlist.id)"
                        >
                          <div class="dd-img">
                            <img :src="goodlist.coverImgUrl" />
                            <a href="javascript:;" class="p-disk"></a>
                            <a href="javascript:;" class="diskplay"></a>
                          </div>
                          <p>
                            <a href="javascript:;">{{ goodlist.name }}</a>
                          </p>
                          <p class="singer">
                            <a href="javascript:;">{{ goodlist.tag }}</a>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div class="swiper-slide">
                      <!-- 歌单 -->
                      <ul class="clearFix">
                        <li
                          class="d-disk"
                          v-for="(goodlist1, index) in page2GoodSingList"
                          :key="goodlist1.id"
                          @click="goPlayList(goodlist1.id)"
                        >
                          <div class="dd-img">
                            <img :src="goodlist1.coverImgUrl" />
                            <a href="javascript:;" class="p-disk"></a>
                            <a href="javascript:;" class="diskplay"></a>
                          </div>
                          <p>
                            <a href="javascript:;">{{ goodlist1.name }}</a>
                          </p>
                          <p class="singer">
                            <a href="javascript:;">{{ goodlist1.tag }}</a>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- 如果需要分页器 -->
                  <div class="swiper-pagination"></div>

                  <!-- 如果需要导航按钮 -->
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>

                  <!-- 如果需要滚动条 -->
                  <div class="swiper-scrollbar"></div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <header class="h-title">
              <h2><a href="javascript:;">榜单</a></h2>
              <span class="more"
                ><router-link to="/ranking" href="javascript:;"
                  >更多</router-link
                ><i>&nbsp;</i></span
              >
            </header>
            <div class="n-list clearFix">
              <!-- 榜单排名 -->
              <dl class="sec">
                <dt class="top">
                  <div class="l-img">
                    <img src="./img/list/2.jpg" />
                    <a href="javascript:;" class="msk"></a>
                  </div>
                  <div class="titl">
                    <h3 class="l-title">
                      <a href="javascript:;">云音乐飙升榜</a>
                    </h3>
                    <div class="btn">
                      <a href="javascript:;" class="l-play">播放</a>
                      <a href="javascript:;" class="l-collection">收藏</a>
                    </div>
                  </div>
                </dt>
                <dd>
                  <!-- 前10排名 -->
                  <ol>
                    <li
                      v-for="(item, index) in billboardList.bsb"
                      :key="item.id"
                      @click.stop="playMusic(item.id)"
                    >
                      <span :class="index < 3 ? 'numb' : null" class="num">{{
                        index + 1
                      }}</span>
                      <a href="javascript:;" class="song">{{ item.name }}</a>
                      <nav class="p-list">
                        <a href="javascript:;" class="p-play"></a>
                        <a href="javascript:;" class="P-add"></a>
                        <a href="javascript:;" class="p-collection"></a>
                      </nav>
                    </li>
                  </ol>
                  <div class="s-all">
                    <a href="javascript:;">查看全部&gt;</a>
                  </div>
                </dd>
              </dl>
              <dl class="sec">
                <dt class="top">
                  <div class="l-img">
                    <img src="./img/list/1.jpg" />
                    <a href="javascript:;" class="msk"></a>
                  </div>
                  <div class="titl">
                    <h3 class="l-title">
                      <a href="javascript:;">云音乐新歌榜</a>
                    </h3>
                    <div class="btn">
                      <a href="javascript:;" class="l-play">播放</a>
                      <a href="javascript:;" class="l-collection">收藏</a>
                    </div>
                  </div>
                </dt>
                <dd>
                  <ol>
                    <li
                      v-for="(item2, index) in billboardList.xgb"
                      :key="item2.id"
                      @click.stop="playMusic(item2.id)"
                    >
                      <span :class="index < 3 ? 'numb' : null" class="num">{{
                        index + 1
                      }}</span>
                      <a href="javascript:;" class="song">{{ item2.name }}</a>
                      <nav class="p-list">
                        <a href="javascript:;" class="p-play"></a>
                        <a href="javascript:;" class="P-add"></a>
                        <a href="javascript:;" class="p-collection"></a>
                      </nav>
                    </li>
                  </ol>
                  <div class="s-all">
                    <a href="javascript:;">查看全部&gt;</a>
                  </div>
                </dd>
              </dl>
              <dl class="sec sec2">
                <dt class="top">
                  <div class="l-img">
                    <img src="./img/list/3.jpg" />
                    <a href="javascript:;" class="msk"></a>
                  </div>
                  <div class="titl">
                    <h3 class="l-title">
                      <a href="javascript:;">网易原创歌曲榜</a>
                    </h3>
                    <div class="btn">
                      <a href="javascript:;" class="l-play">播放</a>
                      <a href="javascript:;" class="l-collection">收藏</a>
                    </div>
                  </div>
                </dt>
                <dd>
                  <ol>
                    <li
                      v-for="(item3, index) in billboardList.ycb"
                      :key="item3.id"
                      @click.stop="playMusic(item3.id)"
                    >
                      <span :class="index < 3 ? 'numb' : null" class="num">{{
                        index + 1
                      }}</span>
                      <a href="javascript:;" class="song">{{ item3.name }}</a>
                      <nav class="p-list">
                        <a href="javascript:;" class="p-play"></a>
                        <a href="javascript:;" class="P-add"></a>
                        <a href="javascript:;" class="p-collection"></a>
                      </nav>
                    </li>
                  </ol>
                  <div class="s-all">
                    <a href="javascript:;">查看全部&gt;</a>
                  </div>
                </dd>
              </dl>
            </div>
          </section>
        </div>
        <div class="m-right">
          <div class="tab">
            <div class="user" v-if="!ifPlag">
              <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
              <a href="javascript:;">用户登录</a>
            </div>
            <Login v-if="ifPlag"></Login>
            <section class="m-singer">
              <h3>
                <p>入驻歌手</p>
                <a href="javascript:;">查看更多&gt;</a>
              </h3>
              <ul class="clearFix">
                <li v-for="(hotArt, index) in hotArtists" :key="index">
                  <a href="javascript:;">
                    <div class="s-photo">
                      <img :src="hotArt.picUrl" class="imgSize" />
                    </div>
                    <div class="s-info">
                      <h4>{{ hotArt.name }}</h4>
                      <p>{{ hotArt.alias[0] }}</p>
                    </div>
                  </a>
                </li>
              </ul>
              <div class="apply">
                <a href="javascript:;">
                  <span>申请成为网易音乐人</span>
                </a>
              </div>
            </section>
            <section class="hotdj">
              <h3>热门DJ</h3>
              <ul class="hot-dj-er clearFix">
                <li>
                  <a href="javascript:;" class="d-img">
                    <img src="./img/singer/dj.jpg" />
                  </a>
                  <div class="d-info">
                    <p>
                      <a href="javascript:;" class="dj">陈立</a>
                      <i class="h-icon"></i>
                    </p>
                    <p>心理学家、美食家陈立教授</p>
                  </div>
                </li>
                <li>
                  <a href="javascript:;" class="d-img">
                    <img src="./img/singer/dj2.jpg" />
                  </a>
                  <div class="d-info">
                    <p>
                      <a href="javascript:;" class="dj">DJ艳秋</a>
                      <i class="h-icon"></i>
                    </p>
                    <p>著名音乐节目主持人</p>
                  </div>
                </li>
                <li>
                  <a href="javascript:;" class="d-img">
                    <img src="./img/singer/dj3.jpg" />
                  </a>
                  <div class="d-info">
                    <p>
                      <a href="javascript:;" class="dj"
                        >国家大剧院古典音乐频道</a
                      >
                      <i class="h-icon"></i>
                    </p>
                    <p>国家大剧院古典音乐官方</p>
                  </div>
                </li>
                <li>
                  <a href="javascript:;" class="d-img">
                    <img src="./img/singer/dj4.jpg" />
                  </a>
                  <div class="d-info">
                    <p>
                      <a href="javascript:;" class="dj">谢谢收听</a>
                      <i class="h-icon"></i>
                    </p>
                    <p>南京电台主持人王馨</p>
                  </div>
                </li>
                <li>
                  <a href="javascript:;" class="d-img">
                    <img src="./img/singer/dj5.jpg" />
                  </a>
                  <div class="d-info">
                    <p>
                      <a href="javascript:;" class="dj">DJ晓苏</a>
                      <i class="h-icon"></i>
                    </p>
                    <p>独立DJ，CRI环球旅游广播特邀DJ</p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Banner from "@/views/recommend/banner.vue";
import Login from "@/views/recommend/login.vue";
import { reqHotList, reqBillboardList, reqGoodSingList } from "@/api/index.js";
import { mapState } from "vuex";
import Swiper from "swiper";
export default {
  data() {
    return {
      // 热门推荐的表单列表
      hotList: [],
      //获取榜单数据
      billboardList: {
        bsb: [],
        xgb: [],
        ycb: [],
      },
      //获取精品歌单
      goodSingList: [],
      page1GoodSingList: [],
      page2GoodSingList: [],
    };
  },
  components: {
    Banner: Banner,
    Login: Login,
  },
  mounted() {
    //获取热门推荐的表单数据
    this.getHotList();
    //获取榜单数据列表
    this.getBillboardList();
    //获取精品歌单列表
    this.getGoodSingList();
    this.guaNewSwipaper();
    //获取热门歌手
    this.getHotArtists();
  },
  methods: {
    guaNewSwipaper() {
      var mySwiper = new Swiper(".swiper", {
        autoplay: true, //可选选项，自动滑动
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
    //获取热门推荐的表单数据
    async getHotList() {
      //发起ajax请求获取热门推荐列表数据
      const result = await reqHotList();
      if (result.data.code !== 200) {
        this.$message.error("获取热门推荐表单失败");
        return;
      }
      this.hotList = result.data.result;
    },

    //获取榜单数据列表
    async getBillboardList() {
      //发起ajax请求获取榜单数据列表
      const id = {
        id1: 19723756,
        id2: 3779629,
        id3: 2884035,
      };
      const result1 = await reqBillboardList(id.id1);
      const result2 = await reqBillboardList(id.id2);
      const result3 = await reqBillboardList(id.id3);

      //整理数据
      this.billboardList.bsb = result1.data.playlist.tracks;
      this.billboardList.xgb = result2.data.playlist.tracks;
      this.billboardList.ycb = result3.data.playlist.tracks;

      //切割数据成10条数据(整理数据)
      this.billboardList.bsb = this.billboardList.bsb.splice(0, 10);
      this.billboardList.xgb = this.billboardList.xgb.splice(0, 10);
      this.billboardList.ycb = this.billboardList.ycb.splice(0, 10);
    },

    //获取精品歌单列表
    async getGoodSingList() {
      const result = await reqGoodSingList();
      this.goodSingList = result.data.playlists;
      this.page1GoodSingList = this.goodSingList.slice(0, 5);
      this.page2GoodSingList = this.goodSingList.slice(5, 10);
    },

    //获取热门歌手
    getHotArtists() {
      this.$store.dispatch("getHotArtists");
    },
    //点击榜单播放音乐
    playMusic(id) {
      this.$store.dispatch("getSongAsg", id);
    },
    //点击去歌单
    goPlayList(id) {
      this.$router.push({ path: `/playlist/${id}` });
    },
  },
  watch: {},
  computed: {
    //判断用户是否存在
    ifPlag() {
      if (localStorage.getItem("userName") || this.$store.state.cookie) {
        return true;
      } else {
        return false;
      }
    },
    //从vuex获取热门歌手
    ...mapState({
      hotArtists: (state) => state.hotArtists,
    }),
  },
};
</script>

<style>
/* css.css */
body,
h1,
h2,
h3,
p {
  margin: 0;
}
a {
  text-decoration: none;
}
img {
  vertical-align: top;
  border: none;
}
dl,
dt,
dd {
  margin: 0;
  padding: 0;
}
ul,
ol {
  padding: 0;
  margin: 0;
  list-style: none;
}
.clearFix:after {
  content: "";
  display: block;
  clear: both;
}
.clearFix {
  zoom: 1;
}
.h-title,
.more i {
  background: url(././img/index01.png) no-repeat;
}
.icon,
.play {
  background: url(././img/index02.png) no-repeat;
}
.h-title {
  height: 33px;
  padding: 0 10px 0 34px;
  background-position: -225px -156px;
  border-bottom: 2px solid #c10d0c;
}
.h-title h2 {
  float: left;
  zoom: 1;
  font-size: 20px;
  line-height: 28px;
}
.h-title h2 a {
  color: #333;
}
.h-title .h-list {
  float: left;
  zoom: 1;
  margin: 7px 0 0 20px;
}
.h-title .h-list a {
  color: #666;
}
.h-title .h-list .line {
  margin: 0 10px;
  color: #ccc;
}
.more {
  float: right;
  zoom: 1;
  margin-top: 9px;
}
.more a {
  color: #666;
}
.more i {
  background-position: 0 -240px;
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 4px;
  vertical-align: middle;
}
.h-music {
  margin: 20px 0 0 -42px;
}
.h-music li {
  float: left;
  zoom: 1;
  width: 140px;
  height: 204px;
  padding: 0 0 0 42px;
}
.h-img {
  width: 140px;
  height: 140px;
  position: relative;
}
.h-img img {
  width: 140px;
  height: 140px;
}
.h-img .bg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 140px;
  height: 27px;
  background: #000;
  opacity: 0.4;
}
.h-img .icon {
  position: absolute;
  left: 10px;
  bottom: 7px;
  width: 14px;
  height: 11px;
  background-position-y: -24px;
}
.h-img .txt {
  position: absolute;
  left: 29px;
  bottom: 4px;
  color: #ccc;
}
.h-img .play {
  position: absolute;
  right: 10px;
  bottom: 5px;
  width: 16px;
  height: 17px;
  background-position: 0 0;
}
.h-music li p {
  margin: 8px 0 3px;
  font-size: 14px;
}
.h-music p a {
  color: #000;
}
.djvideo {
  display: inline-block;
  margin-right: 3px;
  width: 35px;
  height: 15px;
  background: url(././img/icon.png) no-repeat -31px -658px;
}
.disk {
  position: relative;
  height: 186px;
  margin: 20px 0 37px;
  border: 1px solid #d3d3d3;
  background: #f5f5f5;
}
.disk .tit {
  position: absolute;
  float: left;
  zoom: 1;
  top: 71px;
  width: 17px;
  height: 17px;
}
.disk .titL {
  left: 4px;
  background: url(././img/index01.png) no-repeat -260px -75px;
}
.disk .titR {
  right: 4px;
  background: url(././img/index01.png) no-repeat -300px -75px;
}
.dd-list {
  float: left;
  zoom: 1;
  width: 645px;
  height: 180px;
  margin: 0 0 0 11px;
  overflow: hidden;
}
.dd-list ul {
  width: 645px;
  margin: 28px 0 0 0;
}
.dd-list ul li {
  float: left;
  zoom: 1;
  width: 118px;
  height: 150px;
  margin-left: 11px;
}
.dd-img {
  position: relative;
  margin-bottom: 7px;
}
.dd-img img {
  width: 100px;
  height: 100px;
}
.dd-img .p-disk {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 118px;
  height: 100px;
  background: url(././img/disk.png) no-repeat 0 -570px;
}
.diskplay {
  position: absolute;
  display: none;
  left: 72px;
  bottom: 5px;
  width: 22px;
  height: 22px;
  background: url(././img/index02.png) no-repeat 0 -85px;
}
li:hover .diskplay {
  display: block;
}
.dd-list .d-disk p {
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.d-disk p a {
  color: #333;
}
.d-disk .singer a {
  color: #666;
}
.n-list {
  height: 472px;
  margin-top: 20px;
  padding-left: 1px;
  background: url(././img/listbg.png) no-repeat;
}
.sec {
  zoom: 1;
  float: left;
  width: 230px;
}
.sec2 {
  width: 228px;
}
.top {
  height: 100px;
  padding: 20px 0 0 19px;
}
.l-img {
  zoom: 1;
  float: left;
  position: relative;
}
.l-img img {
  width: 80px;
  height: 80px;
}
.msk {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 80px;
  background: url(././img/disk.png) no-repeat -145px -57px;
}
.titl {
  zoom: 1;
  float: left;
  width: 116px;
  margin: 6px 0 0 10px;
}
.l-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.l-title a {
  color: #333;
}
.btn {
  margin-top: 10px;
}
.l-play {
  zoom: 1;
  display: block;
  float: left;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  text-indent: -9999px;
  background: url(././img/index01.png) no-repeat -267px -205px;
}
.l-collection {
  zoom: 1;
  display: block;
  float: left;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  text-indent: -9999px;
  background: url(././img/index01.png) no-repeat -300px -205px;
}
.sec ol {
  margin-left: 50px;
  line-height: 32px;
}
.sec ol li {
  height: 32px;
  /*overflow: hidden;
	text-overflow: ellipsis;
    white-space: nowrap;*/
}
.num {
  zoom: 1;
  float: left;
  width: 35px;
  height: 32px;
  margin-left: -35px;
  text-align: center;
  color: #666;
  font-size: 16px;
}
.numb {
  color: #c10d0c;
}
.song {
  zoom: 1;
  float: left;
  width: 170px;
  height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;
}
.p-list {
  zoom: 1;
  display: none;
  float: right;
  width: 82px;
  margin-top: 7px;
}
.p-play {
  zoom: 1;
  float: left;
  width: 17px;
  height: 17px;
  margin-right: 10px;
  background: url(././img/index01.png) no-repeat -267px -268px;
}
.P-add {
  zoom: 1;
  float: left;
  width: 17px;
  height: 17px;
  margin: 2px 6px 0 0;
  background: url(././img/icon.png) no-repeat 0 -700px;
}
.p-collection {
  zoom: 1;
  float: left;
  width: 17px;
  height: 17px;
  margin-right: 10px;
  background: url(././img/index01.png) no-repeat -297px -268px;
}
.s-all {
  zoom: 1;
  margin-right: 32px;
  text-align: right;
  line-height: 32px;
}
.s-all a {
  color: #333;
}
.sec ol li:hover .song {
  width: 96px;
  text-decoration: underline;
}
.sec ol li:hover .p-list {
  display: block;
}

/* index: .css */
body {
  font-size: 12px;
  color: #333;
  font-family: Arial, Helvetica, sans-serif, "微软雅黑";
}

.fl {
  float: left;
  zoom: 1;
}

.fr {
  float: right;
  zoom: 1;
}

a:hover {
  text-decoration: underline;
}

.h-top {
  width: 100%;
  overflow: hidden;
}

.t-top {
  height: 70px;
  background: url(././img/topbar.png) repeat-x 0 -80px;
}

.t-wrap {
  width: 1100px;
  height: 70px;
  margin: 0 auto;
}

.logo {
  width: 176px;
}

.logo a {
  width: 157px;
  height: 33px;
  padding: 22px 20px 0 0;
  background: url(././img/topbar.png) no-repeat 0 15px;
  text-indent: -9999px;
}

.top-nav {
  height: 70px;
}

.top-nav a {
  float: left;
  zoom: 1;
  padding-left: 2px;
  font-size: 14px;
  line-height: 70px;
  color: #ccc;
  background: url(././img/topbar.png) no-repeat left -300px;
}

.top-nav a:hover {
  background-position: left -470px;
}

.top-nav a span {
  float: left;
  zoom: 1;
  padding: 0 20px 0 18px;
  background: url(././img/topbar.png) no-repeat right -300px;
}

.cor {
  display: none;
  position: absolute;
  left: 50%;
  top: 63px;
  width: 14px;
  height: 9px;
  margin-left: -7px;
  background: url(././img/topbar.png) no-repeat -226px 0;
}

.top-nav .active {
  position: relative;
  margin: 0 -1px;
  background-position: left -155px;
}

.top-nav .active span {
  padding: 0 21px 0 19px;
  background-position: right -155px;
}

.top-nav .active .cor {
  display: block;
}

.top-nav .last {
  position: relative;
}

.top-nav .last span {
  background: none;
  padding-right: 40px;
}

.top-nav .last .hot {
  position: absolute;
  top: 20px;
  left: 90px;
  width: 28px;
  height: 19px;
  background: url(././img/topbar.png) no-repeat -190px 0;
}

.search {
  margin-top: 21px;
  width: 210px;
  height: 31px;
  background: url(././img/topbar.png) no-repeat 0 -550px;
}

.search input {
  background: none;
  border: none;
  margin: 8px 0 0 33px;
  width: 170px;
  font: 12px/1 "微软雅黑";
  color: #9b9b9b;
}

.landing {
  position: relative;
  height: 45px;
  margin: 21px 0 0 19px;
  padding: 0 22px 0 0;
  background: url(././img/topbar.png) no-repeat right -366px;
}

.landing .link {
  width: 28px;
  margin-top: 10px;
  color: #787878;
}

.landing:hover {
  background-position: right -405px;
}

.landing:hover .link {
  color: #999;
}

.landing:hover .down-tab {
  display: block;
}

.down-tab {
  display: none;
  position: absolute;
  top: 38px;
  right: -43px;
  width: 158px;
  border: 1px solid #000;
  border-radius: 4px;
  background: #2a2a2a;
  z-index: 9999;
}

.d-list li {
  float: left;
  zoom: 1;
}

.d-list li a {
  float: left;
  zoom: 1;
  width: 132px;
  height: 38px;
  padding-left: 24px;
  overflow: hidden;
  color: #ccc;
  line-height: 39px;
}

.d-list li a:hover {
  color: #fff;
  background: #353535;
}

.d-icon {
  float: left;
  zoom: 1;
  width: 18px;
  height: 18px;
  margin: 10px 10px 0 -7px;
  background: url(././img/toplist.png) no-repeat 0 9999px;
}

.d-icon1 {
  background-position: 0 0;
}

.d-icon2 {
  background-position: -20px -20px;
}

.d-icon3 {
  background-position: -20px -40px;
}

.d-icon4 {
  background-position: 0 -20px;
}

.d-icon5 {
  background-position: 0 -40px;
}

.n-nav {
  height: 35px;
  background: url(././img/topbar.png) repeat-x 0 -230px;
}

.n-wrap {
  width: 911px;
  padding-left: 168px;
  margin: 0 auto;
}

.nav {
  height: 35px;
  overflow: hidden;
}

.nav a {
  float: left;
  zoom: 1;
  margin: 0 17px;
  padding: 0 0 0 14px;
  line-height: 37px;
  color: #fff;
  overflow: hidden;
}

.nav a span {
  float: left;
  padding: 0 14px 0 0;
}

.nav a:hover,
.nav .n-active {
  background: url(././img/topbar.png) no-repeat left -268px;
}

.nav a:hover span,
.nav .n-active span {
  background: url(././img/topbar.png) no-repeat right -268px;
}

.bottom {
  height: 140px;
  overflow: hidden;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
}

.f-footer {
  width: 980px;
  margin: 0 auto;
}

.f-left {
  width: 490px;
  padding-top: 35px;
  line-height: 24px;
  color: #666;
}

.f-left nav a {
  color: #999;
}

.f-left nav .line {
  margin: 0 8px 0 10px;
  color: #c2c2c2;
}

.company {
  margin-left: 14px;
}

.company a {
  color: #666;
}

.f-right {
  width: 330px;
  margin-top: 21px;
}

.f-right li {
  float: left;
  zoom: 1;
  margin-left: 30px;
}

.f-right li a {
  float: left;
  zoom: 1;
  width: 60px;
  height: 70px;
  color: #999;
  font-size: 0;
}

.f-right .f-musicia {
  margin: 0;
}

.f-logo {
  background: url(././img/foot_enter.png) no-repeat -60px -80px;
}

.f-logo2 {
  background-position: 0 -80px;
}

.f-logo3 {
  background-position: 0 0px;
}

.f-logo4 {
  background-position: -60px 0px;
}

.main {
  overflow: hidden;
  background: #f2f2f2;
}

.m-wrap {
  overflow: hidden;
  margin: 0 auto;
  width: 980px;
  border: 1px solid #d3d3d3;
  border-bottom: none;
  background: #fff;
}

.m-left {
  float: left;
  zoom: 1;
  width: 689px;
  padding: 20px 20px 40px;
  border-right: 1px solid #d3d3d3;
}

.m-right {
  float: right;
}

.tab {
  width: 250px;
}

.user {
  height: 126px;
  background: url(././img/singer/index.png) no-repeat 0 0;
}

.user p {
  width: 205px;
  margin: 0 auto;
  padding: 16px 0;
  line-height: 22px;
  color: #666;
}

.user a {
  margin: 0 auto;
  display: block;
  width: 100px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  color: #fff;
  background: url(././img/singer/index.png) no-repeat 0 -195px;
}

.m-singer {
  margin-top: 15px;
}

.m-singer h3 {
  height: 23px;
  margin: 0 20px;
  border-bottom: 1px solid #ccc;
  color: #333;
}

.m-singer h3 p {
  float: left;
  zoom: 1;
}

.m-singer h3 a {
  float: right;
  zoom: 1;
  color: #666;
}

.m-singer ul {
  margin: 6px 0 14px 20px;
}

.m-singer li {
  float: left;
  zoom: 1;
  margin-top: 14px;
}

.m-singer li a {
  float: left;
  zoom: 1;
  width: 210px;
  height: 62px;
  background: #fafafa;
}

.m-singer li a:hover {
  background: #f4f4f4;
}

.s-photo {
  float: left;
  zoom: 1;
  width: 62px;
  height: 62px;
}

.s-photo ./img {
  width: 62px;
  height: 62px;
}

.s-info {
  float: left;
  zoom: 1;
  width: 133px;
  height: 60px;
  padding-left: 14px;
  border: 1px solid #e9e9e9;
  border-left: none;
}

.s-info h4 {
  margin-top: 8px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}

.s-info p {
  margin-top: 8px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.apply {
  margin-left: 20px;
}

.apply a {
  display: inline-block;
  padding: 0 5px 0 0;
  border-radius: 4px;
  background: url(././img/singer/button2.png) no-repeat right -100px;
  color: #333;
}

.apply a span {
  display: inline-block;
  width: 170px;
  padding: 0 15px 0 20px;
  line-height: 31px;
  vertical-align: top;
  text-align: center;
  font-weight: bold;
  background: url(././img/singer/button2.png) no-repeat 0 -59px;
}

.hotdj {
  margin-top: 30px;
}

.hotdj h3 {
  height: 23px;
  margin: 0 20px;
  border-bottom: 1px solid #ccc;
  color: #333;
}

.hot-dj-er {
  margin: 20px 0 0 20px;
}

.hot-dj-er li {
  float: left;
  zoom: 1;
  width: 210px;
  height: 50px;
}

.d-./img {
  float: left;
  zoom: 1;
  margin-right: 10px;
}

.d-./img ./img {
  width: 40px;
  height: 40px;
}

.d-info {
  float: left;
  zoom: 1;
  width: 160px;
  line-height: 21px;
  color: #666;
}

.d-info .dj {
  float: left;
  zoom: 1;
  color: #000;
}

.d-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.h-icon {
  display: inline-block;
  vertical-align: middle;
  margin-top: -1px;
  width: 11px;
  height: 13px;
  background: url(././img/icon.png) no-repeat 0 1px;
}

.swiper {
  --swiper-navigation-color: #878787; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 20px; /* 设置按钮大小 */
}
.imgSize {
  width: 62px;
  height: 62px;
}
</style>