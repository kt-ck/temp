import type { ReactElement } from "react";
import FullLayout from "../../../src/layouts/full/FullLayout";
import { useEffect } from "react";
import { getOrderLists } from "../../../src/fetchApi/order";
function Order() {
  useEffect(() => {
    getOrderLists();
  }, []);
  return <div>index</div>;
}

export default Order;
Order.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
