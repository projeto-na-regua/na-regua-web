import { useNavigate } from 'react-router-dom';
import utils from "../../utils/globals";


function MenuLateralUsuario(props) {
    const { open } = props;
    const navigate = useNavigate(); // Instância da função navigate

    const handleNavigate = (path) => {
        navigate(path); // Função para navegar para a rota especificada
    };

    const handleLogout = () => {
        utils.logout();
    }

    return (
        <>
           {open && (
            <div style={{
                zIndex: 99999,
                position: "absolute",
                display: "flex",
                backgroundColor: '#fff',
                flexDirection: 'column',
                alignItems: 'center',
                top: '50px',
                width: '100%',
                fontSize: 15,
                color: '#082031',
                boxShadow: '0 4px 8px rgba(8, 32, 49, .5)',
                gap: 10,
                padding: '15px 0',
                borderRadius: '0 0 12px 12px'
            }}>
                <div onClick={() => handleNavigate('/meus-cortes')}>Meus cortes</div>
                <div style={{
                    width: '80%',
                    backgroundColor: '#082031',
                    height: '1px'
                }}></div>
                <div onClick={() => handleNavigate('/meus-agendamentos')}>Meus agendamentos</div>
                <div style={{
                    width: '80%',
                    backgroundColor: '#082031',
                    height: '1px'
                }}></div>
                <div onClick={handleLogout}>Sair</div>
            </div>
           )}
        </>
    );
}

export default MenuLateralUsuario;
