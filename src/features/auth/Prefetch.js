import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../../app/store'
import { detailsApiSlice } from '../details/detailsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';


const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const details = store.dispatch(detailsApiSlice.endpoints.getDetails.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log('unsubscribing')
            details.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch