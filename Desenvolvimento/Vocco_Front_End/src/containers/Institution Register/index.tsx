import { Title } from "./styles" // importando o titulo estilizado para o componente da página
import { BackPageButton } from "../../components/Back Page Button/style" // importando componente de botão reutilizável

// componente base dessa página
function InstitutionRegister() {
    return (
        <div>
            <Title>Cadastro de Instituição</Title>
            <BackPageButton>Voltar</BackPageButton>
        </div>
    )
}

export default InstitutionRegister