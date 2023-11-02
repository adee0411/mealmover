import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";

import "./ProductDetailPage.scss";

import { addItem } from "../../store/cartSlice";
import { addCartAnimation } from "../../store/navigationSlice";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const productQuantityRef = useRef(1);

  const params = useParams();
  const productID = params.productID;

  const allMenu = useSelector((state) => state.menuFilter.allMenu);
  const allMenuArr = Object.values(allMenu).flat();

  const menuToRender = allMenuArr.find((el) => el.id === productID);

  const handleQuantityChange = (e) => {
    const value = +e.target.value;
    if (value < 1) {
      e.target.value = "";
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    if (!productQuantityRef.current.value) {
      productQuantityRef.current.value = 1;
      return;
    } else {
      const item = {
        quantity: +productQuantityRef.current.value,
        itemData: { ...menuToRender },
        itemTotal: +productQuantityRef.current.value * menuToRender.price,
      };
      dispatch(addItem(item));
      dispatch(addCartAnimation(true));
    }
  };

  return (
    <>
      <div className="product-detail-page-wrapper">
        <div className="product-detail-wrapper">
          <header className="product-detail-wrapper__header">
            <div className="product-image-wrapper">
              <div className="product-image-wrapper__image">
                <img src={menuToRender.image_url} />
              </div>
            </div>
          </header>
          <div className="product-detail-wrapper__content">
            <h2 className="product-detail-wrapper__product-title">
              {menuToRender.title}
            </h2>
            <div className="product-detail-wrapper__details">
              <h3>Details</h3>
              <p>{menuToRender.details.join(", ")}</p>
            </div>
            <div className="product-detail-wrapper__price">
              <h3>Price</h3>
              <p>{menuToRender.price} Ft</p>
            </div>
            <div className="product-detail-wrapper__add-to-cart">
              <form className="add-to-cart-form">
                <h3>Quantity</h3>
                <div className="input-wrapper">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    ref={productQuantityRef}
                    onChange={handleQuantityChange}
                    defaultValue={1}
                  />
                  <button onClick={handleAddItemToCart}>Add to cart</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
