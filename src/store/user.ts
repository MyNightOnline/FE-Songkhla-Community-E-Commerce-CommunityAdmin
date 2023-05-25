import router from '@/router'
import { defineStore } from 'pinia'
import axiosClient from "@/utils/axios"

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {
            full_name: ''
        }
    }),

    actions: {
        async signIn(username: string, password: string) {
            try {
                const res = await axiosClient.post('/auth/auth-usercommu', {
                    username: username,
                    password: password
                })
                console.log(res)
                if (res.data.msg) return alert('ชื่อผู้ใช้หรือรหัสผ่านผิด')
                this.user.full_name = res.data.full_name
                localStorage.setItem('user', JSON.stringify(res.data))
                location.href = '/'
            } catch (err: any) {
                return 'err'
            }

            
        },
        async signUp(data: any) {
            try {
                const res = await axiosClient.post('/auth/users-community', data)
                alert('สมัครเสร็จสิ้น')
                router.push('/login')
                return res
            } catch (err:any) {
                console.log(err.response.data.err)
                return alert('มีชื่อผู้ใช้นี้แล้ว')
            }

        },
        signOut() {
            localStorage.removeItem('user')
            this.user.full_name = ''
            router.push('/login')
        }
    },

    getters: {
        getUser(state) {
            return state.user.full_name
        }
    }

})