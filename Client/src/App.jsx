import { useState , useEffect} from "react";
import send from "./assets/send.svg";
import user from "./assets/user.png";
import loader from "./assets/loader.svg";
import bot from "./assets/bot.png";
import axios from "axios";
import Navbar from "./Navbar";
function App() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("dark");
  const [posts, setPosts] = useState([]);

  const fetchBotResponse = async () => {
    const {data} = await axios.post(
      "http://localhost:4000",
      { input },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  };

  useEffect(()=>{
    document.querySelector('.layout').scrollTop = document.querySelector('.layout').scrollHeight;
  },[posts])

  const onSubmit = () => {
    if (input.trim() === "") return;
    updatePosts(input);
    updatePosts("",false,true);
    setInput("")
    fetchBotResponse().then((res)=>{
      console.log(res);
      updatePosts(res.bot.trim(),true);
    });
  };

const autoTypingResponse = (text)=>{
  let index = 0;
  let  interval = setInterval(()=>{
    if(index < text.length){
      setPosts((prevState) => {
        let lastItem = prevState.pop();
        if(lastItem.type !== "bot"){
          prevState.push({
            type:"bot",
            post: text.charAt(index-1)
          })
        }
        else{
          prevState.push({
            type:"bot",
            post: lastItem.post + text.charAt(index-1)
          })
        }
        return [...prevState]
      });
      index++;
    }
    else{
      clearInterval(interval);
    }
  },30)
}

  const updatePosts = (post, isBot, isLoading) => {
    if(isBot){
      autoTypingResponse(post);
    }
    else{
      setPosts((prevState) => {
        return [...prevState, { type: isLoading?"loading":"user", post }];
      });
    }
    
  };
  const onKeyUp = (e) => {
    if (e.key === "Enter" || e.which === 13) {
      onSubmit();
    }
  };
  return (
    <>
    <Navbar mode={mode} setMode={setMode}/>
    <main className="chatGPT-app">
      <section className="chat-container">
        <div className="layout">
          {posts.map((post, index) => {
            return (
              <div
                key={index}
                className={`chat-bubble ${
                  post.type === "bot" || post.type === "loading" ? "bot" : ""
                }`}
              >
                <div className="avatar">
                  <img
                    src={`${
                      post.type === "bot" || post.type === "loading"
                        ? bot
                        : user
                    }`}
                    alt=""
                  />
                </div>
                {post.type === "loading" ? (
                  <div className="loader">
                    <img src={loader} alt="" />
                  </div>
                ) : (
                  ""
                )}
                <div className="post">{post.post}</div>
              </div>
            );
          })}
        </div>
      </section>
      <footer>
        <input
          type="text"
          className="composebar"
          autoFocus
          placeholder="Ask Anything From AI"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyUp={onKeyUp}
          value={input}
        />
        <div className="send-button" onClick={onSubmit}>
          <img src={send} alt="" />
        </div>
      </footer>
    </main>
    </>
  );
}

export default App;
