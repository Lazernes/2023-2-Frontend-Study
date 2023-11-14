import "./DoneItem.css"

const DoneItem = ({id, content, isDone, onUpdate, onDelete}) => {
  const onChangeCheckbox =() => {
    onUpdate(id);
  };

  const onClickDelete = () => {
    onDelete(id);
  }

    return (
    <div className="DoneItem">
      <div className="checkbox">
        <input onChange={onChangeCheckbox} checked={!isDone} type="checkbox" />
      </div>
      <div className="title">{content}</div>
      <div className="DeleteButton">
        <button onClick={onClickDelete}>삭제</button>
      </div>
    </div>
  );
};
export default DoneItem;