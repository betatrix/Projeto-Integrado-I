import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../containers/administrator/adminDashboard/index';
import { CadastroInstituicao } from '../containers/administrator/institutionRegister/index';
import { BuscaCurso } from '../containers/administrator/institutionRegister/searchCourse';
import InstitutionManagement from '../containers/administrator/institutionManagement/index';
import HomePage from '../containers/student/homePage';
import StudentDashboard from '../containers/student/studentDashboard';
import InstitutionList from '../containers/student/studentDashboard/searchInstitution';
import About from '../containers/student/homePage/about';
import PerfilStudent from '../containers/student/studentDashboard/perfilStudent';
import VocacionalTest from '../containers/student/vocacionalTest';
import Login from '../containers/auth/login/index';
import Register from '../containers/student/register/index';
import NovaSenha from '../containers/auth/newPassword';
import RecuperarSenha from '../containers/auth/recoverPassword';
import { BuscaPoliticas } from '../containers/administrator/institutionRegister/searchPolicies';
import { InstitutionProvider } from '../context/institutionContext';
// import ResultadoTeste from '../containers/student/resultTest';
import { AuthProvider } from '../contexts/auth';
import PrivateRoute from '../components/routes/privateRoutes';
import CadastroCurso from '../containers/administrator/courseRegister';
import ResultScreen from '../containers/student/resultTest/new-index';
import CourseManagement from '../containers/administrator/courseManagement';
import CourseList from '../containers/student/studentDashboard/searchCourse';
import UserManagement from '../containers/administrator/userManagement';
import AdminManagement from '../containers/administrator/userManagement/adminManagement';
import TestManagement from '../containers/administrator/questionManagement';
import QuestionRegister from '../containers/administrator/questionRegister';
import CadastroAdministrador from '../containers/administrator/userManagement/registerAdm';
import OldResultTest from '../containers/student/oldResultTest/index';

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <InstitutionProvider>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
                        <Route path="/nova-senha" element={<NovaSenha />} />
                        <Route path='/sobre' element={<About />} />
                        <Route path='/pagina-inicial' element={<HomePage />} />

                        {/* Private Routes - Student */}
                        <Route element={<PrivateRoute requiredRole="ESTUDANTE" />}>
                            <Route path='/teste-vocacional' element={<VocacionalTest />} />
                            <Route path='/estudante' element={<StudentDashboard />} />
                            <Route path="/resultado" element={<ResultScreen />} />
                            <Route path='/minha-conta' element={<PerfilStudent />} />
                            <Route path='/instituicao' element={<InstitutionList />} />
                            <Route path='/curso' element={<CourseList />} />
                            <Route path='/resultados-anteriores' element={<OldResultTest />} />
                        </Route>

                        {/* Private Routes - Admin */}
                        <Route element={<PrivateRoute requiredRole="ADMIN" />}>
                            <Route path="/cadastro" element={<CadastroInstituicao />} />
                            <Route path="/cadastro-curso" element={<CadastroCurso />} />
                            <Route path="/cadastro-pergunta" element={<QuestionRegister />} />
                            <Route path="/cursos" element={<BuscaCurso />} />
                            <Route path='/politicas' element={<BuscaPoliticas />} />
                            <Route path='/gerenciamento-curso' element={<CourseManagement />} />
                            <Route path="/gerenciamento-instituicao" element={<InstitutionManagement />} />
                            <Route path="/gerenciamento-usuario" element={<UserManagement />} />
                            <Route path="/gerenciamento-administrador" element={<AdminManagement />} />
                            <Route path="/gerenciamento-teste" element={<TestManagement />} />
                            <Route path="/cadastro-administrador" element={<CadastroAdministrador />} />
                            <Route path='/admin' element={<Dashboard />} />
                        </Route>

                        <Route path='*' element={<Navigate to='/pagina-inicial' replace />} />

                    </Routes>
                </InstitutionProvider>
            </BrowserRouter>
        </AuthProvider>
    );
};
