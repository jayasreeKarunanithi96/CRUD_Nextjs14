
"use client"
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import {User }from "@/interface"
import { Box, Button } from '@mui/material';
import statesData from '../../public/state.json';
import citiesData from '../../public/city.json';


const App = () => {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    linkedinURL: '',
    gender: '',
    address: {
      line1: '',
      line2: '',
      state: '',
      city: '',
      pin: '',
    },
   
   });
const [stateVal,setStateValue]=useState<any>('')
  const [errors, setErrors] = useState({ name: '',
    email: '',
    linkedinURL: '',
    gender: '',
    address: {
      line1: '',
      line2: '',
      state: '',
      city: '',
      pin: '',
    },
  });

  const validateEmail = (email:string) => {
    // Simple email validation
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateURL = (url:string) => {
    // Simple URL validation
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/;
    return regex.test(url);
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e:any) => {
    const { name, value } = e.target;
    if(name==='state'){
        setStateValue(value)
    }
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    let newErrors:any = {
        name: '',
        email: '',
        linkedinURL: '',
        gender: '',
        address: {
            line1: '',
            line2: '',
            state: '',
            city: '',
            pin: ''
        },
        states: '',
        cities: ''
    };

    // Name validation
    if (formData.name.length < 3 || formData.name.length > 50) {
      newErrors.name = 'Name must be between 3 and 50 characters';
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Linkedin URL validation
    if (!validateURL(formData.linkedinURL)) {
      newErrors.linkedinURL = 'Invalid Linkedin URL format';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Address validations
    if (!formData.address.line1) {
      newErrors.address = { ...newErrors.address, line1: 'Line 1 is required' };
    }

    if (!formData.address.state) {
      newErrors.address = { ...newErrors.address, state: 'State is required' };
    }

    if (!formData.address.city) {
      newErrors.address = { ...newErrors.address, city: 'City is required' };
    }

    if (!formData.address.pin || !/^\d{6}$/.test(formData.address.pin)) {
      newErrors.address = { ...newErrors.address, pin: 'Invalid PIN code' };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit form data
      console.log(formData);
      // Reset form
      setFormData({
        name: '',
        email: '',
        linkedinURL: '',
        gender: '',
        address: {
          line1: '',
          line2: '',
          state: '',
          city: '',
          pin: '',
        },
       
      });
      setErrors({name: '',
        email: '',
        linkedinURL: '',
        gender: '',
        address: {
          line1: '',
          line2: '',
          state: '',
          city: '',
          pin: '',
        },
       });
    }
  };
   const getCitiesForSelectedState = () :any => {

      const selectedCities = Object.entries(citiesData.cities).find(
      ([stateName]) => stateName === stateVal
    );

    return selectedCities ? selectedCities[1] : [];

  };

  return (
    <div >
      <h4>UserForm</h4>
      <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <label>Name:</label>
        
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
       
          {errors.name && <p>{errors.name}</p>}
        </Grid>
         <Grid item xs={6}>
          <label>Email:</label>
      
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
      
          {errors.email && <p>{errors.email}</p>}
        </Grid>
       <Grid item xs={6}>
          <label>Linkedin URL:</label>
          <input
            type="text"
            name="linkedinURL"
            value={formData.linkedinURL}
            onChange={handleChange}
          />
          {errors.linkedinURL && <p>{errors.linkedinURL}</p>}
        </Grid>
        <Grid item xs={6}>
          <label>Gender:</label>
      
          <select name="gender" onChange={handleChange}>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          
          {errors.gender && <p>{errors.gender}</p>}
        </Grid>
        <Grid item xs={6}>
          <label>Address Line 1:</label>
          <input
            type="text"
            name="line1"
            value={formData.address.line1}
            onChange={handleAddressChange}
          />
          {errors.address && <p>{errors.address.line1}</p>}
        </Grid>
      <Grid item xs={6}>
          <label>Address Line 2:</label>
          <input
            type="text"
            name="line2"
            value={formData.address.line2}
            onChange={handleAddressChange}
          />
        </Grid>
    <Grid item xs={6}>
          <label>State:</label>
         
          <select
            name="state"
            value={formData.address.state}
            onChange={handleAddressChange}
          >
            <option value="" disabled>Select State</option>
           {statesData.states.map((state:{name:string}) => (
          <option key={state.name} value={state.name}>
            {state.name}
          </option>
        ))}
          </select>
        
          {errors.address && <p>{errors.address.state}</p>}
        </Grid>
       <Grid item xs={6}>
          <label>City:</label>
          <div>
      
          <select
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
           
          >
            <option value="" disabled>Select City</option>
            {getCitiesForSelectedState().map((city:any) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
          </select>
          </div>
       
          {errors.address && <p>{errors.address.city}</p>}
        </Grid>
        <Grid item xs={12}>
          <label>PIN:</label>
          <input
            type="text"
            name="pin"
            value={formData.address.pin}
            onChange={handleAddressChange}
          />
          {errors.address && <p>{errors.address.pin}</p>}
        </Grid>
        <Grid item xs={12} style={{display:'flex',justifyContent:'right'}}>
        <Button type="submit" variant='contained' >Submit</Button>
        </Grid>
        </Grid>
        </Box>
      </form>
    </div>
  );
};

export default App;
