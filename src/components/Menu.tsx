import {useState,useEffect,useContext} from 'react';
import {Link} from "react-router-dom";
import { FirebaseContext } from '../firebase';
import { ISaucer } from '../interfaces';
import { Saucer } from './Saucer';

export const Menu = () => {
  const [saucers, setSaucers] = useState<ISaucer[]>([]);

  const context:any = useContext(FirebaseContext);

  const handleSnapshot = (snapshot:any) =>{
    const getSnap = snapshot.docs.map((doc:any)=>{
      return {
        id: doc.id,
        ...doc.data()
      }
    });   
    setSaucers(getSnap);
  }

  const getSacers =  () => {
    context.firebase.db.collection('products').onSnapshot(handleSnapshot);
  }
  

  useEffect(() => {
    getSacers();
  }, [])
  

 console.log(saucers);
 
  return (
    <>
      <h1 className="text-3xl font-ligth mb-4">Menu</h1>
      <Link to="/new-saucer" className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold">Agregar Platillo</Link>

      {saucers.map((saucer:ISaucer)=>(
        <Saucer key={saucer.id} saucer={saucer}/>
      ))}
    </>

  )
}
