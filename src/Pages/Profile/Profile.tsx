import { useEffect, useState } from 'react';
import './Profile.scss';
import { toast } from 'react-toastify';
import { getLocalStorageValues } from '../../Helper/localStore';
import { ProfilePageImg } from '../../Helper/Constants';

function Profile() {
  const local = getLocalStorageValues();

  const [img, setImg] = useState<any>(
    'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
  );

  const [value, setValue] = useState({
    name: '' || local.name,
    surname: '',
    mobileNo: '' || local.mobileNo,
    address1: '',
    address2: '',
    postalCode: '',
    state: '',
    city: '',
    email: '' || local.email,
    country: ''
  });
  const profileUpdatedMsg = () =>
    toast.success('Profile Updated Successfully', {
      className: 'toast-success'
    });

  const [read, setRead] = useState(false);
  const handleImage = (e: any) => {
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    let data = {
      name: value.name,
      surname: value.surname,
      mobileNo: value.mobileNo,
      address1: value.address1,
      address2: value.address2,
      postalCode: value.postalCode,
      state: value.state,
      city: value.city,
      email: value.email,
      country: value.country,
      img: img
    };
    localStorage.setItem('profile', JSON.stringify(data));
    setRead(true);
    profileUpdatedMsg();
  };
  const editProfile = () => {
    setRead(false);
  };
  const getLocalStorageValuesProfile = () => {
    let userData = JSON.parse(localStorage.getItem('profile') || '{}');
    return userData;
  };
  let userDataProfile = getLocalStorageValuesProfile();

  useEffect(() => {
    if (userDataProfile !== {}) {
      setRead(true);
      setValue(userDataProfile);
    } else {
      setRead(false);
    }
  }, []);

  console.log('userDataProfile', userDataProfile);
  return (
    <div className="ProfileMainDiv">
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5 profileimages" alt="" src={img} />
              {read === false && (
                <input className="" type="file" onChange={handleImage} disabled={read} />
              )}
              <span className="font-weight-bold mt-4">{userDataProfile?.name}</span>
              <span className="text-black-50">{userDataProfile?.email}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right profileHead">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={value.name}
                    name="name"
                    onChange={handleChange}
                    readOnly={read}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    value={value.surname}
                    placeholder="surname"
                    name="surname"
                    onChange={handleChange}
                    readOnly={read}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={value.mobileNo}
                    name="mobileNo"
                    onChange={handleChange}
                    readOnly={read}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 1"
                    value={value.address1}
                    name="address1"
                    onChange={handleChange}
                    readOnly={read}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value={value.address2}
                    name="address2"
                    onChange={handleChange}
                    readOnly={read}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Postcode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter PostalCode"
                    value={value.postalCode}
                    name="postalCode"
                    onChange={handleChange}
                    readOnly={read}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter State"
                    value={value.state}
                    name="state"
                    onChange={handleChange}
                    readOnly={read}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter City"
                    value={value.city}
                    name="city"
                    onChange={handleChange}
                    readOnly={read}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter email id"
                    value={value.email}
                    name="email"
                    onChange={handleChange}
                    readOnly={read}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    value={value.country}
                    name="country"
                    onChange={handleChange}
                    readOnly={read}
                  />
                </div>
              </div>
              <div className="row">
                {read === true && (
                  <div className="mt-5 text-center col-md-6">
                    <button
                      className="btn btn-primary choicesbutton"
                      type="button"
                      onClick={editProfile}>
                      Edit Profile
                    </button>
                  </div>
                )}
                {read === false && (
                  <div className="mt-5 text-center col-md-6">
                    <button
                      className="btn btn-primary choicesbutton"
                      type="button"
                      onClick={saveProfile}>
                      Save Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4 border-right mt-5">
            <img src={ProfilePageImg} className="profileimg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
