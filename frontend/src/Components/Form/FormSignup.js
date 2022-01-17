import React from 'react'
import useForm from "./useForm";
import validate from './validateinfo'
import './Form.css'

const FormSignup = ({submitForm}) => {
    const {handleChange,values,handleSubmit,errors}=useForm(submitForm,validate);

    return(
        <div className="form-content-right" align="center">
            <form className="form" onSubmit={handleSubmit}>
                <h1>
                    Get started with us today! Create your account by filling out the information below.
                </h1>
                <div className="form-inputs">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        id='name'
                        type='text'
                        name='name'
                        className='form-input'
                        placeholder="Enter your name"
                        value={values.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="eid" className="form-label">
                        Employee Id
                    </label>
                    <input
                        id='eid'
                        type='number'
                        name='eid'
                        className='form-input'
                        placeholder="Enter your Employee Id"
                        value={values.eid}
                        onChange={handleChange}
                    />
                    {errors.eid && <p>{errors.eid}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        id='username'
                        type='text'
                        name='username'
                        className='form-input'
                        placeholder="Enter your username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        name='email'
                        className='form-input'
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        className='form-input'
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="password2" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        id='password2'
                        type='password'
                        name='password2'
                        className='form-input'
                        placeholder="Re-enter your password"
                        value={values.password2}
                        onChange={handleChange}
                    />
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="phone" className="form-label">
                        Phone
                    </label>
                    <input
                        id='phone'
                        type='tel'
                        name='phone'
                        pattern="[0-9]{11}"
                        className='form-input'
                        placeholder="1111 1111111"
                        value={values.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <p>{errors.phone}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <input
                        id='address'
                        type='text'
                        name='address'
                        className='form-input'
                        placeholder="Enter your Address"
                        value={values.address}
                        onChange={handleChange}
                    />
                    {errors.address && <p>{errors.address}</p>}
                </div>
                <button className="form-input-btn" type = 'submit'>
                    Submit
                </button>
                <span className="form-input-login">
                    Already have an account? Login <a href='http://localhost:3000/sign-in'>here</a>
                </span>
            </form>
        </div>
    )
}

export default FormSignup