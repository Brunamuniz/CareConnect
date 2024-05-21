import { createBrowserRouter } from "react-router-dom";
import Volunteers from "../page/Volunteers/index.jsx";
import Familia from "../page/Families/index.jsx";
import Hostel from "../page/Hostel/index.jsx";
import Homeless from "../page/Homeless/index.jsx";
import Home from "../page/Home/index.jsx";
import Donation from "../page/Donation/index.jsx";





export const router = createBrowserRouter([
    
 
    {path:'/',
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
    element: <Donation/>
    },
  
    {path: '/Voluntario',
    element: <Volunteers/>
    }
])

