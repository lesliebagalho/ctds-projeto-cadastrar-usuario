import Footer from "../../components/Footer/Footer";
import styles from "./home.module.css"

export default function Home(){
    return(
        <>
        <div className={styles.container}>
            <h1>Olá, pagina home!</h1>
        
            <div className={styles.footer}>
                <Footer/>
          </div>
        </div>
        </>
    );
}
