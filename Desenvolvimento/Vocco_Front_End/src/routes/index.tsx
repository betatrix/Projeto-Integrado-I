import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../containers/administrator/adminDashboard/index';
import {CadastroInstituicao} from '../containers/administrator/institutionRegister/index';
import { BuscaCurso } from '../containers/administrator/institutionRegister/searchCourse';
import InstitutionManagement from '../containers/administrator/institutionManagement/index';
import HomePage from '../containers/student/homePage';
import StudentDashboard from '../containers/student/studentDashboard';
import InstitutionList from '../containers/student/studentDashboard/searchInstitution';
import About from '../containers/student/homePage/about';
import CourseList from '../containers/administrator/courseManagement';
import DataStudent from '../containers/student/studentDashboard/perfilStudent';
import VocacionalTest from '../containers/student/vocacionalTest';
import Login from '../containers/auth/login/index';
import Register from '../containers/student/register/index';
import SucessPassword from '../containers/auth/sucessPassword';
import NovaSenha from '../containers/auth/newPassword';
import RecuperarSenha from '../containers/auth/recoverPassword';
import { BuscaPoliticas } from '../containers/administrator/institutionRegister/searchPolicies';
import { InstitutionProvider } from '../context/institutionContext';
import ResultadoTeste from '../containers/student/resultTest';
import { AuthProvider } from '../contexts/auth';
import PrivateRoute from '../components/routes/privateRoutes';

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <InstitutionProvider>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/recuperar-senha" element={<RecuperarSenha/>}/>
                        <Route path="/nova-senha" element={<NovaSenha/>}/>
                        <Route path="/success-change-password" element={<SucessPassword/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path='/sobre' element={<About />} />
                        <Route path='/pagina-inicial' element={<HomePage />} />
                        <Route path='/instituicao' element={<InstitutionList/>}/>
                        {/* Private Routes - Student */}
                        <Route element={<PrivateRoute requiredRole="ESTUDANTE" />}>
                            <Route path='/teste-vocacional' element={<VocacionalTest/>}/>
                            <Route path='/estudante' element={<StudentDashboard />} />
                            <Route path="/resultado" element={<ResultadoTeste/>}/>
                            <Route path='/perfil' element={<DataStudent/>}/>
                        </Route>
                        {/* Private Routes - Admin */}
                        <Route element={<PrivateRoute requiredRole="ADMIN" />}>
                            <Route path="/cadastro" element={<CadastroInstituicao />} />
                            <Route path="/cursos" element={<BuscaCurso />} />
                            <Route path='/politicas' element={<BuscaPoliticas />} />
                            <Route path='/gerenciamento-curso' element={<CourseList/>}/>
                            <Route path="/gerenciamento-instituicao" element={<InstitutionManagement />} />
                            <Route path='/admin' element={<Dashboard />} />
                        </Route>

                        <Route path='*' element={<Navigate to='/pagina-inicial' replace />} />
                        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
                    </Routes>
                </InstitutionProvider>
            </BrowserRouter>
        </AuthProvider>
    );
};
