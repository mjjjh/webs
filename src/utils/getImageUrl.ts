import $api from '@/api'

/**
 * @description 通过http请求获取图片信息
 * @description 使用FileReader读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
 * @param {{filename:string}} _param
 */
function httpGetImageUrl(_param = {}):Promise<string>{
    // 先有照片才能往下，需要Promise
    const imgUrl = Promise.resolve($api.generatePic.getImageShow(_param)).then(res =>{
        //浏览器允许使用URL.createObjectURL()方法，针对Blob对象产生一个临时URL
        return 'data:image/png;base64,' + btoa(
            new Uint8Array(res as  any).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
       
    }).then(data => {
        // console.log(data);
        return data;
    })

        return imgUrl; 
}

export default httpGetImageUrl;