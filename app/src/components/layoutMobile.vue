<template>
  <section>
    <q-tabs
      v-model="tab"
      mobile-arrows
      outside-arrows
      no-caps
      dense
      align="justify"
    >
      <q-tab
        v-for="tab in tabs"
        :key="tab.name"
        :label="`${tab.label} (${filterListaTarefas(tab.key).length})`"
        :name="tab.name"
      />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="jump-up"
      transition-next="jump-up"
      class="bg-transparent"
    >
      <q-tab-panel
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
      >
        <div :name="tab.name">
          <!--<template v-if="filterListaTarefas(tab.key).length">
            <Card
              v-for="task in filterListaTarefas(tab.key)"
              :key="task.id"
              :description="task.description"
              :status="tab.key"
              @editar="$emit('editar', task)"
              @visualizar="$emit('visualizar', task)"
              @deletar="$emit('deletar', task.id)"
              class="q-mb-sm"
            />
          </template>
          <template v-else>
            <div class="flex flex-center full-width q-pt-xl">
              <p class="text-center text-caption">Nenhuma tarefa {{ descriptionStrategy(tab.key) }} =(</p>
            </div>
          </template>-->
          <draggable
            :list="filterListaTarefas(tab.key)"
            item-key="tab.id"
            :data-status="tab.status"
            class="list-group column container-cards no-wrap scroll items-center q-gutter-y-sm q-px-xs"
            group="grupos"
            @end="OnEnd"
            @change="OnChange"
            style="min-height: calc(100vh - 182px)"
          >
            <template #item="{ element }">
              <Card
                :description="element.description"
                :status="tab.key"
                @editar="$emit('editar', { ...element, status: tab.key })"
                @visualizar="$emit('visualizar', element)"
                @deletar="$emit('deletar', element.id)"
                @configuracao="OnConfiguracao(tab.key, element.id)"
              />
            </template>
            <template #header>
              <div
                v-if="!filterListaTarefas(tab.key).length"
                class="flex flex-center"
              >
                <span class="text-center text-caption">
                  Nenhum tarefa {{ descriptionStrategy(tab.key) }} :(
                </span>
              </div>
            </template>
          </draggable>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <q-dialog v-model="configuracao.modal">
        <Configuracao
          v-bind="configuracao"
          @atualizarTarefa="OnAtualizarTarefa"
        />
      </q-dialog>
  </section>
</template>

<script>
import draggable from 'vuedraggable'
import Card from './Card.vue'
import Configuracao from 'components/Modal/Configuracao.vue'

export default {
  name: 'appLayoutMobile',

  components: { Card, Configuracao, draggable },

  props: {
    listaTarefas: { type: Array, required: true }
  },

  data () {
    return {
      lista_tarefas: this.listaTarefas,

      configuracao: {
        modal: false,
      },

      tab: 'pendente',

      tabs: [
        { name: 'pendente', key: 'p', label: 'Pendente' },
        { name: 'andamento', key: 'a', label: 'Em Andamento' },
        { name: 'concluido', key: 'c', label: 'Concluído' }
      ]
    }
  },

  methods: {
    OnAtualizarTarefa (event) {
      this.configuracao.modal = false

      this.tab = this.tabStrategy(event.status)

      this.$emit('changeStatusTask', { ...event, mobile: true })
    },
    OnConfiguracao (currentStatus, id) {
      this.configuracao = {
        modal: true,
        currentStatus,
        id
      }
    }
  },

  computed: {
    filterListaTarefas: {
      get () {
        return (key) => {
          return this.lista_tarefas.filter(item => item.status === key)
        }
      }
    },

    tabStrategy: {
      get () {
        return (status) => {
          const opStatus = {
            p: 'pendente',
            a: 'andamento',
            c: 'concluido'
          }

          return opStatus[status]
        }
      }
    },

    descriptionStrategy: {
      get () {
        return (status) => {
          const opStatus = {
            p: 'pendente',
            a: 'em andamento',
            c: 'concluída'
          }

          return opStatus[status]
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>