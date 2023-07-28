import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectDetailById } from './detailsApiSlice'

const Detail = ({ detailId }) => {

    const detail = useSelector(state => selectDetailById(state, detailId))

    const navigate = useNavigate()

    if (detail) {
        const created = new Date(detail.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(detail.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/details/${detailId}`)

        return (
            <tr className="table-row">
                <td className="table-cell detail-status">
                    {detail.completed
                        ? <span className="detail-status--completed">Completed</span>
                        : <span className="detail-status--open">Ongoing</span>
                    }
                </td>
                <td className="table-cell detail-created">{created}</td>
                <td className="table-cell detail-updated">{updated}</td>
                <td className="table-cell detail-title">{detail.title}</td>
                <td className="table-cell detail-username">{detail.username}</td>

                <td className="table-cell">
                    <button
                        className="icon-button table-button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Detail