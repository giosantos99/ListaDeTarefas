<template>
  <q-header elevated class="q-pa-xs bg-secondary">
    <div class="row justify-between items-center no-wrap">
      <div class="row items-center q-gutter-x-sm no-wrap">
        <img
          src="logo.png"
          contain
          class="logo"
        >
        <span class="text-h6">Lista de Tarefas</span>
      </div>
      <q-btn
        icon="help"
        close
        flat
        dense
        round
        @click="modal = true"
      >
        <q-tooltip>Como usar</q-tooltip>
      </q-btn>
      <q-dialog v-model="modal">
        <Ajuda />
      </q-dialog>
    </div>
  </q-header>
</template>

<script>
import Ajuda from 'components/Modal/Ajuda.vue'
export default {
  name: 'appHeader',

  components: { Ajuda },

  data () {
    return {
      modal: false
    }
  }
}
</script>

<style lang="sass" scoped>
.logo
  max-width: 60px
  max-height: 60px
</style>