<template>
  <q-card class="full-width">
    <q-card-actions class="row justify-between items-center no-wrap bg-secondary">
      <span class="text-h6">Tarefa</span>
      <q-btn
        icon="close"
        round
        flat
        dense
        @click="$emit('fecharModal')"
      >
      </q-btn>
    </q-card-actions>
    <q-card-section class="flex flex-center">
      <p class="text-center">{{ info }}</p>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'appVisualizarTarefa',

  props: { 
    info: { type: String, required: true }
  }
}
</script>

<style lang="sass" scoped>

</style>