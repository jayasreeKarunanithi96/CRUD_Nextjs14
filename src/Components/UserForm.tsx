"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { CLOSE } from "../services/redux/ModalReducer";
import { IUser } from "@/interface";
import { Box, Button } from "@mui/material";
import { Config } from "@/Config";
import statesData from "../../public/state.json";
import citiesData from "../../public/city.json";
import { ADDUSER,UPDATEUSER } from "@/services/redux/GlobalDataReducer";
import generateUUID from "@/Utils/generateUUID";
import isEmpty from "@/Utils/EmptyObj";
const style = {
  form: {
    backgroundColor: "#E6E6E6",
    borderRadius: "5px",
    border: "2px solid #cccccc",
  },
  error: {
    color: "#f53131",
    fontSize: "13px",
  },
  heading: {
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
    padding: "10px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 400,
  },
};

const App = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const action = searchParams.get("action");
  

  const fullData = useSelector((state: any) => state.globalData.data);
 

  const [formData, setFormData] = useState<IUser>({
    name: "",
    email: "",
    linkedinURL: "",
    gender: "",
    address: {
      line1: "",
      line2: "",
      state: "",
      city: "",
      pin: "",
    },
  });
  const [stateVal, setStateValue] = useState<any>("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    linkedinURL: "",
    gender: "",
    address: {
      line1: "",
      line2: "",
      state: "",
      city: "",
      pin: "",
    },
  });

  const validateEmail = (email: string) => {
    // Simple email validation
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateURL = (url: string) => {
    // Simple URL validation
    const regex = /^(https?:\/\/)?(in\.)?linkedin\.com\/.+$/;
    return regex.test(url);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "state") {
      setStateValue(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };
  function handleClear() {
    dispatch(CLOSE())
    setFormData({
      name: "",
      email: "",
      linkedinURL: "",
      gender: "",
      address: {
        line1: "",
        line2: "",
        state: "",
        city: "",
        pin: "",
      },
    });
    setErrors({
      name: "",
      email: "",
      linkedinURL: "",
      gender: "",
      address: {
        line1: "",
        line2: "",
        state: "",
        city: "",
        pin: "",
      },
    });
  }

  useEffect(() => {
    if (action === "edit" || action === "view") {
      const uuid = searchParams.get("id");
      const userFind = fullData?.find((i: any) => i?.id === uuid);
      console.log("userFind", userFind);
      if (userFind) {
        console.log('userFind?.gender', userFind?.gender)
       setStateValue(userFind?.address.state)
        setFormData({
          name: userFind?.name,
          email: userFind?.email,
          linkedinURL: userFind?.linkedinURL,
          gender: userFind?.gender,
          address: {
            line1: userFind?.address.line1,
            line2: userFind?.address.line2 || "",
            state: userFind?.address.state,
            city: userFind?.address.city,
            pin: userFind?.address.pin,
          },
        });
      }
    }
  }, [action, fullData, searchParams]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit");

    let newErrors: any = {
      name: "",
      email: "",
      linkedinURL: "",
      gender: "",
      address: {
        line1: "",
        line2: "",
        state: "",
        city: "",
        pin: "",
      },
    };

    // Name validation
    if (
      formData.name.length <= Config.name.minCharacters ||
      formData.name.length > Config.name.maxCharacters
    ) {
      newErrors.name = "Name must be between 3 and 50 characters";
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Linkedin URL validation
    if (!validateURL(formData.linkedinURL)) {
      newErrors.linkedinURL = "Invalid Linkedin URL format";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    // Address validations
    if (!formData.address.line1) {
      newErrors.address = { ...newErrors.address, line1: "Line 1 is required" };
    }

    if (!formData.address.state) {
      newErrors.address = { ...newErrors.address, state: "State is required" };
    }

    if (!formData.address.city) {
      newErrors.address = { ...newErrors.address, city: "City is required" };
    }

    if (!formData.address.pin || !/^\d{6}$/.test(formData.address.pin)) {
      newErrors.address = { ...newErrors.address, pin: "Invalid PIN code" };
    }

    if (!isEmpty(newErrors)) {
      setErrors(newErrors);
    } else {
      // Submit form data
      console.log("submit data");
      console.log("formData", formData);
      if(action==='add'){
        const newUserdata={id: generateUUID(),active:true,...formData}
        dispatch(ADDUSER(newUserdata))
      }
      if(action==='edit'){
         
         const uuid = searchParams.get("id") || null;
         const userFind = fullData?.find((i: any) => i?.id === uuid);
        // const newUserdata={id: generateUUID(),...formData}
        const data={id: userFind?.id,active:true, ...formData}
        console.log('data',data)
        dispatch(UPDATEUSER(data))
      }
      // Reset form
      handleClear();
    }
  };
  console.log("error", errors);
  const getCitiesForSelectedState = (): any => {
    const selectedCities = Object.entries(citiesData.cities).find(
      ([stateName]) => stateName === stateVal
    );

    return selectedCities ? selectedCities[1] : [];
  };
  const handleCancel = () => {
     params.forEach((value, key) => {
    params.delete(key);
  });

  router.push(pathname);
    handleClear();
    dispatch(CLOSE());
  };

  return (
    <div style={style.form}>
      <h4 style={style.heading}>User Form</h4>
      <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <label style={style.label}>Name:</label>

              <input
                disabled={action === "view"}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && <p style={style.error}>{errors.name}</p>}
            </Grid>
            <Grid item xs={6}>
              <label style={style.label}>Email:</label>

              <input
                disabled={action === "view"}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && <p style={style.error}>{errors.email}</p>}
            </Grid>
            <Grid item xs={6}>
              <label style={style.label}>Linkedin URL:</label>
              <input
                disabled={action === "view"}
                type="text"
                name="linkedinURL"
                value={formData.linkedinURL}
                onChange={handleChange}
              />
              {errors.linkedinURL && (
                <p style={style.error}>{errors.linkedinURL}</p>
              )}
            </Grid>
            <Grid item xs={6}>
              <label style={style.label}>Gender:</label>
              <div>
                <select name="gender" onChange={handleChange} value={formData.gender}  disabled={action === "view"}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {errors.gender && <p style={style.error}>{errors.gender}</p>}
            </Grid>
            <Grid item xs={6}>
              <label style={style.label}>Address Line 1:</label>
              <input
                disabled={action === "view"}
                type="text"
                name="line1"
                value={formData.address.line1}
                onChange={handleAddressChange}
              />
              {errors.address && (
                <p style={style.error}>{errors.address.line1}</p>
              )}
            </Grid>
            <Grid item xs={6}>
              <label style={style.label}>Address Line 2:</label>
              <input
                disabled={action === "view"}
                type="text"
                name="line2"
                value={formData.address.line2}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={6}>
              <label style={style.label}>State:</label>
              <div>
                <select
                  name="state"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                   disabled={action === "view"}
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  {statesData.states.map((state: { name: string }) => (
                    <option key={state.name} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {errors.address && (
                <p style={style.error}>{errors.address.state}</p>
              )}
            </Grid>
            <Grid item xs={6}>
              <label style={style.label}>City:</label>
              <div>
                <select
                  name="city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                   disabled={action === "view"}
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  {getCitiesForSelectedState().map((city: any) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {errors.address && (
                <p style={style.error}>{errors.address.city}</p>
              )}
            </Grid>
            <Grid item xs={6}>
              <label style={style.label}>Pincode :</label>

              <input
                disabled={action === "view"}
                type="text"
                name="pin"
                value={formData.address.pin}
                onChange={handleAddressChange}
              />
              {errors.address && (
                <p style={style.error}>{errors.address.pin}</p>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "right" }}
            >
              <Button
                variant="contained"
                color="error"
                style={{ marginRight: "5px" }}
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default App;
