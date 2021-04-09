<template>
    
</template>
<script>
import {getMusicData} from '../../nextwork/playlists/tags'
export default {
    name:'gedan',
    data(){
        return{
           cat:'全部'
        }
    },
    created(){
            this.getMusicList()
    },
    methods:{
        getMusicList(){
            getMusicData(cat).then(res=>{
               
            })
        }
    }
}
</script>
<style scoped>

</style>