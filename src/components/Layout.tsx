import { Suspense } from 'react';
import { Loader } from './Loader';
import { Sidebar } from './Sidebar';


interface Props {
  children:  JSX.Element[] | JSX.Element
}
export const Layout = ({children}:Props) => {
  return (
    <Suspense fallback={<Loader/>}>
      <div className="md:flex">
        <Sidebar/>
        <div className="md:w-3/5 xl:w-4/5 p-6">
          {children}
        </div>
      </div>
    </Suspense>
  )
}
