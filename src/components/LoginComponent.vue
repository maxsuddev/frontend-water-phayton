<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {MessageNotification} from "@/ui-components/index.js";

const store = useStore();
const router = useRouter();
const userName = ref('');
const password = ref('');

const isLoading = computed(() => store.state.auth.isLoadingAuth);
const errors = computed(() => store.getters.errorAuth)
const errorMessage = computed(() => store.getters.errorMessageAuth)

    const submitHandler = async (e) => {
  e.preventDefault();
      const data = {
        username: userName.value,
        password: password.value,
      };
       await store.dispatch('login', data);
       await router.push({ name: 'dashboard' });

    }
</script>

<template>
  <div>
    <main>
      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">

          <MessageNotification
              :errorMessage="errorMessage"
          />
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                  </div>

                  <form class="row g-3 needs-validation" novalidate @submit="submitHandler">
                    <div class="col-12">
                      <label for="yourUsername" class="form-label">Username</label>
                      <input v-model="userName" type="text" name="username" class="form-control" id="yourUsername" required>
                      <p v-if="errors.username" class="text-danger">{{ errors.username[0] }}</p>

                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">Password</label>
                      <input v-model="password" type="password" name="password" class="form-control" id="yourPassword" required>
                      <p v-if="errors.password" class="text-danger">{{ errors.password[0] }}</p>
                    </div>

                    <div class="col-12">
                      <button :disabled="isLoading" class="btn btn-primary w-100" type="submit">Login</button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
