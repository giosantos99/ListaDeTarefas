import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://lista-de-tarefas-c4e9f-default-rtdb.firebaseio.com/' })

export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api

  app.config.globalProperties.$http = axios.create({
    baseURL: 'https://lista-de-tarefas-c4e9f-default-rtdb.firebaseio.com/'
  })
})

export { api }
