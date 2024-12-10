/* eslint-disable max-len */
import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { StudentRegisterForm } from '../../../types/studentTypes';
import { cadastroEstudante } from '../../../services/studentService';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import 'yup-phone-lite';
import { Formik, Form } from 'formik';
import { Alert, Box, Button, Checkbox, FilledInput, FormControlLabel, IconButton, InputAdornment, InputLabel, LinearProgress, Link, Modal, Snackbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import {
    backButton,
    container,
    customAutocomplete,
    customField,
    customInputLabel,
    customLink,
    formContainer,
    globalStyle,
    header,
    headerRegister,
    registerButton,
    registerContainer,
    sidePanel,
    subText,
    subTitle,
    textTermsPolicies
} from './styles';
import { useTranslation } from 'react-i18next';
import LanguageMenu from '../../../components/translationButton';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { ModalContent } from '../resultTest/new-styles';

const nivelEducacao = [
    { label: 'Ensino Fundamental', value: 'ENSINO_FUNDAMENTAL' },
    { label: 'Ensino Médio', value: 'ENSINO_MEDIO' },
    { label: 'Superior incompleto', value: 'ENSINO_SUPERIOR_INCOMPLETO' },
    { label: 'Superior completo', value: 'ENSINO_SUPERIOR_COMPLETO' },
];

const initialValues: StudentRegisterForm = {
    nome: '',
    email: '',
    senha: '',
    dataNascimento: '',
    celular: '',
    nivelEscolar: '',
};

const textTerms = `
    Termos de Uso e Serviço da Vocco

    Última atualização: 13 de outubro de 2024

    Seja Bem-Vindo ao site da Vocco. Antes de explorar tudo o que temos a oferecer, é importante que você entenda e concorde com algumas regras básicas que regem o uso do nosso site https://vocco.vercel.app/pagina-inicial, e qualquer outro serviço digital que nós oferecemos, como lojas e plataformas de e-commerce.
    Ao usar nosso site e serviços, você automaticamente concorda em seguir as regras que estabelecemos aqui. Caso não concorde com algo, por favor, considere não usar nossos serviços. É muito importante para nós que você se sinta seguro e informado a todo momento.
    
    1. Aceitando os Termos
    Ao navegar e usar o site da Vocco, você concorda automaticamente com nossas regras e condições. Estamos sempre procurando melhorar, então esses termos podem mudar de vez em quando. Se fizermos alterações significativas, vamos postar as atualizações aqui no site. Continuar usando o site após essas mudanças significa que você aceita os novos termos.
    
    2. Como Usar o Nosso Site
    Para utilizar nosso site, algumas seções especiais podem exigir que você crie uma conta. Pedimos que você seja honesto ao fornecer suas informações e que mantenha sua senha e login seguros. Se decidir compartilhar algum conteúdo conosco, como comentários, por favor, faça-o de maneira respeitosa e dentro da lei.
    
    3. Sua Privacidade
    Na Vocco, a privacidade é um valor essencial. Ao interagir com nosso site, você aceita nossa Política de Privacidade, que detalha nossa abordagem responsável e conforme às leis para o manejo dos seus dados pessoais. Nosso compromisso é com a transparência e a segurança: explicamos como coletamos, usamos e protegemos suas informações, garantindo sua privacidade e oferecendo controle sobre seus dados.
    Adotamos práticas de segurança para proteger suas informações contra acesso não autorizado e compartilhamento indevido, assegurando que qualquer cooperação com terceiros ocorra apenas com base na sua aprovação ou exigências legais claras, reafirmando nosso comprometimento com a sua confiança e segurança digital.
    
    4. Direitos de Conteúdo
    O conteúdo disponível no site da Vocco, incluindo, mas não se limitando a, textos, imagens, ilustrações, designs, ícones, fotografias, programas de computador, videoclipes e áudios, constitui propriedade intelectual protegida tanto pela legislação nacional quanto por tratados internacionais sobre direitos autorais e propriedade industrial. Essa propriedade engloba não apenas materiais diretamente produzidos e publicados por nós, mas também conteúdos que são utilizados sob licença ou permissão de terceiros, garantindo que todos os direitos sejam respeitados conforme as normativas vigentes.
    Ao acessar nosso site, você recebe uma licença limitada, não exclusiva e revogável para visualizar e usar o conteúdo para fins pessoais e não comerciais. Isso implica que qualquer reprodução, distribuição, transmissão ou modificação do conteúdo, sem a devida autorização escrita da Vocco, é estritamente proibida. Tal restrição visa proteger os direitos de propriedade intelectual associados aos materiais disponibilizados, assegurando que sua utilização não infrinja os direitos dos criadores ou detentores desses direitos, além de promover um ambiente de respeito e valorização da criatividade e inovação.
   
    5. Explorando Links Externos
    Nosso site pode incluir links para sites externos que achamos que podem ser do seu interesse. Note que não temos controle sobre esses sites externos e, portanto, não somos responsáveis pelo seu conteúdo ou políticas.
    
    6. Mudanças e Atualizações
    A evolução é parte de como operamos, o que significa que estes Termos de Uso podem passar por atualizações para refletir melhor as mudanças em nossos serviços ou na legislação. Sempre que isso acontecer, você encontrará a versão mais recente disponível aqui. Se as mudanças forem significativas, faremos o possível para notificá-lo através dos meios de contato que você nos forneceu.
    Continuar a acessar o site após essas mudanças indica que você concorda com os novos termos. Se, por qualquer motivo, você não concordar com as atualizações, pedimos que não continue utilizando nosso site e serviços.
    
    Dúvidas ou Comentários?
    Se tiver dúvidas sobre estes termos, não hesite em nos contatar através do e-mail voccosupp@gmail.com.
`;

const textPolicies = `
    Política de privacidade

    Última atualização: 13 de outubro de 2024

    Esta Política de Privacidade descreve nossas políticas e procedimentos sobre a coleta, uso e divulgação de suas informações quando você usa o Serviço e informa sobre seus direitos de privacidade e como a lei o protege.
    Usamos seus dados pessoais para fornecer e melhorar o serviço. Ao usar o Serviço, você concorda com a coleta e uso de informações de acordo com esta Política de Privacidade. 
    
    Interpretação e definições
   
    Interpretação
    As palavras cuja letra inicial é maiúscula têm significados definidos nas seguintes condições. As definições que se seguem têm o mesmo significado, independentemente de aparecerem no singular ou no plural.
   
    Definições
    Para os fins desta Política de Privacidade:
    - Conta significa uma conta exclusiva criada para Você acessar nosso Serviço ou partes de nosso Serviço.
    - Afiliada significa uma entidade que controla, é controlada ou está sob controle comum com uma parte, onde "controle" significa propriedade de 50% ou mais das ações, participação acionária ou outros valores mobiliários com direito a voto para eleição de diretores ou outra autoridade administrativa.
    - Empresa (referida como "a Empresa", "Nós",ou "Nosso" neste Contrato) refere-se à Ada's Tech, Rua Pedro Vicente, 625.
    - Cookies são pequenos arquivos que são colocados em seu computador, dispositivo móvel ou qualquer outro dispositivo por um site, contendo os detalhes de seu histórico de navegação neste site entre seus muitos usos.
    - País refere-se a: Brasil.
    - Dispositivo significa qualquer dispositivo que possa acessar o Serviço, como um computador, um celular ou um tablet digital.
    - Dados Pessoais são quaisquer informações relacionadas a um indivíduo identificado ou identificável.
    - Serviço refere-se ao Site.
    - Prestador de Serviços significa qualquer pessoa física ou jurídica que processa os dados em nome da Empresa. Refere-se a empresas ou indivíduos terceirizados empregados pela Empresa para facilitar o Serviço, fornecer o Serviço em nome da Empresa, executar serviços relacionados ao Serviço ou auxiliar a Empresa na análise de como o Serviço é usado.
    - Dados de Uso referem-se a dados coletados automaticamente, gerados pelo uso do Serviço ou da própria infraestrutura do Serviço (por exemplo, a duração de uma visita à página).
    - Site refere-se a Vocco, acessível a partir de https://vocco.vercel.app/pagina-inicial
    - Você significa o indivíduo que acessa ou usa o Serviço, ou a empresa ou outra entidade legal em nome da qual tal indivíduo está acessando ou usando o Serviço, conforme aplicável.
    
    Coletando e usando seus dados pessoais
    
    Tipos de dados coletados
    
    Dados pessoais
    Ao usar nosso serviço, podemos solicitar que você nos forneça certas informações de identificação pessoal que podem ser usadas para contatá-lo ou identificá-lo. As informações de identificação pessoal podem incluir, mas não estão limitadas a:
    - Endereço eletrônico
    - Nome e sobrenome
    - Telefone
    - Dados de uso
    
    Dados de uso
    Os Dados de Uso são coletados automaticamente ao usar o Serviço.
    Os Dados de Uso podem incluir informações como o endereço de protocolo de Internet do seu dispositivo (por exemplo, endereço IP), tipo de navegador, versão do navegador, as páginas do nosso Serviço que você visita, a hora e a data da sua visita, o tempo gasto nessas páginas, identificadores exclusivos do dispositivo e outros dados de diagnóstico.
    Quando você acessa o Serviço por ou por meio de um dispositivo móvel, podemos coletar certas informações automaticamente, incluindo, mas não se limitando a, o tipo de dispositivo móvel que você usa, o ID exclusivo do seu dispositivo móvel, o endereço IP do seu dispositivo móvel, seu sistema operacional móvel, o tipo de navegador de Internet móvel que você usa, identificadores exclusivos de dispositivo e outros dados de diagnóstico.
    Também podemos coletar informações que seu navegador envia sempre que você visita nosso serviço ou quando acessa o serviço por ou por meio de um dispositivo móvel.
    
    Uso de seus dados pessoais
    A Empresa pode usar os Dados Pessoais para os seguintes fins:
    - Para fornecer e manter nosso Serviço, inclusive para monitorar o uso de nosso Serviço.
    - Para gerenciar sua conta: para gerenciar seu registro como usuário do Serviço. Os Dados Pessoais que Você fornece podem dar acesso a diferentes funcionalidades do Serviço que estão disponíveis para Você como usuário registrado.
    - Para a execução de um contrato: o desenvolvimento, cumprimento e realização do contrato de compra dos produtos, itens ou serviços que você comprou ou de qualquer outro contrato conosco por meio do Serviço.
    - Para entrar em contato com você: Entrar em contato com Você por e-mail, chamadas telefônicas, SMS ou outras formas equivalentes de comunicação eletrônica, como notificações push de um aplicativo móvel sobre atualizações ou comunicações informativas relacionadas às funcionalidades, produtos ou serviços contratados, incluindo as atualizações de segurança, quando necessário ou razoável para sua implementação.
    - Para fornecer notícias, ofertas especiais e informações gerais sobre outros bens, serviços e eventos que oferecemos que são semelhantes aos que você já comprou ou consultou, a menos que você tenha optado por não receber tais informações.
    - Para gerenciar suas solicitações: Para atender e gerenciar suas solicitações para nós.
    - Para transferências de negócios: Podemos usar suas informações para avaliar ou conduzir uma fusão, alienação, reestruturação, reorganização, dissolução ou outra venda ou transferência de alguns ou todos os nossos ativos, seja como uma empresa em funcionamento ou como parte de falência, liquidação ou processo semelhante, no qual os dados pessoais mantidos por nós sobre os usuários de nossos serviços estão entre os ativos transferidos.
    - Para outros fins: Podemos usar suas informações para outros fins, como análise de dados, identificação de tendências de uso, determinação da eficácia de nossas campanhas promocionais e para avaliar e melhorar nosso Serviço, produtos, serviços, marketing e sua experiência.
    
    Podemos compartilhar suas informações pessoais nas seguintes situações:
    - Com provedores de serviços: Podemos compartilhar suas informações pessoais com provedores de serviços para monitorar e analisar o uso de nosso serviço, para entrar em contato com você.
    - Para transferências de negócios: Podemos compartilhar ou transferir suas informações pessoais em conexão com, ou durante negociações de, qualquer fusão, venda de ativos da Empresa, financiamento ou aquisição de todo ou parte de nossos negócios para outra empresa.
    - Com afiliados: Podemos compartilhar suas informações com nossas afiliadas, caso em que exigimos que essas afiliadas honrem esta Política de Privacidade. As afiliadas incluem nossa controladora e quaisquer outras subsidiárias, parceiros de joint venture ou outras empresas que controlamos ou que estão sob controle comum conosco.
    - Com parceiros de negócios: Podemos compartilhar suas informações com nossos parceiros de negócios para oferecer a você determinados produtos, serviços ou promoções.
    - Com outros usuários: quando você compartilha informações pessoais ou interage nas áreas públicas com outros usuários, essas informações podem ser visualizadas por todos os usuários e podem ser distribuídas publicamente para fora.
    - Com o seu consentimento: Podemos divulgar suas informações pessoais para qualquer outra finalidade com o seu consentimento.
    
    Retenção de seus dados pessoais
    A Empresa reterá Seus Dados Pessoais apenas pelo tempo necessário para os fins estabelecidos nesta Política de Privacidade. Reteremos e usaremos Seus Dados Pessoais na medida necessária para cumprir nossas obrigações legais (por exemplo, se formos obrigados a reter seus dados para cumprir as leis aplicáveis), resolver disputas e fazer cumprir nossos acordos e políticas legais.
    A Empresa também reterá os Dados de Uso para fins de análise interna. Os Dados de Uso geralmente são retidos por um período de tempo mais curto, exceto quando esses dados são usados para fortalecer a segurança ou melhorar a funcionalidade do Nosso Serviço, ou quando somos legalmente obrigados a reter esses dados por períodos de tempo mais longos.
    
    Transferência de seus dados pessoais
    Suas informações, incluindo Dados Pessoais, são processadas nos escritórios operacionais da Empresa e em quaisquer outros locais onde as partes envolvidas no processamento estejam localizadas. Isso significa que essas informações podem ser transferidas e mantidas em computadores localizados fora de seu estado, província, país ou outra jurisdição governamental onde as leis de proteção de dados podem diferir daquelas de sua jurisdição.
    Seu consentimento com esta Política de Privacidade, seguido pelo envio de tais informações, representa sua concordância com essa transferência.
    A Empresa tomará todas as medidas razoavelmente necessárias para garantir que seus dados sejam tratados com segurança e de acordo com esta Política de Privacidade e nenhuma transferência de seus dados pessoais ocorrerá para uma organização ou país, a menos que haja controles adequados em vigor, incluindo a segurança de seus dados e outras informações pessoais.
    
    Excluir seus dados pessoais
    Você tem o direito de excluir ou solicitar que ajudemos a excluir os Dados Pessoais que coletamos sobre você.
    Nosso Serviço pode dar a Você a capacidade de excluir certas informações sobre Você de dentro do Serviço.
    Você pode atualizar, alterar ou excluir suas informações a qualquer momento fazendo login em sua conta, se tiver uma, e visitando a seção de configurações da conta que permite gerenciar suas informações pessoais. Você também pode entrar em contato conosco para solicitar acesso, corrigir ou excluir qualquer informação pessoal que você nos forneceu.
    Observe, no entanto, que podemos precisar reter certas informações quando tivermos uma obrigação legal ou base legal para fazê-lo.
    
    Divulgação de seus dados pessoais
    Transações comerciais
    Se a Empresa estiver envolvida em uma fusão, aquisição ou venda de ativos, Seus Dados Pessoais podem ser transferidos. Forneceremos um aviso antes que seus dados pessoais sejam transferidos e fiquem sujeitos a uma Política de Privacidade diferente.
    
    Aplicação da lei
    Sob certas circunstâncias, a Empresa pode ser obrigada a divulgar Seus Dados Pessoais se exigido por lei ou em resposta a solicitações válidas de autoridades públicas (por exemplo, um tribunal ou uma agência governamental).
    
    Outros requisitos legais
    A Empresa pode divulgar Seus Dados Pessoais na crença de boa fé de que tal ação é necessária para:
    - Cumprir uma obrigação legal
    - Proteger e defender os direitos ou propriedade da Empresa
    - Prevenir ou investigar possíveis irregularidades relacionadas ao Serviço
    - Proteger a segurança pessoal dos Usuários do Serviço ou do público
    - Proteja-se contra responsabilidade legal
    
    Segurança dos seus dados pessoais
    A segurança de seus dados pessoais é importante para nós, mas lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus dados pessoais, não podemos garantir sua segurança absoluta.
    
    Privacidade das crianças
    Nosso Serviço não se dirige a menores de 13 anos. Não coletamos intencionalmente informações de identificação pessoal de menores de 13 anos. Se você é pai ou responsável e está ciente de que seu filho nos forneceu dados pessoais, entre em contato conosco. Se tomarmos conhecimento de que coletamos Dados Pessoais de qualquer pessoa com menos de 13 anos sem verificação do consentimento dos pais, tomaremos medidas para remover essas informações de Nossos servidores.
    Se precisarmos confiar no consentimento como base legal para processar suas informações e seu país exigir o consentimento de um dos pais, podemos exigir o consentimento de seus pais antes de coletarmos e usarmos essas informações.
    
    Links para outros sites
    Nosso Serviço pode conter links para outros sites que não são operados por Nós. Se você clicar em um link de terceiros, será direcionado para o site desse terceiro. Recomendamos vivamente que reveja a Política de Privacidade de cada site que visita.
    Não temos controle e não assumimos nenhuma responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites ou serviços de terceiros.
    
    Alterações a esta Política de Privacidade
    Podemos atualizar nossa Política de Privacidade de tempos em tempos. Iremos notificá-lo de quaisquer alterações publicando a nova Política de Privacidade nesta página.
    Informaremos você por e-mail e/ou um aviso em destaque em nosso serviço, antes que a alteração entre em vigor e atualizaremos a data da "Última atualização" na parte superior desta Política de Privacidade.
    Aconselhamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações. As alterações a esta Política de Privacidade entram em vigor quando são publicadas nesta página.
    
    Contate-nos
    Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:
    - Por e-mail: voccosupp@gmail.com
`;

const formatarCelular = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return value;
};

export const StudentRegister = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [showErrorMessageMail, setShowErrorMessageMail] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [modalTermsOpen, setModalTermsOpen] = useState(false);
    const [modalPoliciesOpen, setModalPoliciesOpen] = useState(false);
    const [password, setPassword] = useState('');

    const calculatePasswordStrength = (password: string) => {
        let score = 0;

        if (password.length >= 5) score += 25;
        if (/[A-Z]/.test(password)) score += 25;
        if (/[0-9]/.test(password)) score += 25;
        if (/[^A-Za-z0-9]/.test(password)) score += 25;

        return score;
    };

    const strength = calculatePasswordStrength(password);

    const getStrengthLabel = () => {
        if (strength === 100) return 'Forte';
        if (strength >= 75) return 'Boa';
        if (strength >= 50) return 'Fraca';
        return 'Muito fraca';
    };

    const validationSchema = yup.object().shape({
        nome: yup.string().required(t('studentRegisterValidation1')),
        email: yup.string().email(t('studentRegisterValidation2')).required(t('studentRegisterValidation3')),
        senha: yup.string().required(t('studentRegisterValidation4'))
            .min(6, t('studentRegisterValidation5')),
        confirmarSenha: yup.string().required(t('studentRegisterValidation6'))
            .oneOf([yup.ref('senha'), ''], t('studentRegisterValidation7')),
        dataNascimento: yup.date().required(t('studentRegisterValidation8'))
            .max(new Date(new Date().setFullYear(new Date().getFullYear() - 14)), t('studentRegisterValidation9')),
        celular: yup.string().phone('BR', t('studentRegisterValidation11')).required(t('studentRegisterValidation10'))
            .min(15, t('studentRegisterValidation11'))
            .max(15, t('studentRegisterValidation11')),
        nivelEscolar: yup.string().required(t('studentRegisterValidation12')),
    });

    const handleModalTermsClose = () => {
        setModalTermsOpen(false);
    };

    const handleModalTermsOpen = () => {
        setModalTermsOpen(true);
    };

    const handleModalPoliciesClose = () => {
        setModalPoliciesOpen(false);
    };

    const handleModalPoliciesOpen = () => {
        setModalPoliciesOpen(true);
    };

    const handleCloseErrorMessageMail = () => {
        setShowErrorMessageMail(false);
    };

    const handleCloseSuccess = () => {
        setShowSuccessMessage(false);
    };

    const handleNavigateForward = () => navigate('/login');

    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (values: StudentRegisterForm, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setLoading(true);
        setSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await cadastroEstudante(values);

            if (response.status === 200) {
                setShowSuccessMessage(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                handleNavigateForward();
            } else if (response.data === 'Já existe uma conta cadastrada com esse email!') {
                setShowErrorMessageMail(true);
            }
        } catch (error) {
            setShowErrorMessageMail(true);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <>
            <Box sx={globalStyle} />
            <Box sx={container}>
                <Box sx={sidePanel} />
                <Box sx={headerRegister}>
                    <Button sx={backButton} startIcon={<ArrowBackIcon />}>
                        <Typography component="a" href="/login" sx={customLink}>
                            {t('backButton')}
                        </Typography>
                    </Button>
                    <LanguageMenu />
                </Box>
                <Box sx={registerContainer}>
                    <Typography variant="h4" sx={header}>
                        {t('studentRegisterTitle')}
                    </Typography>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, errors, touched, values }) => (
                            <Box component={Form} sx={formContainer} onSubmit={handleSubmit}>
                                <FormControl variant="filled">
                                    <InputLabel htmlFor="nome" sx={customInputLabel}>
                                        {t('studentRegisterField1')}
                                    </InputLabel>
                                    <FilledInput
                                        id="nome"
                                        type="text"
                                        name="nome"
                                        value={values.nome}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        sx={customField}
                                        error={touched.nome && Boolean(errors.nome)}
                                    />
                                    <Box sx={{ color: 'red', fontSize: '16px' }}>
                                        <ErrorMessage name="nome" component="div" />
                                    </Box>
                                </FormControl>

                                <FormControl variant="filled">
                                    <InputLabel htmlFor="email" sx={customInputLabel}>
                                        {t('studentRegisterField2')}
                                    </InputLabel>
                                    <FilledInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        sx={customField}
                                        error={touched.email && Boolean(errors.email)}
                                    />
                                    <Box sx={{ color: 'red', fontSize: '16px' }}>
                                        <ErrorMessage name="email" component="div" />
                                    </Box>
                                </FormControl>

                                <FormControl variant="filled">
                                    <InputLabel shrink sx={customInputLabel}>
                                        {t('studentRegisterField3')}
                                    </InputLabel>
                                    <FilledInput
                                        id="dataNascimento"
                                        type="date"
                                        name="dataNascimento"
                                        value={values.dataNascimento}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        sx={customField}
                                        error={touched.dataNascimento && Boolean(errors.dataNascimento)}
                                    />
                                    <Box sx={{ color: 'red', fontSize: '16px' }}>
                                        <ErrorMessage name="dataNascimento" component="div" />
                                    </Box>
                                </FormControl>

                                <FormControl variant="filled">
                                    <InputLabel htmlFor="celular" sx={customInputLabel}>
                                        {t('studentRegisterField4')}
                                    </InputLabel>
                                    <FilledInput
                                        id="celular"
                                        type="tel"
                                        name="celular"
                                        value={values.celular}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const formattedValue = formatarCelular(e.target.value);
                                            setFieldValue('celular', formattedValue);
                                        }}
                                        inputProps={{ maxLength: 15 }}
                                        onBlur={handleBlur}
                                        sx={customField}
                                        error={touched.celular && Boolean(errors.celular)}
                                    />
                                    <Box sx={{ color: 'red', fontSize: '16px' }}>
                                        <ErrorMessage name="celular" component="div" />
                                    </Box>
                                </FormControl>

                                <FormControl variant="filled" sx={{ gridColumn: 'span 2' }}>
                                    <Autocomplete
                                        disablePortal
                                        id="nivelEscolar"
                                        options={nivelEducacao}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(_, value) => setFieldValue('nivelEscolar', value ? value.value : '')}
                                        renderInput={(params) => (
                                            <TextField {...params} label={t('studentRegisterField5')} sx={customAutocomplete} />
                                        )}
                                        sx={customField}
                                    />
                                    <Box sx={{ color: 'red', fontSize: '16px' }}>
                                        <ErrorMessage name="nivelEscolar" component="div" />
                                    </Box>
                                </FormControl>

                                <FormControl variant="filled">
                                    <InputLabel htmlFor="senha" sx={customInputLabel}>
                                        {t('studentRegisterField6')}
                                    </InputLabel>
                                    <FilledInput
                                        id="senha"
                                        type={showPassword ? 'text' : 'password'}
                                        name="senha"
                                        value={values.senha}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        error={touched.senha && Boolean(errors.senha)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    sx={{color: '#185D8E'}}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        sx={customField}
                                    />
                                    <Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={strength}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: '#e0e0e0',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor:
                                                    strength === 100 ? '#4caf50' :
                                                        strength >= 75 ? '#ffeb3b' :
                                                            strength >= 50 ? '#ff9800' : '#f44336',
                                                },
                                            }}
                                        />
                                        <Typography variant="caption" sx={{ mt: 1 }}>
                                            Força da senha: {getStrengthLabel()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ color: 'red', fontSize: '16px' }}>
                                        <ErrorMessage name="senha" component="span" />
                                    </Box>
                                </FormControl>

                                <FormControl variant="filled">
                                    <InputLabel htmlFor="confirmarSenha" sx={customInputLabel}>
                                        {t('studentRegisterField7')}
                                    </InputLabel>
                                    <FilledInput
                                        id="confirmarSenha"
                                        type="password"
                                        name="confirmarSenha"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        sx={customField}
                                    />
                                    <Box sx={{ color: 'red', fontSize: '16px' }}>
                                        <ErrorMessage name="confirmarSenha" component="div" />
                                    </Box>
                                </FormControl>

                                <FormControlLabel
                                    id="termosPoliticas"
                                    sx={{ gridColumn: 'span 2' }}
                                    required
                                    control={<Checkbox id='checkboxTerms' />}
                                    label={
                                        <span>
                                            {t('studentRegisterTerms1')}{' '}
                                            <Link
                                                href="#"
                                                onClick={handleModalTermsOpen}
                                                style={{ textDecoration: 'underline', color: '#185D8E', fontWeight: 700 }}
                                            >
                                                {t('studentRegisterTerms2')}
                                            </Link>{' '}
                                            e{' '}
                                            <Link
                                                href="#"
                                                onClick={handleModalPoliciesOpen}
                                                style={{ textDecoration: 'underline', color: '#185D8E', fontWeight: 700 }}
                                            >
                                                {t('studentRegisterTerms3')}
                                            </Link>.
                                        </span>
                                    }
                                />

                                <FormControl sx={{ gridColumn: 'span 2' }}>
                                    <Box component="button" id='registerButton' sx={registerButton} type="submit" disabled={isSubmitting}>
                                        {loading ? <CircularProgress size={24} color="inherit" /> : t('studentRegisterButton')}
                                    </Box>
                                </FormControl>
                            </Box>
                        )}
                    </Formik>
                    <Typography variant="body1" sx={subText}>
                        {t('studentRegisterLogin1')}<Typography sx={customLink} component={RouterLink} to="/login"> {t('studentRegisterLogin2')}</Typography>
                    </Typography>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={showSuccessMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseSuccess}
                    >
                        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }}>
                            {t('studentRegisterAlert1')}
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={showErrorMessageMail}
                        autoHideDuration={6000}
                        onClose={handleCloseErrorMessageMail}
                    >
                        <Alert onClose={handleCloseErrorMessageMail} severity="error" sx={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }}>
                            {t('studentRegisterAlert2')}
                        </Alert>
                    </Snackbar>
                </Box>
                <Modal open={modalTermsOpen} onClose={handleModalTermsClose}>
                    <ModalContent
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            maxWidth: '600px',
                            maxHeight: '60vh',
                            overflowY: 'auto',
                            bgcolor: 'background.paper',
                            borderRadius: '8px',
                            boxShadow: 24,
                            p: 4,
                            '@media (max-width: 600px)': {
                                width: '90%',
                                maxWidth: '700px',
                                maxHeight: '90vh',
                            }
                        }}
                    >
                        <IconButton
                            aria-label="close"
                            onClick={handleModalTermsClose}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: '#0B2A40',
                            }}
                        >
                            <Close fontSize="large" />
                        </IconButton>
                        <Typography variant="h6" gutterBottom sx={subTitle}>
                            {t('studentRegisterTerms2')}
                        </Typography>
                        <Box
                            sx={{
                                maxHeight: 440,
                                overflow: 'auto',
                                '@media (max-width: 600px)': {
                                    maxHeight: 240,
                                }
                            }}
                        >
                            <Typography variant="h6" gutterBottom sx={textTermsPolicies}>
                                {textTerms.split('\n').map((linha, index) => (
                                    <span key={index}>
                                        {linha}
                                        <br />
                                    </span>
                                ))}
                            </Typography>
                        </Box>
                    </ModalContent>
                </Modal>
                <Modal open={modalPoliciesOpen} onClose={handleModalPoliciesClose}>
                    <ModalContent
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            maxWidth: '600px',
                            maxHeight: '60vh',
                            overflowY: 'auto',
                            bgcolor: 'background.paper',
                            borderRadius: '8px',
                            boxShadow: 24,
                            p: 4,
                            '@media (max-width: 600px)': {
                                width: '90%',
                                maxWidth: '700px',
                                maxHeight: '90vh',
                            }
                        }}
                    >
                        <IconButton
                            aria-label="close"
                            onClick={handleModalPoliciesClose}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: '#0B2A40',
                            }}
                        >
                            <Close fontSize="large" />
                        </IconButton>
                        <Typography variant="h6" gutterBottom sx={subTitle}>
                            {t('studentRegisterTerms3')}
                        </Typography>
                        <Box
                            sx={{
                                maxHeight: 440,
                                overflow: 'auto',
                                '@media (max-width: 600px)': {
                                    maxHeight: 240,
                                }
                            }}
                        >
                            <Typography variant="body1">
                                {textPolicies.split('\n').map((linha, index) => (
                                    <span key={index}>
                                        {linha}
                                        <br />
                                    </span>
                                ))}
                            </Typography>
                        </Box>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
};

export default StudentRegister;
