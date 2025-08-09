import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Shop = () => {
  const { user } = useAuth();
  const { addToCart, updateQuantity, cartItems } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // NEW state for search

  // New product form states
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // For edit mode
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // CREATE or UPDATE Product
  const handleSaveProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingProductId) {
        await axios.put(`http://localhost:5000/products/${editingProductId}`, {
          ...newProduct,
          price: parseFloat(newProduct.price),
        });
        setEditingProductId(null);
      } else {
        await axios.post("http://localhost:5000/products", {
          ...newProduct,
          price: parseFloat(newProduct.price),
        });
      }

      setNewProduct({ name: "", price: "", image: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    }
  };

  // DELETE Product
  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  // Prefill form for editing
  const handleEditProduct = (product: Product) => {
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
    });
    setEditingProductId(product.id);
  };

  const getCartQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h2 className="my-4">Shop</h2>

      {/* SEARCH BOX */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      {/* SUPERADMIN PRODUCT FORM */}
      {user?.role === "superadmin" && (
        <Card className="mb-4 p-3 shadow">
          <h5>{editingProductId ? "Edit Product" : "Add New Product"}</h5>
          <Row className="mb-2">
            <Col md={4}>
              <Form.Control
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </Col>
            <Col md={4}>
              <Form.Control
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </Col>
            <Col md={1}>
              <Button onClick={handleSaveProduct}>
                {editingProductId ? "Update" : "Add"}
              </Button>
            </Col>
          </Row>
        </Card>
      )}

      {/* PRODUCTS LIST */}
      <Row>
        {filteredProducts.map((product) => {
          const cartQuantity = getCartQuantity(product.id);

          return (
            <Col md={4} key={product.id} className="mb-4">
              <Card className="h-100 shadow">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>₹{product.price}</Card.Text>

                  {user?.role === "superadmin" ? (
                    <>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      {cartQuantity === 0 ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <div className="d-flex align-items-center gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              updateQuantity(product.id, cartQuantity - 1)
                            }
                          >
                            -
                          </Button>
                          <span>{cartQuantity}</span>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              updateQuantity(product.id, cartQuantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Shop;
