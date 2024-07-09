//服务器
//默认http 80端口
const basehost:string = "8.140.194.56";

// const baseport:string = "8000";
const baseURL:string = `http://${basehost}`;

//图片接口
const imageUrl:string = `${baseURL}/workbench/getImage?filename=`


//websocket
const host:string = "8.140.194.56";

// const port:string = "8080";

const Server:string = `ws://${host}/workbench/ws?`;

export {
    baseURL,
    imageUrl,
    Server
}