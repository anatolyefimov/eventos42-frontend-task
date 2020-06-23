import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import fetchFormData from 'api/fetchFormData';
import sendVisitorsData from 'api/sendVisitorsData';
import Button from 'components/Button';
import Input from 'components/Input';

import './VisitorRegistration.css'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function VisitorRegistration() {
    const [formData, setFormData] = useState({
        fields: []
    })
    const [isLoaded, setIsLoaded] = useState(false);
    const [formValues, setFormValues] = useState({});
    let query = useQuery();

    const onSubmit = async (e) => {
        e.preventDefault();
    
        console.log('submitt...')
        let payload = {
            extended: {}
        }
        for(let field of formData.fields) {
            if (field.systemField) {
                payload[field.systemField] = formValues[field.systemField] || '';
            } else {
                payload.extended[field.name] = formValues[field.name] || '';
            }
        }
        try {
            let res = await sendVisitorsData(formData.token, payload);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (query.get('token')) {
                    let res = await fetchFormData(query.get('token'));
                    res.fields = res.fields.filter((field) => field.systemField !== 'group')

                    setFormData(res);
                    
                }
                setIsLoaded(true);
            } catch (err) {
                console.error(err);
            }
        }    
        
        fetchData();
    }, [])

    return (
        isLoaded && (
            <div className='VisitorRegistration'>
                <form className='VisitorRegistrationForm' onSubmit={onSubmit}> 
                    {
                        formData.fields.map((field, index) => {
                            let name = field.systemField || field.name;

                            return (
                                <div className='VisitorRegistrationForm__row' key={index}>
                                    <label className='VisitorRegistrationForm__label' htmlFor={name}>{field.label}</label>
                                    <Input 
                                        name={name} 
                                        id={name}
                                        className='VisitorRegistrationForm__input'
                                        value={formValues[name]}
                                        onChange={(e) => {
                                            e.persist()
                                            setFormValues(prevValues => ({ ...prevValues, [name]: e.target.value }))
                                        }}
                                    /> 
                                </div>
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
        )
    )
}

export default VisitorRegistration;