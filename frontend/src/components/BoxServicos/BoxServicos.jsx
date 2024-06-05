import React from "react";
import styles from "./BoxServicos.module.css";
import TresPontinhos from "../../utils/assets/Group 69.png";
import Checkbox from '@mui/material/Checkbox';

function BoxServicos() {
    return (
        <div className={styles.gridContainer}>
            <div className={styles.boxTodoServico}>

                {/* HEADER FIXO */}
                <div className={styles.headerFixoServico}>
                    <div>
                        <Checkbox />
                    </div>
                    <div className={styles.divServico}>Serviço</div>
                    <div className={styles.divDescricao}>Descrição</div>
                    <div className={styles.divDuracao}>Duração</div>
                    <div className={styles.divValor}>Valor</div>
                    <div className={styles.divVazia}> </div>
                </div>

                <div className={styles.gridServico}>

                    {/* SERVIÇO */}
                    <div className={styles.servico}>
                        <div className={styles.borda}>
                            <div className={styles.divCheckbox}>
                                <Checkbox className={styles.Checkbox} />
                            </div>
                            <div className={styles.divServicoGrid}>Corte</div>
                            <div className={styles.divDescricao}>Inclui apenas corte</div>
                            <div className={styles.divDuracao}>1h</div>
                            <div className={styles.divValorGrid}>30,00</div>

                        </div>
                        <div className={styles.divVaziaGrid}>
                            <button><img src={TresPontinhos} alt="" /></button>
                        </div>
                    </div>

                    {/* SERVIÇO */}
                    <div className={styles.servico}>
                        <div className={styles.borda}>
                            <div className={styles.divCheckbox}>
                                <Checkbox className={styles.Checkbox} />
                            </div>
                            <div className={styles.divServicoGrid}>Escova</div>
                            <div className={styles.divDescricao}>Lavagem + Escova</div>
                            <div className={styles.divDuracao}>1h30</div>
                            <div className={styles.divValorGrid}>80,00</div>

                        </div>
                        <div className={styles.divVaziaGrid}>
                            <button><img src={TresPontinhos} alt="" /></button>
                        </div>
                    </div>

                    {/* SERVIÇO */}
                    <div className={styles.servico}>
                        <div className={styles.borda}>
                            <div className={styles.divCheckbox}>
                                <Checkbox className={styles.Checkbox} />
                            </div>
                            <div className={styles.divServicoGrid}>Coloração</div>
                            <div className={styles.divDescricao}>Pintura capilar</div>
                            <div className={styles.divDuracao}>1h15</div>
                            <div className={styles.divValorGrid}>50,00</div>

                        </div>
                        <div className={styles.divVaziaGrid}>
                            <button><img src={TresPontinhos}  alt="" /></button>
                        </div>
                    </div>

                </div>



            </div>

        </div>
    );
}

export default BoxServicos;