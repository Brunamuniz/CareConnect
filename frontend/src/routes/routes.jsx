import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Volunteers from "../page/Voluntario/Voluntario.jsx";
import Familia from "../page/Familia/familia.jsx";
import Hostel from "../page/Hostel/Hostel.jsx";
import Homeless from "../page/Homeless/Homeless.jsx";
import Doacao from "../page/Doacao.jsx/Doacao.jsx";
import Home from "../page/home/index.jsx";





export const router = createBrowserRouter([
    
 
    {path:'/',
    element: <App/>
    },

    
    {path:'/home',
    element: <Home/>
    },
    {path:'/familia',
    element: <Familia/>
    },

    {path:'/hostel',
    element: <Hostel/>
    },

    {path:'/Homeless',
    element: <Homeless/>
    },

    {path: '/Doacao',
    element: <Doacao/>
    },
  
    {path: '/Voluntario',
    element: <Volunteers/>
    }
])

