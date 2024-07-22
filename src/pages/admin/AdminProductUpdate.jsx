import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../components/contexts/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import { IoImages } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import "../../css/Admin.css";
import AdminMenu from "../../components/nav/AdminMenu";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/index";

const AdminProductUpdate = () => {
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
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const { auth } = useAuth();
  const fileInputRef = useRef(null);
  const { slug } = useParams();
  const navigate = useNavigate();

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
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/slug/${slug}`);
      const pd = data?.product;
      setName(pd.name);
      setDescription(pd.description);
      setPrice(pd.price);
      setQuantity(pd.quantity);
      setCategory(pd.category?._id);
      setShipping(pd.shipping);
      setImages(pd.images);
      setGender(pd.gender);
      setPropertyType(pd.propertyType);
      setRoom(pd.room);
      setId(pd._id);
    } catch (err) {
      console.log(err);
    }
  };

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
    productData.append("room", room);
    images.forEach((image) => {
      productData.append("images", image);
    });

    try {
      setLoading(true);
      const { data } = await axios.put(`/product/update/${id}`, productData);

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
        setRoom("");
        toast.success("Product updated successfully");
        setLoading(false);
        setTimeout(() => {
          navigate("/dashboard/admin-products");
        }, 5000);
      }
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.error;
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
      <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Admin Dashboard" />

      <div className="container mt-md-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Update Products</div>

            <div className="pt-2">
              <div className="mb-3" style={{ position: "relative" }}>
                {images &&
                  images.map((image, index) => (
                    <div key={image.imagePublicId || index}>
                      {images.length > 0 && (
                        <span
                          className="bg-danger text-light p-1 rounded-5 text-center"
                          style={{
                            position: "absolute",
                            left: "13%",
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
                        src={image.url || URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        className="img-thumbnail mr-2 mx-2"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  ))}
                {images && images.length > 0 && (
                  <span className="text-center text-dark p-2">
                    Add
                    <FaPlus className="ms-1" onClick={handleAddMoreImages} />
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
              <div className="">
                <input
                  type="text"
                  className="form-control p-2 mb-3"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="col-md-5">
                  <select
                    className="form-select p-2 mb-3"
                    placeholder="Choose category"
                    value={category} // Ensure the category value is controlled
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    {Array.isArray(categories) && categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-5">
                  <select
                    className="form-select p-2 mb-3"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="">
                <div className="row">
                  <div className="col-md-5">
                    <select
                      className="p-2 mb-3 form-select"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <option value="">Property Type</option>
                      <option value="Bungalow">Bungalow</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Flats">Flats</option>
                      <option value="Storey Building">Storey Building</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <select
                      className="p-2 mb-3 form-select"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    >
                      <option value="">No. of Rooms</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
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
      <Footer />
    </div>
  );
};

export default AdminProductUpdate;
