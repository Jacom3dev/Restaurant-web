import { Layout} from "./components";
import Navigation from "./navigation";
import firebase , {FirebaseContext} from './firebase'

function App() {  
  return (
    <FirebaseContext.Provider value={{firebase}}>
      <Layout>
        <Navigation/>
      </Layout>
    </FirebaseContext.Provider>
  )
}

export default App
