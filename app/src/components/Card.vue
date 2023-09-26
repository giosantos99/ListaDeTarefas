<template>
  <q-card
    v-bind="$attrs"
    class="card full-width cursor-pointer"
    :class="backgroundStrategy(status)"
    :style="`border-left: 8px solid ${borderStrategy(status)}`"
  >
    <q-card-actions class="row justify-end">
      <q-btn
        v-for="button in buttons"
        :key="button.tooltip"
        :icon="button.icon"
        color="grey-10"
        flat
        dense
        round
        @click.stop="$emit(button.action)"
      >
        <q-tooltip>{{ button.tooltip }}</q-tooltip>
      </q-btn>
    </q-card-actions>
    <q-card-section class="flex flex-center q-pt-xs q-px-md">
      <span class="text-task text-center ellipsis-2-lines">{{ description }}</span>
    </q-card-section>
    <q-card-actions class="row justify-end">
      <q-btn
        v-if="$q.screen.lt.md"
        icon="settings"
        flat
        dense
        round
        @click.stop="$emit('configuracao')"
      >
        <q-tooltip>Configuração</q-tooltip>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'appCard',

  props: {
    description: { type: String, required: true },
    status: { type: String, required: true }
  },

  data () {
    return {
      buttons: [
        { icon: 'visibility', action: 'visualizar', tooltip: 'Visualizar' },
        { icon: 'edit', action: 'editar', tooltip: 'Editar' },
        { icon: 'delete', action: 'deletar', tooltip: 'Deletar' }
      ]
    }
  },

  computed: {
    backgroundStrategy: {
      get () {
        return (status) => {
          const bg = {
            p: 'bg-red',
            a: 'bg-yellow',
            c: 'bg-green'
          }
          return bg[status]
        }
      }
    },
    borderStrategy: {
      get () {
        return (status) => {
          const border = {
            p: '#d32f2f',
            a: '#fbc02d',
            c: '#2e7d32'
          }
          return border[status]
        }
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.text-task
  font-size: 1.15rem
  font-weight: 400
</style>
