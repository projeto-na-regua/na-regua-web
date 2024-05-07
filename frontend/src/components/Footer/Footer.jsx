import iconFace from '../../utils/assets/IconsFooter/facebook.png'
import iconInsta from '../../utils/assets/IconsFooter/instagram.png'
import style from './Footer.module.css'


export function Footer(props) {
    return (

        <div className={style.divTodoFooter}>
            <div className={style.divSaibaMais}>
                <div className={style.divConteudoSaibaMais}>
                    <div className={style.titulo}>Saiba Mais</div>
                    <div className={style.subTitulo}>Sobre Nós</div>
                </div>
            </div>

            <div className={style.divFaleComAGente}>
                <div className={style.divConteudoFaleComAGente}>
                    <div className={style.titulo}>Fale com a gente</div>

                    <div className={style.subTituloFaleComAGente}>
                        <div>Telefone:</div>
                        <div>(11) 9090-0909</div>
                    </div>

                    <div className={style.subTituloFaleComAGente}>
                        <div>E-mail:</div>
                        <div>contato@naregua.com</div>
                    </div>
                </div>
            </div>

            <div className={style.divSocial}>
                <div className={style.divConteudoSaibaMais}>
                    <div className={style.titulo}>Saiba Mais</div>
                    <div className={style.subTituloSocial}>

                        <div className={style.divIcons}>
                            <img className={style.imagemSocial} src={iconFace} alt="" />
                            <img className={style.imagemSocial} src={iconInsta} alt="" />
                        </div>

                        <div className={style.separacao}></div>

                    </div>
                </div>
            </div>


        </div>

    )
}