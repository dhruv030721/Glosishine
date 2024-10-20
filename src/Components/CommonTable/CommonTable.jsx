import { Table, TableBody, TableContainer, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const BorderedTableContainer = styled(TableContainer)({
  border: "1px solid #e0e0e0", // Light gray border
  borderRadius: "8px",
  boxShadow: "none",
});

const CommonTable = ({ renderHeader, data, renderRow }) => {
  return (
    <BorderedTableContainer component={Paper} className="overflow-x-auto">
      <Table className="min-w-full">
        {renderHeader()}
        <TableBody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => renderRow(item, index))}
        </TableBody>
      </Table>
    </BorderedTableContainer>
  );
};

export default CommonTable;
