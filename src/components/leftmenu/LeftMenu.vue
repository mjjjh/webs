<template>
    <div :class="UIstore.expandFlag ? 'AI-D-menucell-expand': 'AI-D-menucell-shou'" >
        <div class="AI-D-icon">
            <slot name="icon">
            <!-- 图标插槽 -->
             </slot>
        </div>
        <div class="AI-D-title">
            <slot name="title">
            <!-- 导航标签插槽 -->
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useUIStore } from '@/store';

const props = defineProps<{
    isActive ?:boolean
}>();

const UIstore = useUIStore();

// watchEffect(()=>{
//     console.log(props.isActive);
    
// })

</script>
<style lang="scss" scoped>
.AI-D-menucell-expand{
    height: 60px;
    width: 100%;
    margin: 2px auto 0;
    display: grid;
    grid-template-columns: repeat(8,1fr);
    align-items: center;
    justify-items: center;
    font-weight:bold;

    &:hover{
        background-color: #e9faff;
        color: #41d1ff;
        border-radius: 10px;
    }
    .AI-D-icon {
        grid-column: 2/3 ;
    }
    .AI-D-title {
        width: 80px;
        grid-column: 4/5;
        justify-items: start;
        font-size: 20px;
    }

}

.AI-D-menucell-shou{
    // height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight:bold;
    // padding: 5px;
    &:hover{
        background-color: #e9faff;
        color: #41d1ff;
        border-radius: 10px;
    }
}


.clickActive {
    background-color: #e9faff;
    color: #41d1ff;
    border-radius: 10px;
}
/* .AI-D-menucell:hover{
    background-color: #e9faff;
    color: #41d1ff;
} */



</style>