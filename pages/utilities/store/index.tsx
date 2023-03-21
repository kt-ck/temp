import type { ReactElement } from "react";
import FullLayout from "../../../src/layouts/full/FullLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import {
  getStoreList,
  getStoreDetails,
  deleteStores,
  addStores,
} from "../../../src/fetchApi/store";
const Text = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const header = [
  {
    id: "storeId",
    label: "Store ID",
  },
  {
    id: "name",
    label: "Store Name",
  },
  {
    id: "address",
    label: "Address",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
  },
  {
    id: "status",
    label: "Status",
  },
];
function Store() {
  const [stores, setStores] = useState([]);
  const [addShow, setAddShow] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  useEffect(() => {
    getStoreList(page).then((data) => {
      setStores(data?.storeList);
      setTotal(Math.ceil(data?.total / 8));
      console.log(data);
    });
  }, [page]);
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => {
          setAddShow(true);
        }}
      ></SpeedDial>
      <Drawer anchor={"right"} open={addShow} onClose={() => setAddShow(false)}>
        <Box
          sx={{
            minWidth: "30rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItem: "center",
            height: "100%",
            gap: "3rem",
            padding: "3rem",
          }}
        >
          <h1>Fill the Store Information</h1>
          <TextField
            id="filled-basic"
            label="Store Name"
            variant="filled"
            value={storeName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStoreName(e.target.value)
            }
          />
          <TextField
            id="filled-basic"
            label="Address"
            variant="filled"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
          />
          <TextField
            id="filled-basic"
            label="Phone Number"
            variant="filled"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
          />
          <TextField
            id="filled-basic"
            label="Status"
            variant="filled"
            value={status}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStatus(e.target.value)
            }
          />
          <Button
            variant={"contained"}
            color={"info"}
            onClick={() => {
              addStores(storeName, address, phoneNumber, status);
              getStoreList(page).then((list) => {
                getStoreList(page).then((data) => {
                  setStores(data?.storeList);
                  setTotal(Math.ceil(data?.total / 8));
                });
              });
              setAddShow(false);
            }}
          >
            Add
          </Button>
        </Box>
      </Drawer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {header.map((h, index) => (
                <StyledTableCell
                  key={h.id}
                  align={index !== 0 ? "right" : undefined}
                >
                  {h.label}
                </StyledTableCell>
              ))}
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map(
              (
                row: {
                  storeId: string;
                  address: string;
                  storeName: string;
                  phoneNumber: string;
                  status: string;
                },
                index
              ) => (
                <StyledTableRow key={row.storeId}>
                  <StyledTableCell component="th" scope="row">
                    {row.storeId}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.storeName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.address}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      color={"primary"}
                      onClick={() => {
                        deleteStores(row.storeId);
                        setStores([
                          ...stores.slice(0, index),
                          ...stores.slice(index + 1),
                        ]);
                      }}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={total}
        color="primary"
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ marginTop: "auto" }}
      />
    </Box>
  );
}

export default Store;
Store.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
