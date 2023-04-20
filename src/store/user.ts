import router from '@/router'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {
            full_name: ''
        }
    }),

    actions: {
        async signIn(username: string, password: string) {
            
            try {
                const res = await axios.post('http://localhost:3001/api/auth/auth-usercommu', {
                    username: username,
                    password: password
                })
                this.user.full_name = res.data.full_name
                localStorage.setItem('user', JSON.stringify(res.data))
                location.href = '/'
            } catch (err) {
                return 'err'
            }

            
        },
        async signUp(data: any) {
            try {
                const res = await axios.post('http://localhost:3001/api/auth/users-community', data)
                router.push('/login')
            } catch (err) {
                return alert('err')
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