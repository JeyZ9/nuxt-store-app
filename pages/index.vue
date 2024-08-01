<script setup lang="ts">

    // require useRouter for change page
    const router = useRouter();

    // import Sweetalert2
    const { $swal } : any = useNuxtApp();

    // require useCookie  for keep data into the cookie storage
    const token = useCookie(
        'token',
        {
            // Set the cookie expiration date after 1 hour.
            maxAge: 60 * 60 * 24
        }
    )

    // เรียกใช้ useCookie สำหรับเก็บข้อมูลลง user data
    const userData = useCookie(
        'userData', {
            // ตั้งค่า cookie ให้หมดอายุหลังจาก 1 ady
            maxAge: 60 * 60 * 24
        }
    )
    

    // create variable bind form and data
    const username = ref('admin1');
    const password = ref('admin123');

    // require useFormRules for validate form
    const { ruleRequired, rulePassLen } = useFormRules();

    // crate function for submit form
    const submitForm = () => {
        // check logical thought validate or not
        if(
            ruleRequired(username.value) == true &&
            ruleRequired(password.value) == true &&
            rulePassLen(password.value) == true
        ){
            // console.log('Username:', username.value);
            // console.log('Password:', password.value);

            // create variable config for runtime config
            const config = useRuntimeConfig();
            const SPRINGAPI_URL = config.public.url;

            // console.log("SPRINGAPI_URL",SPRINGAPI_URL)
            // console.log("SPRINGAPI_IMAGE",SPRINGAPI_IMAGE)

            // login api with spring boot APIs
            useFetch(
                `${SPRINGAPI_URL}/authenticate/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username.value,
                        password: password.value
                    }),
                    onResponse({ request, response, options }){
                        // console.log(response);
                        if(response.status == 401){
                            // console.log('Username or Password is incorrect')
                            // alert('Username or Password is incorrect!')
                            $swal.fire({
                                title: 'Login failed',
                                text: 'Please check your email and password',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            })
                        }else{
                            // console.log('Login success!')
                            // alert('Login success!')
                            $swal.fire({
                                title: 'Login Success',
                                text: 'Welcome to the system',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })

                            

                            // save user data into cookie
                            userData.value = response._data.data;

                            // save token into cookie
                            token.value = JSON.stringify(response._data.data.token);

                            //Delay 2 seconds
                            setTimeout(() => {
                                // close popup
                                $swal.close();
                                // move to dashboard
                                router.push('/backend/dashboard')

                            }, 2000)
                        }
                    }
                }
            )
        }
    }

    useHead({
        title:'Login',
        meta: [
            {
                name: 'description',
                content: 'Login page'
            }
        ]
    })
</script>

<template>
    <VContainer fluid class="fill-height pa-0">
        <VRow no-gutters align="center" justify="center" class="fill-height">
            <VCol class="hidden-sm-and-down fill-height" md="6" lg="6">
                <VImg
                    src="https://wallpaper.dog/large/5557744.jpg"
                    cover
                    class="h-100 rounded-xl rounded-ts-0 rounded-bs-0 d-flex align-center justify-center"
                >
                    <div class="text-center w-50 text-white mx-auto">
                        <h1 class="mb-4">Welcome back.</h1>
                        <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                    </div>
                </VImg>
            </VCol>
            <VCol cols="12" md="6" lg="6" sm="6">
                
                <VRow no-gutters align="center" justify="center">
                    <VCol cols="12" md="6" class="pa-3">
                        <h1>Login</h1>
                        <p class="text-medium-emphasis">Input your username and password</p>
                        <VForm class="mt-7" @submit.prevent="submitForm">
                            <div class="mt-1">
                                <VTextField 
                                    v-model="username"
                                    :rules="[ruleRequired]"
                                    label="Username" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-account"
                                    id="username"
                                    name="username"
                                    type="username"
                                />
                            </div>
                            <div class="mt-1">
                                <VTextField 
                                    v-model="password"
                                    :rules="[ruleRequired, rulePassLen]"
                                    label="Password" 
                                    variant="outlined"
                                    prepend-inner-icon="mdi-lock"
                                    id="password"
                                    name="password"
                                    type="password"
                                />
                            </div>
                            <div class="mt-5 text-center">
                                <VBtn type="submit" 
                                    block
                                    min-height="44" 
                                    class="gradient primary"
                                    >
                                    Login
                                </VBtn>
                            </div>
                        </VForm>
                        <p class="text-center mt-10">
                            <span>Don't have an account? Registe</span>&nbsp;
                            <NuxtLink to="/register" class="text-primary">Register</NuxtLink>
                        </p>
                    </VCol>
                </VRow>
            </VCol>
        </VRow>
    </VContainer>
</template>

<style scoped>

</style>