import { useRef, useState } from "react";
import "./Inputfield.css";

const Inputfield = ({onCreate}) => {
  const [content, setContent] = useState("");
  
  const inputRef = useRef();
  
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  
  const onSubmit = () => {
    if (!content) {
      inputRef.current.focus();
      return;
    } // 빈칸이면 추가 안됨
    onCreate(content);
    setContent(""); // 추가를 하면 inputbox 초기화
  }

  const onKeyDown = (e) => {
    if(e.keyCode === 13) { // 13은 Enter을 의미
      onSubmit();
    }
  }; // Enter 누르면 실행

  return (
    <div className="Inputfield">
      <h1>Things to do</h1>
      <div className="inputbox">
        <input 
          ref={inputRef}
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown} // Enter 누르면 실행
          placeholder="Enter your Todo" />
        <button onClick={onSubmit}>+</button>
      </div>
    </div>
  );
};
export default Inputfield;