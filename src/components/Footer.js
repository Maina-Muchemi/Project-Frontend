import useAuth from "../hooks/useAuth"

const Footer = () => {

    const { username, status } = useAuth()
    const content = (
        <footer className="footer">
           
            <p>Current User logged in: {username}</p>
            <p>Status: {status}</p>
        </footer>
    )
    return content
}
export default Footer

   

    

    