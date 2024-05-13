import CTable from "../../common/customTable";
import UpdateModal from "./actionModals/updateModal";
import DeleteModal from "./actionModals/deleteModal";
import { pageState } from "../../redux/types";
import { useEffect, useState } from "react";
import CButton from "../../common/customButton";
import AddItemModal from "./actionModals/AddItemModal";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchPharmacyItems } from "../../redux/slices/pharmacySlice/pharmacySlice";
import { FaSearch } from "react-icons/fa";

const PharmacyMainPage = () => {
     const dispatch = useAppDispatch();
     const [search,setSearch] = useState("");
     const [data,setData] = useState([]);
     const { items, loading } = useAppSelector((state) => state.pharmacy);
     const columns = [
          {
               title: 'Drug Name',
               dataIndex: 'drugName',
               key: 'name',
          },
          {
               title: 'Quantity',
               dataIndex: 'quantity',
               key: 'quantity',
               width: 200,
               render: (text: any) => {
                    return <div className="flex justify-center">{text}</div>
               }
          },
          {
               title: 'Availiblity Status',
               dataIndex: 'status',
               key: 'status',
               width: 200,
               render: (text: any, record: any) => {
                    return <div className="flex justify-center">
                         <div className={
                              record?.quantity > 0 ?
                                   "bg-green-600 text-white py-1 w-[100px] flex justify-center rounded-lg" :
                                   "bg-red-600 text-white py-1 w-[100px] flex justify-center rounded-lg"}>
                              {
                                   record?.quantity > 0 ? 'Available' : 'Not Available'
                              }
                         </div>
                    </div>
               }
          },
          {
               title: 'Action',
               dataIndex: 'action',
               key: 'action',
               width: 200,
               render: (text: any, record: any) => {
                    return <div className="flex justify-center gap-5 items-center">
                         <UpdateModal data={record} />
                         <DeleteModal data={record} />
                    </div>
               }
          }
     ]

     // useEffect(()=>{
     //      if(!search || search.trim()===""){
     //           setData(items.myDrugs);
     //      }else{
     //           let arr = items.myDrugs?.filter((item:any)=>{
     //                const orignal = item.drugName.toLowerCase();
     //                const el = search.toLowerCase();
     //                if(orignal.includes(el)){
     //                     return item;
     //                }
     //           });
     //           console.log(arr);
     //      }
     // },[search,items?.myDrugs])

     useEffect(()=>{
          if(!search || search.trim()===""){
               setData(items.myDrugs);
          }else{
               let arr = items.myDrugs?.filter((item:any)=> item.drugName.toLowerCase().includes(search.toLowerCase()));
               setData(arr);
          }
     },[search,items?.myDrugs])

     useEffect(() => {
          dispatch(fetchPharmacyItems());
     }, [])

     return (
          <div className="pt-[60px] px-3">

               <div className="flex justify-between items-center my-5">
                    <div className="flex items-center font-Roboto">
                         <input 
                         className="h-[40px] w-[400px] border-[1px] border-[#454444] border-r-0 outline-none rounded-l-3xl pl-5" 
                         placeholder="Enter Drug Name" 
                         value={search}
                         onChange={(el:any)=>setSearch(el.target.value)}
                         />
                         <CButton icon={<FaSearch color="green"/>} className="text-white bg-white h-[40px] w-[50px] rounded-r-3xl border-[1px] border-[#454444] border-l-0" />
                         {/* <CButton title="Search" className="text-white bg-green-900 h-[40px] w-[100px] rounded-r-3xl" /> */}
                    </div>
                    <div>
                         <AddItemModal />
                    </div>
               </div>

          <CTable data={data || []} columns={columns} loading={loading} pagination={{isShow:true}}/>
               {/* <div className='flex justify-end py-2'>
                    <Pagination
                         current={pageData?.pageNo}
                         total={itemCount}
                         onChange={(e) => {
                              setPageData({
                                   ...pageData,
                                   pageNo: e
                              })
                         }}
                         showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
                         showSizeChanger={true}
                         onShowSizeChange={(e, i) => {
                              setPageData({
                                   ...pageData,
                                   pageSize: i
                              })
                         }}
                         pageSizeOptions={[10, 20, 50, 100]}
                    />
               </div> */}
          </div>
     )
}

export default PharmacyMainPage;
