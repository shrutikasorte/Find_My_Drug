import CButton from "../common/customButton";
import { IoLocationSharp } from "react-icons/io5";
import Images from "../assets";
import ItemCard from "./itemCard";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchSearchProducts } from "../redux/slices/productSlice/productSlice";

const LandingPage = () => {
     const [data, setData] = useState([]);
     const dispatch = useAppDispatch();
     const {items, loading } = useAppSelector((state) => state.product)
     const [validate, setValidate] = useState(false);
     const [searchForm, setSearchForm] = useState({
          text: '',
          pinCode: ''
     })


     const handleSearchDrugs = () => {
          setValidate(true);
          if (!searchForm.text || searchForm.text.trim() === "" ||
               !searchForm.pinCode || searchForm.text.trim() === ""
          ) {
               return;
          }
          setValidate(false);
          const payload = {
               product: searchForm.text,
               pinCode: searchForm.pinCode
          }
          dispatch(fetchSearchProducts(payload));
     }

     useEffect(() => {
          setData(items);
     }, [items])

     return (
          <div className="bg-cover min-h-screen" style={{ backgroundImage: `url(${Images.med5})` }}>
               <div className="pt-[70px] w-[100%] overflow-y-auto  min-h-screen bg-[rgb(37,40,37,0.7)]" >
                    <div className="flex flex-col justify-center p-5 gap-1 md:flex-row items-center">
                         <div className=" font-Roboto w-[100%] md:w-[50%]">
                              <input
                                   className="h-[50px]  border-[1px] border-[#454444] outline-none shadow-2xl pl-5 w-[100%] rounded-xl "
                                   placeholder="Enter Drug/Product Name"
                                   value={searchForm.text}
                                   onChange={(e: any) => setSearchForm({ ...searchForm, text: e.target.value })}
                              />
                         </div>
                         <div className="flex items-center w-[100%] md:w-[200px]">
                              <input
                                   maxLength={6}
                                   className="h-[50px]  border-[1px] border-[#454444] border-r-0 outline-none shadow-2xl pl-5 w-[100%] rounded-l-xl"
                                   placeholder="Pin Code"
                                   value={searchForm.pinCode}
                                   onChange={(e: any) => setSearchForm({ ...searchForm, pinCode: e.target.value })}
                              />
                              <CButton icon={<IoLocationSharp size={22} color="green" />} className="border-[1px] border-[#454444] border-l-0 text-white bg-white h-[50px] w-[60px]  rounded-r-xl" />
                         </div>
                    </div>
                    {
                         validate && (!searchForm.text || searchForm.text.trim() === "" ||
                              !searchForm.pinCode || searchForm.text.trim() === ""
                         ) && <div className="text-center text-[14px] font-bold font-[Roboto] text-red-600 pl-2">Above field can not be empty!</div>

                    }
                    <div className="flex justify-center px-5 mt-3">

                         <CButton
                              title="Search"
                              className="bg-green-800 rounded-3xl border-[1px] border-[#827f7f]  text-white h-[50px] shadow-[#999494] shadow-2xl md: w-[500px]"
                              onClick={handleSearchDrugs}
                         />
                    </div>

                    {/* display item cards */}

                    <div className=" max-h-[700px]  mt-5">
                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                              {
                                   data?.map((item: any, index: number) => {
                                        return (<ItemCard data={item}/>)
                                   })
                              }
                         </div>
                    </div>

               </div>
          </div>
     )
}

export default LandingPage;