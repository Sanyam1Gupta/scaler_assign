import * as React from 'react';
import Name from './name.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.setName= this.setName.bind(this);
        this.state = {
            names: [],
            searchTerm: '',
            searchedNames: [],
            selectedName: '',
        };
      } 

      componentDidMount() {
        fetch('https://swapi.dev/api/people/?search=sky')
        .then(response => response.json())
        .then(json => {console.log(json.results);
            let response=json.results;
            let i;
            let names=[];
            for(i=0;i<json.results.length;i++)
            {
                console.log(response[i].name);
                names.push(response[i].name);
            }
            this.setState({names: names});
        }
        )
    }

    editSearchTerm =(e) => {
        this.setState({searchTerm: e.target.value});
        this.setState({searchedNames: this.dynamicSearch()});
    }

    dynamicSearch = () => {
        return this.state.names.filter((name) => {
            console.log(name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
            return name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
        })
    }

    setName =(e) => {
        console.log(e);
        this.setState({selectedName: e});
    }

    render(){
        const {names, searchTerm, searchedNames, selectedName}=this.state;
       
        return(
            <Router>
            <div>
                <input type='text' value={searchTerm} onChange={this.editSearchTerm} 
                placeholder='search a name' />
                 
                 {searchTerm!=='' && searchedNames.map((name) => {
               return (
                   <>
               <li>
               <Link to="/name" target="_blank" rel="noopener noreferrer" onClick={this.setName}>{name}</Link>
               </li>
                  
               </>
               )
           })
        }
        {searchTerm !== '' && <div>
                   {searchedNames.length} results fetched for this search
               </div> 
        }
        
            
                <Switch>
                    <Route path="/name">
                    <Name name={selectedName} />
                    </Route>
                    </Switch>
           
       
        
            </div>
            </Router>
            
        )
    }
}

export default Search;