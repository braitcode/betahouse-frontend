import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../components/forms/CategoryForm";
import { useAuth } from "../../components/contexts/Auth";
import Modal from "react-bootstrap/Modal";
import AdminMenu from "../../components/nav/AdminMenu";
import Jumbotron from "../../components/Jumbotron";
import LoadBtn from "../../components/utils/LoadBtn";

const AdminCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [updateName, setUpdateName] = useState("");
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const { auth } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // fetch all categories from the backend. fetching using the right route as used in the backend
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

  // handleFormSubmit - this is also to create a category
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading1(true);
      const { data } = await axios.post("/category/create", { name });

      if (data?.success) {
        fetchCategories();
        setName("");
        toast.success("Category created successfully");
      } else {
        toast.error("Failed to create category");
      }
      setLoading1(false);
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data;
      toast.error(msg);
      setLoading1(false);
    }
  };

  // handleCategoryUpdate
  const handleCategoryUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(`/category/${selected._id}`, {
        name: updateName,
      });

      if (!data?.error) {
        setLoading(false);
        fetchCategories();
        setUpdateName("");
        toast.success("Category updated successfully");
        setShow(false);
      }
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.error;
      toast.error(msg);
      setLoading(false);
    }
  };

  // handleDelete
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading2(true);
      const { data } = await axios.delete(`/category/${selected._id}`);

      if (!data?.error) {
        setLoading2(false);
        fetchCategories();
        toast.success(`"${data.name}" is deleted`);
        setShow(false);
      }
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.error;
      toast.error(msg);
      setLoading2(false);
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Categories</div>

            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleFormSubmit}
              placeholder="Create new category..."
              buttonText={loading1 ? <LoadBtn /> : "Submit"}
            />

            <hr />

            <div className="col">
              {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((c) => (
                  <button
                    key={c._id}
                    className="btn btn-outline-primary m-3"
                    onClick={() => {
                      setSelected(c);
                      setUpdateName(c.name);
                      handleShow();
                    }}
                  >
                    {c.name}
                  </button>
                ))
              ) : (
                <p>No categories available</p>
              )}
            </div>

            {/* Modal */}
            <>
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CategoryForm
                    placeholder="update category name"
                    handleSubmit={handleCategoryUpdate}
                    value={updateName}
                    setValue={setUpdateName}
                    buttonText={loading ? <LoadBtn /> : "Update"}
                    handleDelete={handleDelete}
                    loading={loading2}
                    LoadBtn={LoadBtn}
                  />
                </Modal.Body>
              </Modal>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
