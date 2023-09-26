<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-card class="full-width">
    <q-card-section class="row items-center justify-between no-wrap bg-secondary">
      <span class="text-h6">Editar</span>
      <q-btn
        icon="close"
        flat
        dense
        round
        @click="$emit('fecharModal')"
      >
      </q-btn>
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="model"
        placeholder="Digite aqui o nome da sua tarefa"
        filled
        dense
        class="col-8"
      >
      </q-input>
    </q-card-section>
    <q-card-actions class="row justify-end no-wrap q-gutter-xs">
      <q-btn
        label="Cancelar"
        color="primary"
        no-caps
        flat
        v-close-popup
      >
      </q-btn>
      <q-btn
        label="Salvar"
        color="primary"
        no-caps
        @click="OnSalvar"
      >
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'appEditarTarefa',

  props: { 
    info: { type: Object, required: true }
  },

  data () {
    return {
      model: this.info.description
    }
  },

  methods: {
    OnSalvar () {
      const { id, status } = this.info

      const info = { id, novaDesc: this.model, status }

      this.$emit('fecharModal')
      this.$emit('salvarTarefaEditada', info)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>