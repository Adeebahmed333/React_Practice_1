import { useState } from 'react';
import axios from 'axios';
const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        isActive: false,
        createdAt: ""
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        createdAt: ""
    });

    const [formValid, setFormValid] = useState({
        name: false,
        username: false,
        email: false,
        password: false,
        age: false,
        gender: false,
        phone: false,
        street: false,
        city: false,
        state: false,
        pincode: false,
        createdAt: false,
        buttonActive: false
    });

    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;

        const newFormData = {
            ...formData,
            [fieldName]: fieldValue
        };
        setFormData(newFormData);

        validateField(fieldName, fieldValue);
    };

    const validateField = (fieldName, fieldValue) => {
        let newFormError = { ...formErrors };
        let newFormValid = { ...formValid };

        switch (fieldName) {
            case "name":
                if (!/^[A-Za-z\s]{3,}$/.test(fieldValue)) {
                    newFormError.name = "Name must be at least 3 letters";
                    newFormValid.name = false;
                } else {
                    newFormError.name = "";
                    newFormValid.name = true;
                }
                break;

            case "username":
                if (!/^[a-z0-9_]{4,15}$/i.test(fieldValue)) {
                    newFormError.username = "Username must be 4-15 chars (letters, numbers, _)";
                    newFormValid.username = false;
                } else {
                    newFormError.username = "";
                    newFormValid.username = true;
                }
                break;

            case "email":
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(fieldValue)) {
                    newFormError.email = "Invalid email format";
                    newFormValid.email = false;
                } else {
                    newFormError.email = "";
                    newFormValid.email = true;
                }
                break;

            case "password":
                if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(fieldValue)) {
                    newFormError.password = "Password must be 8+ chars (upper, lower, number, special)";
                    newFormValid.password = false;
                } else {
                    newFormError.password = "";
                    newFormValid.password = true;
                }
                break;

            case "age":
                if (!(fieldValue >= 18 && fieldValue <= 60)) {
                    newFormError.age = "Age must be between 18 and 60";
                    newFormValid.age = false;
                } else {
                    newFormError.age = "";
                    newFormValid.age = true;
                }
                break;

            case "gender":
                if (!/^(male|female|other)$/i.test(fieldValue)) {
                    newFormError.gender = "Gender must be male, female, or other";
                    newFormValid.gender = false;
                } else {
                    newFormError.gender = "";
                    newFormValid.gender = true;
                }
                break;

            case "phone":
                if (!/^\+91-[6-9]\d{9}$/.test(fieldValue)) {
                    newFormError.phone = "Phone must be in +91-XXXXXXXXXX format";
                    newFormValid.phone = false;
                } else {
                    newFormError.phone = "";
                    newFormValid.phone = true;
                }
                break;

            case "street":
                if (fieldValue.trim().length < 3) {
                    newFormError.street = "Street must be at least 3 characters";
                    newFormValid.street = false;
                } else {
                    newFormError.street = "";
                    newFormValid.street = true;
                }
                break;

            case "city":
                if (!/^[A-Za-z\s]+$/.test(fieldValue)) {
                    newFormError.city = "City must contain only letters";
                    newFormValid.city = false;
                } else {
                    newFormError.city = "";
                    newFormValid.city = true;
                }
                break;

            case "state":
                if (!/^[A-Za-z\s]+$/.test(fieldValue)) {
                    newFormError.state = "State must contain only letters";
                    newFormValid.state = false;
                } else {
                    newFormError.state = "";
                    newFormValid.state = true;
                }
                break;

            case "pincode":
                if (!/^[1-9][0-9]{5}$/.test(fieldValue)) {
                    newFormError.pincode = "Pincode must be a 6-digit number";
                    newFormValid.pincode = false;
                } else {
                    newFormError.pincode = "";
                    newFormValid.pincode = true;
                }
                break;

            case "createdAt":
                if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(fieldValue)) {
                    newFormError.createdAt = "Date must be in ISO format (YYYY-MM-DDTHH:mm:ssZ)";
                    newFormValid.createdAt = false;
                } else {
                    newFormError.createdAt = "";
                    newFormValid.createdAt = true;
                }
                break;

            default:
                break;
        }

        newFormValid.buttonActive = newFormValid.name &&
            newFormValid.username &&
            newFormValid.email &&
            newFormValid.password &&
            newFormValid.age &&
            newFormValid.gender &&
            newFormValid.phone &&
            newFormValid.street &&
            newFormValid.city &&
            newFormValid.state &&
            newFormValid.pincode;;
        setFormValid(newFormValid);
        setFormErrors(newFormError);
    };

    const create = async (e) => {
        e.preventDefault();
        if (formValid.buttonActive) {
            const formJSON = {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                age: formData.age,
                gender: formData.gender,
                phone: formData.phone,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode,
                },
                isActive: formData.isActive,
                createdAt: formData.createdAt || new Date().toISOString(),
            };

            try {
                const response = await axios.post("http://localhost:4400/users", formJSON);

                setSuccessMessage(
                    `User created successfully! \n${JSON.stringify(response.data, null, 2)}`
                );
            } catch (error) {
                console.error("Error creating user:", error);
                setSuccessMessage(" Failed to create user. Please try again.");
            }
        }
    };

    return (
        <div style={{ width: 600, margin: '0px auto' }}>
            <form onSubmit={create}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" className="form-control"
                        value={formData.name} onChange={handleChange} />
                    <span className="text-danger">{formErrors.name}</span>
                </div>

                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" className="form-control"
                        value={formData.username} onChange={handleChange} />
                    <span className="text-danger">{formErrors.username}</span>
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" name="email" className="form-control"
                        value={formData.email} onChange={handleChange} />
                    <span className="text-danger">{formErrors.email}</span>
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" className="form-control"
                        value={formData.password} onChange={handleChange} />
                    <span className="text-danger">{formErrors.password}</span>
                </div>

                <div className="form-group">
                    <label>Age:</label>
                    <input type="text" name="age" className="form-control"
                        value={formData.age} onChange={handleChange} />
                    <span className="text-danger">{formErrors.age}</span>
                </div>

                <div className="form-group">
                    <label>Gender:</label>
                    <input type="text" name="gender" className="form-control"
                        value={formData.gender} onChange={handleChange} />
                    <span className="text-danger">{formErrors.gender}</span>
                </div>

                <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" name="phone" className="form-control"
                        value={formData.phone} onChange={handleChange} />
                    <span className="text-danger">{formErrors.phone}</span>
                </div>

                <h5>Address</h5>
                <div className="form-group">
                    <label>Street:</label>
                    <input type="text" name="street" className="form-control"
                        value={formData.street} onChange={handleChange} />
                    <span className="text-danger">{formErrors.street}</span>
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input type="text" name="city" className="form-control"
                        value={formData.city} onChange={handleChange} />
                    <span className="text-danger">{formErrors.city}</span>
                </div>
                <div className="form-group">
                    <label>State:</label>
                    <input type="text" name="state" className="form-control"
                        value={formData.state} onChange={handleChange} />
                    <span className="text-danger">{formErrors.state}</span>
                </div>
                <div className="form-group">
                    <label>Pincode:</label>
                    <input type="text" name="pincode" className="form-control"
                        value={formData.pincode} onChange={handleChange} />
                    <span className="text-danger">{formErrors.pincode}</span>
                </div>

                <div className="form-check">
                    <input type="checkbox" name="isActive" className="form-check-input"
                        checked={formData.isActive} onChange={handleChange} />
                    <label className="form-check-label">Active</label>
                </div>

                <div className="form-group">
                    <label>Created At:</label>
                    <input type="text" name="createdAt" className="form-control"
                        value={formData.createdAt} onChange={handleChange} />
                    <span className="text-danger">{formErrors.createdAt}</span>
                </div>

                <button type="submit" className="btn btn-success mt-3"
                    disabled={!formValid.buttonActive}>
                    Create
                </button>
            </form>

            <pre className="text-success">{successMessage}</pre>
        </div>
    );
}
export default Form;