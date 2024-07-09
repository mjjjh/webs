import {Server} from "@/config"

//webSocket服务

function useWebSocket(handleMessage:(message:any) =>void,params:string,cookie:string)
{
        const ws = new WebSocket(`${Server}client_id=${params}&token=${cookie}`);
        console.log(Server+"client_id="+params);
        
        function init(){
            bindEvent();
        }

        function bindEvent()
        {
            ws.addEventListener("open",handleOpen);
            ws.addEventListener("close",handleClose);
            ws.addEventListener("message",handleMessage);
            ws.addEventListener("error",handleError);
        }
        function handleOpen(e:any)
        {
            
            console.log("Socket Open");
            // resolve(ws);
        }
        function handleClose(e:any)
        {
            console.log("Socket Close");
        }
        function handleError(err:any)
        {
            console.group("Socket Error");
            console.dir(err);
            console.groupEnd();
            // reject(err)
        }
        init();
        return ws;
}

export default useWebSocket;