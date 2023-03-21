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
import { getAllCategory } from "../../../src/fetchApi/category";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { delCategory, addCategory } from "../../../src/fetchApi/category";
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

function Category() {
  const [rows, setRows] = useState([]);
  const [addShow, setAddShow] = useState(false);
  const [cat, setCat] = useState("");
  const [level, setLevel] = useState("");
  const [parentId, setParentId] = useState("");
  useEffect(() => {
    getAllCategory().then((res) => {
      setRows(
        res.map(
          (item: { name: string; categoryId: string }[], index: number) => ({
            index: index + 1,
            firstCat: { name: item[0]?.name, id: item[0]?.categoryId },
            secCat: { name: item[1]?.name, id: item[1]?.categoryId },
            thirdCat: { name: item[2]?.name, id: item[2]?.categoryId },
          })
        )
      );
    });
  }, []);
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
          <h1>Fill the Category Information</h1>
          <TextField
            id="filled-basic"
            label="Category"
            variant="filled"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Parent Id"
            variant="filled"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Level"
            variant="filled"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
          <Button
            variant={"contained"}
            color={"info"}
            onClick={() => {
              setAddShow(false);
              addCategory(parentId, cat, Number(level));
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
              <StyledTableCell>Index</StyledTableCell>
              <StyledTableCell align="right">First Category</StyledTableCell>
              <StyledTableCell align="right">Second Category</StyledTableCell>
              <StyledTableCell align="right">Third Category</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(
              (row: {
                firstCat: { name: string; id: string };
                index: number;
                secCat: { name: string; id: string };
                thirdCat: { name: string; id: string };
              }) => (
                <StyledTableRow key={row.firstCat.id + row.index}>
                  <StyledTableCell component="th" scope="row">
                    {row.index}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {`(${row.firstCat.id})${row.firstCat.name}`}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.secCat.id
                      ? `(${row.secCat.id})${row.secCat.name}`
                      : "-"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.thirdCat.id
                      ? `(${row.thirdCat.id})${row.thirdCat.name}`
                      : "-"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      color={"primary"}
                      onClick={() => {
                        if (row.thirdCat.id) {
                          delCategory(row.thirdCat.id);
                        } else if (row.secCat.id) {
                          delCategory(row.secCat.id);
                        } else {
                          delCategory(row.firstCat.id);
                        }
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
        count={10}
        color="primary"
        // page={page}
        // onChange={(e, value) => setPage(value)}
        sx={{ marginTop: "auto" }}
      />
    </Box>
  );
}

export default Category;
Category.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
