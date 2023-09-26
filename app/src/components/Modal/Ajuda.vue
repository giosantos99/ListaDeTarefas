<template>
  <q-card>
    <q-card-section class="row justify-between items-center bg-secondary">
      <span class="text-h6">Como usar</span>
      <q-btn
        icon="close"
        flat
        dense
        round
        v-close-popup
      >
      </q-btn>
    </q-card-section>
    <div class="no-wrap scroll" style="max-height: calc(100vh - 115px);">
      <q-card-section class="flex flex-center text-center">
        <p>Para atualizar o status (pendente, em andamento, concluído) de sua tarefa, arraste e solte o card para o status que deseja, além disso você pode alterar a ordem de exibição verticalmente dos mesmos da mesma maneira.</p>
        <p>Para a versão mobile você pode estar alterando o status de sua tarefa clicando no botão de engrenagem de seu card que logo em seguida aparecerá uma modal com as opções de atualização.</p>
        <p class="text-caption q-pt-md text-red">Ação de arrastar na posição horizontal / vertical disponível somente para web!</p>
      </q-card-section>
      <q-card-section>
        <p class="text-center">Segue abaixo o tutorial de como usar</p>
        <q-img
          src="webGif.gif"
          cover
          style="min-width: 150px; min-height: 150px;"
        />
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'appAjuda'
}
</script>

<style>

</style>