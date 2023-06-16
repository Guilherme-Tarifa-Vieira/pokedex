import React from "react";

const PokemonThumb = ({ id, name, image, type, onClickFunction }) => {
  const style = `thumb-container ${type}`;

  return (
    <>
      <div className={style} onClick={onClickFunction}>
        <div className="number">
          <small>
            {id < 100 ? "0" : ""}
            {id}
          </small>
        </div>
        <img src={image} alt={name} />
        <div className="detail-wrapper">
          <h3>{name}</h3>
          <small>Type: {type}</small>
        </div>
      </div>
    </>
  );
};

export default PokemonThumb;
