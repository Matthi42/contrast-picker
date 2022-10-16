import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid'

// a Store for all users
export const useUserStore = defineStore('user', () => {
    // user array is first insatnceated empty
    const users = ref(new Map as Map<string,User>)
    // data from key-value store is loadet into store
    Neutralino.storage.getData('users').then(v => {
        users.value = new Map((JSON.parse(v) as User[]).map(u => [u.id,u]))
        hasLoadet.value = true
    }).catch(e => {
        Neutralino.storage.setData('users', '[]')
    })
    // if data changes the persistet values are updated
    watch(users,async (newVal, oldVal) => {
        await Neutralino.storage.setData('users',JSON.stringify(Array.from(newVal).map(([a,b]) => b)))
    }, { deep: true})

    // getters and setters are normal pinia
    const addUser = (user: User) => {
        console.log(user)
        users.value.set(user.id,user)
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
        users.value.set(newu.id, newu)
        return newu
    }
    const fullUserList = computed(() => Array.from(users.value).map(([a,u]) => u))
    const userList = computed(() => Array.from(users.value).map(([a,u]) => ({ name: u.name, id: u.id })))
    const userByID =  (id:string) => users.value.get(id) as User
    const hasLoadet = ref(false)

    return {
        users,
        userList,
        hasLoadet,
        fullUserList,
        userByID,
        addUser,
        newUser
    }
})