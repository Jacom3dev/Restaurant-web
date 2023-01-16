import { lazy, LazyExoticComponent } from "react";

type JSXComponent = ()=> JSX.Element;

interface IRoutes {
    path: string,
    Component: LazyExoticComponent<JSXComponent> | JSXComponent;
}

export const routes : IRoutes[] = [
    {
        path: '/',
        Component: lazy(()=>import(/*webpackChunkName: "Orders"*/ '../pages/OrdersPage'))
    },
    {
        path: 'menu',
        Component: lazy(()=>import(/*webpackChunkName: "Menu"*/ '../pages/MenuPage'))
    },
    {
        path: 'new-saucer',
        Component: lazy(()=>import(/*webpackChunkName: "NewSaucer"*/ '../pages/NewSaucerPage'))
    }
]