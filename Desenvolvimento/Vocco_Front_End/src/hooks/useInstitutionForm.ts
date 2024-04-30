import { useState } from 'react';

export const useInstituicaoForm = () => {
  const [form, setForm] = useState({
    nome: '',
    site: '',
    notaMec: null,
    sigla: '',
    endereco: {
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleEnderecoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      endereco: {
        ...prevForm.endereco,
        [name]: value,
      },
    }));
  };

  return { form, handleChange, handleEnderecoChange };
};
