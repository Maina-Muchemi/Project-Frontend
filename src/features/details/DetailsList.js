import { useGetDetailsQuery } from "./detailsApiSlice"
import Detail from "./Detail"
import useAuth from "../../hooks/useAuth"

const DetailsList = () => {

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: details,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetDetailsQuery('detailsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = details

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(detailId => entities[detailId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(detailId => <Detail key={detailId} detailId={detailId} />)

        content = (
            <table className="table table--details">
                <thead className="table-thead">
                    <tr>
                        <th scope="col" className="table-th detail-status">Username</th>
                        <th scope="col" className="table-th detail-created">Created</th>
                        <th scope="col" className="table-th detail-updated">Updated</th>
                        <th scope="col" className="table-th detail-title">Title</th>
                        <th scope="col" className="table-th detail-username">Owner</th>
                        <th scope="col" className="table-th detail-edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default DetailsList