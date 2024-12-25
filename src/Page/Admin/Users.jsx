import { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import CommonTable from "../../Components/CommonTable/CommonTable";
import { GetAllUsers } from "../../Services/Operations/Auth";

const BorderedCard = styled(Card)({
  boxShadow: "none",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
});

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await GetAllUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users:", response.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <thead>
      <tr className="bg-bg-green text-white">
        <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
          #
        </th>
        <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Name
        </th>
        <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Email
        </th>
        <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Mobile Number
        </th>
      </tr>
    </thead>
  );

  const renderRow = (user, index) => (
    <tr key={index} className="bg-white border-b border-gray-200 text-bg-green">
      <td className="px-2 py-4 whitespace-nowrap text-sm">{index + 1}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm">
        {user.name
          ? user.name
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")
          : "-"}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-sm">
        {user.email ? user.email : "-"}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-sm">
        {user.mobile_number ? user.mobile_number : "-"}
      </td>
    </tr>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-ring-2
          size="40"
          speed="0.5"
          color="rgb(6,68,59)"
          className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
        ></l-ring-2>
      </div>
    );
  }

  return (
    <Box className="p-2 sm:p-4 bg-gray-100 font-signika">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <Typography
          variant={isMobile ? "h5" : "h4"}
          className="font-bold text-bg-green mb-2 sm:mb-0"
        >
          User Management
        </Typography>
      </div>

      <BorderedCard>
        <div className="overflow-x-auto">
          <CommonTable
            renderHeader={renderHeader}
            data={users}
            renderRow={renderRow}
          />
        </div>
      </BorderedCard>
    </Box>
  );
};

export default Users;
