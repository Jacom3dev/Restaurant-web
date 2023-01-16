import {NavLink} from 'react-router-dom';
import { router } from '../navigation/Router';

export const Sidebar = () => {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800 md:min-h-screen">
        <div className="p-6">
            <p className="uppercase text-white text-xl tracking-wide text-center font-bold">RestaurantApp</p>
            <p className="mt-3 text-gray-600">Administra tu restaurante con las siguientes opciones:</p>

            <nav className='mt-10 text-center sm:text-left'>
                {router.map(({id,title,to})=>(
                    <NavLink key={id} to={to} className={({ isActive }) => isActive ? "text-yellow-500" : "p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"}>{title}</NavLink>
                ))}
            </nav>
        </div>
    </div>
  )
}
