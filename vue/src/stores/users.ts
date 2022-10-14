import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid'

// a Store for all users
export const useUserStore = defineStore('user', () => {
    // user array is first insatnceated empty
    const users = reactive([] as User[])
    // data from key-value store is loadet into store
    Neutralino.storage.getData('users').then(v => {
        Object.assign(users, reactive(JSON.parse(v) as User[]))
        hasLoadet.value = true
    })
    // if data changes the persistet values are updated
    watch(users,async (newVal, oldVal) => {
        await Neutralino.storage.setData('users',JSON.stringify(newVal))
    }, { deep: true})

    // getters and setters are normal pinia
    const addUser = (user: User) => {
        console.log(user)
        let u = users.find(us => us.id = user.id)
        u = user
    }
    const newUser = () => {
        const id = uuidv4()
        const newu = {
            id: id,
            familyName: "",
            name: "",
            birthday: "",
            disabilities: [],
            colors: []
        }
        users.push(newu)
        return newu
    }
    
    const userList = computed(() => users.map(u => ({ name: u.name, id: u.id })))
    const userByID =  (id:string) => users.find(u => u.id == id) as User
    const hasLoadet = ref(false)

    return {
        users,
        userList,
        hasLoadet,
        userByID,
        addUser,
        newUser
    }
})