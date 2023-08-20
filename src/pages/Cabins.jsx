import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button"
import CabinTable from "../features/cabins/CabinTable";
import CreateCabin from "../features/cabins/CreateCabinForm"

function Cabins() {
  const [showForm, setShowForm] = useState(false)


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort </p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm(show => !show)}>Add New Cabin</Button>
        {showForm && <CreateCabin />
        }      </Row>
    </>
  );
}

export default Cabins;
