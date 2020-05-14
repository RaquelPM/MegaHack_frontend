<template>
<div>
    <b-navbar id="navbar" class = "d-flex justify-content-center align-items-center">  
            <item tipo="Eletrodomésticos"> <b-icon-plug class="mr-1" ></b-icon-plug> </item>
            <item tipo="Televisões"> <b-icon-tv class="mr-2" ></b-icon-tv> </item>
            <item tipo="Consoles"> <b-icon-controller class="mr-2" ></b-icon-controller> </item>
            <item tipo="Móveis"> <b-icon-house-door class="mr-2" ></b-icon-house-door> </item>
            <item tipo="Esporte e lazer"> <b-icon-brightness-high class="mr-2" ></b-icon-brightness-high> </item>
            <item tipo="Jogos"> <b-icon-shield-shaded class="mr-2"></b-icon-shield-shaded> </item>
            <item tipo="Celulares"> <b-icon-phone class="mr-2"></b-icon-phone> </item>
            <item name="Ranking"><b-icon-trophy class="mr-2"></b-icon-trophy></item>
    </b-navbar>
</div>
</template>

<script>
import item from './navitem'
import {
    BIconPlug,
    BIconTv,
    BIconController,
    BIconHouseDoor,
    BIconBrightnessHigh,
    BIconShieldShaded,
    BIconPhone,
    BIconTrophy
} from 'bootstrap-vue'

export default{
    components:{
        item,
        BIconPlug,
        BIconTv,
        BIconController,
        BIconHouseDoor,
        BIconBrightnessHigh,
        BIconShieldShaded,
        BIconPhone,
        BIconTrophy
    }
}

</script>

<style>
#navbar{
  background-color:#092060;
}
</style>