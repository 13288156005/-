//统一管理项目的接口模块
//引入二次封装的axios(带有请求,响应的拦截器)
import request from './ajax';


//一进去先游客登录
export const reqUUid = () => request({ url: '/register/anonimous', method: 'get' })

//获取热门推荐列表数据
export const reqHotList = () => request({ url: '/personalized?limit=8', method: 'get' })

//获取榜单数据
export const reqBillboardList = (id) => request({ url: `/playlist/detail?id=${id}`, method: 'get' })

//获取精品歌单
export const reqGoodSingList = () => request({ url: '/top/playlist/highquality?limit=10', method: 'get' })

//获取歌曲url
export const reqPlaySong = (data) => request({ url: `/song/url`, method: 'get', params: data })

//获取歌曲详情
export const reqSongAsg = (id) => request({ url: `/song/detail?ids=${id}`, method: 'get' })

//获取pc端轮播图数据
export const reqBanner = () => request({ url: '/banner?type=0', method: 'get' })

//账号密码登录
export const reqLogin = (phone, password) => request({ url: `/login/cellphone?phone=${phone}&password=${password}`, method: 'post' })

//获取用户的信息
// /user/detail?uid=32953014
export const reqUserDetail = (uid) => request({ url: `/user/detail?uid=${uid}`, method: 'get' })

//退出登录
export const reqLoginOut = (data) => request({ url: '/logout', method: 'get', params: data })

//音乐签到
export const reqMusicSign = (cookie) => request({
    url: '/daily_signin',
    method: 'post',
    params: {
        type: 1,
        cookie: cookie
    }
})

//热门歌手5条 /top/artists
export const reqArtists = () => request({ url: '/top/artists?limit=5', method: 'get' })

//根据歌单id获取歌单详情
// playlist/detail?id=512953021
export const reqPlayList = (playID) => request({ url: `playlist/detail?id=${playID}`, method: 'get' })

//根据歌单id获取歌单的歌曲
export const reqGetPlayListSong = (id) => request({ url: `/playlist/track/all?id=${id}&limit=20&offset=0` })

//获取歌单列表
export const reqGetPlayList = (data) => request({ url: '/top/playlist', method: 'get', params: data })

//获取歌单分类
export const reqGetPlayListCatList = () => request({ url: '/playlist/catlist', method: 'get' })

//获取榜单数据
export const reqGetTopList = () => request({ url: '/toplist', method: 'get' })

//评论接口
export const reqGetComment = (data) => request({ url: '/comment/new', method: 'get', params: data })

//发表，回复评论
export const reqSendComment = (data) => request({ url: '/comment', method: 'get', params: data })

//byID获取歌词
export const reqGetLyric = (id) => request({ url: `/lyric?id=${id}`, method: 'get' })

//获取用户的歌单
export const reqGetUserPlayList = (data) => request({ url: `/user/playlist`, method: 'get', params: data })

//登录后用户的歌单
export const reqPlayUserList = (data) => request({ url: `playlist/detail`, method: 'get', params: data })

//登录后播放歌单
export const reqGetPlayListSongAll = (data) => request({ url: `/playlist/track/all`, method: 'get', params: data })

//搜索
export const reqSearch = (data) => request({ url: `/cloudsearch`, method: 'get', params: data })

//获取电台分类
export const reqGetDjCatList = () => request({ url: '/dj/catelist', method: 'get' })

//获取推荐节目
export const reqGetDjProgram = () => request({ url: '/program/recommend', method: 'get' })

//获取电台节目榜
export const reqGetDjProgramToplist = (data) => request({ url: '/dj/program/toplist', method: 'get', params: data })

//电台类别推荐
export const reqGetDjRadioById = (data) => request({ url: '/dj/radio/hot', method: 'get', params: data })

//电台详情
export const reqGetDjDetail = (id) => request({ url: `/dj/detail?rid=${id}`, method: 'get' })

//获取电台节目
export const reqgetDjDet = (data) => request({ url: '/dj/program', method: 'get', params: data })

//获取电台节目详情
export const reqGetDjSubmit = (id) => request({ url: `/dj/program/detail?id=${id}`, method: 'get' })

//二维码接口
// 二维码 key 生成接口
export const reqGetLoginKey = () => request({ url: '/login/qr/key' })
    // 二维码 url 生成接口
export const reqGetLoginUrl = (data) => request({ url: '/login/qr/create', params: data })
    // 二维码检测扫码状态接口
export const reqGetLoginCheck = (data) => request({ url: '/login/qr/check', params: data })

//获取账号信息
export const reqGetUserInfo = (data) => request({ url: '/user/account', params: data })

//获取歌手详情
export const reqGetSingerDetail = (id) => request({ url: `/artist/detail?id=${id}`, method: 'get' })
    //获取歌手单曲
export const reqGetSingerSong = (id) => request({ url: `/artists?id=${id}`, method: 'get' })
    //获取歌手MV
export const reqGetSingerMV = (data) => request({ url: `/artist/mv`, method: 'get', params: data })
    //获取歌手专辑
export const reqGetSingerAlbum = (data) => request({ url: '/artist/album', method: 'get', params: data })
    //获取歌手描述
export const reqGetSingerDesc = (id) => request({ url: `/artist/desc?id=${id}`, method: 'get' })

//获取专辑详情
export const reqGetAlbumDetail = (id) => request({ url: `/album?id=${id}`, method: 'get' })
    //获取最新专辑
export const reqGetNewAlbum = () => request({ url: '/album/newest', method: 'get' })
    //获取全部新碟
export const reqGetAllAlbum = (data) => request({ url: '/album/new', method: 'get', params: data })

//获取热门歌手
export const reqGetHotSinger = () => request({ url: '/top/artists?limit=240', method: 'get' })
    //获取歌手分类列表
export const reqGetSingerList = (data) => request({ url: '/artist/list', method: 'get', params: data })

//获取mv详情
export const reqGetMvDetail = (id) => request({ url: `/mv/detail?mvid=${id}`, method: 'get' })
    //获取mv播放地址
export const reqGetMvUrl = (id) => request({ url: `/mv/url?id=${id}`, method: 'get' })