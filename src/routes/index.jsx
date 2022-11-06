import Login from '../pages/Login/login'
import Register from '../pages/Register/register'
import Home from '../pages/Home/home'
import Uim from '../pages/Home/components/Uim/uim'
import Category from '../pages/Home/components/Category/category'
import Ad from '../pages/Home/components/Ad/ad'
import Commodities from '../pages/Home/components/Com/commodities'
import {Navigate} from 'react-router-dom'//重定向
export default[
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
    children:[
      {path:'uim',element:<Uim/>},
      {path:'category',element:<Category/>},
      {path:'ad',element:<Ad/>},
      {path:'commodities',element:<Commodities/>}
    ]
  },
  {
    path:'/',
    element:<Navigate to='/login'/>
  },
  {
    path:'/home',
    element:<Uim/>
  },
  {
    path:'/register',
    element:<Register/>
  }
]
