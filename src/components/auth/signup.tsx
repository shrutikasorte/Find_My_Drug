import { useState } from "react";
import { registerState } from "../../redux/types";
import CInput from "../../common/customInput";
import CButton from "../../common/customButton";
import { useAppDispatch } from "../../redux/store";
import Apis from "../../api";
import { showMessage } from "../../redux/slices/messageSlice/messageSlice";
import { calc } from "antd/es/theme/internal";

type Props = {
     setAuthType: any;
}
const SignUp: React.FC<Props> = ({ setAuthType }) => {
     const [signupData, setSignupData] = useState<registerState>({
          name: '',
          pharmacyName: '',
          email: '',
          password: '',
          confirmPassword: '',
          mobileNo: '',
          country: '',
          state: '',
          city: '',
          pincode: '',
          addressLine1: '',
          validate: false,
          loading: false
     });
     const dispatch = useAppDispatch();

     const matchPassword = () => {
          return signupData?.password === signupData?.confirmPassword;
     }

     const handleSubmit = async () => {
          setSignupData({ ...signupData, validate: true });
          if (
               !signupData?.name || signupData?.name?.trim() === "" ||
               !signupData?.email || signupData?.email?.trim() === "" ||
               !signupData?.mobileNo || !matchPassword() ||
               !signupData?.password || signupData?.password?.trim() === "" ||
               !signupData?.pharmacyName || signupData?.pharmacyName?.trim() === "" ||
               !signupData?.country || signupData?.country?.trim() === "" ||
               !signupData?.state || signupData?.state?.trim() === "" ||
               !signupData?.city || signupData?.city?.trim() === "" ||
               !signupData?.addressLine1 || signupData?.addressLine1?.trim() === "" ||
               !signupData?.pincode

          ) {
               return;
          }

          setSignupData({ ...signupData, validate: false, loading: true });
          const payload = {
               name: signupData?.name,
               pharmacyName: signupData?.pharmacyName,
               email: signupData?.email,
               password: signupData?.password,
               mobileNo: signupData?.mobileNo,
               country: signupData?.country,
               state: signupData?.state,
               city: signupData?.city,
               pincode: signupData?.pincode,
               addressLine1: signupData?.addressLine1,
          }

          try {
               const result = await Apis.signupApi(payload);
               console.log(result);
               const res = result?.data;
               if (res?.success) {
                    dispatch(showMessage({ msg: res.message, show: true, error: false }));
                    setAuthType('login');
               }
          } catch (error: any) {
               const res = error?.response?.data
               dispatch(showMessage({ msg: res?.message, error: true, show: true }));
          }
          setSignupData({ ...signupData, loading: false });
     }

     return (
          <div className="bg-transparent flex flex-col items-center justify-center pb-10 overflow-y-auto">
               {/* <div className="mt-7">
                    <img width={100} src={Images.logo} alt="" />
               </div> */}
               <div className="mt-5 w-[100%] lg:max-w-[600px]">
                    <CInput
                         title="Name"
                         value={signupData.name}
                         placeholder="Enter your Name"
                         onChange={(e: any) => {
                              setSignupData({
                                   ...signupData,
                                   name: e.target.value
                              })
                         }}
                    />
               </div>
               {signupData?.validate && !signupData?.name && (<span className="err-msg">Please enter name.</span>)}


               <>
                    <div className="mt-5 w-[100%] lg:max-w-[600px]">
                         <CInput
                              title="Pharmacy Name"
                              value={signupData.pharmacyName}
                              placeholder="Enter your Pharmacy Name"
                              onChange={(e: any) => {
                                   setSignupData({
                                        ...signupData,
                                        pharmacyName: e.target.value
                                   })
                              }}
                         />
                    </div>
                    {signupData?.validate && !signupData?.pharmacyName && (<span className="err-msg">Please enter pharmacy name.</span>)}
               </>


               <div className="mt-5 w-[100%] lg:max-w-[600px]">
                    <CInput
                         title="Email"
                         value={signupData.email}
                         placeholder="Enter your Email"
                         onChange={(e: any) => {
                              setSignupData({
                                   ...signupData,
                                   email: e.target.value
                              })
                         }}
                    />
               </div>
               {signupData?.validate && !signupData?.email && (<span className="err-msg">Please enter email.</span>)}


               <div className="mt-5 w-[100%] lg:max-w-[600px]">
                    <CInput
                         title="Mobile No"
                         value={signupData.mobileNo}
                         placeholder="Enter your Mobile Number"
                         type="number"
                         onChange={(e: any) => {
                              setSignupData({
                                   ...signupData,
                                   mobileNo: e.target.value
                              })
                         }}
                    />
               </div>
               {signupData?.validate && !signupData?.mobileNo && (<span className="err-msg">Please enter mobile number.</span>)}


               <>
                    <div className="mt-5 w-[100%] lg:max-w-[600px]">
                         <CInput
                              title="City"
                              value={signupData.city}
                              placeholder="Enter City"
                              onChange={(e: any) => {
                                   setSignupData({
                                        ...signupData,
                                        city: e.target.value
                                   })
                              }}
                         />
                    </div>
                    {signupData?.validate && !signupData?.city && (<span className="err-msg">Please enter city.</span>)}

                    <div className="mt-5 w-[100%] lg:max-w-[600px]">
                         <CInput
                              title="Pincode"
                              value={signupData.pincode}
                              placeholder="Enter Pincode"
                              onChange={(e: any) => {
                                   setSignupData({
                                        ...signupData,
                                        pincode: e.target.value
                                   })
                              }}
                         />
                    </div>
                    {signupData?.validate && !signupData?.pincode && (<span className="err-msg">Please enter pincode.</span>)}

                    <div className="mt-5 w-[100%] lg:max-w-[600px]">
                         <CInput
                              title="Address line 1"
                              value={signupData.addressLine1}
                              placeholder="Enter local address"
                              onChange={(e: any) => {
                                   setSignupData({
                                        ...signupData,
                                        addressLine1: e.target.value
                                   })
                              }}
                         />
                    </div>
                    {signupData?.validate && !signupData?.pincode && (<span className="err-msg">Please enter local addres with landmark.</span>)}
               </>

               <div className="mt-5 w-[100%] lg:max-w-[600px]">
                    <CInput
                         title="Password"
                         value={signupData.password}
                         placeholder="Enter your Password"
                         type="password"
                         onChange={(e: any) => {
                              setSignupData({
                                   ...signupData,
                                   password: e.target.value
                              })
                         }}
                    />
               </div>
               {signupData?.validate && !signupData?.password && (<span className="err-msg">Please enter password.</span>)}

               <div className="mt-5 w-[100%] lg:max-w-[600px]">
                    <CInput
                         title="Confirm Password"
                         value={signupData.confirmPassword}
                         placeholder="re-enter your Password"
                         type="password"
                         onChange={(e: any) => {
                              setSignupData({
                                   ...signupData,
                                   confirmPassword: e.target.value
                              })
                         }}
                    />
               </div>
               {signupData?.validate && !signupData?.confirmPassword && (<span className="err-msg">Please re-enter password.</span>)}
               {signupData?.validate && signupData?.confirmPassword && signupData?.password && (!matchPassword()) && (<span className="err-msg">Please does not match.</span>)}

               <div className="mt-5 w-[100%] lg:max-w-[600px]">
                    <CButton
                         title="Sign Up"
                         className={signupData?.loading ? `bg-[#277e1f] text-green-950 rounded-3xl` : `bg-[#5cfd4d] text-green-950 rounded-3xl`}
                         loading={signupData?.loading}
                         disabled={signupData?.loading}
                         onClick={handleSubmit}
                    />
               </div>
          </div>
     )
}

export default SignUp;