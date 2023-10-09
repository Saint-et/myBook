import './sass/style.scss';
import { Route, Routes } from "react-router-dom";
import { AppProvider, useAppContext } from './contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
import Home from './layouts/UserProfil/UserProfil';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Signup from './Login/Signup';
import { IsLog, URLparameters, URLWorkSpace, URLProfile } from './utils';
import Customization from './Navbar/Parameters/Customization/Customization';
import Option from './Navbar/Parameters/Option';
import Assistance from './Navbar/Parameters/Assistance/Assistance';
import DeleteAccount from './Navbar/Parameters/DeleteAccount/DeleteAccount';
import Message from './Navbar/Message/Message';
import PageNoFound from './components/PageNoFound';
import OptionWorkSpace from './layouts/WorkSpace/OptionWorkSpace';
import Files from './layouts/WorkSpace/Files/Files';
import Contact from './layouts/Contact/Contact';
import Catalog from './layouts/Catalog/Catalog';
import Premium from './Navbar/Parameters/Premium/Premium';
import Send_message from './Navbar/Message/Send_message';
import Home_profile from './layouts/UserProfil/Home/Home_profile';
import Statistical from './layouts/UserProfil/Statistical/Statistical';
import Catalogues from './layouts/UserProfil/Catalogues/Catalogues';
import Tags from './layouts/WorkSpace/Tags/Tags';
import Fullscreenimg from './components/Fullscreenimg';
import MiniProfil from './components/MiniProfil';
import { useLocation } from 'react-router-dom';
import News from './layouts/UserProfil/News/News';
import PageSearch from './layouts/PageSearch/PageSearch';
import Groups_files from './layouts/WorkSpace/Groups_files/Groups_files';
import Groups_display from './layouts/WorkSpace/Groups_display/Groups_display';
import Interest from './components/Interest';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FilesUpdate from './layouts/WorkSpace/Files_display/filesUpdate';
import PasswordForgot from './Login/PasswordForgot';
import PasswordReset from './Login/PasswordReset';
import PasswordResetSuccess from './Login/PasswordResetSuccess';
import Condition from './components/condition';
import Gift from './layouts/WorkSpace/Gift/Gift';
import HelpWorkSpace from './layouts/WorkSpace/HelpWorkSpace';
import NavbarMenu from './Navbar/NavbarMenu';
import Systems from './components/systems';
import Animation from './components/Animation';


function App() {

  const location = useLocation().pathname.split("/")
  const Id = location[2];


  return (
    <>

      <AppProvider>
        <DndProvider backend={HTML5Backend}>
          <Systems />
          {false && <Interest />}
          <Fullscreenimg />
          <MiniProfil />
          <NavbarMenu />
          <Navbar IsLog={IsLog} />
          <div className='main'>
            {URLWorkSpace() ? <OptionWorkSpace /> : null}
            {URLProfile() ? <Home key={Id} /> : null}
            {URLparameters() ? <Option /> : null}

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/condition" element={<Condition />} />
              <Route path="/password-forgot" element={<PasswordForgot />} />
              <Route path="/password-forgot/:key" element={<PasswordReset />} />
              <Route path="/password-forgot/:key/password-binding" element={<PasswordResetSuccess />} />

              <Route path="/search-users/:key" element={<PageSearch key={Id} />} />
              <Route path="/search-articles/:key" element={<PageSearch key={Id} />} />

              <Route path="/" element={<Catalog />} />

              <Route path="/profile/:id" element={<News key={Id} />} />
              <Route path="/profile/:id/activities" element={<Home_profile key={Id} />} />
              <Route path="/profile/:id/catalogues/:key" element={<Catalogues key={Id} />} />
              <Route path="/profile/:id/statistical" element={<Statistical />} />

              <Route path="/discussions" element={<Message />} />
              <Route path="/discussions/message/:id" element={<Send_message />} />

              <Route path="/contact" element={<Contact />} />

              <Route path="/works/file/:id" element={<FilesUpdate key={location[3]} />} />
              <Route path="/works/files" element={<Files key={location[3]} />} />

              <Route path="/works/library" element={<Groups_files />} />
              <Route path="/works/library/:id" element={<Groups_display />} />

              <Route path="/works/gifts" element={<Gift />} />

              <Route path="/works/tags" element={<Tags key={Id} />} />

              <Route path="/works/help" element={<HelpWorkSpace />} />


              <Route path="/parameters/customization" element={<Customization />} />
              <Route path="/parameters/premium" element={<Premium />} />
              <Route path="/parameters/assistance" element={<Assistance />} />
              <Route path="/parameters/delete-account" element={<DeleteAccount />} />

              <Route path="*" element={<PageNoFound />} />

            </Routes>
          </div>
          <Animation/>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: 50 }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FontAwesomeIcon className='title_color' style={{ marginTop: 20, fontSize: 25 }} icon={faGlobeEurope} />
            </div>
          </div>

        </DndProvider>
      </AppProvider>
    </>
  );
}

export default App;
