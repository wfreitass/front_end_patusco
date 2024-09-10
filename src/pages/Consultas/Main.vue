<template>
  <q-page padding>
    <h3>Consultas</h3>
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
</template>

<script lang="ts">
import ConsultaServices from 'src/services/ConsultaServices';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  // name: 'PageName'
  setup() {
    const router = useRouter()
    const rows = ref([]);
    const columns = ref([
      { name: 'id', required: true, label: 'ID', align: 'left', field: (row: any) => row.id, format: (val: string) => `${val}`, sortable: true },
      { name: 'name', label: 'Nome', align: 'left', field: (row: any) => row.animal.name, sortable: true },
      { name: 'type', label: 'Tipo', align: 'left', field: (row: any) => row.animal.tipo_animal.name, sortable: true },
      { name: 'alert', label: 'Alerta', align: 'center' }
    ]);


    onMounted(() => {
      listConsultas();
    });


    const listConsultas = async () => {
      try {
        const response: any = await ConsultaServices.listaConsultas();
        console.log(response.data)
        rows.value = response.data;
      } catch (error) {
        console.log(error)
      }
    }

    const showAlert = (row: any) => {
      alert(`Alerta para: ${row.name}`);
    };


    const excluir = async (row: object) => {
      try {
        const response = await ConsultaServices.deleteConsulta(row.id);
        listConsultas();
      } catch (error) {
        console.log(error)
      }
    };

    const formTypeAnimal = () => {
      router.push({ path: '/consulta/form' })
    }
    const formEditTypeAnimal = (id: number) => {
      router.push({ path: `/consulta/form/${id}` })
    }

    return {
      rows,
      columns,
      showAlert,
      excluir,
      formTypeAnimal,
      formEditTypeAnimal
    };
  },
})
</script>
