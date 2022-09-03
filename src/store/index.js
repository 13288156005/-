import Vue from 'vue'
import Vuex from 'vuex'
import { reqGetDjProgram, reqPlaySong, reqSongAsg, reqBanner, reqLogin, reqArtists, reqPlayList, reqGetPlayListSong, reqGetPlayList, reqGetPlayListCatList, reqGetTopList, reqGetComment, reqSendComment, reqGetLyric, reqGetUserPlayList, reqPlayUserList, reqGetPlayListSongAll, reqSearch, reqGetDjCatList, reqGetDjProgramToplist, reqGetDjRadioById, reqGetDjDetail, reqgetDjDet, reqGetDjSubmit } from '@/api/index.js'
import { reqGetSingerDetail, reqGetSingerSong, reqGetSingerMV, reqGetSingerAlbum, reqGetSingerDesc, reqGetAlbumDetail, reqGetNewAlbum, reqGetAllAlbum, reqGetHotSinger, reqGetSingerList } from '@/api/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //歌曲详情
        songAsg: {},
        //歌曲的url
        songUrl: [],
        //获取banner轮播图数据:
        banners: [],
        //登录信息
        loginMessage: {},
        //获取热门歌手
        hotArtists: [],
        //歌单详情
        playList: {},
        //歌单的前20首
        songList: [],
        //cookie
        cookie: '',
        //歌单列表
        playListAll: {},
        //获取歌单列表名称
        playListCatList: {},
        //获取榜单
        topList: {},
        //获取评论
        comments: {},
        //发表评论结束回来的数据
        sendCommentAsg: {},
        //歌词
        lyric: {},
        //用户歌单
        userPlayList: {},
        //搜索
        search: {},
        //电台分类
        djCatList: {},
        //推荐节目
        djProgram: {},
        //电台节目榜单
        djProgramToplist: {},
        //电台类别推荐
        djRadioById: {},
        //电台详情
        djDetail: {},
        //电台节目
        djDet: {},
        //电台节目详情
        djSubmit: {},
        //歌手详情
        singerDetail: {},
        //歌手歌曲
        singerSong: {},
        //歌手MV
        singerMV: {},
        //歌手专辑
        singerAlbum: {},
        //歌手描述
        singerDesc: {},
        //专辑详情
        albumDetail: {},
        //最新专辑
        newAlbum: {},
        //全部新碟
        albumAll: {},
        // 热门歌手
        hotSinger: {},
        //歌手列表
        singerList: {},

    },
    getters: {},
    mutations: {
        GETSONGASG(state, songAsg) {
            state.songAsg = songAsg
        },
        GETBANNERS(state, banners) {
            state.banners = banners
        },
        LOGINUSER(state, loginMessage) {
            state.loginMessage = loginMessage
            state.cookie = loginMessage.cookie
        },
        GETHOTARTISTS(state, hotArtists) {
            state.hotArtists = hotArtists.artists
        },
        GETPLAYLISTDETAIL(state, playList) {
            state.playList = playList
        },
        GETPLAYLISTSONG(state, songList) {
            state.songList = songList.songs
        },
        GETPLAYLIST(state, playListAll) {
            state.playListAll = playListAll
        },
        GETPLAYLISTCATLIST(state, playListCatList) {
            state.playListCatList = playListCatList
        },
        GETTOPLIST(state, topList) {
            state.topList = topList
        },
        GETCOMMENTS(state, comments) {
            state.comments = comments
        },
        SENDCOMMENT(state, sendCommentAsg) {
            state.sendCommentAsg = sendCommentAsg
        },
        GETLYRIC(state, lyric) {
            state.lyric = lyric
        },
        GETUSERPLAYLIST(state, userPlayList) {
            state.userPlayList = userPlayList
        },
        SEARCH(state, search) {
            state.search = search
        },
        GETMUSICURL(state, songUrl) {
            state.songUrl = songUrl
        },
        GETDJCATELIST(state, djCatList) {
            state.djCatList = djCatList
        },
        GETDJRECOMMEND(state, djProgram) {
            state.djProgram = djProgram
        },
        GETDJPROGRANTOPLIST(state, djProgramToplist) {
            state.djProgramToplist = djProgramToplist
        },
        GETDJRADIOBYID(state, djRadioById) {
            state.djRadioById = djRadioById
        },
        GETDJDETAIL(state, djDetail) {
            state.djDetail = djDetail
        },
        GETDJDET(state, djDet) {
            state.djDet = djDet
        },
        GETDJSUBMIT(state, djSubmit) {
            state.djSubmit = djSubmit
        },
        GETSINGERDETAIL(state, singerDetail) {
            state.singerDetail = singerDetail
        },
        GETSINGERSONG(state, singerSong) {
            state.singerSong = singerSong
        },
        GETSINGERMV(state, singerMV) {
            state.singerMV = singerMV
        },
        GETSINGERALBUM(state, singerAlbum) {
            state.singerAlbum = singerAlbum
        },
        GETSINGERDESC(state, singerDesc) {
            state.singerDesc = singerDesc
        },
        GETALBUMDETAIL(state, albumDetail) {
            state.albumDetail = albumDetail
        },
        GETALBUMNEW(state, newAlbum) {
            state.newAlbum = newAlbum
        },
        GETALBUMALL(state, albumAll) {
            state.albumAll = albumAll
        },
        GETHOTSINGER(state, hotSinger) {
            state.hotSinger = hotSinger
        },
        GETSINGERLIST(state, singerList) {
            state.singerList = singerList
        }
    },
    actions: {
        //获取歌曲的详情
        async getSongAsg({ commit }, id) {
            const result = await reqSongAsg(id)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit("GETSONGASG", result.data.songs[0]);
        },
        //获取轮播图的数据
        async getBanners({ commit }, id) {
            const result = await reqBanner()
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETBANNERS', result.data.banners)
        },
        //登录模块
        async loginUser({ commit }, dataForm) {
            const result = await reqLogin(dataForm.phone, dataForm.password)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('LOGINUSER', result.data)
        },
        //获取热门歌手
        async getHotArtists({ commit }) {
            const result = await reqArtists()
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETHOTARTISTS', result.data)
        },
        //根据id获取歌单详情
        async getPlayListDetail({ commit }, playID) {
            const result = await reqPlayList(playID)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETPLAYLISTDETAIL', result.data)
        },
        //格局歌单id获取歌曲前20首歌曲
        async getPlayListSong({ commit }, id) {
            const result = await reqGetPlayListSong(id)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETPLAYLISTSONG', result.data)
        },
        //获取歌单
        async getPlayList({ commit }, data) {
            const result = await reqGetPlayList(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETPLAYLIST', result.data)
        },
        //获取歌单分类名称
        async getPlayListCatList({ commit }) {
            const result = await reqGetPlayListCatList()
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETPLAYLISTCATLIST', result.data)
        },
        //获取榜单列表
        async getTopList({ commit }) {
            const result = await reqGetTopList()
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETTOPLIST', result.data)
        },
        //获取评论
        async getComments({ commit }, data) {
            const result = await reqGetComment(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETCOMMENTS', result.data)
        },
        //发表评论
        async sendComment({ commit }, data) {
            const result = await reqSendComment(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('SENDCOMMENT', result.data)

        },
        //获取歌词
        async getLyric({ commit }, id) {
            const result = await reqGetLyric(id)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETLYRIC', result.data)
        },
        //获取用户的歌单
        async getUserPlayList({ commit }, data) {
            const result = await reqGetUserPlayList(data)
            console.log(result.data);
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETUSERPLAYLIST', result.data)

        },
        //获取登录用户的歌单
        async PlayUserList({ commit }, data) {
            const result = await reqPlayUserList(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETPLAYLISTDETAIL', result.data)
        },
        //登录后播放用户的全部歌单
        async GetPlayListSongAll({ commit }, data) {
            const result = await reqGetPlayListSongAll(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETPLAYLISTSONG', result.data)
        },
        //搜索
        async search({ commit }, data) {
            const result = await reqSearch(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('SEARCH', result.data)
        },

        //获取音乐的url
        async getMusicUrl({ commit }, data) {
            const result = await reqPlaySong(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETMUSICURL', result.data)
        },

        //获取电台的分类
        async getDjCateList({ commit }) {
            const result = await reqGetDjCatList()
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETDJCATELIST', result.data)
        },
        //获取推荐节目
        async getDjRecommend({ commit }) {
            const result = await reqGetDjProgram()
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETDJRECOMMEND', result.data)
        },
        //获取电台节目榜
        async GetDjProgramToplist({ commit }, data) {
            const result = await reqGetDjProgramToplist(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETDJPROGRANTOPLIST', result.data)
        },
        //电台类别
        async getDjRadioById({ commit }, data) {
            const result = await reqGetDjRadioById(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETDJRADIOBYID', result.data)
        },
        //获取电台详情
        async getDjDetail({ commit }, data) {
            const result = await reqGetDjDetail(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETDJDETAIL', result.data)
        },
        //获取电台节目
        async getDjDet({ commit }, data) {
            const result = await reqgetDjDet(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETDJDET', result.data)
        },
        //获取电台节目详情
        async getDjSubmit({ commit }, id) {
            const result = await reqGetDjSubmit(id)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETDJSUBMIT', result.data)
        },
        //获取歌手详情
        async getSingerDetail({ commit }, id) {
            const result = await reqGetSingerDetail(id)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETSINGERDETAIL', result.data)
        },
        //获取歌手单曲
        async getSingerSong({ commit }, id) {
            const result = await reqGetSingerSong(id)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETSINGERSONG', result.data)
        },
        //获取歌手mv
        async getSingerMv({ commit }, id) {
            const result = await reqGetSingerMV(id)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETSINGERMV', result.data)
        },
        //获取歌手专辑
        async getSingerAlbum({ commit }, data) {
            const result = await reqGetSingerAlbum(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETSINGERALBUM', result.data)
        },
        //获取歌手描述
        async getSingerDesc({ commit }, id) {
            const result = await reqGetSingerDesc(id)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETSINGERDESC', result.data)
        },

        //获取专辑详情
        async getAlbumDetail({ commit }, id) {
            const result = await reqGetAlbumDetail(id)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETALBUMDETAIL', result.data)
        },
        //获取最新专辑
        async getAlbumNew({ commit }) {
            const result = await reqGetNewAlbum()
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETALBUMNEW', result.data)
        },
        //获取全部新碟
        async getAlbumAll({ commit }, data) {
            const result = await reqGetAllAlbum(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETALBUMALL', result.data)
        },
        //获取热门歌手
        async getHotSinger({ commit }) {
            const result = await reqGetHotSinger()
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETHOTSINGER', result.data)
        },
        //获取歌手分类列表
        async getSingerList({ commit }, data) {
            const result = await reqGetSingerList(data)
            if (result.data.code !== 200) {
                return this._vm.$message.error(result.data.message)
            }
            commit('GETSINGERLIST', result.data)
        }

    },
    modules: {}
})