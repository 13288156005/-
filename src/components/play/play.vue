<template>
  <div>
    <div class="play_warpper" ref="play_show">
      <div class="left">
        <a href="javascript:;" @click="play_last"></a>
        <!-- 点击开始加入类名start -->
        <a href="javascript:;" @click="play_music" ref="btn_play"></a>
        <a href="javascript:;" @click="play_next"></a>
      </div>
      <div class="center">
        <audio preload="auto" ref="audio"></audio>
        <img :src="SongAsg.picUrl[num]" alt="" />
        <div class="play_progress">
          <div class="play_top">
            <h4>{{ SongAsg.name[num] }}</h4>
            <!-- Object.keys(songAsg).length == 0 ? "未知" : songAsg.ar[0].name -->
            <span>{{ SongAsg.ar[num] }}</span>
          </div>
          <div class="play_bottom">
            <div class="jindutiao" ref="bar" @mousedown="clickProgress">
              <div class="cur" ref="progressCur">
                <span @mousedown="moveProgress"></span>
              </div>
            </div>
            <div class="play_clock">
              <span>{{ time ? time : "00:00" }} </span>/<span>
                {{ $moment(this.showTime).format("mm:ss") }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="play_right" ref="play_volume">
        <div class="m-vol" ref="vol">
          <div class="m-jdt" @click="volumeProgress" ref="volumeJdt">
            <div class="cur-jd" ref="volumeCur">
              <span class="cur-btn" @mousedown="moveVolume"></span>
            </div>
          </div>
        </div>
        <div class="volume" ref="btnVolume">
          <a href="javascript:;" @click="plagVolume"></a>
        </div>
        <!-- 控制播放器列表显示和隐藏 -->
        <div class="coumPlayList" @click="showPlayList">
          <p class="icon_playList">{{ SongAsg.name.length }}</p>
        </div>
      </div>
      <div class="lock">
        <a href="javascript:;" @click="lock_play" ref="lock_icon"></a>
      </div>
      <!-- 播放器的表单，以及歌词 -->
      <section>
        <div class="playList" ref="playList">
          <div class="listhd">
            <h4>播放列表({{ SongAsg.name.length }})</h4>
            <a class="addAll">
              <span class="icon_addAll"></span>
              收藏全部</a
            >
            <a class="clearAll" @click="clearAll">
              <span class="icon_clearAll"></span>
              清除全部</a
            >
            <p>{{ SongAsg.name[num] }}</p>
            <span class="close" @click="closePlayList"></span>
          </div>
          <div class="listbd">
            <div class="list_left">
              <ul>
                <li
                  v-for="(item, index) in SongAsg.name"
                  :key="index"
                  :class="index == num ? 'activeli' : ''"
                >
                  <div class="col1" @click="playThisSong(index)">
                    {{ SongAsg.name[index] }}
                  </div>
                  <div class="col2">
                    <a @click="removeSong(index)"></a>
                  </div>
                  <div class="col3">{{ SongAsg.ar[index] }}</div>
                  <div class="col4">{{ SongAsg.dt[index] }}</div>
                </li>
              </ul>
            </div>
            <div class="list_right" ref="musicLyric">
              <p
                v-for="(item, index) in songLyric"
                :key="index"
                :class="{
                  p_active:
                    currentTime * 1000 >= item.time &&
                    currentTime * 1000 < item.pre,
                }"
              >
                {{ item.lrc }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      //控制音乐播放器开关
      flag: 1,
      //控制play播放栏显示和隐藏开关
      lock: 1,
      //控制音量显示和隐藏
      flagVol: 1,
      //控制播放器的显示和隐藏
      flagPlayList: 1,
      //控制第几首歌曲播放
      num: 0,
      //歌曲的详情
      SongAsg: {
        id: [],
        //歌曲的名字
        name: [],
        // 歌曲的作者
        ar: [],
        //歌曲的图片
        picUrl: [],
        //歌曲的时长
        dt: [],
        //歌曲是否免费8为免费
        fee: [],
      },
      //需要播放英语的url
      videoUrl: [],
      //音乐url
      musicUrl: [],
      //播放时长显示
      time: "",
      //进度条的宽度：
      progressWidth: 1,
      //获取当前的歌曲的时间
      countS: 0,
      //播放器当前播放的时长
      currentTime: 0,
      //控制是否添加音乐信息的开关
      flagAdd: true,
      showTime: 0,
    };
  },
  mounted() {
    //监听video播放结束时的回调函数
    this.$refs.audio.addEventListener("ended", () => {
      // 播放结束，开始下一首
      this.next_song();
    });
    //播放器的默认音量
    this.playDeafultVolume();
    //监听video播放时长
    this.$refs.audio.addEventListener("timeupdate", this.playTimeShow);
    //监听video进度条的宽度
    this.$refs.audio.addEventListener("timeupdate", this.playStyleWidth);
    //点击页面隐藏音量
    this.hiddleVolume();
    //当audio发生加载时回调的函数(加载歌词)
    this.$refs.audio.addEventListener("loadstart", () => {
      setTimeout(() => {
        this.$store.dispatch("getLyric", this.SongAsg.id[this.num]);
      }, 300);
    });
    this.$refs.audio.addEventListener("canplay", () => {
      this.showTime = this.$refs.audio.duration;
      this.showTime *= 1000;
    });
  },
  methods: {
    //控制音乐的暂停和播放
    play_music() {
      if (this.flag == 1) {
        this.$refs.audio.play();
        //更改按钮样式
        this.$refs.btn_play.className = "start";
        this.flag = 0;
      } else {
        this.$refs.audio.pause();
        //更改按钮样式
        this.$refs.btn_play.className = "";
        this.flag = 1;
      }
    },
    //锁定play播放栏
    lock_play() {
      if (this.lock == 1) {
        this.$refs.play_show.classList.add("show");
        this.$refs.lock_icon.className = "lock";
        this.lock = 0;
      } else {
        this.$refs.play_show.classList.remove("show");
        this.lock = 1;
        this.$refs.lock_icon.className = "";
      }
    },
    //下一首按钮
    play_next() {
      // this.$message.error("错了哦，这是一条错误消息");
      this.next_song();
    },

    //播放下一首功能
    next_song() {
      if (this.num < this.videoUrl.length - 1) {
        this.num++;
        this.$refs.audio.src = this.videoUrl[this.num];
        this.$refs.audio.play();
      } else {
        this.$message.error("这是最后一首了哦");
        return;
      }
    },
    //播放上一首
    play_last() {
      if (this.num <= 0) {
        this.$message.error("这是第一首啦");
      } else {
        this.num--;
        this.$refs.audio.src = this.videoUrl[this.num];
        this.$refs.audio.play();
      }
    },

    //获取歌曲的时长
    getSongTime(time) {
      let m = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
      let s = parseInt((time % (1000 * 60)) / 1000);
      //补零
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      this.countS = s;
      return m + ":" + s;
    },
    //计算进度条时间与盒子的宽度比的方法
    getProgressWidth(duration, currentTime) {
      // 指定时间的宽度：(width / duration) * currentTime
      //  总时间：duration       正在播放的时间：currentTime
      return (492 / duration) * currentTime;
    },
    //计算点击进度条得到的时间
    getTimeout(progressWidth, duration) {
      return (progressWidth * duration) / 492;
    },
    //点击进度条快进或者后退
    clickProgress(e) {
      // 获取点击进度条得到的宽度
      const barWidth = e.pageX - this.$refs.bar.getBoundingClientRect().x;
      //改变progressCur样式
      const time = this.getTimeout(
        barWidth,
        //获取歌曲的总秒数
        parseInt(this.$refs.audio.duration)
      );
      try {
        //改变歌曲正在播放的时间
        this.$refs.audio.currentTime = time;
      } catch (err) {
        this.$message.error("请选择歌曲！");
      }
    },

    //滑动进度条
    moveProgress(e) {
      const progressw = this.$refs.bar.getBoundingClientRect().x;
      const getTimeMethod = this.getTimeout;
      const getSongTime = parseInt(this.$refs.audio.duration);
      // 因为document的里面的函数this指向docoment所以要在window挂载
      window.mapVue = this;
      document.onmousemove = function (e) {
        if (e.pageX != 0) {
          const curWidth = e.pageX - progressw;
          //限制超过进度条的宽度
          if (curWidth <= 492 && curWidth > 0) {
            //获取歌曲滑动的时间
            const curtime = getTimeMethod(curWidth, getSongTime);
            window.mapVue.curtime = curtime;
            window.mapVue.$refs.audio.removeEventListener(
              "timeupdate",
              window.mapVue.playStyleWidth
            );
            window.mapVue.$refs.progressCur.style.width = curWidth + "px";
          }
        }
      };

      document.onmouseup = function (e) {
        window.mapVue.$refs.audio.addEventListener(
          "timeupdate",
          window.mapVue.playStyleWidth
        );
        window.mapVue.$refs.audio.currentTime = window.mapVue.curtime;
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    //播放器的时间显示
    playTimeShow() {
      let timeDisplay;
      //用秒数来显示当前播放进度
      timeDisplay = Math.floor(this.$refs.audio.currentTime); //获取实时时间
      this.currentTime = this.$refs.audio.currentTime;
      //持续时间    （歌曲长度）
      //处理时间
      //分钟
      let minute = timeDisplay / 60;
      let minutes = parseInt(minute);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //秒
      let second = timeDisplay % 60;
      let seconds = Math.round(second);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.time = minutes + ":" + seconds;
      //获取歌曲的总秒数
      this.countS = parseInt(this.$refs.audio.duration);
      this.progressWidth = parseInt(
        this.getProgressWidth(this.countS, timeDisplay)
      );
    },
    //播放器滑动的条条
    playStyleWidth() {
      //进度条事件
      this.$refs.progressCur.style.width = this.progressWidth + "px";
    },
    //播放器的默认音量
    playDeafultVolume() {
      this.$refs.audio.volume = 0.2;
    },
    //点击音量显示和隐藏音量
    plagVolume() {
      if (this.flagVol) {
        this.$refs.vol.style.visibility = "initial";
        this.flagVol = 0;
      } else {
        this.$refs.vol.style.visibility = "hidden";
        this.flagVol = 1;
      }
    },
    //点击页面其他外的隐藏音量键
    hiddleVolume() {
      document.addEventListener("click", (e) => {
        if (this.$refs.play_volume) {
          let isSelf = this.$refs.play_volume.contains(e.target);
          if (!isSelf) {
            this.$refs.vol.style.visibility = "hidden";
            this.flagVol = 1;
          }
        }
      });
    },
    //点击音量进度条
    volumeProgress(e) {
      // 静止冒泡
      e.stopPropagation();
      const volumeJdt = this.$refs.volumeJdt;
      const volumeCur = this.$refs.volumeCur;
      const audio = this.$refs.audio;

      const volumeBarHeight =
        volumeJdt.getBoundingClientRect().y +
        volumeJdt.getBoundingClientRect().height -
        e.clientY;
      if (volumeBarHeight >= 0 && volumeBarHeight <= 100) {
        //改变音量进度条的高度
        volumeCur.style.height = volumeBarHeight + "px";
        //改变音量大小
        audio.volume = volumeBarHeight / 100;
      }
    },
    //按下音量进度条
    moveVolume(e) {
      //  原理跟点击进度条一样
      // 因为document的里面的函数this指向docoment所以要在window挂载
      window.mapVue = this;
      document.onmousemove = function (e) {
        const volumeJdt = window.mapVue.$refs.volumeJdt;
        const volumeCur = window.mapVue.$refs.volumeCur;
        const audio = window.mapVue.$refs.audio;
        const volumeBarHeight =
          volumeJdt.getBoundingClientRect().y +
          volumeJdt.getBoundingClientRect().height -
          e.clientY;
        if (volumeBarHeight >= 0 && volumeBarHeight <= 100) {
          //改变音量进度条的高度
          volumeCur.style.height = volumeBarHeight + "px";
          //改变音量大小
          audio.volume = volumeBarHeight / 100;
        }
      };
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    //控制显示和隐藏播放器列表
    showPlayList() {
      if (this.flagPlayList) {
        this.$refs.playList.style.display = "block";
        this.flagPlayList = 0;
      } else {
        this.$refs.playList.style.display = "none";
        this.flagPlayList = 1;
      }
    },
    closePlayList() {
      this.$refs.playList.style.display = "none";
      this.flagPlayList = 1;
    },
    //删除指定的歌曲
    removeSong(index) {
      // 如果正在播放则直接下一首
      if (index == this.num) {
        this.next_song();
      }
      if (index < this.num) {
        this.num = this.num - 1;
      }
      this.SongAsg.name.splice(index, 1);
      this.SongAsg.ar.splice(index, 1);
      this.SongAsg.picUrl.splice(index, 1);
      this.SongAsg.dt.splice(index, 1);
      this.SongAsg.fee.splice(index, 1);
      this.SongAsg.id.splice(index, 1);
      this.videoUrl.splice(index, 1);
    },
    //清空播放器列表歌曲
    clearAll() {
      this.SongAsg.id = [];
      this.SongAsg.name = [];
      this.SongAsg.ar = [];
      this.SongAsg.picUrl = [];
      this.SongAsg.dt = [];
      this.SongAsg.fee = [];
      this.videoUrl = [];
      this.num = 0;
      this.$refs.audio.src = "";
      // this.$refs.audio.pause();
    },
    //点击播放器歌曲列表选择播放这首歌
    playThisSong(index) {
      this.$refs.audio.src = this.videoUrl[index];
      this.$refs.audio.play();
      this.num = index;
    },

    //获取音乐url
    getSongUrl(id) {
      let cookie = localStorage.getItem("cookie");
      let songUrlInfo = {
        id: id,
        cookie: cookie,
      };
      this.$store.dispatch("getMusicUrl", songUrlInfo);
    },
  },
  computed: {
    //2.1 获取音乐详情
    ...mapState({
      songAsg: (state) => state.songAsg,
      songList: (state) => state.songList,
      lyric: (state) => state.lyric,
      songUrl: (state) => state.songUrl.data,
    }),
    //整理歌词数据
    songLyric: function () {
      let arr;
      if (Object.keys(this.lyric).length != 0) {
        arr = this.lyric.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item, index) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, index) => {
          if (index === arr.length - 1) {
            item.pre = 0;
          } else {
            item.pre = arr[index + 1].time;
          }
        });
      }
      return arr;
    },
  },
  watch: {
    //当歌曲详情数据发生变化的时候会回调这个函数。
    songAsg(newVal, oldVal) {
      this.getSongUrl(newVal.id);
      setTimeout(() => {
        if (this.flagAdd == false) {
          return;
        }

        //获取到歌曲的名字,作者,和图片歌曲时长歌曲是否免费
        this.SongAsg.id.push(newVal.id);
        this.SongAsg.name.push(newVal.name);
        this.SongAsg.ar.push(newVal.ar[0].name);
        this.SongAsg.picUrl.push(newVal.al.picUrl);
        this.SongAsg.fee.push(newVal.fee);
        //把歌曲的毫秒转换为分秒
        const time = this.getSongTime(newVal.dt);
        this.SongAsg.dt.push(time);
      }, 200);
    },
    songList(newVal, oldVal) {
      //初始化歌单
      this.SongAsg = {
        id: [],
        //歌曲的名字
        name: [],
        ar: [],
        picUrl: [],
        dt: [],
        fee: [],
      };
      this.videoUrl = [];
      let res = newVal.map((item, index) => {
        // 整理歌单前20首歌的数据
        //获取到歌曲的名字,作者,和图片歌曲时长
        this.SongAsg.id.push(item.id);
        this.SongAsg.name.push(item.name);
        this.SongAsg.ar.push(item.ar[0].name);
        this.SongAsg.picUrl.push(item.al.picUrl);
        this.SongAsg.fee.push(item.fee);
        let time = this.getSongTime(item.dt);
        this.SongAsg.dt.push(time);
        this.videoUrl.push(
          `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
        );
      });

      this.num = 0;
      // 初始化播放器
      this.$refs.audio.src = this.videoUrl[0];
      this.$refs.audio.play();
      this.$refs.play_show.classList.add("show");
      this.$refs.btn_play.className = "start";
      this.$refs.lock_icon.className = "lock";
      this.flag = 0;
      this.lock = 0;
    },
    //监听播放器播放时间，显示歌词滚动
    currentTime() {
      let p = document.querySelector("p.p_active");

      try {
        if (parseFloat(p.offsetTop) > 150) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 150;
        }
      } catch (err) {
        //抓住throw抛出的错误
        //处理错误并执行
      }
    },
    //音乐的url整理
    songUrl(newVal, oldVal) {
      newVal.forEach((item, index) => {
        const sameUrl = this.videoUrl.includes(item.url);
        if (sameUrl) {
          this.$message.error("已经有这首歌啦");
          this.flagAdd = false;
          return;
        } else {
          this.videoUrl.push(item.url);
          this.flagAdd = true;
        }

        // 当只有一首歌的时候
        if (this.videoUrl.length == 1) {
          this.$refs.audio.src = this.videoUrl[0];
          this.$refs.audio.play();
          this.$refs.play_show.classList.add("show");
          this.$refs.btn_play.className = "start";
          this.$refs.lock_icon.className = "lock";
          this.flag = 0;
          this.lock = 0;
        }
      });
    },
  },
};
</script>

<style  lang='less' scoped>
.play_warpper {
  width: 100%;
  height: 54px;
  position: fixed;
  background-color: #2a2a2a;
  bottom: -50px;
  //播放器底部动画的效果
  transition: bottom 0.5s;
  z-index: 9999;
  display: flex;
  justify-content: center;
  .left {
    width: 140px;
    height: 100%;
    // background-color: yellow;

    display: flex;
    justify-content: center;
    align-items: center;
    a {
      width: 26px;
      height: 26px;

      background: url("./images//playbar.png") no-repeat;

      &:nth-child(1) {
        // background: url("./images//playbar.png") no-repeat;
        background-position: -2px -130px;
        &:hover {
          background-position: -32px -130px;
        }
      }

      &:nth-child(2) {
        width: 36px;
        height: 36px;
        margin: 10px;
        // background: url("./images/playbar.png") no-repeat;
        background-position: -2px -205px;
        &:hover {
          background-position: -42px -205px;
        }
      }
      &:nth-child(3) {
        // background: url("./images//playbar.png") no-repeat;
        background-position: -82px -130px;
        &:hover {
          background-position: -112px -130px;
        }
      }
    }

    //点击开始
    .start {
      background-image: url("./images/playbar.png") no-repeat;
      background-position: -2px -166px !important;
      &:hover {
        background-position: -42px -166px !important;
      }
    }
  }

  .center {
    width: 700px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    audio {
      display: inline-block;
    }
    img {
      width: 34px;
      height: 35px;
      border-radius: 4px;
    }
    .play_progress {
      height: 100%;
      display: flex;
      width: 554px;
      flex-direction: column;
      margin-left: 5px;
      .play_top {
        display: flex;
        height: 15px;
        margin-top: 10px;
        h4 {
          color: #e8e8e8;
          font-weight: 400;
          margin-right: 10px;
        }
        span {
          color: #9b9b9b;
        }
      }

      .play_bottom {
        width: 600px;
        height: 9px;

        display: flex;
        margin-top: 7px;
        .jindutiao {
          width: 492px;
          background: url("./images/statbar.png") no-repeat;
          position: relative;

          /* 背景为红色进度条 */
          .cur {
            width: 22%;
            height: 10px;
            position: absolute;
            top: 0;
            left: 0%;
            // 控制进度条
            width: 1%;
            background: url("./images/statbar.png") no-repeat 0 9999px;
            background-position: 0 -66px;

            span {
              width: 22px;
              height: 24px;
              background: url("./images/iconall.png") no-repeat;
              background-position: 0 -250px;
              position: absolute;
              margin-left: -11px;
              top: -7px;
              right: -13px;

              &:hover {
                background-position: 0 -280px;
              }
            }
          }
        }

        .play_clock {
          margin-top: -3px;
          margin-left: 20px;
          color: #838383;

          span:nth-child(2) {
            color: #6e6e6e;
          }
        }
      }
    }
  }
  .play_right {
    width: 226px;
    height: 100%;
    display: flex;
    position: relative;
    //音量进度条
    .m-vol {
      width: 32px;
      height: 113px;
      background: url("./images/playbar.png") no-repeat;
      background-position: left -502px;
      position: absolute;
      top: -113px;
      visibility: hidden;
      //
      .m-jdt {
        width: 4px;
        height: 100px;
        position: absolute;
        left: 14px;
        top: 5px;

        .cur-jd {
          width: 4px;
          height: 20px;
          position: absolute;
          bottom: 0;
          background: url("./images/playbar.png") no-repeat;
          background-position: -40px bottom;

          .cur-btn {
            width: 18px;
            height: 20px;
            position: absolute;
            left: -7px;
            top: -2px;
            background: url("./images/iconall.png") no-repeat;
            background-position: -40px -252px;

            &:hover {
              background: url("./images/iconall.png") no-repeat;
              background-position: -40px -282px;
            }
          }
        }
      }
    }

    .volume {
      margin-top: 24px;
      a {
        display: inline-block;
        width: 25px;
        height: 25px;
        background: url("./images/playbar.png") no-repeat;
        background-position: 0 -248px;

        &:hover {
          background-position: -29px -248px;
        }
      }
    }

    //控制播放器列表显示和隐藏
    .coumPlayList {
      margin-top: 25px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      display: inline-block;
      width: 59px;
      height: 25px;
      background: url("./images/playbar.png") -45px -70px;
      cursor: pointer;
      .icon_playList {
        padding-top: 4px;
        padding-left: 15px;
        text-align: center;
        color: #666666;
      }
      &:hover {
        background: url("./images/playbar.png") -45px -100px;
      }
    }
  }

  .lock {
    width: 68px;
    height: 20px;
    background: yellow;
    position: absolute;
    right: 0;
    top: -18px;
    background: url("./images/playbar.png");
    background-position: 0 -382px;
    a {
      width: 18px;
      height: 18px;
      display: inline-block;
      position: absolute;
      left: 18px;
      top: 2px;
      background: url("./images/playbar.png");
      background-position: -80px -380px;

      &:hover {
        background-position: -80px -400px;
      }
    }
    .lock {
      background: url("./images/playbar.png");
      background-position: -102px -380px;
    }
  }
  &:hover {
    bottom: 0px;
    // 动画效果
    transition: all 0.5s;
  }

  //播放器的表单，以及歌词
  .playList {
    display: none;
    position: absolute;
    top: -300px;
    left: 330px;
    width: 986px;
    height: 300px;

    .listhd {
      width: 986px;
      height: 40px;
      background: url("./images/playlist_bg.png");
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 25px;
      box-sizing: border-box;
      color: #e2e2e2;
      position: relative;

      h4 {
        width: 530px;
      }
      .addAll {
        position: absolute;
        left: 388px;
        color: #cccccc;
        display: flex;
        align-items: center;
        .icon_addAll {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("./images/playbar.png") -92px -166px;
        }
      }

      .clearAll {
        position: absolute;
        left: 480px;
        color: #cccccc;
        display: flex;
        .icon_clearAll {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url("./images/icon2.png") -130px 0;
        }
      }

      p {
        font-size: 14px;
        text-align: center;
      }
      .close {
        width: 16px;
        height: 16px;
        cursor: pointer;
        background: url("./images/close.png");
      }
    }
    .listbd {
      padding: 0 25px;
      box-sizing: border-box;
      width: 100%;
      height: 260px;
      background: url("./images/playlist_bg.png") -1014px;
      display: flex;
      .list_left {
        width: 534px;
        // background: red;
        height: 100%;
        ul::-webkit-scrollbar {
          display: none;
        }
        ul {
          overflow: scroll;
          scrollbar-width: none;
          height: 260px;

          li {
            width: 534px;
            height: 28px;
            color: #9b9b9b;
            font-size: 12px;
            // background: blue;
            display: flex;
            align-items: center;

            .col1 {
              width: 266px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              cursor: pointer;
            }
            .col2 {
              width: 30px;
              padding-left: 80px;
              a {
                display: none;
                cursor: pointer;
                background: url("./images/icon2.png") -130px 0;
                width: 16px;
                height: 16px;
              }
            }
            &:hover {
              background: #020405;
              color: #ffffff;
              .col2 {
                a {
                  display: inline-block;
                }
              }
            }
            .col3 {
              width: 80px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .col4 {
              width: 45px;
              margin-left: 20px;
            }
          }
          .activeli {
            background: #020405;
            color: #ffffff;
          }
        }
      }
      .list_right {
        flex: 2;
        height: 100%;
        overflow: scroll;
        scrollbar-width: none;
        padding-top: 30px;
        box-sizing: border-box;
        p {
          text-align: center;
          color: #989898;
          padding-bottom: 20px;
        }
        .p_active {
          font-size: 14px;
          color: #ffff;
        }
      }
      .list_right::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
.show {
  bottom: 0px;
}
</style>