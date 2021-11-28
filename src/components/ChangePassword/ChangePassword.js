import { FormControl, Input, InputLabel, Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { API_HOST } from '../../config';
import { logout } from '../../services/AuthService';

const ChangePassword = () => {
    const handleDismiss = () => {
        document.getElementById('text-current-password').value = '';
        document.getElementById('text-new-password').value = '';
        document.getElementById('text-confirm-password').value = '';
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const currentPassword = document.getElementById('text-current-password').value;
        const newPassword = document.getElementById('text-new-password').value;
        const confirmPassword = document.getElementById('text-confirm-password').value;

        if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
            toast.error('Please fill all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password does not match.');
            return;
        }

        const response = await fetch(`${API_HOST}/api/v1/auth/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': localStorage.getItem('auth_token'),
            },
            body: JSON.stringify({
                password: currentPassword,
                newPassword,
            }),
        });

        const data = await response.json();

        if (data.errors) {
            data.errors.forEach(error => {
                toast.error(error.msg);
            });
            return;
        }

        if (!data.error) {
            toast.success(data.msg);
            document.querySelector('#change-password .btn-close').click();
            logout();
        } else {
            toast.error(data.error);
        }
        handleDismiss();

    }
    return (
        <>
            <div className='modal fade' id='change-password' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Change password</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={handleDismiss}></button>
                        </div>
                        <div className='modal-body'>
                            <form className="form-change-password">
                                <div className="form-group my-4">
                                    <FormControl fullWidth className='my-2'>
                                        <InputLabel htmlFor="currentPassword">Current password</InputLabel>
                                        <Input aria-describedby="text-current-password" id='text-current-password' type="password" />
                                    </FormControl>
                                    <FormControl fullWidth className='my-2'>
                                        <InputLabel htmlFor="newPassword">New password</InputLabel>
                                        <Input aria-describedby="text-new-password" id='text-new-password' type="password" />
                                    </FormControl>
                                    <FormControl fullWidth className='my-2'>
                                        <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                                        <Input aria-describedby="text-confirm-password" id='text-confirm-password' type="password" />
                                    </FormControl>
                                </div>
                                <div className='modal-footer pb-0'>
                                    <Button variant="contained" type="submit" color="primary" onClick={handleChangePassword}>Change password</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword
