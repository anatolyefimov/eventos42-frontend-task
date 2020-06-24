import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import fetchFormData from 'api/fetchFormData';
import sendVisitorsData from 'api/sendVisitorsData';
import Button from 'components/Button';
import Input from 'components/Input';

import './VisitorRegistration.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function VisitorRegistration() {
    const [formData, setFormData] = useState({
        fields: []
    });
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ formValues, setFormValues ] = useState({});
    const [ formErrors, setFormErrors ] = useState({});
    const token = useQuery().get('token');

    const onSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            extended: {}
        };

        for (let field of formData.fields) {
            if (field.systemField) {
                payload[field.systemField] = formValues[field.systemField] || '';
            } else {
                payload.extended[field.name] = formValues[field.name] || '';
            }
        }

        try {
            let res = await sendVisitorsData(formData.token, payload);
            if (!res.error) {
                setSuccess(true);
                setFormErrors({});
            } else {
                if (res.errors) {
                    let errors = res.errors.reduce((acc, error) => {
                        acc[error.args.field] = error.message;
                        return acc;
                    }, {});

                    setFormErrors(errors);
                } else {
                    setFormErrors({
                        [res.args.field]: res.message
                    });
                }
            }
        } catch (err) {
            console.error(err);
        }


    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    let res = await fetchFormData(token);
                    res.fields = res.fields.filter((field) => field.systemField !== 'group');

                    setFormData(res);

                }
                setIsLoaded(true);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData(); // eslint-disable-next-line
    }, []);

    return (
        isLoaded && (
            !success ? (
                <div className='VisitorRegistration'>
                    <form className='VisitorRegistrationForm' onSubmit={onSubmit}>
                        {
                            formData.fields.map((field, index) => {
                                let name = field.systemField || field.name;

                                return (
                                    <>
                                        <div className='VisitorRegistrationForm__row' key={index}>
                                            <label className='VisitorRegistrationForm__label' htmlFor={name}>{field.label}</label>
                                            <Input
                                                name={name}
                                                id={name}
                                                className='VisitorRegistrationForm__input'
                                                value={formValues[name] || ''}
                                                onChange={(e) => {
                                                    e.persist();
                                                    setFormValues(prevValues => ({ ...prevValues, [name]: e.target.value }));
                                                }}
                                            />
                                        </div>
                                        { formErrors[name] &&
                                            <div className='VisitorRegistrationForm__error'>
                                                {formErrors[name]}
                                            </div>
                                        }
                                    </>
                                );
                            })
                        }
                        <Button
                            type='submit'
                            title='Зарегестрироваться'
                            className='VisitorRegistrationForm__submit'
                        />
                    </form>
                </div>
            ) : (
                <div className='VisitorRegistrationSuccess'>
                    <div className='VisitorRegistrationSuccess__message'>
                        <div style={{ margin: '15px 0px' }}>Вы успешно зарегистрировались </div>
                        <Button title='Ещё раз' onClick={() => setSuccess(false)} />
                    </div>
                </div>
            )
        )
    );
}

export default VisitorRegistration;
