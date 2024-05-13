import { useEffect, useState } from "react"

const useGetDevice = () => {
     const [width, setWidth] = useState(window.innerWidth);
     useEffect(() => {
          const handleResize = () => {
               setWidth(window.innerWidth)
          }

          window.addEventListener('resize', handleResize);

          return () => {
               window.removeEventListener('resize', handleResize);
          };
     }, [window.innerWidth]);

     return width>700 ? "desktop" : "mobile";
}

export default useGetDevice;