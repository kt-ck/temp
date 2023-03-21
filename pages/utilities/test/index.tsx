import type { ReactElement } from "react";
import FullLayout from "../../../src/layouts/full/FullLayout";
function Test() {
  return <div>test</div>;
}

export default Test;
Test.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
