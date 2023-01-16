interface INavigation {
    id: string;
    title: string;
    to: string;
}

export const router : INavigation[]  = [
    {
        id:"orders",
        title:"Ordenes",
        to:"/",
    },
    {
        id:"menu",
        title:"Menú",
        to:"/menu"
    }
]