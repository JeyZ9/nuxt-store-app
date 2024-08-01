<script setup lang="ts">
import useSpringApi from '~/composables/useSpringApi';

    // get value for path image from env
    const config = useRuntimeConfig();
    const SPRINGAPI_IMAGE = config.public.urlImage;

    // create variable for save data into products variable
    const products:any = ref([])

    // 
    const page = ref(1); // first page want to display
    const rowPerPage = ref(3) // list amount
    const totalItem = ref() // all list

    // require product api
    //function for fetch product
    const fetchProducts = async () => {
        const { data } = await useSpringApi().getAllProducts(page.value, rowPerPage.value);

        // keep data into products variable
        products.value = data.value?.products
        totalItem.value = data.value?.total
        console.log(data.value)
    } 

    // function for fetch all Category
    const fetchCategory = async () => {
        const { data } = await useSpringApi().getAllCategories()

        categoryList.value = data.value
        console.log(data.value)
    }

    // ----------------- Dialog ---------------------------
    const dialog = ref(false)
    const deletedialog = ref(false)
    const search = ref("");
    const editedIndex = ref(-1)
    const deleteIndex = ref(-1)

    // Close Dialog
    function close() {
        dialog.value = false
        deletedialog.value = false
        setTimeout(() => {
        }, 300)
    }

    //Computed Property
    const formTitle = computed(() => {
        return editedIndex.value === -1 ? "Add New Product" : "Edit Product"
    })


    // Form data
    const productName = ref('')
    const unitPrice  = ref(0)
    const unitStock = ref(0)
    const image = ref<File | null>(null)
    const category = ref('')
    const categoryList = ref([] as any)

    // Reset Form
    const resetForm = () => {
        productName.value = ''
        image.value = null
        files.value = []
        unitPrice.value = 0
        unitStock.value = 0
        category.value = ''
        imageUrl.value = null
    }

    // for image preview =================
    const files: any = ref([])
    const imageUrl = ref<string | null>(null)
    // handle image change
    const handleFileChange = async (e: any) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        const reader = new FileReader()
        reader.onload = (e) => {
        imageUrl.value = e.target?.result as string
        }
        reader.readAsDataURL(file!)
        image.value = files.value[0]
    }
    // remove image
    const removeImage = () => {
        imageUrl.value = null
    }

    // ----------------- Form Validation ----------------
    const nameRules = [
        (v: string) => !!v || "Product name is required",
        (v: string) => (v && v.length >= 5) || "Product name be at least 5 characters",
    ]
    const priceRules = ref([
        (v: string) => !!v || "Price is required",
    ])
    const qtyRules = ref([
        (v: string) => !!v || "Unit in stock is required",
    ])
    const categoryRules = ref([
        (v: string) => !!v || "Category is required",
    ])

    // ----------------- Submit Add Product Form ----------------
    const formAddSubmit = async () => {
        // check form validate
        if(!productName.value || !unitPrice.value || !unitStock.value || !category.value){
            return
        }else{
            // form data
            const formData: any = new FormData();

            formData.append('productName', productName.value)
            formData.append('unitPrice', unitPrice.value)
            formData.append('unitInStock', unitStock.value)
            formData.append('categoryId', category.value)
            // Check if image is selected
            if (image.value) {
                formData.append('image', image.value);
            }
            // Debugging formData entries
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            try{
                // call APIs
                await useSpringApi().createProduct(formData)

                // Reset form
                resetForm()

                // Close Dialog
                close()

                // Fetch products
                fetchProducts()
            }catch (error){
                console.error('Error creating product:', error)
            } 
        }
    }

    // get product by Id
    const editProduct = async (id: number) => {
        // call APIs get product by id
        const { data: product } = await useSpringApi().getProductById(id)

        // set form data
        productName.value = product.value?.productName
        unitPrice.value = product.value?.unitPrice
        unitStock.value = product.value?.unitStock
        category.value = product.value?.categoryId
        
        //check if product has image
        if (product.value?.productPicture){
            imageUrl.value = `${SPRINGAPI_IMAGE}/${product.value?.productPicture}`
        }else{
            imageUrl.value = null
        }

        // set the edited index and open the form
        editedIndex.value = id
    }

    // ----------------- Submit Edit Product Form ----------------
    const formEditSubmit = async () => {

// check form validation
if (!productName.value || !unitPrice.value || !unitStock.value || !category.value) {
    return
} else {

    // Form data
    const formData: any = new FormData()

    formData.append('productName', productName.value)
    formData.append('unitPrice', unitPrice.value)
    formData.append('unitInStock', unitStock.value)
    formData.append('categoryId', category.value)

    // Check if image is selected
    if (image.value) {
        formData.append('image', image.value);
    }

    // Debugging formData entries
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    try {
        // Call API Update Product
        await useSpringApi().updateProduct(editedIndex.value, formData)

        // Reset Form
        resetForm()

        // Close Dialog
        close()

        // Refresh Product List with current page
        const { data: newProducts } = await useSpringApi().getAllProducts(page.value, rowPerPage.value)
        products.value = newProducts.value?.products

    } catch (error) {
        console.error('Error updating product:', error)
    }

}

}

    // ----------------- Delete Product --------------------------
    const deleteProduct = async (id: number) => {
        // Call API Delete Product
        await useSpringApi().deleteProductById(id)
        // Close Dialog
       close()
        // Refresh Product List with current page
        const { data: newProducts } = await useSpringApi().getAllProducts(page.value, rowPerPage.value)
        products.value = newProducts.value?.products
    }

    //require function frist time component load
    onMounted(() => {
        fetchProducts()
        fetchCategory()
    })

    // console.log(prodcuts)

    definePageMeta({
        layout: "backend",
    })

    useHead({
        title:'Prodocut',
        meta: [
            {
                name: 'description',
                content: 'Product page'
            }
        ]
    })
</script>

<template>

    <!-- Add / Edit Product Dialog -->
    <v-dialog v-model="dialog" width="800">
        <v-card>

            <v-card-title class="pa-4 bg-secondary">
                <span class="title text-white">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                <v-form fast-fail ref="form" @submit.prevent="editedIndex === -1 ? formAddSubmit(): formEditSubmit()">
                    <v-row>

                    <v-col cols="12" sm="6">
                        <v-col cols="12" sm="12">
                        <v-text-field
                            v-model="productName"
                            :rules="nameRules"
                            label="Product Name"
                            hide-details="auto"
                            variant="outlined"
                        ></v-text-field> 
                        </v-col>
                        <v-col cols="12" sm="12">
                        <v-text-field
                            v-model="unitPrice"
                            :rules="priceRules"
                            label="Price"
                            hide-details="auto"
                            variant="outlined"
                            type="number"
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12">
                        <v-text-field
                            v-model="unitStock"
                            :rules="qtyRules"
                            label="Unit in Stock"
                            hide-details="auto"
                            variant="outlined"
                            type="number"
                        ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12">
                        <v-select
                            v-model="category"
                            :rules="categoryRules"
                            :items="categoryList"
                            item-title="categoryName"
                            item-value="id"
                            label="Category"
                            hide-details="auto"
                            variant="outlined"
                        ></v-select>
                        </v-col>
                    </v-col>

                    <v-col cols="12" sm="6">
                    
                        <v-col cols="12" sm="12">
                        <!-- Preview Image -->
                        <v-img v-if="imageUrl" :src="imageUrl" class="img-prview">
                            <v-btn icon @click="removeImage">
                            <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-img>

                        <!-- Image Inputs -->
                        <v-file-input
                            @change="handleFileChange"
                            v-model="files"
                            label="Image"
                            hide-details="auto"
                            outlined
                            dense
                            prepend-icon="mdi-image"
                            accept="image/*"
                        ></v-file-input>
                        </v-col>
                    </v-col>

                    </v-row>
                    
                    <v-row justify="center">
                        <!-- Button Submit -->
                        <v-card-actions class="pl-3">
                        <v-btn
                            color="secondary"
                            size="large"
                            variant="elevated"
                            type="submit"
                            >Submit</v-btn
                        >
                        <v-btn color="error" size="large" @click="close">Cancel</v-btn> 
                        </v-card-actions>
                    </v-row>

                </v-form>
                </v-container>
            </v-card-text>

        </v-card>
    </v-dialog>

    <!-- Confirm Delete Dialog -->
    <v-dialog
        v-model="deletedialog"
        width="auto"
    >
        <v-card>
        <v-card-title class="text-h6 mx-3 mt-3">
            Confirm delete product Id: {{ deleteIndex }} ?
        </v-card-title>
        <v-card-actions class="pb-4">
            <v-spacer></v-spacer>
            <v-btn
            color="red-darken-1"
            class="text-button"
            variant="text"
            @click="deleteProduct(deleteIndex)"
            >
            Delete
            </v-btn>
            <v-btn
            color="grey-darken-1"
            class="text-button"
            variant="text"
            @click="deletedialog=false"
            >
            Cancle
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>

    <v-row>
        <v-col cols="12" sm="12">
            <v-card>
                <v-card-text class="pa-5">
                    <v-row>
                        <v-col cols="12" lg="3" md="3">
                            <h2>Product ({{ totalItem }})</h2>
                        </v-col>
                        <v-col cols="12" lg="6" md="6">
                            <v-text-field
                            density="compact"
                            
                            label="Search Products"
                            hide-details
                            variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="3" md="3" class="text-right">
                            <v-btn
                                color="primary"
                                class="ml-auto"
                                variant="elevated"
                                @click="dialog=true;editedIndex=-1;resetForm()"
                            >
                            Add Product
                            </v-btn>
                        </v-col>
                    </v-row>

                    <div>&nbsp;</div>

                    <v-pagination
                        v-model="page"
                        :length="Math.ceil(totalItem / rowPerPage)"
                        next-icon="mdi-chevron-right"
                        prev-icon="mdi-chevron-left"
                        @next="fetchProducts"
                        @prev="fetchProducts"
                        @update:model-value="fetchProducts"
                    ></v-pagination>

                    <v-table class="mt-5">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Product Info</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Category</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products" :key="products.id">
                                <td>{{ product.id }}</td>
                                <td>
                                    <div class="d-flex align-center py-4">
                                        <div v-if="product.productPicture">
                                            <v-img
                                                :src = "`${SPRINGAPI_IMAGE}/${product.productPicture}`"
                                                width="50px"
                                                class="img-fluid"
                                            ></v-img>
                                        </div>
                                        <div v-else-if="product.productPicture.value == 'noimg.jpg' || !product.productPicture">
                                            <v-icon size="60">mdi-image</v-icon>
                                        </div>
                                        <div class="ml-5">
                                            <h4 class="my-2">
                                                {{ product.productName }}
                                            </h4>
                                        </div>
                                    </div>
                                </td>
                                <td>{{ product.unitPrice }}</td>
                                <td>{{ product.unitStock }}</td>
                                <td>{{ product.categoryName }}</td>
                                <td>{{ product.createDate }}</td>
                                
                                <td>
                                    <v-icon
                                        small
                                        class="mr-2 text-info cursor-pointer"
                                        title="Edit"
                                        @click="dialog=true;editedIndex=1;editProduct(product.id)"
                                    >mdi-pencil</v-icon>
                                    <v-icon
                                        small
                                        class="mr-2 text-error cursor-pointer"
                                        title="Delete"
                                        @click="deletedialog=true; deleteIndex=product.id"
                                    >mdi-delete</v-icon>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>