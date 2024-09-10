<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px;">
      <q-tabs v-model="tab" class="text-primary" align="justify">
        <q-tab name="login" label="Login" />
        <q-tab name="signup" label="Criar Usuário" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <q-form @submit="onLogin">
            <q-input v-model="loginData.email" label="Email" type="email" required />
            <q-input v-model="loginData.password" label="Senha" type="password" required />
            <q-btn type="submit" label="Login" color="primary" class="q-mt-md" />
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="signup">
          <q-form @submit="onSignup">
            <q-input v-model="signupData.name" label="Nome" type="text" required />
            <q-input v-model="signupData.email" label="Email" type="email" required />
            <q-input v-model="signupData.password" label="Senha" type="password" required />
            <q-btn type="submit" label="Criar Conta" color="primary" class="q-mt-md" />
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import AuthService, { LoginData, SignupData } from 'src/services/AuthService';
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'LoginPage',

  setup() {
    const router = useRouter()
    const tab = ref('login');
    const loginData = ref<LoginData>({ email: '', password: '' });
    const signupData = ref<SignupData>({ email: '', password: '', name: '' });

    const onLogin = async () => {
      try {
        const user = await AuthService.login(loginData.value);
        if (user) {
          router.push({ path: '/' })
        }
        // Redirecione ou armazene o token conforme necessário
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    };

    const onSignup = async () => {
      try {
        const user = await AuthService.signup(signupData.value);
        if (user) {
          router.push({ path: '/' })
        }
        console.log('Usuário criado:', user);
        // Redirecione ou armazene o token conforme necessário
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
      }
    };

    return {
      tab,
      loginData,
      signupData,
      onLogin,
      onSignup
    };
  }


})
</script>
