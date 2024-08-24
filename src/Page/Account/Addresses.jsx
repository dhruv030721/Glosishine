import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const Addresses = () => {
    const [open, setOpen] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [formData, setFormData] = useState({
        addressline1: '',
        addressline2: '',
        street: '',
        city: '',
        state: '',
        country: '',
        pincode: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                className="border border-gray-300 w-20 flex items-center justify-center text-md font-poppins rounded px-2 py-1"
                onClick={handleClickOpen}
            >
                Edit
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                     <h1 className='font-poppins'>Edit Address Details</h1>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h1 className='text-md font-poppins'>Enter your address details</h1>
                    </DialogContentText>
                    <form noValidate autoComplete="off">
                        <TextField
                            name="addressline1"
                            label="Address Line 1"
                            fullWidth
                            margin="normal"
                            value={formData.addressline1}
                            onChange={handleChange}
                        />
                        <TextField
                            name="addressline2"
                            label="Address Line 2"
                            fullWidth
                            margin="normal"
                            value={formData.addressline2}
                            onChange={handleChange}
                        />
                        <TextField
                            name="street"
                            label="Street/Area"
                            fullWidth
                            margin="normal"
                            value={formData.street}
                            onChange={handleChange}
                        />
                        <TextField
                            name="city"
                            label="City"
                            fullWidth
                            margin="normal"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        <TextField
                            name="state"
                            label="State"
                            fullWidth
                            margin="normal"
                            value={formData.state}
                            onChange={handleChange}
                        />
                        <TextField
                            name="country"
                            label="Country"
                            fullWidth
                            margin="normal"
                            value={formData.country}
                            onChange={handleChange}
                        />
                        <TextField
                            name="pincode"
                            label="Pincode"
                            fullWidth
                            margin="normal"
                            value={formData.pincode}
                            onChange={handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        <h1 className='font-poppins text-red-700'>Cancel</h1>
                    </Button>
                    <Button  onClick={handleClose}>
                        <h1 className='font-poppins text-green-700'>Save</h1>
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default Addresses;
