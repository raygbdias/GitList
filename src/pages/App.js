import { useState } from 'react';
import gitlogo from '../assets/github-logo.png'; 
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';

import {Container} from './styles'
import { api } from '../services/api';

function App() {
  
  const [repos, setRepos] = useState([]);

  const [currentRepo, setCurrentRepo] = useState('')
  const handleSearchRepo = async () =>{
    
    const {data} = await api.get(`repos/${currentRepo}`)

    

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id)

      if(!isExist){
          setRepos(prev =>[...prev, data])
          setCurrentRepo('')
          return
      }
    }
    alert("Repo already showing")
  }


  return (
    <Container>
      <img src = {gitlogo} width={72} height={72} alt='github-logo'/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo} />
      {repos.map(repo =><ItemRepo repo={repo}/>)}
    </Container>
  );
}

export default App;
