<style>
.required:after {
    content: " *";
    color: red;
}
</style>
<template>
    <div class="mt-10 container mx-auto grid justify-items-center">
        <div
            class="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="onSubmit" enctype="multipart/form-data">
                <div class="space-y-6">
                    <h5 class="text-xl font-medium text-gray-900 dark:text-white">เพิ่มข้อมูลสินค้า</h5>
                    <div>
                        <label for="product-name"
                            class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ชื่อสินค้า</label>
                        <input v-model="product.name" type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="ชื่อสินค้า" required>
                    </div>
                    <div>
                        <label for="price" class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ราคา</label>
                        <input v-model="product.price" type="text" name="price" id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="ราคา" required>
                    </div>
                    <div>
                        <label for="qty" class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            จำนวนสินค้า</label>
                        <input v-model="product.quantity" type="number" name="quantity" id="quantity"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="จำนวนสินค้า" required>
                    </div>
                    <div>
                        <label for="category" class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ประเภทสินค้า</label>
                        <select v-model="product.category_id" id="category_id" required
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="-1" selected disabled>ประเภทสินค้า</option>
                            <option v-for="({ category_id, name }, index) in default_categories" :key="index"
                                :value="category_id">{{ name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="levels" class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ระดับสินค้า</label>
                        <select v-model="product.otop" id="otop" required
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="-1" selected disabled>ระดับสินค้า</option>
                            <option value="0">ทั่วไป</option>
                            <option value="1">OTOP 1 ดาว</option>
                            <option value="2">OTOP 2 ดาว</option>
                            <option value="3">OTOP 3 ดาว</option>
                            <option value="4">OTOP 4 ดาว</option>
                            <option value="5">OTOP 5 ดาว</option>
                        </select>
                    </div>
                    <div>
                        <label for="gram" class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            น้ำหนัก (กรัม)</label>
                        <input v-model="product.gram" type="number" name="quantity" id="quantity"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="น้ำหนัก (กรัม)" required>
                    </div>
                </div>
                <div class="space-y-6">
                    <div>
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <h1>รูปที่ 1</h1>
                                <img class="h-auto max-w-full rounded-lg" :src="product_image1" alt="">
                            </div>
                            <div>
                                <h1>รูปที่ 2</h1>
                                <img class="h-auto max-w-full rounded-lg" :src="product_image2" alt="">
                            </div>
                            <div>
                                <h1>รูปที่ 3</h1>
                                <img class="h-auto max-w-full rounded-lg" :src="product_image3" alt="">
                            </div>
                        </div>
                        <br>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">
                            อัพโหลดรูปภาพ
                        </label>
                        <div class="grid grid-cols-3 gap-4">
                            <input @change="previewFiles(1, $event)" ref="file1"
                                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                :class="[toggleImg1 ? 'col-span-2' : 'col-span-3']" aria-describedby="file_input_help"
                                id="file_input1" type="file" required>
                            <button v-if="toggleImg1" type="submit" @click="delPreview(1)"
                                class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                ลบรูป
                            </button>
                        </div>
                        <br>
                        <div class="grid grid-cols-3 gap-4">
                            <input @change="previewFiles(2, $event)" ref="file2"
                                class="col-span-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                :class="[toggleImg2 ? 'col-span-2' : 'col-span-3']" aria-describedby="file_input_help"
                                id="file_input2" type="file" required>
                            <button v-if="toggleImg2" type="submit" @click="delPreview(2)"
                                class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                ลบรูป
                            </button>
                        </div>
                        <br>
                        <div class="grid grid-cols-3 gap-4">
                            <input @change="previewFiles(3, $event)" ref="file3"
                                class="col-span-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                :class="[toggleImg3 ? 'col-span-2' : 'col-span-3']" aria-describedby="file_input_help"
                                id="file_input2" type="file" required>
                            <button v-if="toggleImg3" type="submit" @click="delPreview(3)"
                                class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                ลบรูป
                            </button>
                        </div>

                    </div>
                    <button type="submit"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        เพิ่มข้อมูลสินค้า
                    </button>
                </div>
            </form>
        </div>

    </div>
</template>

<script lang="ts">
import { useUserStore } from "@/store/index"
import axios from "axios"

export default {
    setup() {
        const userStore = useUserStore()

        return { userStore }
    },
    data() {
        return {
            product: {
                name: '',
                price: '',
                quantity: '',
                otop: -1,
                gram: '',
                imageUp1: '',
                imageUp2: '',
                imageUp3: '',

                users_commu_id: '',
                category_id: '-1',
            },
            product_image1: "",
            product_image2: "",
            product_image3: "",

            toggleImg1: false,
            toggleImg2: false,
            toggleImg3: false,

            default_categories: [
                {
                    "category_id": 47,
                    "name": "การผลิตปศุสัตว์"
                }
            ]
        }
    },
    methods: {
        async onSubmit() {
            if (this.product.otop == -1 || this.product.category_id == '-1') return alert('โปรดเลือก ประเภทสินค้า/ระดับสินค้า')
            console.log(
                `${this.product.name}\n` +
                `${this.product.price}\n` +
                `${this.product.quantity}\n` +
                `${this.product.otop}\n` +
                `${this.product.gram}\n` +
                `${this.product.users_commu_id}\n` +
                `${this.product.category_id}\n`
            )
            console.log(this.product_image1)
            console.log(this.product_image2)
            console.log(this.product_image3)
            const formData = new FormData()


            formData.append('file1', this.product.imageUp1[0])
            formData.append('file2', this.product.imageUp2[0])
            formData.append('file3', this.product.imageUp3[0])
            formData.append('name', this.product.name)
            formData.append('price', this.product.price)
            formData.append('quantity', this.product.quantity)
            formData.append('otop', this.product.otop.toString())
            formData.append('gram', this.product.gram)
            formData.append('users_commu_id', this.product.users_commu_id)
            formData.append('category_id', this.product.category_id)

            await axios.post('http://localhost:3001/api/products', formData)

            await this.$router.push('/')
        },
        previewFiles(num: Number, event: any) {
            var input = event.target
            if (input.files) {
                const reader = new FileReader()
                reader.onload = (evt: any) => {
                    if (num == 1) {

                        this.product_image1 = evt.target.result
                        this.toggleImg1 = true
                        this.product.imageUp1 = event.target.files

                    } else if (num == 2) {

                        this.product_image2 = evt.target.result
                        this.toggleImg2 = true
                        this.product.imageUp2 = event.target.files

                    } else if (num == 3) {

                        this.product_image3 = evt.target.result
                        this.toggleImg3 = true
                        this.product.imageUp3 = event.target.files

                    }
                }
                reader.readAsDataURL(input.files[0])
            }
        },
        delPreview(num: Number) {
            if (num == 1) {
                (this.$refs as any).file1.value = ''
                this.toggleImg1 = false
                this.product_image1 = ''
            } else if (num == 2) {
                (this.$refs as any).file2.value = ''
                this.toggleImg2 = false
                this.product_image2 = ''
            } else if (num == 3) {
                (this.$refs as any).file3.value = ''
                this.toggleImg3 = false
                this.product_image3 = ''
            }
        },
    },
    async mounted() {
        const result_category = await axios.get('http://localhost:3001/api/category')
        this.default_categories = result_category.data

        const data = JSON.parse(localStorage.getItem('user')!)
        this.product.users_commu_id = data.users_commu_id
    }
}
</script>