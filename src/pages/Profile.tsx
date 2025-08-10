import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  Badge,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Avatar from "react-avatar";

type FormData = {
  name: string;
};

const Profile = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const { user, updateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name || "",
    },
  });

  const onSubmit = (data: FormData) => {
    updateProfile({
      id: user!.id,
      name: data.name,
      email: user!.email,
      role: user!.role,
    });

    toast.success("Profile updated!");
    if (profilePic) toast.success("Profile picture uploaded!");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm border-0">
            <Row className="align-items-center">
              <Col md={4} className="text-center mb-4 mb-md-0">
                <div className="position-relative d-inline-block">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="rounded-circle border border-3 border-primary"
                      style={{
                        width: "110px",
                        height: "110px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Avatar
                      name={user?.name}
                      size="110"
                      round
                      color="#1E40AF"
                      fgColor="#fff"
                    />
                  )}
                </div>

                <div className="mt-3">
                  <Form.Group controlId="formFile" className="mb-0">
                    <Form.Label
                      className="fw-bold text-primary"
                      style={{ cursor: "pointer" }}
                    >
                      Change Picture
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () =>
                            setProfilePic(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </Form.Group>
                </div>

                <div className="mt-3">
                  <Badge bg="primary" className="px-3 py-2 fs-6 text-uppercase">
                    {user?.role}
                  </Badge>
                </div>
              </Col>

              <Col md={8}>
                <h4 className="mb-4 fw-bold">Edit Profile</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={user?.email || ""}
                      disabled
                      plaintext
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      variant="primary"
                      type="submit"
                      className="fw-semibold"
                    >
                      Save Changes
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
