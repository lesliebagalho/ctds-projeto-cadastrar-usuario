import {Link} from 'react-router-dom';
import styles from "./Header.module.css"

export default function Header(){
    return(
        <>
        <header className={styles.header}>
            <div className={styles.logo}>
                Lo<span>GO</span>
            </div>

            <nav className={styles.nav}>
            <Link to="/home">Home</Link>
            <Link to="/cadastrar">Novo Cadastro</Link>
            <Link to="/listar-cadastro">Listar Cadastro</Link>
            </nav>
        </header>
       
        </>
    )
};
