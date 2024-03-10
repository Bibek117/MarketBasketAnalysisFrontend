import {useState} from "react";
import "../styles/energy.css"; // Assume this is the CSS file for styling
import { protectedApi } from "../config/axios";
import { useStateContext } from "../context/ContextProvider";

const Energy = () => {
  const {user} = useStateContext();
  const [quantity,setQuantity] = useState(null);


  const paymentGateway = (formData) => {
    console.log(formData);
    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute(
      "action",
      "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
    );

    for (let key in formData) {
      let hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

 const handleSubmit =async (e) =>{
  e.preventDefault();
  try{
   const resp =  await protectedApi.post("/energy/order-energy",{
      quantity,userId : user.id
    });
    if(resp.data.success == true){
      //TODO handle other data
      paymentGateway(resp.data.formData)
    }
  }catch(err){
    console.log(err)
  }
 }

  
  return (
    <div className="energy-form">
      <h2>Energy</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="quantity">Quantity:</label>
        <input onChange={(e)=>setQuantity(e.target.value)} value={quantity} type="number" id="quantity" name="quantity" min="1" required />
        <button className="purchase_button" type="submit">Purchase</button>
      </form>
    </div>
  );
};

export default Energy;
