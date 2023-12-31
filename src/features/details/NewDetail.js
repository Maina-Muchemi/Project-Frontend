import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewDetailForm from './NewDetailForm'

const NewDetail = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewDetailForm users={users} />

    return content
}
export default NewDetail