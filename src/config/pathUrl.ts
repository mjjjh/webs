import type {Mpath} from "./Type"


// interface Ipath {
//     [UrlPath:string]:string
// }


// const funs = ["首页","模型","帖子"] as const;

// type Tfuns = typeof funs[number];
// type TfunsPath = {
//     [key in Tfuns] :string
// }

//功能的路径
const Funpath:Mpath.TfunsPath = {
    "首页": "/",
    "模型":"/module",
    "帖子":"/posts",
}

// const apart = ["s", "b", "c"] as const;
// type aas = typeof apart[number]; 

// const sd:aas = "b";

// type Ipathw = {
//     [s in aas]: string; 
// }

// // 使用 Ipathw 接口
// const sacx: Ipathw = {
//     s: "String for s",
//     b: "String for b",
//     c: "String for c",
// };

// const style = ["real","eranimation","tfD","national","game"] as const;
// type Tstyle = typeof style[number];
// type TstylePath = {
//     [key in Tstyle]:string
// }

//风格分区
const stylepath:Mpath.TstylePath = {
    "real":"真实",
    "eranimation":"二次元",
    "tfD":"2.5D",
    "national":"国风",
    "game":"游戏"
};

// type ValuesOf<T> = T[keyof T];

export {Funpath,stylepath};