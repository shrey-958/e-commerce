import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ReactTable from 'react-table'
import "react-table/react-table.css"
//import Cart from './Cart'

//import PostData from './Dataa/dataa.json'

import './App.css';


function App() {
  
 const [posts, setPosts] = useState([])
 const [compCheck, setCompCheck]=useState([])
 const [buyCheck, setBuyCheck]=useState([])
 const [showText, setShowText] = useState(false);
 const columns = [{
  Header: 'Product',
  accessor: 'title'
},{
  Header: 'Display',
  accessor: 'display'
},{
  Header: 'Battery',
  accessor: 'battery'
},{
  Header: 'RAM',
  accessor: 'ram'
},{
  Header: 'Price',
  accessor: 'price'
}

]

 //const [id,setId] = useState(1)
 //const [idBut, setIdBut] = useState(1)
 useEffect(() => {
   axios.get("http://localhost:3200/posts")
   .then(res => { console.log(res) 
    setPosts(res.data)
  
  })
   .catch(err => {})
 },[])
  
  function handleCompare(prod){
    if(!prod.compare){
    setCompCheck([...compCheck, {
      id : prod.id,
      title : prod.title,
      price : prod.price,
      battery : prod.battery,
      display : prod.display,
      ram : prod.ram,
      compare : !prod.compare
    }])
  }
  else{
    const updatedComp = compCheck.filter(item => item.id !== prod.id);
    setCompCheck(updatedComp);
  }
   

  }
  function handleBuy(prod){
    if(!prod.buy){
    setBuyCheck([...buyCheck, {
      id : prod.id,
      title : prod.title,
      price : prod.price,
      buy : !prod.buy
    }])
  }
  else{
    const updatedBuy = buyCheck.filter(item => item.id !== prod.id);
    setBuyCheck(updatedBuy);
  }
   

  }
    
  
  return (
    <div>
    
    <div className="App">
    <nav><img className="logo" src ="http://pngimg.com/uploads/apple_logo/apple_logo_PNG19690.png"></img>
    <div className={(showText)?"optswitchoff":"optswitchon"} onClick={() => setShowText(!showText)}>
    <i class="fa fa-cart-plus"></i> Cart</div>
    </nav>
  <ul>
    {
      posts.map(post =><div className="template">
        <img src={post.add}/>
       
        <div className="title">
        {post.title}</div>
        <div className="price">{post.price}</div>
        <hr/>
        <div className="lower">
        <button className={(post.compare)?"remove":"comp"} onClick={e => { handleCompare(post);post.compare = !post.compare ;  }}>{(!post.compare)?<div className="compyes">COMPARE</div>:<div className="compno">REMOVE</div>}</button>
        
        <button className={(post.buy)?"buyno":"buy"} onClick={e => {handleBuy(post);post.buy = !post.buy ;  }}>{(!post.buy)?"BUY":"NOT NOW"}</button>
        
        </div>
       
      </div>)
    }
  </ul>
  
 { (compCheck.length > 1)?
  <ReactTable
                data={compCheck}
                columns={columns}
                showPagination={false}
                minRows = {0}
                style={{backgroundColor : "#e0dcdc", fontSize : "120%",fontWeight:"600", width : "60%",margin : "auto", marginBottom : "4%",marginTop : "3%", borderRadius:"10px", boxShadow:"3px 5px 5px #424242"}}
                
              />
              : null
 
 }
 {console.log(compCheck)}
 
 
 
 
    </div>
    {showText && 
      <div className={(compCheck.length > 1)?"cart1" : "cart2"} >
    
    { (buyCheck.length > 0)?
 <ul className="cart-head">
 MY BAG <i class="fa fa-gift"></i> :
 {buyCheck.map(bought => <li className="cart">{bought.title} - {bought.price}</li>)}
 </ul> : <div className="empty">List Empty! <br/> <i class="fa fa-frown-o"></i>  </div>

 }

    </div>
    }
    
    </div>
    

  );
}

export default App;