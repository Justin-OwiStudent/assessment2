import axios from 'axios';
import { useState } from 'react';
import EditPost from './EditPost';

function App(props) {
  sessionStorage.setItem('activeUser', 'justin')

  const [modal, setModal] = useState();

  const editPost = () => {
    setModal(<EditPost upRender={props.rerender} rerender={setModal} original={props.message} id={props.uniqueId}  />)
  }

  const [renderPost, setRenderPost] = useState();

  const [postMessage, setPostMessage] = useState({
    message: '', 
    user: sessionStorage.getItem('activeUser'),
  });

  const postVal = (e) => {
    let messageVal = e.target.value;
    setPostMessage({...postMessage, message: messageVal});
   }

   const addNewPost = (e) => {
     e.preventDefault();
     document.getElementById('textMes').value = "";
     axios.post('http://localhost/assessmentpost/addpost.php', postMessage)
      .then((res)=>{
        let data = res.data;
        console.log(data); 
        setRenderPost(true);
      });
   }

  const deletePost = () => {
    if(window.confirm("Are you sure you want to delete this post?") === true){
    
      let postId = {id: props.uniqueId}

      axios.post('http://localhost/assessmentpost/deleteposts.php', postId)
          .then((res)=>{
            let data = res.data;
            console.log(data);
          })

    } else {
      console.log("the user did not delete the post.")
    }
  }

  


  return (
    <div className="App">

      <div className="left">
        <h1>Your Post Timeline</h1>
        <p>Populate the area below with posts from the form to the right...</p>
        {modal}
        <div id={props.uniqueId} className="post_item">
          <h3>Post Username</h3>
          <h5>Date & Time</h5>
          <p>Lorem ipsum dolor sit amet. Vel autem omnis eum asperiores itaque sed accusantium eveniet hic molestiae esse aut laboriosam quaerat non excepturi incidunt. Est dolor quas 33 nemo repellendus sit facilis minus.</p>
          <div className="postUi">
            <div className="edit" onClick={editPost} >Edit Post</div>
            <div className="delete" onClick={deletePost}>Delete Post</div>
          </div>
        </div>
      </div>

      <div className="right">
        <form>
          <h3>Add A New Post</h3>
          <textarea id='textMes' placeholder="your post here" onChange={postVal} />
          <button type="submit" onClick={addNewPost}>Add Your New Post</button>
        </form>
      </div>
        
    </div>
  );
}

export default App;
