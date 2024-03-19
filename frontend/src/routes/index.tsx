import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Tasks from "../pages/tasks";
import TaskDetail from  "../pages/taskDetail";
import React from "react";

const routes = createBrowserRouter([
    {path:'/', element:<Home/>, errorElement:<Home/>},
    {path:'/tasks', element:<Tasks/>},
    {path:'/taskdetail/:id', element:<TaskDetail/>}
])

export default routes;