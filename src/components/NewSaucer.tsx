import { useContext, useState } from "react";
import {useFormik} from "formik";
import * as yup from 'yup';

import { FirebaseContext } from "../firebase";
import { useNavigate } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";

export interface ISaucer {
    name: string,
    price: number | '',
    category:string,
    description:string
}



const Schema = yup.object({
    name: yup.string()
             .min(3,'El nombre del platillo debe tener como minimo 3 caracteres.')
             .required('El nombre es obligatorio.'),
    price: yup.number()
              .min(1,'deber agregar un numero.')
              .required('El Precio es obligatorio.'),
    category: yup.string()
              .required('La categoria es obligatoria.'),
    image: yup.string()
              .nullable(/* 'La imagen es obligatoria.' */),
    description: yup.string()
              .min(10,'La descripcion debe tener como minimo 10 caracteres.')
              .required('La descripcion es obligatoria.')
}).required()

export const NewSaucer = () => {
    const [upload, setUpload] = useState(false);
    const [progress,setProgress] = useState(0);
    const [url,setUrl] = useState('');

    const context:any = useContext(FirebaseContext);

    const navigate = useNavigate();
    
    

    const formik = useFormik<ISaucer>({
        initialValues: {
            name: '',
            price: '',
            category: '',
            description: ''
        },
        validationSchema: Schema,
        onSubmit: data =>{
           try {
            if (context) {
                context.firebase.db.collection('products').add({...data,status:true,image:url});
                navigate('/menu')
            }
           } catch (e) {
            console.error(e)
           }
        }
    })

  const {name,price,category,description} = formik.values;

  const handleUploadStart = () =>{
    setProgress(0);
    setUpload(true);
  }
  const handleUploadError = (error) =>{
    setUpload(false);
    
  }
  const handleUploadSuccess = async (name:string) =>{
    setProgress(100);
    setUpload(false);
    
    const url = await context
                .firebase
                .storage
                .ref('products')
                .child(name)
                .getDownloadURL();     
    setUrl(url);
  }
  const handleProgress = (progress:number) =>{
    setProgress(progress)
  }
  

  return (
    <>
        <h1 className="text-3xl font-ligth mb-4">Agregar platillo</h1>

        <div className="flex justify-center">
            <div className="w-full max-w-2xl">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
                            placeholder="Nombre platillo"
                            value={name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {(formik.touched.name && formik.errors.name) &&
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.name}</p>
                        </div>
                    }
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
                        <input
                            type="number"
                            id="price"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
                            placeholder="$15000"
                            value={price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {(formik.touched.price && formik.errors.price) &&
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.price}</p>
                        </div>
                    }

                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Categoria:</label>
                        <select
                            id="category"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
                            value={category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            >
                                <option value=""> ---Selecciona---</option>
                                <option value="desayuno">Desayuno</option>
                                <option value="comida">Comida</option>
                                <option value="cena">Cena</option>
                                <option value="bebida">Bebidas</option>
                                <option value="postre">Postre</option>
                                <option value="ensalada">Ensalada</option>
                        </select>
                    </div>
                    {(formik.touched.category && formik.errors.category) &&
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.category}</p>
                        </div>
                    }
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Imagen:</label>
                       {/*  <input
                            type="file"
                            id="image"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
                            value={image}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        /> */}
                        <FileUploader
                            acept="image/*"
                            id="image"
                            name="imagen"
                            randomizeFilename
                            storageRef={context.firebase.storage.ref("products")}
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}
                        />
                    </div>

                    {upload&&
                        <div className="h-12 relative w-full border">
                            <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width:`${progress}%`}}>
                                {progress} %
                            </div>
                        </div>
                    }

                    {url&&
                        <p className="bg-green-500 text-white p-3 text-center my-5">
                            la imagen se subio correctamente
                        </p>
                    }
        

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
                        <textarea 
                            id="description"
                            className="shadow appearance-none border rounded w-full h-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
                            placeholder="descripción platillo"
                            value={description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        ></textarea>
                    </div>

                    {(formik.touched.description && formik.errors.description) &&
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Hubo un error:</p>
                            <p>{formik.errors.description}</p>
                        </div>
                    }

                    <input 
                        type="submit"
                        value="Agregar platillo"
                        className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercae font-bold"
                    />
                </form>
            </div>
        </div>
    </>
  )
}
