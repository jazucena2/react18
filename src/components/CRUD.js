import DForm from "./CRUD/DForm";
import DTable from "./CRUD/DTable";
import { Container } from "@mui/material";
import Navbar from "./Navbar/Navbar";
function CRUD() {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" margin-bottom={2}>
        <DTable />
        <DForm />
      </Container>
    </>
  );
}
export default CRUD;
