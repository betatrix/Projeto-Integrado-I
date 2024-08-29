import { Title } from './styles'; // importando o titulo estilizado para o componente da página
import { BackPageButton } from '../../../components/backPageButton/style'; // importando componente de botão reutilizável

// componente base dessa página
function InstitutionUpdate() {
    return (
        <div>
            <Title>Atualização de Instituição</Title>
            <BackPageButton>Voltar</BackPageButton>
        </div>
    );
}

export default InstitutionUpdate;