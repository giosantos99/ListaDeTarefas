<template>
  <q-page class="q-px-sm q-py-md">
    <div class="q-pb-sm">
      <div class="row no-wrap justify-center items-center q-gutter-x-sm">
        <q-input
          v-model="model_task"
          placeholder="Digite aqui o nome da sua tarefa"
          :disable="disable"
          filled
          dense
          class="col-8"
          @keyup.enter="OnAdicionarTarefa"
        >
        </q-input>
        <q-btn
          label="Adicionar Tarefa"
          color="primary"
          :disable="disable"
          no-caps
          @click="OnAdicionarTarefa"
        >
        </q-btn>
      </div>
    </div>

    <template v-if="!skeleton">
      <!--Layout versão web-->
      <template v-if="!$q.screen.lt.md">
        <layoutWeb
          :listaTarefas="lista_tarefas"
          @deletar="OnDeletar"
          @editar="OnEditar"
          @visualizar="OnVisualizar"
          @changeStatusTask="OnChangeStatusTask"
        />
      </template>
      <!--Layout versão mobile-->
      <template v-else>
        <layoutMobile
          :listaTarefas="lista_tarefas"
          @deletar="OnDeletar"
          @editar="OnEditar"
          @visualizar="OnVisualizar"
          @changeStatusTask="OnChangeStatusTask"
        />
      </template>
    </template>

    <template v-else>
      <div :class="!$q.screen.lt.md ? 'row' : 'column'">
        <div
          v-for="(_, index) in 3"
          :key="index"
          class="column q-px-md q-gutter-y-md"
          :class="!$q.screen.lt.md ? 'col-4' : 'col-12'"
        >
          <q-skeleton type="text" class="q-mb-md"></q-skeleton>
          <div
            v-for="(_, idx) in 2"
            :key="idx"
            class="q-mb-sm"
          >
            <q-card style="max-width: 340px">
              <q-card-actions align="right" class="q-gutter-md">
                <q-skeleton
                  v-for="(_, key) in 3"
                  :key="key"
                  type="circle"
                />
              </q-card-actions>
              <q-item>
                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="text" />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
      </div>
    </template>

    <q-dialog v-model="modal.open">
      <component
        :is="modal.component"
        :info="modal.props"
        @fecharModal="modal.open = false"
        @salvarTarefaEditada="OnSalvarTarefaEditada"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import layoutWeb from 'components/layoutWeb.vue'
import layoutMobile from 'components/layoutMobile.vue'
import visualizarTarefa from 'components/Modal/visualizarTarefa.vue'
import editarTarefa from 'components/Modal/editarTarefa.vue'

export default {
  name: 'IndexPage',

  components: {
    layoutWeb,
    layoutMobile,
    visualizarTarefa,
    editarTarefa
  },

  data () {
    return {
      model_task: '',
      
      lista_tarefas: [],
      
      modal: {
        open: false,
        component: null,
        props: null
      },

      skeleton: true,
      disable: false
    }
  },

  methods: {
    async handleTarefas () {
      try {
        this.lista_tarefas = []

        const fetcher = await this.$http('tarefas.json')

        const data = await fetcher.data

        for (const key in data) this.lista_tarefas.push({ id: key, ...data[key] })

      } catch (e) {
        this.$q.notify({ color: 'negative', message: 'Ocorreu um erro ao carregar as tarefas!' })
      } finally {
        this.skeleton = false
      }
    },

    hasExists (task) {
      const someFn = ({ description }) => description === task

      const hasExists = this.lista_tarefas.some(someFn)

      if (hasExists) {
        this.$q.notify({ 
          color: 'negative',
          message: 'Já existe uma tarefa com esta descrição em sua lista, por favor adicione uma nova tarefa!'
        })

        return hasExists
      }
    },

    OnEditar ({ description, id, status }) {
      this.modal = {
        open: true,
        component: editarTarefa,
        props: { description, id, status }
      }

      this.$emit('editar', task)
    },

    OnVisualizar ({ description }) {
      this.modal = {
        open: true,
        component: visualizarTarefa,
        props: description
      }
    },

    async OnAdicionarTarefa () {
      if (this.hasExists(this.model_task)) return

      if (!this.model_task) {
        this.$q.notify({ 
          color: 'negative',
          message: 'Adicione uma tarefa!'
        })

        return
      }

      try {
        this.skeleton = true

        this.disable = true

        const info = { status: 'p', description: this.model_task }

        const response =  await this.$http.post('tarefas.json', info)

        const { data } = await response

        this.lista_tarefas.push({
          id: data.name,
          description: this.model_task,
          status: 'p'
        })

        this.model_task = ''

        this.$q.notify({ color: 'positive', message: 'Tarefa adicionada com sucesso!' })

      } catch (e) {
        this.$q.notify({ color: 'negative', message: 'Ocorreu um erro ao tentar adicionar a tarefa!' })
      } finally {
        this.skeleton = false

        this.disable = false
      }

    },

    async OnSalvarTarefaEditada ({ id, novaDesc, status:newStatus }) {
      if (this.hasExists(novaDesc)) return

      try {
        this.skeleton = true

        this.disable = true
  
        await this.$http.patch(`tarefas/${id}.json`, { description: novaDesc })

        this.$q.notify({ color: 'positive', message: 'Tarefa editada com sucesso!' })

        this.lista_tarefas = this.lista_tarefas.map(item => {
          if (item.id === id) {
            item.description = novaDesc

            item.status = newStatus
          }

          return item
        })

      } catch (e) {
        this.$q.notify({ color: 'negative', message: 'Ocorreu um erro ao tentar editar a tarefa!' })
      } finally {
        this.skeleton = false

        this.disable = false
      }
    },

    OnDeletar (task_id) {
      this.$q.dialog({
        title: 'Deletar',
        message: 'Tem certeza de que deseja deletar a tarefa?',
        ok: { color: 'primary' },
        cancel: { label: 'Cancelar', flat: true }
      }).onOk(async () => {
        try {
          this.skeleton = true

          this.disable = true

          await this.$http.delete(`tarefas/${task_id}.json`)

          this.lista_tarefas = this.lista_tarefas.filter(({ id }) => id !== task_id)
          
          this.$q.notify({ color: 'positive', message: 'Tarefa deletada com sucesso!' })
        } catch (e) {
          this.$q.notify({ color: 'negative', message: 'Ocorreu um erro ao tentar deletar a tarefa!' })
        } finally {
          this.skeleton = false

          this.disable = false
        }
      })
    },

    async OnChangeStatusTask ({ status, id, mobile }) {
      this.lista_tarefas = this.lista_tarefas.map(item => {
        if (item.id === id) item.status = status

        return item
      })
      try {
        await this.$http.patch(`tarefas/${id}.json`, { status })
        
        if (mobile) this.$q.notify({ color: 'positive', message: 'Status alterado com sucesso!' })

      } catch (e) {
        this.$q.notify({ color: 'negative', message: 'Ocorreu um erro ao tentar mudar o status!' })
      }
    }
  },

  mounted () {
    this.handleTarefas()
  }
}
</script>
<style lang="sass" scoped>
.title
  font-size: 2rem
</style>
