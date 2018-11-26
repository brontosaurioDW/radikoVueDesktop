 <template>
  <div class="dashboard">

    <MenuCpanel /> 

    <div class="col-right">
      <router-view />
    </div>
    
  </div>
</template>

<script>

  import MenuCpanel from '../MenuCpanel.vue'
  export default {
    name: 'app',

    components: {
      MenuCpanel
    }
  }
</script>

