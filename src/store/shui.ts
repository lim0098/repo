import { defineStore } from 'pinia'

export const useshuiStore = defineStore({
    id: 'shui',
    state: () => ({
        starDate: '',
        jinxiiangshuie:0,
        yujijinxiang:0,
        xiaoxiangshuie:0,
        zanguxiaoxiang:0
        
    }),
    persist: true,
    // 计算属性
    getters: {
        shuijincha: state => Math.round((state.xiaoxiangshuie+state.yujijinxiang -state.jinxiiangshuie-state.zanguxiaoxiang)*100)/100,
      },

    actions: {
        setDate( starDate: string) {
            this.starDate = starDate
            // this.endDate = endDate
        },
        updatexiaoxiang( newValue: any) {
            this.xiaoxiangshuie = newValue;
        },
        updatejinxiang( newValue: any) {
            this.jinxiiangshuie = newValue;
        },
        delDate() {
            this.starDate = ''
        },
    }
})