import React from 'react';
import styles from './SemiCirculoContentamento.module.css';

function SemiCirculoContentamento({ percentage }) {
    return (
        <div className={styles.circularProgress}>
            <div className={styles.progressCircle}>
                <div className={styles.progress} style={{ transform: `rotate(${percentage * 1.8}deg)` }}></div>
            </div>
        </div>
    );
}

export default SemiCirculoContentamento;
