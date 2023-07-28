import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const { username} = useAuth()

    

    const content = (
        <section className="welcome">

            

            <h1>Greetings {username}!</h1>
            <p>Welcome to DT DOBIE official work outline.
                Click on below to where you want to go,
            </p>

            <p><Link to="/dash/details">✅see details modified by engineers</Link></p>

            <p><Link to="/dash/details/new">✅Add New detail</Link></p>

            <p><Link to="/dash/users">✅ User Settings</Link></p>

            <p><Link to="/dash/users/new">✅Add New User</Link></p>

            <footer>🎖️Remember an engineer is the tool.</footer>

        </section>
    )

    return content
}
export default Welcome