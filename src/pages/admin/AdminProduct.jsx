import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../components/contexts/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import { IoImages } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import "../../css/Admin.css";
import AdminMenu from "../../components/nav/AdminMenu";
import Navbar from "../../components/Navbar/index";
import Footer from "../../components/Footer";

const AdminProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [locationType, setLocationType] = useState("");
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth } = useAuth();
  const fileInputRef = useRef(null);

  // /fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/category/categories");
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories([]);
        console.error("Expected an array but received:", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
// fragrance, scent, brand, usage
  // handleFormSubmit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("category", category);
    productData.append("shipping", shipping);
    productData.append("gender", gender);
    productData.append("propertyType", propertyType);
    productData.append("locationType", locationType);
    productData.append("room", room);
    images.forEach((image) => {
      productData.append("images", image);
    });

    try {
      setLoading(true);
      const { data } = await axios.post("/product/create", productData);

      if (data?.success) {
        fetchCategories();
        setName("");
        setDescription("");
        setPrice("");
        setQuantity(1);
        setCategory("");
        setShipping(false);
        setImages([]);
        setGender("");
        
       
        setPropertyType("");
        setLocationType("");
        setRoom("");
        toast.success("Product created successfully");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data;
      toast.error(msg);
      setLoading(false);
    }
  };

  const handleAddMoreImages = () => {
    fileInputRef.current.click();
  };

  const handleDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div>
      <Navbar />
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      />

      <div className="container mt-md-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Products</div>

            <div className="pt-2">
                {/* Display uploaded images */}
                <div className="mb-3" style={{ position: "relative" }}>
                  {images &&
                    images.map((image, index) => (
                      <>
                        {images && images.length > 0 && (
                          <span
                            className="bg-danger text-light p-1 rounded-5 text-center"
                            style={{
                              position: "absolute",
                              left: "13 %",
                              width: "20px",
                              height: "20px",
                              fontSize: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDelete(index)}
                          >
                            X
                          </span>
                        )}
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index + 1}`}
                          className="img-thumbnail mr-2 mx-2"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </>
                    ))}
                    {images && images.length > 0 && (
                          <span className="text-center text-dark p-2">
                            Add
                            <FaPlus
                              className="ms-1"
                              onClick={handleAddMoreImages}
                            />
                          </span>
                        )}
                </div>

                <label className="btn btn-outline-dark mb-3">
                <IoImages /> Upload images
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImages([...images, ...Array.from(e.target.files)])
                  }
                  multiple
                  hidden
                  ref={fileInputRef}
                />
              </label>
              </div>

            <div className="col-md-6" style={{ marginTop: "1rem" }}>
              <div className="">
                <input
                  type="text"
                  className="form-control p-2 mb-3"
                  placeholder="Write name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="">
                <textarea
                  className="form-control p-2 mb-3"
                  placeholder="Write description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  className="form-control p-2 mb-3"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              {/* <div className="">
                <input
                  type="text"
                  className="form-control p-2 mb-3"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div> */}
              

              <div className="row">
                <div className="col-md-5">
                  <select
                    className="form-select p-2 mb-3"
                    placeholder="Choose category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Select Category">Select category</option>
                    {Array.isArray(categories) && categories.length > 0 ? (
                      categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))
                    ) : (
                      <option>No categories available</option>
                    )}
                  </select>
                </div>

                <div className="col-md-5">
                  <select
                    className="form-select p-2 mb-3"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Gender">Select gender</option>
                    
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/*  */}
              <div className="">
               
                <div className="row">
                  
                  <div className="col-md-5">
                    <select
                      className=" p-2 mb-3  form-select"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="">Property Type</option>
                      <option value="Fresh">Bungalow</option>
                      <option value="Citrus">Duplex</option>
                      <option value="Cedar">Flats</option>
                      <option value="Vanilla">Storey Building</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <select
                      className=" p-2 mb-3 form-select"
                      value={locationType}
                      onChange={(e) => setLocationType(e.target.value)}
                    >
                      <option value="">Location</option>
                      <option value="Body Spray">Gbagada</option>
                      <option value="Eau De Parfum">Mushin</option>
                      <option value="Eau De Cologne">Lekki</option>
                      <option value="Eau De Toilette">Magodo</option>
                      <option value="Perfum Oil">Surulere</option>
                      <option value="Deodorant">Ajah</option>
                    </select>
                  </div>
                  <div className="col-md-5">
                    <select
                      className="p-2 mb-3 form-select"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    >
                      <option value="">No. of Rooms</option>
                      <option value="2.3">1</option>
                      <option value="3.4">2</option>
                      <option value="5.0">3</option>
                      <option value="6.3">4</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-4" style={{ marginBottom: "1rem" }}>
                <button
                  className="btn btn-primary w-100"
                  onClick={handleFormSubmit}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminProduct;
