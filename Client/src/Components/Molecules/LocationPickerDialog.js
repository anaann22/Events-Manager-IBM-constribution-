import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useState } from 'react';

const LocationPickerDialog = ({ open, onClose, onLocationSelected }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleClick = (e) => {
        setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    };

    const handleConfirm = () => {
        onLocationSelected(selectedLocation);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <LoadScript googleMapsApiKey='process.env.LOCATION_API_KEY'>
                    <GoogleMap
                        mapContainerStyle={{ width: '400px', height: '400px' }}
                        center={{ lat: 45.7489, lng: 21.2087 }} // acesta este centrul pentru Timișoara
                        zoom={8}
                        onClick={handleClick}
                    >
                        {selectedLocation && <Marker position={selectedLocation} />}
                    </GoogleMap>

                </LoadScript>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LocationPickerDialog;
