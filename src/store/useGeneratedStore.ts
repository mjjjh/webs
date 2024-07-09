import { defineStore } from "pinia";
import { ref ,inject} from "vue";
import type {Mapi} from "@/config/Type"

interface ImodelSelectInfos{
    name:string
    pic:string
}


//图片生成信息
export const useGeneratedStore = defineStore('Generated',() => {
    const $api = inject<Mapi.Tapi>("$api");
    const textToImgreb = ref<any>();

    //选择的模型checkpoint
    const checkpointSelect = ref<ImodelSelectInfos>();
    function CcheckpointSelect(param:ImodelSelectInfos){
        checkpointSelect.value = param;
    }
    //选择的模型lora
    const loraSelect = ref<ImodelSelectInfos>();
    function CloraSelect(param:ImodelSelectInfos){
        loraSelect.value = param;
    }
    //选择的模型embedding
    const embeddingSelect = ref<ImodelSelectInfos>();
    function CembeddingSelect(param:ImodelSelectInfos){
        embeddingSelect.value = param;
    }

    //文生图api
   async function generateImage(params:any)
   {
        textToImgreb.value = await $api?.generatePic.textToImg(JSON.stringify(params));
        // console.log(textToImgreb.value);
   }


    return {
        checkpointSelect,
        CcheckpointSelect,
        loraSelect,
        CloraSelect,
        embeddingSelect,
        CembeddingSelect,
        textToImgreb,
        generateImage
    }
})