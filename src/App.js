import logo from './logo.svg';
import './App.css';
import {useState} from 'react';


function Header(props){
  return <header className="App-header">
          <h1><a href="/" onClick={(event)=>{
            event.preventDefault();
            props.onChangeMode();
          }}>{props.title}</a></h1>
         </header>
}

function NAV(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a></li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function Matamask(props){
    const lis = []
    for(let i=0; i<props.address1.length;i++){
      let t = props.address1[i];
      lis.push(<li key={t.id}>{t.address}</li>) //key={t.id}>
    }
    return <span>
        {lis}
    </span>
}

function Create(props){
  console.log(props,"프롭");
  return <article>
      <h2>Create</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title_value = event.target.title.value;
        console.log(title_value);
        const body_value = event.target.body.value;
        props.onCreate(title_value,body_value);
      }}>
        <p><input type="text" name="title" placeholder='title'/></p>
        <p><textarea name="body" placeholder='body'></textarea></p>
        <p><input type="submit" value="Create"/></p>
      </form>
  </article>
}

function Update(props){
  const [title,setTitle] = useState(props.title);
  const [body,setBody] = useState(props.body);
  console.log(title,"걍 궁금해서");

  return <article>
  <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title_value = event.target.title.value;
      const body_value = event.target.body.value;
      props.onUpdate(title_value,body_value);
    }}>
      <p><input type="text" name="title" placeholder='title' value={title} onChange={event=>{
        console.log(event.target.value);
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name="body" placeholder='body' value={body} onChange={event=>{
        console.log(event.target.value);
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"/></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME'); // 축약해서 
  const [id,setID] = useState(null);
  const [nextID,setNextId] = useState(4);
  const [topics,setTofics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ])
  


  let content = null;
  let contextControl = null;
  if(mode === "WELCOME"){
    content = <Article title="WELCOME" body="Hello WEB"></Article>
    console.log(content,"콘텐트");
  }else if(mode === "READ"){
    let title, body  = null;
    for(let i = 0 ; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title
        body = topics[i].body
        console.log(title,"title");
        console.log(body,"body");
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
      <li><a href={'/update/'+id} onClick={event=>{
        event.preventDefault();
        setMode("UPDATE");
      }}>Update</a></li> 
      <li><input type="button" value="delete" onClick={()=>{
        if(window.confirm("정말로 삭제하시겠습니까?")){
          const cloneTopic = []
          for(let i=0; i<topics.length; i++){
            if(topics[i].id !== id){
              cloneTopic.push(topics[i]); 
            }
          }
          window.alert("삭제 되었습니다");
          setTofics(cloneTopic);
          setMode("WELCOME");
       }else{
        window.alert("삭제를 취소했습니다");
       }}}></input></li>
      </> // eslint-disable-line no-unused-vars
      console.log(content,"이거 실행되냐?");
  }else if(mode === "CREATE"){
    content = <Create onCreate={(_title,_body)=>{
      const newTofic = {id: nextID,title:_title,body:_body}
      const newTofics=[...topics]
      newTofics.push(newTofic);
      setTofics(newTofics);
      setMode("READ");
      setNextId(nextID+1)
      
      // topics.push({id:topics_id, title: _title, body:_body})
      // console.log(topics,"토픽");
      // setMode("READ");
      // setID(topics_id);
      // topics_id = topics_id+1;
    } }></Create>
  } else if(mode === "UPDATE"){
    let title, body  = null;
    for(let i = 0 ; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title
        body = topics[i].body
        console.log(title,"title");
        console.log(body,"body");
      }
    }
    content = <Update title={title} body={body} onUpdate={(title,body)=>{
      console.log(title,body,id);
      const newTofics = [...topics]
      const updatedTofic = {id:id, title:title,body:body}
      for(let i=0;i<newTofics.length;i++){
        if(newTofics[i].id===id){
          newTofics[i] = updatedTofic;
          break;
        }
      }
      setTofics(newTofics);
    }}></Update>
  }

  return (
    <div className="App">
      <Header title="Web" onChangeMode={()=>{
        setMode("WELCOME");
      }}></Header>
      <NAV topics={topics} onChangeMode={_id=>{   // function(_id)
        console.log(_id,"여기");
        setMode("READ");
        setID(_id);
      }}></NAV>
      {content}
      <ul>
        <li>
          <a href="/create" onClick={event=>{
            event.preventDefault();
            setMode("CREATE");
          }}>Create</a>
        </li>
        {contextControl}
      </ul>
      {/* <Matamask address1={address1}></Matamask> */}
    </div>
    
  );
}

export default App;
