import Spinner from "../../ui/Spinner";

import React, { useEffect } from "react";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource={"cabins"} />;

  // FILTERING
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // SORTING
  const sortBy = searchParams.get("sortBy") || "start_date-asc";
  console.log(sortBy);
  const [field, direction] = sortBy.split("-");
  console.log(field, direction);
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount </div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin?.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
};

export default CabinTable;
