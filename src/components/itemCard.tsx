import { CiImageOn } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
type Props = {
     data:any;
}

const ItemCard:React.FC<Props> = ({data}) => {
     console.log(data)
     return (
          <div className="bg-white p-2 rounded-xl m-3">
               <div className="flex gap-1">
                    <div className="w-[100px] flex justify-center items-center ">
                         <CiImageOn size={52} color="grey"/>
                    </div>
                    <div className="w-[100%] p-2 border-l-[1px] border-black">
                         <div className="font-bold font-[Roboto] border-b-[1px] border-b-[black] ">
                              <div>{data?.pharmacy?.pharmacyName}</div>
                         </div>
                         <div className="text-[14px] font-[Roboto] font-bold  pt-2">
                              Product : {data?.drugName}
                         </div>
                         <div className="text-[14px] font-[Roboto] font-bold text-green-600 py-1">
                              Available Quantity : {data?.quantity | 0}
                         </div>
                         <div className="flex items-center gap-2 py-2 text-[12px] font-[Roboto] border-t-[1px] border-t-[black] ">
                              <div><IoLocationSharp color="red" size={22}/></div>
                              <div>{data?.pharmacy?.addressLine1}, {data?.pharmacy?.city}, {data?.pharmacy?.pincode}, {data?.pharmacy?.state}, {data?.pharmacy?.country}</div>
                         </div>
                    </div>

               </div>
          </div>
     )
}

export default ItemCard;