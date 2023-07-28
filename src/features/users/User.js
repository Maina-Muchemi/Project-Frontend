import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table-cell-inactive'

        return (
            <tr >
                <td className={` ${cellStatus}`}>{user.username}</td>
                <td className={` ${cellStatus}`}>{userRolesString}</td>
                <td className={` ${cellStatus}`}>
                    <button
                        className="icon-button"
                        onClick={handleEdit}
                    >
                        +
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default User