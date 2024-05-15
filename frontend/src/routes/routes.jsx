import { createBrowserRouter } from "react-router-dom";
import Voluntario from "../page/Voluntario/Voluntario.jsx";
import App from "../page/home/App.jsx";
import Familia from "../page/Familia/familia.jsx";
import Hostel from "../page/Hostel/Hostel.jsx";
import Homeless from "../page/Homeless/Homeless.jsx";
import Doacao from "../page/Doacao.jsx/Doacao.jsx";


export const router = createBrowserRouter([
    {path:'/voluntario', 
    element: <Voluntario/>
    },

    {path:'/',
    element: <App/>
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
    }
])

