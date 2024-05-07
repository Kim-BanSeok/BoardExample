
import './App.css';
//import Hello from './component/Hello';
//import Welcome from './component/Welcome';
//import styles from "./App.module.css"
import Header from "./component/Header";
import DayList from './component/DayList';
import Day from './component/day';

import { BrowserRouter, Route, Routes } from "react-router-dom";
//import EmptyPage from "./component/EmptyPage";

function App() {
  // const name = "Tom"
  // const user = {
  //   name: "jane"
  // }
  // const naver ={
  //   name: "네이버",
  //   url: "http://www.naver.com"
  // }
  // function showName(){
  //   console.log("Mike")
  // }

  // function showAge(age){
  //   console.log(age)
  // }

  // function showText(text){
  //   console.log(text)
  // }


  
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <Routes>
      <Route exact path="/" element={<DayList />} />
      <Route path="/users/*" element={<Day />} />  
        

      </Routes>

      {/* <DayList/>
      <Day/> */}

      {/* <Hello age={10}/>
      <Hello age={20}/>
      <Hello age={30}/> */}


      {/* <Welcome/>    
      <h1 style = 
      {{
        color: "#f0f",
        backgroundColor: "green"
      }}
      >Hello, {name}<p>{2+3}</p>
      <p>{user.name}</p> 
      </h1>
      <a href={naver.url}>{naver.name}</a>
      <div className = {styles.box}>App</div>

      <p><button onClick={showName}>Show name</button></p>
      <p><button onClick={
        ()=>{
          showAge(20)
        }
      }>Show age</button></p>
      <p><input type="text" onChange={showText}/></p>
      <input type="text" onChange={(e)=>{
        const txt = e.target.value;
        showText(txt);
      }}/> */}

      
    </div>
    </BrowserRouter>
    
    
  );
}
 
export default App;
