import PropTypes from "prop-types";
import "./bottle.css";
const Bottle = ({bottle, handleAddCard}) => {
  // console.log(bottle);
  const { name, price, img } = bottle;
  return (
    <div className="bottle">
      <h3>Bottle: {name}</h3>
      <img src={img} alt="" />
      <h3>Price: ${price}</h3>
      <button onClick={() => handleAddCard(bottle)}>Purchase</button>
    </div>
  );
};
Bottle.prototype = {
  bottle: PropTypes.object.isRequired,
  handleAddCard: PropTypes.func.isRequired,
};
export default Bottle;
