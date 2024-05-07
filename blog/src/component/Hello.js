
/*
const Hello = () => {
    <p>Hello</p>
}
export default Hello;
*/

import World from "./World";
import styles from "./Hello.module.css";
import {useState} from "react"
import UserName from "./UserName";


//export default function Hello({props}){
export default function Hello({age}){
    
    //////state///////////
  //let name = "Mike"
  const [name, setName] = useState("Mike");
  //const [age, setAge] = useState(props.age);
  const msg = age > 19 ? '성인입니다.' : '미성년자입니다.';
  function changeName(){
    //const newnname = name === "Mike"? "Jane" : "Mike"
    
    //document.getElementById("name").innerText = name;
   // setName(newnname)
    setName(name === "Mike" ? "Jane" : "Mike")
    console.log(name)
  }
    return(
    <div>
        {/* <h1 style ={
            {
                color: '#f00',
                borderRight: '12px solid red',
                marginBottom: '50px',
                opacity: '0.5'
            }
        }>Hello</h1>
      <div className = {styles.box}>Hello</div>
     // <World></World> */}

      
      <h2 id="name">
        {name}({age}):{msg}
      </h2>
      <UserName name={name}/>
      <button onClick={()=>{
        setName(name === "Mike"? "Jane" : "Mike")
        console.log(name)
       //setAge(age + 1)
      }}>change name</button>
      
      
   </div>
    )
    
}