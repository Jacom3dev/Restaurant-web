import {useContext,useRef} from 'react';
import { FirebaseContext } from '../firebase';
import { ISaucer } from "../interfaces";

interface Props {
    saucer: ISaucer
}
export const Saucer = ({saucer}:Props) => {
    const context:any = useContext(FirebaseContext);
    const {id,name,price,image,category,description,status} = saucer;

    
    
    const statusRef = useRef(saucer.status);


    const handleStatus = ()=> {
        const status = (statusRef.current.value === "true");
        context.firebase.db.collection('products').doc(id).update({status})
    }
    
  return (
    <div className='w-full px-3 mb-4'>
        <div className="p-5 shadow-md bg-white">
            <div className="lg:flex">
                <div className="lg:w-5/12 xl:3/12">
                    <img src={image} alt="platillo" />
                    <div className="sm:flex sm:-mx-2">
                        <label htmlFor="status" className="block sm:w-2/4">
                            <span className="block mt-5 text-gray-800 mb-2 ">Existencia: </span>
                            <select
                                id="status"
                                className="bg-white pl-2 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                value={`${status}`}
                                ref={statusRef}
                                onChange={({target})=>handleStatus()}
                            >
                                <option value="true">Disponible</option>
                                <option value="false">No disponible</option>
                            </select>
                        </label>
                        
                    </div>
                </div>
                <div className="lg:w-7/12 xl:9/12 pl-5">
                    <p className="font-bold text-2xl text-yellow-600 mb-4">{name}</p>
                    <p className="text-gray-600 mb-4">Cetagoria : <span className="text-gray-700 font-bold">{category.toUpperCase()}</span></p>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <p className="text-gray-600 mb-4">Cetagoria : <span className="text-gray-700 font-bold">{price}$</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}
