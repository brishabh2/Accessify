import { useAuth } from '../context/AuthContext';
import { Card, Container, Row, Col } from 'react-bootstrap';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = {
    totalUsers: 123,
    admins: 10,
    superAdmins: 3,
    users: 110,
    activeUsers: 97,
  };

  const roleData = [
    { name: 'Super Admins', value: stats.superAdmins },
    { name: 'Admins', value: stats.admins },
    { name: 'Users', value: stats.users },
  ];

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

  const loginData = [
    { day: 'Mon', logins: 25 },
    { day: 'Tue', logins: 30 },
    { day: 'Wed', logins: 15 },
    { day: 'Thu', logins: 40 },
    { day: 'Fri', logins: 20 },
    { day: 'Sat', logins: 10 },
    { day: 'Sun', logins: 12 },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Welcome, {user?.name}</h2>

      {/* Summary Cards */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <Card className="text-white bg-primary shadow">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h2>{stats.totalUsers}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="text-white bg-success shadow">
            <Card.Body>
              <Card.Title>Admins</Card.Title>
              <h2>{stats.admins}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="text-white bg-danger shadow">
            <Card.Body>
              <Card.Title>Super Admins</Card.Title>
              <h2>{stats.superAdmins}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="text-white bg-info shadow">
            <Card.Body>
              <Card.Title>Active Users</Card.Title>
              <h2>{stats.activeUsers}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="g-4">
        <Col md={12} lg={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="mb-3">User Roles Distribution</Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={roleData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {roleData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12} lg={6}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="mb-3">Daily Logins</Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={loginData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="logins" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
