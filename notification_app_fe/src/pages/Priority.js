import { useEffect, useState } from "react";
import api from "../services/api";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  Container,
  Chip,
  IconButton
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Priority() {
  const [top, setTop] = useState([]);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("All");

  const weight = {
    Placement: 3,
    Result: 2,
    Event: 1
  };

  useEffect(() => {
    fetchPriority();
  }, [limit, filter]);

  const fetchPriority = async () => {
    try {
      const res = await api.get("/notifications");
      let data = res.data.notifications;

      if (filter !== "All") {
        data = data.filter((n) => n.Type === filter);
      }

      const sorted = data
        .sort((a, b) =>
          weight[b.Type] !== weight[a.Type]
            ? weight[b.Type] - weight[a.Type]
            : new Date(b.Timestamp) - new Date(a.Timestamp)
        )
        .slice(0, limit);

      setTop(sorted);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AppBar position="static">
  <Toolbar>
    <IconButton
      color="inherit"
      href="/"
      sx={{ mr: 2 }}
    >
      <ArrowBackIcon />
    </IconButton>

    <Typography variant="h6">
      Priority Notifications
    </Typography>
  </Toolbar>
</AppBar>

      <Container sx={{ mt: 3 }}>
        <Select value={limit} onChange={(e) => setLimit(e.target.value)} sx={{ mr: 2 }}>
          <MenuItem value={10}>Top 10</MenuItem>
          <MenuItem value={15}>Top 15</MenuItem>
          <MenuItem value={20}>Top 20</MenuItem>
        </Select>

        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>

        {top.map((n) => (
          <Card key={n.ID} sx={{ mt: 2 }}>
            <CardContent>
              <Chip label={n.Type} color="secondary" size="small" />
              <Typography variant="h6" sx={{ mt: 1 }}>
                {n.Message}
              </Typography>
              <Typography variant="body2">{n.Timestamp}</Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default Priority;