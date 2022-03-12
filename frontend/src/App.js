import KotaList from './component/kotaList';
import { Route, Switch } from 'react-router-dom';

 
function App() {
  return (        
    <>            
          <Switch>                
             <Route path='/' component={KotaList}/>             
          </Switch>
    </>
);
}
 
export default App;
