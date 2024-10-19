import { Table, TableBody, TableContainer, Paper } from "@mui/material";

const CommonTable = ({ renderHeader, data, renderRow }) => {
  return (
    <TableContainer component={Paper} className="overflow-x-auto">
      <Table className="min-w-full">
        {renderHeader()}
        <TableBody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => renderRow(item, index))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
