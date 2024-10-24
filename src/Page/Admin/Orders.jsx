const data = [
  {
    product: "Wireless Headphones",
    total: "$99.99",
    status: "Delivered",
    placedOn: "2023-05-15",
    user: { name: "John Doe", email: "john.doe@example.com" },
  },
  {
    product: "Gaming Mouse",
    total: "$49.99",
    status: "Pending",
    placedOn: "2023-06-01",
    user: { name: "Jane Smith", email: "jane.smith@example.com" },
  },
  {
    product: "Laptop Sleeve",
    total: "$29.99",
    status: "Delivered",
    placedOn: "2023-04-20",
    user: { name: "Bob Johnson", email: "bob.johnson@example.com" },
  },
  {
    product: "Wireless Keyboard",
    total: "$79.99",
    status: "Cancelled",
    placedOn: "2023-03-10",
    user: { name: "Sarah Lee", email: "sarah.lee@example.com" },
  },
  {
    product: "DSLR Camera",
    total: "$599.99",
    status: "Delivered",
    placedOn: "2023-02-28",
    user: { name: "Michael Chen", email: "michael.chen@example.com" },
  },
];

const Orders = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <input
          className="flex h-10 w-full rounded-md font-dm-sans border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
          placeholder="Search by name or email"
          type="search"
        />
      </div>
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm font-dm-sans">
          <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Product
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Total
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Status
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Placed On
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                User
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle">{item.product}</td>
                <td className="p-4 align-middle">{item.total}</td>
                <td className="p-4 align-middle">
                  <div>{item.status}</div>
                </td>
                <td className="p-4 align-middle">{item.placedOn}</td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <div>{item.user.name}</div>
                    <div className="text-muted-foreground text-sm">
                      ({item.user.email})
                    </div>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <span className="sr-only">View Order</span>
                      </a>
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <rect
                          width="14"
                          height="14"
                          x="8"
                          y="8"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                      </svg>
                      <span className="sr-only">Copy User ID</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
