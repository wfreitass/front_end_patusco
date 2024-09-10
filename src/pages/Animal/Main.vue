<template>
  <q-page padding>
    <q-page padding>
      <h3>Animal</h3>
      <q-btn color="primary" class="q-mb-sm" @click="formTypeAnimal()">Adicionar</q-btn>
      <q-table :rows="rows" :columns="columns" row-key="id">
        <template v-slot:body-cell-alert="props">

          <q-td :props="props">
            <q-btn color="warning" class="q-mr-sm" @click="formEditTypeAnimal(props.row.id)">Editar</q-btn>
            <q-btn color="negative" @click="excluir(props.row)">Excluir</q-btn>
          </q-td>
        </template>
      </q-table>
    </q-page>
  </q-page>
</template>

<script lang="ts">
import { Animal } from 'src/interface/Animal';
import AnimalService from 'src/services/AnimalService';
import TipoAnimalService from 'src/services/TipoAnimalService';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  // name: 'PageName'
  setup() {
    const router = useRouter()
    const rows = ref([]);
    const columns = ref([
      { name: 'id', required: true, label: 'ID', align: 'left', field: (row: any) => row.id, format: (val: string) => `${val}`, sortable: true },
      { name: 'name', label: 'Nome', align: 'left', field: (row: any) => row.name, sortable: true },
      { name: 'age', label: 'idade', align: 'center', field: (row: number) => row.age, sortable: true },
      { name: 'alert', label: 'Ações', align: 'center' }
    ]);


    onMounted(() => {
      listAnimal();
    });


    const listAnimal = async () => {
      try {
        const response = await AnimalService.listaAnimais();
        rows.value = response.data;
      } catch (error) {
        console.log(error)
      }
    }

    const excluir = async (row: object) => {
      try {
        const response = await AnimalService.deleteAnimais(row.id);
        listAnimal();
      } catch (error) {
        console.log(error)
      }
    };

    const formTypeAnimal = () => {
      router.push({ path: '/animal/form' })
    }
    const formEditTypeAnimal = (id: number) => {
      router.push({ path: `/animal/form/${id}` })
    }

    return {
      rows,
      columns,
      excluir,
      formTypeAnimal,
      formEditTypeAnimal
    };
  },
})
</script>
