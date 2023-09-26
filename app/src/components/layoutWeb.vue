<template>
  <section class="container row">
    <template v-if="tarefas.length">
      <div
        v-for="item in tarefas"
        :key="item.description"
        class="col-4 column"
      >
        <span class="text-center text-h6 q-pb-sm">{{ item.label }} ({{ item.tasks.length }})</span>
        <draggable
          :list="item.tasks"
          :item-key="item.id"
          :data-status="item.status"
          class="list-group column container-cards no-wrap scroll items-center q-gutter-y-sm q-px-xs"
          group="grupos"
          @end="OnEnd"
          @change="OnChange"
          style="min-height: calc(100vh - 182px)"
        >
          <template #item="{ element }">
            <Card
              :description="element.description"
              :status="item.status"
              @editar="$emit('editar', { ...element, status: item.status })"
              @visualizar="$emit('visualizar', element)"
              @deletar="$emit('deletar', element.id)"
            />
          </template>
          <template #header>
            <div
              v-if="!item.tasks.length"
              class="flex flex-center"
            >
              <span class="text-center text-caption">
                Nenhum tarefa {{ descriptionStrategy(item.status) }} :(
              </span>
            </div>
          </template>
        </draggable>
      </div>
    </template>
  </section>
</template>

<script>
import Card from './Card.vue'
import draggable from 'vuedraggable'

export default {
  name: 'appLayoutWeb',

  components: { Card, draggable },

  props: {
    listaTarefas: { type: Array, required: true }
  },

  data () {
    return {
      tarefas: [],
      taskChange: {}
    }
  },

  methods: {
    handleListaTarefas() {
      const init = {
        p: { status: 'p', label: 'Pendente', order: 1, tasks: [] },
        a: { status: 'a', label: 'Em Andamento', order: 2, tasks: [] },
        c: { status: 'c', label: 'Concluído', order: 3, tasks: [] },
      }

      const sortFn = (a, b) => a.order > b.order ? 1 : -1

      const reduceFn = (acc, { status, description, id }) => {
        acc[status].tasks =  [...acc[status].tasks, { description, id }]

        return acc
      }

      const listaReduce = this.listaTarefas.reduce(reduceFn, init)

      this.tarefas = Object.values(listaReduce).sort(sortFn)      
    },

    OnEnd(evt) {
      const status = evt.to.dataset.status

      this.taskChange = { ...this.taskChange , status, mobile: false }
      
      this.OnChangeStatusTask()
    },

    OnChange(evt) {
      const { element }  = Object.values(evt)[0]

      this.taskChange = { ...this.taskChange , id: element.id }
    },

    OnChangeStatusTask() {
      this.$emit('changeStatusTask', this.taskChange)
    }
  },

  computed: {
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
  },

  mounted () {
    this.handleListaTarefas()
  }
}
</script>

<style lang="sass" scoped>
.container
  &-cards
    max-height: calc( 100vh - 138px - 46px )

    .card
      max-width: 340px
      max-height: 130px
      min-height: 130px

      .text-task
        font-size: 1.10rem
</style>