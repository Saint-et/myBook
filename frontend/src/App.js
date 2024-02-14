import './sass/style.scss';
import { Route, Routes } from "react-router-dom";
import { AppProvider, useAppContext } from './contexts/UseAppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import Home from './layouts/UserProfil/UserProfil';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Signup from './Login/Signup';
import { IsLog, URLparameters, URLWorkSpace, URLProfile, URLGame, URLShopNavbar } from './utils';
import { DATA_picv } from './assets/data/data';
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
import Statistical from './layouts/UserProfil/Statistical/Statistical';
import Catalogues from './layouts/UserProfil/Catalogues/Catalogues';
import Fullscreenimg from './components/Fullscreenimg';
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
import Gift from './layouts/WorkSpace/Subscription/Subscription';
import HelpWorkSpace from './layouts/WorkSpace/HelpWorkSpace';
import NavbarMenu from './Navbar/NavbarMenu';
import Systems from './components/systems';
import Animation from './components/Animation';
import FullscreenimgAnalyse from './components/FullscreenimgAnalyse';
import Problem_works from './layouts/WorkSpace/Problem/problem_works';
import Illustrations_open from './layouts/article/illustrations';
import PageBackground from './components/pageBackground';
import PubImg from "./assets/images/background.jpg";
import GameUser from './layouts/GameUser/gameUser';
import GameEvent from './layouts/GameUser/gameEvent';
import GameList from './layouts/GameUser/gameList';
import GameTicket from './layouts/GameUser/gameTicket';
import GameRanking from './layouts/GameUser/gameRanking';
import GameWerewolf from './layouts/GameUser/MyGameComponent/gameWerewolf';
import Shop from './layouts/shop/shop';
import ShopNavbar from './layouts/shop/shopNavbar';
import NewPosts from './layouts/newPost/newPosts';

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
          <FullscreenimgAnalyse />
          <PageBackground />
          <NavbarMenu />
          <Navbar IsLog={IsLog} />
          <div className='main'>
            {URLShopNavbar() ?<ShopNavbar /> : null}
            {URLWorkSpace() ? <OptionWorkSpace /> : null}
            {URLProfile() ? <Home key={Id} /> : null}
            {URLGame() ? <GameUser /> : null}
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
              <Route path="/new-posts" element={<NewPosts />} />

              <Route path="/profile/:id/:key" element={<News key={Id} />} />
              <Route path="/profile/:id/catalogues/:key" element={<Catalogues key={Id} />} />
              <Route path="/statistical" element={<Statistical />} />

              <Route path="/discussions" element={<Message />} />
              <Route path="/discussions/message/:id" element={<Send_message />} />

              <Route path="/contact" element={<Contact />} />

              <Route path="/works/file/:id" element={<FilesUpdate key={location[3]} />} />
              <Route path="/works/file" element={<Files key={location[3]} />} />

              <Route path="/works/library" element={<Groups_files />} />
              <Route path="/works/library/:id" element={<Groups_display />} />

              <Route path="/works/subscriptions" element={<Gift />} />
              
              <Route path="/works/problem" element={<Problem_works />} />

              <Route path="/works/help" element={<HelpWorkSpace />} />

              <Route path="/file/illustrations/:key" element={<Illustrations_open />} />
              <Route path={`/${DATA_picv}-game`} element={<GameEvent />} />
              <Route path={`/${DATA_picv}-game/game-list`} element={<GameList />} />
              <Route path={`/${DATA_picv}-game/game-ticket`} element={<GameTicket />} />
              <Route path={`/${DATA_picv}-game/game-ranking`} element={<GameRanking />} />
              <Route path={`/${DATA_picv}-game/werewolf-attack`} element={<GameWerewolf />} />

              <Route path={`/${DATA_picv}-shop`} element={<Shop />} />

              <Route path="/parameters/customization" element={<Customization />} />
              <Route path="/parameters/premium" element={<Premium />} />
              <Route path="/parameters/assistance" element={<Assistance />} />
              <Route path="/parameters/delete-account" element={<DeleteAccount />} />

              <Route path="*" element={<PageNoFound />} />

            </Routes>
            <div className='cter_sect'>
                {/*<img className="hovercursor" src={PubImg} style={{ borderRadius: 5, width: '100%', maxWidth: 1000, cursor: 'pointer' }} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} alt="" />*/}
            </div>
          
          </div>
          <Animation/>
        </DndProvider>
      </AppProvider>
    </>
  );
}

export default App;
