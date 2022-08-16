//对于axios进行二次封装
import axios from 'axios';

//创建axios实例
let requests = axios.create({
        //基础路径
        // 本地地址
        // baseURL: "http://localhost:3000",
        // 线上地址
        baseURL: "https://netease-cloud-music-api-git-master-13288156005.vercel.app",
        //请求不能超过20s
        timeout: 20000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json, text/javascript'
        }

    })
    // # axios 开启请求携带 cookie
    // requests.defaults.withCredentials = true;
    // let user = localStorage.getItem('userName')
    // //json格式转换成对象
    // user = JSON.parse(user);

// 请求拦截器（在项目中没有发出去可以做的事情）
// requests.interceptors.request.use((config) => {
//     if (config.params) {
//         config.params.cookie = user.cookie;
//     }
//     return config
// })

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
// requests.interceptors.response.use()

// 暴露axios实例
export default requests;