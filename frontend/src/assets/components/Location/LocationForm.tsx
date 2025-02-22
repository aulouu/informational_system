import React, {useEffect, useState} from 'react';
import {Alert, Box, Checkbox, Input, Modal, Snackbar} from '@mui/material';
import {appSelector, clearState, ISendLocation, sendLocation} from "../../../storage/Slices/AppSlice";
import {useDispatch, useSelector} from 'react-redux';
import StyleButton from '../StyleButton';
import {AppDispatch} from '../../../storage/store';


interface CoordinateFormProps {
    open: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    x: string;
    y: string | null;
    z: string;
    adminCanModify: boolean;
}


const LocationForm: React.FC<CoordinateFormProps> = ({open, onClose}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {isFetching, isSuccess, isError, errorMessage} = useSelector(appSelector);
    const [openError, setOpenError] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        x: '',
        y: '',
        z: '',
        adminCanModify: false
    });

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newData = {
            name: formData.name === '' ? null : formData.name,
            x: formData.x === '' ? null : Number(formData.x),
            y: formData.y === '' ? null : Number(formData.y),
            z: formData.z === '' ? null : Number(formData.z),
            adminCanModify: formData.adminCanModify
        };
        dispatch(sendLocation(newData as ISendLocation));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        if (isError) {
            console.log("Error: " + errorMessage);
            setOpenError(true);
            const timer = setTimeout(() => {
                setOpenError(false);
                dispatch(clearState());
            }, 3000);
            return () => clearTimeout(timer);
        }

        if (isSuccess) {
            console.log("Location Succesfully Location");
            onClose();
            dispatch(clearState());
        }
    }, [isError, isSuccess, dispatch]);

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="coordinate-form-modal"
                aria-describedby="coordinate-form-description"
                sx={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
            >
                <Box
                    component="form"
                    noValidate
                    sx={{
                        mt: 1,
                        marginTop: '8',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '20px',
                        textAlign: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        border: '2px solid #000',
                        p: 4,
                        borderColor: 'white',
                        borderWidth: '6px',
                        borderStyle: 'solid',
                    }}
                    onSubmit={handleFormSubmit}

                >
                    <Input
                        margin="dense"
                        type='text'
                        required
                        fullWidth
                        id="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={formData.name}
                        onChange={handleChange}
                        sx={{color: 'white', mb: 1}}
                        placeholder='Name (Not NULL)'
                    />
                    <Input
                        margin="dense"
                        type='number'
                        required
                        fullWidth
                        id="x"
                        name="x"
                        autoComplete="x"
                        autoFocus
                        value={formData.x}
                        onChange={handleChange}
                        // inputProps={{ min: -500, max: 500 }}
                        sx={{color: 'white', mb: 1}}
                        placeholder='X'
                    />
                    <Input
                        margin="dense"
                        type='number'
                        required
                        fullWidth
                        id="y"
                        name="y"
                        autoComplete="y"
                        autoFocus
                        value={formData.y}
                        onChange={handleChange}
                        sx={{color: 'white', mb: 1}}
                        // inputProps={{ min: -100, max: 100 }}
                        placeholder='Y Not NULL'
                    />
                    <Input
                        margin="dense"
                        type='number'
                        required
                        fullWidth
                        id="z"
                        name="z"
                        autoComplete="z"
                        autoFocus
                        value={formData.z}
                        onChange={handleChange}
                        sx={{color: 'white', mb: 1}}
                        // inputProps={{ min: -100, max: 100 }}
                        placeholder='Z'
                    />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Checkbox
                            required
                            id="adminCanModify"
                            name="adminCanModify"
                            autoFocus
                            value={formData.adminCanModify}
                            onChange={(e) => formData.adminCanModify = e.target.checked}
                            sx={{color: 'white', mb: 1}}
                        />
                        <label style={{
                            fontFamily: "Undertale",
                            color: 'white'
                        }}>
                            ADMIN CAN MODIFY
                        </label>
                    </Box>


                    <StyleButton text="Create Location"
                                 disabled={isFetching}
                                 type="submit"/>
                </Box>
            </Modal>
            <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
                <Alert severity="error" sx={{fontFamily: "Undertale"}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default LocationForm;