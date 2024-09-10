<template>
  <q-page padding class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px;">
      <q-form @submit="onSave()">
        <q-select v-model="consultaData.animal_id" option-label="name" option-value="id" :options="listaAnimais"
          label="Selecione um animal" filled />

        <q-input class="q-mt-md" v-model="consultaData.symptoms" label="Sintomas" type="text" required />

        <q-select class="q-mt-md" v-model="consultaData.turno" option-label="name" option-value="id"
          :options="optionTuno" label="Selecione o turno" filled />


        <!-- <q-date v-model="consultaData.dt_consultation" /> -->

        <q-date v-model="consultaData.dt_consultation" minimal class="q-mt-md" />
        <q-btn type="submit" label="Salvar" color="primary" class="q-mt-md" />
      </q-form>
    </q-card>

  </q-page>
</template>

<script lang="ts">
import { NOMEM } from 'dns';
import { TipoAnimal } from 'src/interface/TipoAnimal';
import AnimalService from 'src/services/AnimalService';
import AuthService from 'src/services/AuthService';
import ConsultaServices from 'src/services/ConsultaServices';
import TipoAnimalService from 'src/services/TipoAnimalService';
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  // name: 'PageName'
  setup() {

    const router = useRouter();
    const date = ref();
    const listaAnimais = ref([]);
    const optionTuno = [{
      id: 1,
      name: "Manhã"
    },
    {
      id: 2,
      name: "Tarde"
    }]
    const id: any = parseInt(useRoute().params.id);
    const consultaData = ref({ symptoms: '', turno: null, dt_consultation: null, animal_id: null });


    onMounted(() => {
      onLoadListAnimais(AuthService.getCurrentUserId())

      if (id) {
        onloadTipoAnimal(id);
      }
    });

    const onLoadListAnimais = async (id: any) => {
      try {
        const response: any = await AnimalService.listaMyAnimais(id);
        listaAnimais.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const onloadTipoAnimal = async (id: number) => {
      try {
        const response: any = await ConsultaServices.findConsulta(id);
        console.log(response.data)
        response.data.animal_id = response.data.animal
        consultaData.value = response.data;

      } catch (error) {
        console.error(error);
      }
    };

    const onSave = () => {
      if (id) {
        return onUpdate();
      }
      return onCreate();
    };

    const onCreate = async () => {
      try {
        const tipoAnimal = await ConsultaServices.criarConsulta(consultaData.value);
        if (tipoAnimal) {
          router.push({ path: '/consultas/' })
        }
      } catch (error) {
        console.error(error);
      }
    };

    const onUpdate = async () => {
      try {
        const tipoAnimal = await ConsultaServices.updateConsulta(id, consultaData.value);
        if (tipoAnimal) {
          router.push({ path: '/consultas/' })
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      date,
      optionTuno,
      onCreate,
      consultaData, onloadTipoAnimal, onSave, listaAnimais
    };
  }
})
</script>
