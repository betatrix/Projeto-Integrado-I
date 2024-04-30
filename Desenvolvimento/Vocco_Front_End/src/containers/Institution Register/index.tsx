
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { cadastrarInstituicao } from '../../services/institutionService';
import { useInstituicaoForm } from '../../hooks/useInstitutionForm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export const CadastroInstituicao = () => {
  const { form, handleChange, handleEnderecoChange } = useInstituicaoForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await cadastrarInstituicao(form);
      console.log('Instituição cadastrada com sucesso:', response);
    } catch (error) {
      console.error('Erro ao cadastrar instituição:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>Cadastro de Instituição</Typography>
      <TextField
        label="Nome da Instituição"
        name="nome"
        value={form.nome}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Site"
        name="site"
        value={form.site}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Nota MEC"
        name="notaMec"
        type="number"
        value={form.notaMec || ''}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Sigla"
        name="sigla"
        value={form.sigla}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="CEP"
        name="cep"
        value={form.endereco.cep}
        onChange={handleEnderecoChange}
        variant="outlined"
      />
      <TextField
        label="Logradouro"
        name="logradouro"
        value={form.endereco.logradouro}
        onChange={handleEnderecoChange}
        variant="outlined"
      />
      <TextField
        label="Número"
        name="numero"
        value={form.endereco.numero}
        onChange={handleEnderecoChange}
        variant="outlined"
      />
      <TextField
        label="Complemento"
        name="complemento"
        value={form.endereco.complemento}
        onChange={handleEnderecoChange}
        variant="outlined"
      />
      <TextField
        label="Bairro"
        name="bairro"
        value={form.endereco.bairro}
        onChange={handleEnderecoChange}
        variant="outlined"
      />
      <TextField
        label="Cidade"
        name="cidade"
        value={form.endereco.cidade}
        onChange={handleEnderecoChange}
        variant="outlined"
      />
      <TextField
        label="Estado"
        name="estado"
        value={form.endereco.estado}
        onChange={handleEnderecoChange}
        variant="outlined"
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Cadastrar Instituição</Button>
    </Box>
  );
};

//biblioteca de componentes: MUI
// npm install @mui/material @emotion/react @emotion/styled
// npm install @mui/icons-material



// import { Title } from "./styles" // importando o titulo estilizado para o componente da página
// import { BackPageButton } from "../../components/Back Page Button/style" // importando componente de botão reutilizável

// // componente base dessa página
// function InstitutionRegister() {
//     return (
//         <div>
//             <Title>Cadastro de Instituição</Title>
//             <BackPageButton>Voltar</BackPageButton>
//         </div>
//     )
// }

// export default InstitutionRegister