import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const DETAILS_REGEX = /^\/dash\/details(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/



const Header = () => {
    const { isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])



    const onNewDetailClicked = () => navigate('/dash/details/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onDetailsClicked = () => navigate('/dash/details')
    const onUsersClicked = () => navigate('/dash/users')

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !DETAILS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "header__container--small"
    }

    

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }



    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }


    let newDetailButton = null
    if (DETAILS_REGEX.test(pathname)) {
        newDetailButton = (
            <button
                className="icon-button"
                title="New Detail"
                onClick={onNewDetailClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    

    let detailsButton = null
    if (!DETAILS_REGEX.test(pathname) && pathname.includes('/dash')) {
        detailsButton = (
            <button
                className="icon-button"
                title="Details"
                onClick={onDetailsClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }



    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )



   

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {newDetailButton}
                {newUserButton}
                {detailsButton}
                {userButton}
                {logoutButton}
            </>
        )
    }






    const content = (
        <>
            

            <header className="header">
                <div className={`header__container ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="header-title">DT DOBIE AUTOMOBILES</h1>
                    </Link>
                    <nav className="header-nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    )

    return content
}
export default Header