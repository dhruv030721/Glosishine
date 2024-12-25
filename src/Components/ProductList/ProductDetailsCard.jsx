import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { FaTimes } from "react-icons/fa";
import { TableRow, TableCell } from "@mui/material";
import CommonTable from "../CommonTable/CommonTable";

const ProductDetailsCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const renderHeader = () => (
    <thead>
      <tr className="bg-gray-100 text-bg-green">
        <td className="px-2 py-2 text-left text-xs font-bold uppercase tracking-wider">
          Attribute
        </td>
        <td className="px-2 py-2 text-left text-xs font-bold uppercase tracking-wider">
          Details
        </td>
      </tr>
    </thead>
  );

  const data = [
    { attribute: "Fabric", detail: product.fabric },
    { attribute: "Fit/Shape", detail: product.fit_shape },
    { attribute: "Design Name", detail: product.design_name },
    { attribute: "Country Origin", detail: product.country_origin },
    { attribute: "Neck", detail: product.neck },
    { attribute: "Occupation", detail: product.occupation },
    { attribute: "Patent", detail: product.patent },
    { attribute: "Print or Patent Type", detail: product.print_or_patent_type },
    { attribute: "Sleeve Length", detail: product.sleeve_length },
    { attribute: "Chest Size", detail: product.chest_size },
    { attribute: "Length Size", detail: product.length_size },
    { attribute: "SKU", detail: product.sku },
    { attribute: "Number of Pockets", detail: product.number_of_pockets },
    { attribute: "Sleeve Style", detail: product.sleeve_style },
    { attribute: "Stretchability", detail: product.stretchability },
  ];

  const renderRow = (item, index) => (
    <TableRow key={index}>
      <TableCell style={{ fontWeight: 500 }}>{item.attribute}</TableCell>
      <TableCell>{item.detail ? item.detail : "-"}</TableCell>
    </TableRow>
  );

  return (
    <>
      <div className="bg-bg-green bg-opacity-10 border-2 border-zinc-500 font-signika rounded-lg p-4 cursor-pointer my-5">
        <h3 className="text-bg-green font-semibold text-lg mb-2">
          Product Details
        </h3>
        <div className={`overflow-hidden ${isExpanded ? "" : "max-h-12"}`}>
          <p>{product.product_description}</p>
        </div>
        {!isExpanded && (
          <span
            className="text-green-900 font-bold hover:underline cursor-pointer"
            onClick={toggleExpand}
          >
            ...show more
          </span>
        )}
        <button
          className="mt-2 cursor-pointer group relative flex gap-1.5 p-2 rounded-lg items-center justify-center w-40 md:w-40 h-8  bg-opacity-100 text-green-900 border-2 border-zinc-500 hover:bg-opacity-70 transition font-semibold "
          onClick={toggleModal}
        >
          View All Details
        </button>
      </div>

      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ModalDialog
          sx={{
            maxWidth: 600,
            width: "90%",
            borderRadius: "md",
            padding: 0,
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="bg-bg-green text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-semibold font-signika">Product Details</h2>
          </div>

          <button
            onClick={toggleModal}
            className="absolute top-2 right-2 text-end text-white opacity-100 hover:opacity-70 rounded-full p-1 transition-colors duration-200"
          >
            <FaTimes size={24} />
          </button>

          <div className="px-4 py-2 overflow-y-auto flex-grow">
            <CommonTable
              renderHeader={renderHeader}
              data={data}
              renderRow={renderRow}
            />
          </div>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default ProductDetailsCard;
