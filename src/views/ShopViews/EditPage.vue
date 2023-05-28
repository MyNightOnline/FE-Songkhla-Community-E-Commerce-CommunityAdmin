<style>
.previewzzz {
    flex-wrap: wrap;
}

#preview1,
#preview2,
#preview3 {
    width: 120px;
    padding: 8px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #999999;
}
</style>

<template>
    <div class="mt-10 container mx-auto grid justify-items-center">
        <div
            class="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="onSubmit" enctype="multipart/form-data">

                <div class="space-y-6">
                    <h5 class="text-xl font-medium text-gray-900 dark:text-white">อัปเดตข้อมูลสินค้า</h5>
                    <div>
                        <label for="first_name" class="required block mb-2 font-medium text-gray-900 dark:text-white">
                            ชื่อสินค้า
                        </label>
                        <input v-model="product.name" type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="ชื่อสินค้า" required>
                    </div>
                    <div>
                        <label for="first_name" class="required block mb-2 font-medium text-gray-900 dark:text-white">
                            ราคา
                        </label>
                        <input v-model="product.price" type="text" name="price" id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="ราคา" required>
                    </div>
                    <div>
                        <label for="first_name" class="required block mb-2 font-medium text-gray-900 dark:text-white">
                            จำนวนสินค้า
                        </label>
                        <input v-model="product.quantity" type="number" name="quantity" id="quantity"
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="จำนวนสินค้า" required>
                    </div>
                    <div>
                        <label for="first_name" class="required block mb-2 font-medium text-gray-900 dark:text-white">
                            ประเภทสินค้า
                        </label>
                        <select v-model="product.category_id" id="category_id" required
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="-1" selected disabled>ประเภทสินค้า</option>
                            <option v-for="({ category_id, name }, index) in default_categories" :key="index"
                                :value="category_id">{{ name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="first_name" class="required block mb-2 font-medium text-gray-900 dark:text-white">
                            ระดับสินค้า
                        </label>
                        <select v-model="product.otop" id="countries"
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                        <label for="first_name" class="required block mb-2 font-medium text-gray-900 dark:text-white">
                            น้ำหนัก (กรัม)
                        </label>
                        <input v-model="product.gram" type="number" name="quantity" id="quantity"
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="น้ำหนัก (กรัม)" required>
                    </div>
                </div>
                <div class="space-y-6">
                    <div>
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <h1>รูปที่ 1</h1>
                                <img class="h-auto max-w-full rounded-lg" :src="product.image1" alt="">
                            </div>
                            <div>
                                <h1>รูปที่ 2</h1>
                                <img class="h-auto max-w-full rounded-lg" :src="product.image2" alt="">
                            </div>
                            <div>
                                <h1>รูปที่ 3</h1>
                                <img class="h-auto max-w-full rounded-lg" :src="product.image3" alt="">
                            </div>
                        </div>
                        <br>
                        <label class="block mb-2 font-medium text-gray-900 dark:text-white" for="file_input">
                            อัพโหลดรูปภาพ
                        </label>
                        <div class="grid grid-cols-3 gap-4">
                            <input @change="previewFiles(1, $event)" ref="file1"
                                class="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                :class="[toggleImg1 ? 'col-span-2' : 'col-span-3']" aria-describedby="file_input_help"
                                id="file_input1" type="file">
                            <button v-if="toggleImg1" type="submit" @click="delPreview(1)"
                                class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                ลบรูป
                            </button>
                        </div>
                        <br>
                        <div class="grid grid-cols-3 gap-4">
                            <input @change="previewFiles(2, $event)" ref="file2"
                                class="col-span-2 block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                :class="[toggleImg2 ? 'col-span-2' : 'col-span-3']" aria-describedby="file_input_help"
                                id="file_input2" type="file">
                            <button v-if="toggleImg2" type="submit" @click="delPreview(2)"
                                class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                ลบรูป
                            </button>
                        </div>
                        <br>
                        <div class="grid grid-cols-3 gap-4">
                            <input @change="previewFiles(3, $event)" ref="file3"
                                class="col-span-2 block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                :class="[toggleImg3 ? 'col-span-2' : 'col-span-3']" aria-describedby="file_input_help"
                                id="file_input2" type="file">
                            <button v-if="toggleImg3" type="submit" @click="delPreview(3)"
                                class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                ลบรูป
                            </button>
                        </div>

                    </div>
                    <button type="submit"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        แก้ไขข้อมูลผลิตภัณฑ์
                    </button>
                    <button type="button" @click="delProduct"
                        class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        ลบสินค้า
                    </button>
                </div>
            </form>
        </div>

    </div>
</template>

<script lang="ts">
import { useUserStore } from "@/store/index"
import axiosClient from "@/utils/axios"

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
                image1: '',
                image2: '',
                image3: '',

                users_commu_id: '',
                category_id: '',
            },

            defaultImg1: '',
            defaultImg2: '',
            defaultImg3: '',

            toggleImg1: false,
            toggleImg2: false,
            toggleImg3: false,

            product_image1: "",
            product_image2: "",
            product_image3: "",

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
            if (this.product.otop == -1) return alert('โปรดเลือกระดับสินค้า')
            const formData = new FormData()

            if (this.toggleImg1) {
                formData.append('file1', this.product_image1[0])
                console.log('success file 1')
            }
            if (this.toggleImg2) {
                formData.append('file2', this.product_image2[0])
                console.log('success file 2')
            }
            if (this.toggleImg3) {
                formData.append('file3', this.product_image3[0])
                console.log('success file 3')
            }
            formData.append('name', this.product.name)
            formData.append('price', this.product.price)
            formData.append('quantity', this.product.quantity)
            formData.append('otop', this.product.otop.toString())
            formData.append('gram', this.product.gram)
            formData.append('users_commu_id', this.product.users_commu_id)
            formData.append('category_id', this.product.category_id)

            try {
                await axiosClient.put(`/products/${this.$route.params.id}`, formData)
                alert('แก้ไขข้อมูลสำเร็จ')
                this.$router.push('/products')
            } catch (e) {
                console.log(e)
            }
        },
        previewFiles(num: Number, event: any) {
            // console.log(event.srcElement.className)
            var input = event.target
            if (input.files) {
                const reader = new FileReader()
                reader.onload = (evt: any) => {
                    if (num == 1) {

                        this.product.image1 = evt.target.result
                        this.toggleImg1 = true
                        this.product_image1 = event.target.files

                    } else if (num == 2) {

                        this.product.image2 = evt.target.result
                        this.toggleImg2 = true
                        this.product_image2 = event.target.files

                    } else if (num == 3) {

                        this.product.image3 = evt.target.result
                        this.toggleImg3 = true
                        this.product_image3 = event.target.files

                    }
                }
                reader.readAsDataURL(input.files[0])
            }

            // if (num == 1) {
            //     this.product.image1 = event.target.result
            // } else if (num == 2) {
            //     this.product.image2 = event.target.result
            // } else if (num == 3) {
            //     this.product.image3 = event.target.result
            // }

        },
        delPreview(num: Number) {
            if (num == 1) {
                (this.$refs as any).file1.value = ''
                this.toggleImg1 = false
                this.product.image1 = this.defaultImg1
            } else if (num == 2) {
                (this.$refs as any).file2.value = ''
                this.toggleImg2 = false
                this.product.image2 = this.defaultImg2
            } else if (num == 3) {
                (this.$refs as any).file3.value = ''
                this.toggleImg3 = false
                this.product.image3 = this.defaultImg3
            }
        },
        async delProduct() {
            if (confirm('คุณต้องการลบผลิตภัณฑ์นี้หรือไม่') == true) {
                try {
                    await axiosClient.put('/products/commu/' + this.$route.params.id, {
                        users_commu_id: 0
                    })
                    alert('ลบผลิตภัณฑ์สำเร็จ')
                    this.$router.push('/products')
                } catch (error: any) {
                    console.log(error)
                }
            }

        },
    },
    async mounted() {
        const result_category = await axiosClient.get('/category')
        this.default_categories = result_category.data

        const { data } = await axiosClient.get('/products/' + this.$route.params.id)

        this.product.name = data.name
        this.product.price = data.price
        this.product.quantity = data.quantity
        this.product.otop = data.otop
        this.product.gram = data.gram

        this.product.image1 = data.image_1
        this.product.image2 = data.image_2
        this.product.image3 = data.image_3

        this.defaultImg1 = data.image_1
        this.defaultImg2 = data.image_2
        this.defaultImg3 = data.image_3

        this.product.users_commu_id = data.users_commu_id
        this.product.category_id = data.category_id

        const dataUser = JSON.parse(localStorage.getItem('user')!)
        if (data.users_commu_id != dataUser.users_commu_id) {
            this.$router.push('/')
            alert('คุณไม่มีสิทธิ์เข้าถึง')
        }
    }
}
</script>

<style>
.required:after {
    content: " *";
    color: red;
}
</style>