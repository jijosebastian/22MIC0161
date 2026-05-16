import { useEffect, useState } from "react";
import api from "../services/api";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Container
} from "@mui/material";

function Home() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      const viewed = JSON.parse(localStorage.getItem("viewed")) || [];

      const updated = res.data.notifications.map((n) => ({
        ...n,
        viewed: viewed.includes(n.ID),
      }));

      setNotifications(updated);
    } catch (err) {
      console.log(err);
    }
  };

  const markViewed = (id) => {
    let viewed = JSON.parse(localStorage.getItem("viewed")) || [];
    if (!viewed.includes(id)) viewed.push(id);

    localStorage.setItem("viewed", JSON.stringify(viewed));
    fetchNotifications();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Notification Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Button variant="contained" href="/priority" sx={{ mb: 3 }}>
          Priority Page
        </Button>

        {notifications.map((n) => (
          <Card
            key={n.ID}
            sx={{
              mb: 2,
              cursor: "pointer",
              backgroundColor: n.viewed ? "#f5f5f5" : "#e3f2fd",
            }}
            onClick={() => markViewed(n.ID)}
          >
            <CardContent>
              <Chip label={n.Type} color="primary" size="small" />
              <Typography variant="h6" sx={{ mt: 1 }}>
                {n.Message}
              </Typography>
              <Typography variant="body2">{n.Timestamp}</Typography>
              <Typography color={n.viewed ? "gray" : "green"}>
                {n.viewed ? "Viewed" : "New"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default Home;