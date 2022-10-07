import { defineStore } from "pinia";
import { computed, reactive, watch } from "vue";

// a Store for all users
export const useUserStore = defineStore('user', () => {
    // user array is first insatnceated empty
    const users = reactive([] as User[])
    // data from key-value store is loadet into store
    Neutralino.storage.getData('users').then(v => {
        Object.assign(users, reactive(JSON.parse(v) as object[]))
    })
    // if data changes the persistet values are updated
    watch(users,async (newVal, oldVal) => {
        await Neutralino.storage.setData('users',JSON.stringify(newVal))
    }, { deep: true})

    // getters and setters are normal pinia
    const addUser = (user: User) => {
        users.push(user)
    }
    
    const userList = computed(() => users.map(u => ({ name: u.name, id: u.id })))

    return {
        userList,
        addUser
    }
})