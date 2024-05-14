import { createBrowserRouter } from "react-router-dom";
import Voluntario from "../page/Voluntario/Voluntario.jsx";
import App from "../page/home/App.jsx";
import Familia from "../page/Familia/familia.jsx";


export const router = createBrowserRouter([
    {path:'/voluntario', 
    element: <Voluntario/>
    },

    {path:'/',
    element: <App/>
    },

    {path:'/familia',
    element: <Familia/>
    }
])

