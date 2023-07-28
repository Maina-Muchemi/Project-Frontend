import { Link } from 'react-router-dom'


const Public = () => {
    const content = (
        <section className="public-pg">
            <header>
                <h1> <span className="header">DT DOBIE AUTOMOBILES</span></h1>
            </header>
            <main className="public-main-content">
                <p>DT Dobie Kenya was set up in 1949 and is the exclusive Kenyan distributor of the prestigious global brand Volkswagen. It sells a wide range of new passenger vehicles and light commercial vehicles.Also provides regular servicing and repairs.</p>
                <br></br>
                <p>This is the Official Page of DT DOBIE Mechanics and Engineers.Please Enter you credentials in the employee login down below.</p>
                <br></br>
                Thank You For Joining Us Today.
                <br></br>
                <p>Contact For More Clarification,</p>
                <address className="public-address-information">
                    Dt Dobie,<br />
                    
                    Haile Selassie Avenue,General Motors Building,<br />
                    Nairobi City, NRB<br />
                    <a href="tel:+254 333 999">(254) 775-5555</a>
                </address>
                <br />
                <p>CEO, Kenya: Rabesh Kohli.</p>
                <p>General Manager, Kenya: Frank Lehmann.</p>
            </main>
            <footer>
               <button className="Login-Btn"> <Link to="/login">Employee Login</Link></button>
            </footer>
        </section>

    )
    return content
}
export default Public