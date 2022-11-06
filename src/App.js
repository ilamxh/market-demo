import React from 'react'
import routes from './routes/index'
import {Link,useRoutes} from 'react-router-dom'

const App=(props)=> {
  const element = useRoutes(routes)
  return (
    <>
    <Link to='/login'></Link>
    <Link to='/home'></Link>
    {element}
      
    </>
  );
};

export default App;

