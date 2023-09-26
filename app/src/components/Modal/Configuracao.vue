<template>
  <q-card class="full-width" v-bind="$attrs">
    <q-card-section class="row justify-between items-center bg-secondary">
      <span class="text-h6">Configuração</span>
      <q-btn
        icon="close"
        flat
        dense
        round
        v-close-popup
      >
      </q-btn>
    </q-card-section>

    <q-card-section>
      <p class="text-center">Escolha uma das opções abaixo para atualizar o status de sua tarefa.</p>
      <div
        v-for="radio in radios"
        :key="radio.model"
      >
        <q-radio
          v-if="currentStatus !== radio.model"
          v-model="value"
          :label="radio.label"
          :val="radio.model"
        />
      </div>
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
        label="Atualizar"
        color="primary"
        no-caps
        @click="$emit('atualizarTarefa', { status: value, id })"
      >
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'appConfiguracao',

  props: {
    currentStatus: { type: String }, 
    id: { type: String }, 
  },

  data () {
    return {
      value: null,

      radios: [
        { label: 'Pendente', model: 'p' },
        { label: 'Em Andamento', model: 'a' },
        { label: 'Concluído', model: 'c' }
      ]
    }
  }
}
</script>

<style>

</style>