import { Link } from 'react-router-dom';
import '../styles/styles.css';
{/* Cuando se tiene mas de un elemento hermano directamente dentro del return se usa <> 
    Cuando se hace un componente en react, lo que pongas dentro del return() tiene que estar contenido 
    en un unico elemento HTML o JSX, ese es el elemento raiz.
    React no te deja tener mas de un nodo al mismo nivel sin envolverlo
    sino se quiere agregar un div extra se usa <>
    si tienes un header, un main o footer debes agregarle un div o <>
    */}
function Home() {
    return (
        <> 
            <header>
                <div className="container nav">
                    <h1>Servic</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="#">Oficios</Link></li>
                            <li><Link to="/register">Registrarse</Link></li>
                            <li><Link to="/login">Iniciar sesión</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section className="hero">
                <div className="container">
                    <h2>Encuentra al mejor profesional cerca tuyo</h2>
                    <p>Electricistas, plomeros, carpinteros y más. Todo en un solo lugar.</p>
                    <button>Empezar ahora</button>
                </div>
            </section>

            <section className="sobre-servic">
                <div className="container">
                    <h2>¿Qué es Servic?</h2>
                    <p>Servic es una plataforma donde puedes encontrar profesionales confiables para tareas del hogar o trabajos técnicos.</p>
                </div>
            </section>

            <section className="oficios">
                <div className="container">
                    <h2>Oficios destacados</h2>
                    <div className="cards">
                        <article className="card">
                            <h3>Electricista</h3>
                            <p>Instalaciones, reparaciones y mantenimiento.</p>
                        </article>
                        <article className="card">
                            <h3>Plomero</h3>
                            <p>Reparación de cañerías y sanitarios.</p>
                        </article>
                        <article className="card">
                            <h3>Carpintero</h3>
                            <p>Muebles a medida y arreglos generales.</p>
                        </article>
                    </div>
                </div>
            </section>

            <footer>
                <div className="container">
                    <p>© 2025 Servic. Todos los derechos reservados.</p>
                </div>
            </footer>
        </>
    );
}

export default Home;