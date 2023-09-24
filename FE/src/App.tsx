
import ForgotPass from "./component/Account/ForgotPass"
import SignIn from "./component/Account/SignIn"
import SignUp from "./component/Account/SignUp"
import ChangePass from "./component/Account/ChangePass"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./pages/main"
import Contact from "./pages/Contacts/Contact"
import Layout from "./Layout/customer"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={< Layout />}>
          <Route index element={<Main />} />
          <Route path='lien-he' element={< Contact />} />
        </Route>
        <Route>
          <Route path='signin' element={< SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='/forgot' element={<ForgotPass />} />
          <Route path='/change' element={<ChangePass />} />
        </Route>
      </Routes>
    </BrowserRouter >

  )
}

export default App
