import styles from './NavbarBarbeiro.module.css' 

function NavbarBarbeiro(){
return (<div className={styles.hoverTrocaTelas}>
    <div className={styles.utilHoverTrocaTelas}>
        <div className={styles.opcoesTelas}><span>Agenda</span></div>
        <div className={styles.opcoesTelas}><span>Dashboard</span></div>
        <div className={styles.opcoesTelas}><span>Serviços</span></div>
        <div className={styles.opcoesTelas}><span>Fluxo de Caixa</span></div>
        <div className={styles.opcoesTelas}><span>Funcionarios</span></div>
        <div className={styles.opcoesTelas}><span>Personalização</span></div>
    </div>
</div>)
}

export default NavbarBarbeiro;


