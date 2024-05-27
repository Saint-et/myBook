import './sass/style.scss';
import { Route, Routes } from "react-router-dom";
import { AppProvider } from './contexts/UseAppContext';
import { WorkspaceProvider } from './contexts/UseWorkspaceContexte';
import Home from './layouts/UserProfil/UserProfil';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Signup from './Login/Signup';
import { IsLog, URLGame } from './utils';
import { SystemName } from './assets/data/data';
import Message from './Navbar/Message/Message';
import PageNoFound from './components/page_err';
import OptionWorkSpace from './layouts/WorkSpace/OptionWorkSpace';
import Catalog from './layouts/Catalog/Catalog';
import Send_message from './Navbar/Message/Send_message';
import Fullscreenimg from './components/Fullscreenimg';
import { useLocation } from 'react-router-dom';
import PageSearch from './layouts/PageSearch/PageSearch';
import Interest from './components/Interest';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PasswordForgot from './Login/PasswordForgot';
import PasswordReset from './Login/PasswordReset';
import PasswordResetSuccess from './Login/PasswordResetSuccess';
import Condition from './components/condition';
import NavbarMenu from './Navbar/NavbarMenu';
import Systems from './components/systems';
import Animation from './components/Animation';
import FullscreenimgAnalyse from './components/FullscreenimgAnalyse';
import Illustrations_open from './layouts/article/illustrations';
import GameUser from './layouts/GameUser/gameUser';
import GameEvent from './layouts/GameUser/gameEvent';
import GameList from './layouts/GameUser/gameList';
import GameTicket from './layouts/GameUser/gameTicket';
import GameRanking from './layouts/GameUser/gameRanking';
import GameWerewolf from './layouts/GameUser/MyGameComponent/gameWerewolf';
import ShopNavbar from './layouts/shop/shopNavbar';
import NewPosts from './layouts/newPost/newPosts';
import Reconnection from './components/reconnection';
import NavbarMenuRigh from './Navbar/NavbarMenuRight';
import Menu_Parameter from './Navbar/Parameters/menuParameter';
import Recently_viewed from './layouts/Recently_viewed/Recently_viewed';
import Notification from './components/Notification/Notification';
import File_statistical from './layouts/Admin/file_statistical';
import Creative from './layouts/Creative/creative';


function App() {


  const getLocation = useLocation()
  const location = getLocation.pathname.split("/")
  const Id = location[2];


  return (
    <>
      <AppProvider>
        <WorkspaceProvider>
          <DndProvider backend={HTML5Backend}>
            <Reconnection />
            <Systems />
            {getLocation.hash === `#${SystemName}-conditions` && <Condition />}
            {false && <Interest />}
            <Fullscreenimg />
            <FullscreenimgAnalyse />
            <NavbarMenuRigh />
            <NavbarMenu />
            <Navbar IsLog={IsLog} />
            <File_statistical />
              {/*URLWorkSpace() ? <OptionWorkSpace /> : null*/}
              {URLGame() ? <GameUser /> : null}
              {getLocation.hash === `#Recently_viewed` ? <Recently_viewed /> : null}

              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/password-forgot" element={<PasswordForgot />} />
                <Route path="/password-forgot/:key" element={<PasswordReset />} />
                <Route path="/password-forgot/:key/password-binding" element={<PasswordResetSuccess />} />

                <Route path="/search-users/:key" element={<PageSearch key={Id} />} />
                <Route path="/search-articles/:key" element={<PageSearch key={Id} />} />

                <Route path="/" element={<Catalog />} />
                <Route path="/new-posts" element={<NewPosts />} />

                <Route path="/profile/:id/:key" element={<Home key={Id} />} />
                {/*<Route path="/statistical" element={<Statistical />} />*/}

                <Route path="/discussions" element={<Message />} />
                <Route path="/discussions/message/:id" element={<Send_message />} />

                <Route path="/works/:key" element={<OptionWorkSpace />} />
                {/*<Route path="/works/file/:key" element={<FilesUpdate />} />*/}
                {/*<Route path="/works/file" element={<Files key={location[3]} />} />*/}

                {/*<Route path="/works/library" element={<Groups_files />} />*/}
                {/*<Route path="/works/library/:id" element={<Groups_display />} />*/}

                {/*<Route path="/works/subscriptions" element={<Gift />} />*/}

                {/*<Route path="/works/problem" element={<Problem_works />} />*/}


                <Route path="/file/page_file/:key" element={<Illustrations_open />} />
                <Route path={`/${SystemName}-game`} element={<GameEvent />} />
                <Route path={`/${SystemName}-game/game-list`} element={<GameList />} />
                <Route path={`/${SystemName}-game/game-ticket`} element={<GameTicket />} />
                <Route path={`/${SystemName}-game/game-ranking`} element={<GameRanking />} />
                <Route path={`/${SystemName}-game/werewolf-attack`} element={<GameWerewolf />} />
                <Route path={`/${SystemName}-accessPass/:key`} element={<ShopNavbar />} />
                
                <Route path={`/${SystemName}-creative/:key`} element={<Creative />} />


                <Route path="/parameters/:key" element={<Menu_Parameter />} />

                <Route path="*" element={<PageNoFound />} />

              </Routes>
            <Animation />
          </DndProvider>
          <Notification />
        </WorkspaceProvider>
      </AppProvider>

    </>
  );
}

export default App;
