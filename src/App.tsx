import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Home, Post, Login, Register } from "./pages";
import { Header, Footer, CreatePost } from "./components";

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flexGrow={1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
