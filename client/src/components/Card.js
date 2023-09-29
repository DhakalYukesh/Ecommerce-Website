import React from "react";

export default function Card(props) {
  let options = props.options
  let priceOptions = Object.keys(options)

  return (
    <div>
      <div
        className="card mt-4"
        style={{ width: " 18rem", maxHeight: "480px" }}
      >
        <img
          className="card-img-top"
          src={props.imgSrc}
          alt="img"
          style={{height: "150px", objectFit: "cover"}}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, velit.</p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select className="m-2 h-100 bg-warning rounded">
              {priceOptions.map((item)=>{
                return(
                  <option key={item} value={item}>{item}</option>
                )
              })}
            </select>

            <div className="d-inline h-100 fs-5"> Price</div>
          </div>
        </div>
      </div>
    </div>
  );
}
