import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let state = useCart();

  let options = props.options;
  let priceOptions = Object.keys(options);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  // Functionality for adding to cart
  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItems._id,
      name: props.foodItems.name,
      price: finalPrice,
      qty: quantity,
      size: size,
    });
    console.log(state);
  };

  let finalPrice = quantity * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div
        className="card mt-4"
        style={{ width: " 18rem", maxHeight: "480px" }}
      >
        <img
          className="card-img-top"
          src={props.foodItems.img}
          alt="img"
          style={{ height: "150px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          <p className="card-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae,
            velit.
          </p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-warning rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-warning rounded"
              ref={priceRef}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {priceOptions.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>

            <div className="d-inline h-100 fs-5">Rs. {finalPrice}/-</div>
            <hr />
            <button
              className={`btn btn-success justify-center ms-2 w-100`}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
