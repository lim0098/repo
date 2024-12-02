import { defineStore } from 'pinia'

export const usezsbbStore = defineStore({
    id: 'date',
    state: () => ({
        starDate: '',
        endDate: '',
        jinxiiangshuie:0,
        xiaoxiangshuie:0
        
    }),
    persist: true,
    // 计算属性
    getters: {
        yinjiaoshuijin: state => Math.round((state.xiaoxiangshuie -state.jinxiiangshuie)*100)/100,
        // cjinxiiangshuie: state => (state.jinxiiangshuie)
      },

    actions: {
        setDate( starDate: string) {
            this.starDate = starDate
            // this.endDate = endDate
        },
        delDate() {
            this.starDate = ''
            this.endDate = ''
        },
    }
})