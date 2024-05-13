"use client"
import pillsLogo from '../assets/pills_banner_icon.png';
import { RiAccountCircleFill } from "react-icons/ri";
import { Popover } from 'antd';
import { useEffect, useState } from 'react';
import { GoPerson } from 'react-icons/go';
import { IoLogOut } from 'react-icons/io5';
import { ImProfile } from 'react-icons/im';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { authState } from '../redux/types';
import { removeUserDetails } from '../redux/slices/authSlice/authSlice';
import constants from './constants';
import { showMessage } from '../redux/slices/messageSlice/messageSlice';
import useGetDevice from './getDevice';
import { TiThMenu } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import paths from '../routes/rootRoutes';
const NavBar = () => {
     const [openPopUp, setOpenPopUp] = useState(false);
     const [openAuthPopUp, setOpenAuthPopUp] = useState(false);
     const navigate = useNavigate();
     const device = useGetDevice();
     const [userData, setUserData] = useState<authState>({
          name: '',
          pharmacyName: '',
          email: '',
          mobileNo: '',
          role: '',
          country: '',
          state: '',
          city: '',
          pincode: '',
          addressLine1: '',
          id: '',
          token: ''
     });

     const user = useAppSelector((state) => state.user);
     const dispatch = useAppDispatch();

     const fetchUserDataFromStorages = () => {
          setUserData({
               name: user?.name,
               pharmacyName: user?.pharmacyName,
               email: user.email,
               mobileNo: user?.mobileNo,
               role: user?.role,
               country: user?.country,
               state: user?.state,
               city: user?.city,
               pincode: user?.pincode,
               addressLine1: user?.addressLine1,
               id: user?.name,
               token: user?.token
          })
     }

     const logOut = () => {
          localStorage.removeItem(constants.TOKEN);
          sessionStorage.removeItem(constants.TOKEN);
          localStorage.removeItem(constants.USER);
          sessionStorage.removeItem(constants.USER);
          dispatch(removeUserDetails());
          dispatch(showMessage({ error: false, msg: 'User logged out sucessfully', show: true }));
          window.location.replace('/');
     }

     useEffect(() => {
          fetchUserDataFromStorages();
     }, [user?.role])

     const content = (
          <div className='min-w-[200px]'>
               <div className='flex justify-center py-2 border-b'>
                    <div className='bg-gray-100 rounded-full w-[100px] h-[100px] flex items-center justify-center'>
                         <GoPerson size={50} color='gray' />
                    </div>
               </div>
               <div className='mt-1 text-center text-[18px] font-[500] text-gray-500'>{userData?.name}</div>
               <div className='text-center text-[12px] text-gray-500'>{userData?.email}</div>
               <div className='border-t mt-2 pt-2'>
                    <div className='flex gap-2 items-center mt-2'>
                         <div>
                              <ImProfile color='grey' size={18} />
                         </div>
                         <div className='font-[500] text-[grey] text-[16px]'>Profile</div>
                    </div>
                    <div className='flex gap-2 items-center mt-3 cursor-pointer'
                         onClick={() => logOut()}
                    >
                         <div>
                              <IoLogOut color='#e63c3cd7' size={24} />
                         </div>
                         <div className='font-[500] text-[#e63c3cd7] text-[16px]'>Log Out</div>
                    </div>
               </div>
          </div>
     )

     const authContent = (
          <div className='min-w-[200px]'>
               <div className='flex flex-col gap-2 font-[Roboto] pr-5'>
                    <div className='text-white bg-green-800 rounded-3xl text-center font-bold py-[5px] w-[150px] cursor-pointer'
                         onClick={() => {
                              setOpenAuthPopUp(false);
                              navigate(paths.AUTH, { state: { name: 'login' } });
                         }}
                    >Login</div>
                    <div className='text-white bg-green-800 rounded-3xl text-center font-bold py-[5px] w-[150px] cursor-pointer'
                         onClick={() => {
                              setOpenAuthPopUp(false);
                              navigate(paths.AUTH, { state: { name: 'signup' } })
                         }}
                    >Register</div>
               </div>
          </div>
     )
     return (
          <div className="fixed w-[100%] top-0 flex justify-between bg-green-950 h-[60px] px-4 items-center z-50">
               <div className="flex items-center gap-2">
                    <img className="w-[32px]" src={pillsLogo} alt="pills" />
                    <div className="font-Ultra text-white ">Find My Drugs</div>
               </div>


               {
                    userData?.token ? (
                         <div className="flex gap-4 items-center pr-1">
                              <Popover
                                   defaultOpen={false}
                                   content={content}
                                   trigger="click"
                                   open={openPopUp}
                                   onOpenChange={() => setOpenPopUp(!openPopUp)}
                              >
                                   <RiAccountCircleFill color="white" size={30} />
                              </Popover>
                         </div>
                    ) :
                         (
                              <>
                                   {
                                        device === "mobile" ?
                                             <div>
                                                  <Popover
                                                       defaultOpen={false}
                                                       content={authContent}
                                                       trigger="click"
                                                       open={openAuthPopUp}
                                                       onOpenChange={() => setOpenAuthPopUp(!openAuthPopUp)}
                                                  >
                                                       <TiThMenu color='white' size={20} />
                                                  </Popover>
                                             </div>
                                             :
                                             <div className='flex gap-2 font-[Roboto] pr-5'>
                                                  <div className='text-green-800 bg-white rounded-3xl text-center font-bold py-[5px] w-[100px] cursor-pointer'
                                                       onClick={() => navigate(paths.AUTH, { state: { name: 'login' } })}
                                                  >Login</div>
                                                  <div className='text-green-800 bg-white rounded-3xl text-center font-bold py-[5px] w-[100px] cursor-pointer'
                                                       onClick={() => navigate(paths.AUTH, { state: { name: 'signup' } })}
                                                  >Register</div>
                                             </div>
                                   }
                              </>
                         )
               }


          </div>
     )
}

export default NavBar;