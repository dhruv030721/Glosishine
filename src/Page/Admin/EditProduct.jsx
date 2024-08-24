import React, { useContext, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, TextField, Box, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addProduct, updateProduct } from '../../Services/Operations/ProductServices';
import toast from 'react-hot-toast';
import { AppContext } from '../../App';

const EditProduct = ({ id }) => {
    const context = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [filteredProduct, setFilteredProduct] = useState(null);

    useEffect(() => {
        if (context && context.getdata) {
            const product = context.getdata.find((product) => product.product_id === id);
            setFilteredProduct(product);
        }
    }, [context, id]);
    // console.log("filteredProduct", filteredProduct);

    const [formdata, setFormdata] = useState(() => {
        return filteredProduct ? {
            name: filteredProduct.product_name || "",
            prize: filteredProduct.price || "",
            size: filteredProduct.size || [],
            regularprize: filteredProduct.regular_price || "",
            saleprize: filteredProduct.sale_price || "",
            gst: filteredProduct.gst || "",
            weight: filteredProduct.weight_gram || "",
            stock: filteredProduct.stock || "",
            countryorigin: filteredProduct.country_origin || "",
            color: filteredProduct.color || "",
            fabric: filteredProduct.fabric || "",
            fitshape: filteredProduct.fit_shape || "",
            nack: filteredProduct.neck || "",
            quantity: filteredProduct.neck_quantity || "",
            occupation: filteredProduct.occupation || "",
            patent: filteredProduct.patent || "",
            patenttype: filteredProduct.print_of_patent_type || "",
            sleevelength: filteredProduct.sleeve_length || "",
            chestsize: filteredProduct.chest_size || "",
            lengthsize: filteredProduct.length_size || "",
            designname: filteredProduct.design_name || "",
            sku1: filteredProduct.sku1 || "",
            sku2: filteredProduct.sku2 || "",
            brandname: filteredProduct.brand_name || "",
            productdesc: filteredProduct.product_description || "",
            length: filteredProduct.length || "",
            noofpocket: filteredProduct.number_of_pockets || "",
            sleevestyle: filteredProduct.sleeve_style || "",
            orderid: filteredProduct.order_id || "",
            stretchability: filteredProduct.stretchability || "",
            productphoto: filteredProduct.images || [],
        } : {
            name: "",
            prize: "",
            size: [],
            regularprize: "",
            saleprize: "",
            gst: "",
            weight: "",
            stock: "",
            countryorigin: "",
            color: "",
            fabric: "",
            fitshape: "",
            nack: "",
            quantity: "",
            occupation: "",
            patent: "",
            patenttype: "",
            sleevelength: "",
            chestsize: "",
            lengthsize: "",
            designname: "",
            sku1: "",
            sku2: "",
            brandname: "",
            groupid: "",
            productdesc: "",
            headline: "",
            length: "",
            noofpocket: "",
            sleevestyle: "",
            orderid: "",
            stretchability: "",
            productphoto: [],
        };
    });

    useEffect(() => {
        if (filteredProduct) {
            setFormdata({
                name: filteredProduct.product_name || "",
                prize: filteredProduct.price || "",
                size: filteredProduct.size.split(',') || [],
                regularprize: filteredProduct.regular_price || "",
                saleprize: filteredProduct.sale_price || "",
                gst: filteredProduct.gst || "",
                weight: filteredProduct.weight_gram || "",
                stock: filteredProduct.stock || "",
                countryorigin: filteredProduct.country_origin || "",
                color: filteredProduct.color || "",
                fabric: filteredProduct.fabric || "",
                fitshape: filteredProduct.fit_shape || "",
                nack: filteredProduct.neck || "",
                quantity: filteredProduct.net_quantity || "",
                occupation: filteredProduct.occupation || "",
                patent: filteredProduct.patent || "",
                patenttype: filteredProduct.print_of_patent_type || "",
                sleevelength: filteredProduct.sleeve_length || "",
                chestsize: filteredProduct.chest_size || "",
                lengthsize: filteredProduct.length_size || "",
                designname: filteredProduct.design_name || "",
                sku1: filteredProduct.sku1 || "",
                sku2: filteredProduct.sku2 || "",
                brandname: filteredProduct.brand_name || "",
                productdesc: filteredProduct.product_description || "",
                length: filteredProduct.length || "",
                noofpocket: filteredProduct.number_of_pockets || "",
                sleevestyle: filteredProduct.sleeve_style || "",
                orderid: filteredProduct.order_id || "",
                stretchability: filteredProduct.stretchability || "",
                productphoto: filteredProduct.images || [],
            });
        }
    }, [filteredProduct]);

    const handleSizeChange = (event) => {
        const { target: { value } } = event;
        setFormdata({
            ...formdata,
            size: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const fileUrls = files.map(file => URL.createObjectURL(file));

        setFormdata(prevData => ({
            ...prevData,
            productphoto: [...prevData.productphoto, ...files],
        }));
    };
    const handleRemoveImage = (index) => {
        const updatedImages = [...formdata.productphoto];
        updatedImages.splice(index, 1);
        setFormdata({ ...formdata, productphoto: updatedImages });
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormdata({
            ...formdata,
            [name]: value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await toast.promise(
                updateProduct({ productData: formdata }, id),
                {
                    loading: 'Updating Product...',
                    success: (response) => {
                        console.log(response);
                        return `${response.data.message}`;
                    },
                    error: (error) => {
                        return `${error.message}`;
                    }
                }
            )
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };


    if (!filteredProduct) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <button onClick={handleClickOpen} className="text-indigo-600 hover:text-indigo-900">
                Edit
            </button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    Edit Product
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box mx="auto" p={2}>
                        <form onSubmit={submitHandler}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Product Name"
                                        type="text"
                                        name="name"
                                        value={formdata.name}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Size</InputLabel>
                                        <Select
                                            multiple
                                            name="size"
                                            value={formdata.size}
                                            onChange={handleSizeChange}
                                            input={<Input />}
                                        >
                                            {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
                                                <MenuItem key={size} value={size}>
                                                    <Checkbox checked={formdata.size.includes(size)} />
                                                    {size}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Prize"
                                        type="number"
                                        name="prize"
                                        value={formdata.prize}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Regular Prize"
                                        type="number"
                                        name="regularprize"
                                        value={formdata.regularprize}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Sale Prize"
                                        type="number"
                                        name="saleprize"
                                        value={formdata.saleprize}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="GST"
                                        type="text"
                                        name="gst"
                                        value={formdata.gst}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                {/* Repeat similar Grid items for other fields */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Weight"
                                        type="text"
                                        name="weight"
                                        value={formdata.weight}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Stock"
                                        type="text"
                                        name="stock"
                                        value={formdata.stock}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Country Origin"
                                        type="text"
                                        name="countryorigin"
                                        value={formdata.countryorigin}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Color"
                                        type="text"
                                        name="color"
                                        value={formdata.color}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Fabric"
                                        type="text"
                                        name="fabric"
                                        value={formdata.fabric}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Fit Shape"
                                        type="text"
                                        name="fitshape"
                                        value={formdata.fitshape}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Nack"
                                        type="text"
                                        name="nack"
                                        value={formdata.nack}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Quantity"
                                        type="text"
                                        name="quantity"
                                        value={formdata.quantity}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Occupation"
                                        type="text"
                                        name="occupation"
                                        value={formdata.occupation}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Patent"
                                        type="text"
                                        name="patent"
                                        value={formdata.patent}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Patent Type"
                                        type="text"
                                        name="patenttype"
                                        value={formdata.patenttype}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Sleeve Length"
                                        type="text"
                                        name="sleevelength"
                                        value={formdata.sleevelength}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Chest Size"
                                        type="text"
                                        name="chestsize"
                                        value={formdata.chestsize}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Length Size"
                                        type="text"
                                        name="lengthsize"
                                        value={formdata.lengthsize}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Design Name"
                                        type="text"
                                        name="designname"
                                        value={formdata.designname}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="SKU1"
                                        type="text"
                                        name="sku1"
                                        value={formdata.sku1}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="SKU2"
                                        type="text"
                                        name="sku2"
                                        value={formdata.sku2}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Brand Name"
                                        type="text"
                                        name="brandname"
                                        value={formdata.brandname}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Product Description"
                                        type="text"
                                        name="productdesc"
                                        value={formdata.productdesc}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Length"
                                        type="text"
                                        name="length"
                                        value={formdata.length}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Number of Pockets"
                                        type="text"
                                        name="noofpocket"
                                        value={formdata.noofpocket}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Sleeve Style"
                                        type="text"
                                        name="sleevestyle"
                                        value={formdata.sleevestyle}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Order ID"
                                        type="text"
                                        name="orderid"
                                        value={formdata.orderid}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Stretchability"
                                        type="text"
                                        name="stretchability"
                                        value={formdata.stretchability}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="container mx-auto p-4">
                                        <h2 className="text-2xl font-poppins font-bold mb-4">Upload Multiple Images</h2>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleImageUpload}
                                            className="border p-2 mb-4"
                                        />
                                        <div className="grid grid-cols-3 gap-4">
                                            {Array.from(formdata.productphoto).map((url, index) => (
                                                <div key={index} className="border p-2">
                                                    <img src={typeof url === 'string' ? url : URL.createObjectURL(url)} alt={`upload-${index}`} className="max-w-full h-auto" />
                                                    <button onClick={() => handleRemoveImage(index)} className="bg-red-500 font-poppins text-white p-2 mt-2">Remove</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <button type="submit" className="mt-4 p-2 w-24 bg-green-500 font-poppins text-white rounded">Submit</button>
                        </form>
                    </Box>
                </DialogContent>

            </Dialog>
        </div>
    );
};

export default EditProduct;
