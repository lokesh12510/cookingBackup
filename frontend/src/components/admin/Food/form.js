import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";


import * as foodService from "../services/foodService";
import * as commonService from "../services/commonService";
import url from '../url';
import * as SweetAlert from "../../ui/SweetAlert";
import FormEditor from "../../ui/FormEditor";

import Switch from "react-switch";

const initialValues = {
  food_name: "",
  food_type_id: "",
  short_description: "",
  price: "",
  status: false,
  image_url: "",
  image_file: "",


};

export const Form = (props) => {
  let navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  // Edit
  const params = useParams();
  const id = params.id || '';
  
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);
  const [ingredientDetails, setIngredientDetails] = useState([{ ingredient:'' }]);

  const [foodTypeList,setFoodTypeList] = useState([]);
  
  useEffect(() => {
    if(id > 0)
    {
      editFood();
    }
    getFoodTypeList();
  
  }, []);

  const editFood = () => {
    foodService.Show(id)
    .then((response) => {
      setValues(response.data.FoodDetails);

       setIngredientDetails(response.data.IngredientDetails);
     
    }).catch((e) => {
      console.log(e);
      navigate(url.Food);
    });
  };

  const getFoodTypeList =  async () => {
    foodService.foodTypeList()
      .then((response) => {
        //creating object from another object eg:{value:1,label:php}
        setFoodTypeList(response.data);
      }).catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name == "image_file") {
      let files = e.target.files;
      setValues((p) => ({ ...p, ["image_file"]: files[0] }));
      setValues((p) => ({ ...p, ["image_url"]: URL.createObjectURL(files[0]) }));
    }
   
    else {
      setValues((p) => ({ ...p, [name]: value }));
    }
   
  };



  const addMoreInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...ingredientDetails];
    list[index][name] = value;
    setIngredientDetails(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...ingredientDetails];
    if (list.length > 1) {
      list.splice(index, 1);
      setIngredientDetails(list);
    } else {
      alert("Atleast One row Present");
    }

  };





  // handle click event of the Add button
  const handleAddClick = () => {
    setIngredientDetails([...ingredientDetails, { ingredient:'' }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let userInput = { ...values, ingredientDetails };
    let formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    
  
    formData.append('ingredientDetails', JSON.stringify(ingredientDetails));
    formData.append('chef_id',authState.user.id);
    foodService.Store(formData)
    .then((response) => {
      if(id > 0)
      {
        SweetAlert.successAlert('Food updated successfully');
      }
      else
      {
        SweetAlert.successAlert('Food created successfully');
      }
      navigate(url.Food);
    }).catch((e) => {
      let errors = e.response.data.error[0];
      setErrors(errors);
    });
  };

  // Form Errors
  const hasErrorFor = (fieldName) => {
    return !!errors[fieldName];
  };
  const renderError = (fieldName) => {
    let status = hasErrorFor(fieldName);
    if(status)
    {
      return errors[fieldName][0];
    }
  }




  return (
    <Container>
      <div className="card">
      <form onSubmit={(e) => onSubmit(e)}>
        {errors.length > 0 ? <p> Validation Errors </p> : ""}
        <div className="form-group py-2">
          <label>Food Name</label>
          <input
            type="text"
            className="form-control"
            id="food_name"
            name="food_name"
            value={values.food_name}
            onChange={handleInputChange}
            placeholder="Enter Food Name"
          />
          <span className="text-danger">{renderError('food_name')}</span>
        </div>

        <div className="form-group py-2">
          <label style={{ marginRight: "2rem" }}>Food Type</label>
          <select name="food_type_id" className="form-control country" value={values.food_type_id} onChange={handleInputChange}>
            <option value="">select type</option>
            {foodTypeList.map((item, index) => (
              <option key={index} value={item.id}> {item.type}</option>
            ))}
          </select>
          <p className="text-danger">{renderError('food_type_id')}</p>
        </div>
        <div className="form-group py-2">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={values.price}
            onChange={handleInputChange}
            placeholder="Enter Price"
          />
          <span className="text-danger">{renderError('price')}</span>
        </div>
        <div className="form-group py-2">
          <label>Short Description</label>
          <FormEditor 
            editorId="description" 
            editorData={ values.short_description }
            onEditorChange={(data) => {
              setValues(p => ({ ...p, ['short_description']: data }));
            }}
          />
        </div>

        <div className="form-group py-2">
          <label style={{ marginRight: "2rem" }}>Status</label>

          <div className="form-check form-check-inline">
          <Switch name="status" onChange={(checked)=>{setValues(p => ({ ...p, ['status']: checked }));}} checked={values.status} />

            {/* <input
              className="form-check-input"
              type="radio" 
              id="gender"
              name="gender"
              value="male"
              onChange={handleInputChange}
              checked={values.gender == "male" ? true : false}
            />
            <label className="form-check-label">Male</label> */}
          </div>

          {/* <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="gender"
              name="gender"
              value="female"
              onChange={handleInputChange}
              checked={values.gender == "female" ? true : false}
            />
            <label className="form-check-label">FeMale</label>
          </div> */}

         
          <p className="text-danger">{renderError('gender')}</p>
        </div>

      

       
       
       
        
        <div className="form-group py-2">
          <label>Food Image</label>
          <input
            type="file"
            className="form-control"
            name="image_file"
            accept="image/*"
            onChange={handleInputChange}
          />
          <span className="text-danger">{renderError('image_file')}</span>
          {values.image_url && (
          <div className="form-group col-md-6 py-2">
            <img src={ values.image_url } className="img-thumbnail" style={{maxHeight:"100px"}} alt="image" />
          </div>
         
          )}
           <div><b>
            Note:Image with good resolution(700*700) is preferred.Images with bad resolution will not be displayed with good quality. </b>
           </div>
        </div>

        <hr />
        
        <h6>Ingredients Details:</h6>
        <div className="experiemce-details">
          {ingredientDetails.map((input, index) => {
            return (
              <div className="row" key={index}>
                
                <div className="form-group py-2 col-md-3">
                  <label>Ingredients</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ingredient"
                    value={input.ingredient}
                    onChange={e => addMoreInput(e, index)}
                    placeholder="Enter Ingredient"
                  />
                  <p className="text-danger">{renderError('ingredientDetails.' + index + '.ingredient')}</p>
                </div>

               
                <div className="form-group py-2 col-md-3">

                  <button type="button" className="btn btn-danger remove-row mb50" onClick={() => handleRemoveClick(index)}>-</button>
                  <button type="button" className="btn btn-success add-row mb50" onClick={handleAddClick}>+</button>


                </div>

              </div>
            );
          })}
        </div>

        <hr />

        
        
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
    </Container>
  );
};
